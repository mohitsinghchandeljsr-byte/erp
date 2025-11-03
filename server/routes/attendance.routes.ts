import { Router } from "express";
import { z } from "zod";
import { db } from "../db";
import { attendance, students, subjects, users } from "@shared/schema";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
import { eq, and, gte, lte, sql } from "drizzle-orm";

const router = Router();

router.use(authenticate);

// Mark single attendance entry
router.post("/", requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      studentId: z.string().uuid(),
      subjectId: z.string().uuid(),
      date: z.string().datetime(),
      status: z.enum(["present", "absent", "leave"]),
    });

    const data = schema.parse(req.body);

    const [record] = await db.insert(attendance).values({
      ...data,
      date: new Date(data.date),
      markedBy: req.user!.id,
    }).returning();

    res.status(201).json(record);
  } catch (error: any) {
    console.error("Error marking attendance:", error);
    res.status(400).json({ message: error.message || "Failed to mark attendance" });
  }
});

// Bulk mark attendance (for multiple students at once)
router.post("/bulk", requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      subjectId: z.string().uuid(),
      date: z.string().datetime(),
      records: z.array(z.object({
        studentId: z.string().uuid(),
        status: z.enum(["present", "absent", "leave"]),
      })),
    });

    const data = schema.parse(req.body);

    const attendanceRecords = data.records.map(record => ({
      studentId: record.studentId,
      subjectId: data.subjectId,
      date: new Date(data.date),
      status: record.status,
      markedBy: req.user!.id,
    }));

    const inserted = await db.insert(attendance).values(attendanceRecords).returning();

    res.status(201).json({ 
      message: `Marked attendance for ${inserted.length} students`,
      records: inserted 
    });
  } catch (error: any) {
    console.error("Error bulk marking attendance:", error);
    res.status(400).json({ message: error.message || "Failed to bulk mark attendance" });
  }
});

// Get attendance records with filters
router.get("/", requireRole("teacher", "student"), async (req: AuthRequest, res) => {
  try {
    const { studentId, subjectId, startDate, endDate } = req.query;

    // RBAC: Students can only see their own attendance
    let effectiveStudentId = studentId as string | undefined;
    if (req.user!.role === "student") {
      const [student] = await db
        .select({ id: students.id })
        .from(students)
        .where(eq(students.userId, req.user!.id))
        .limit(1);
      
      if (!student) {
        return res.status(404).json({ message: "Student record not found" });
      }
      effectiveStudentId = student.id;
    }

    let query = db
      .select({
        id: attendance.id,
        studentId: attendance.studentId,
        studentName: users.name,
        studentIdNumber: students.studentId,
        subjectId: attendance.subjectId,
        subjectName: subjects.name,
        subjectCode: subjects.code,
        date: attendance.date,
        status: attendance.status,
        markedBy: attendance.markedBy,
        markedByName: sql<string>`marker.name`,
        createdAt: attendance.createdAt,
      })
      .from(attendance)
      .leftJoin(students, eq(attendance.studentId, students.id))
      .leftJoin(users, eq(students.userId, users.id))
      .leftJoin(subjects, eq(attendance.subjectId, subjects.id))
      .leftJoin(
        sql`${users} AS marker`,
        sql`${attendance.markedBy} = marker.id`
      );

    const conditions = [];

    if (effectiveStudentId) {
      conditions.push(eq(attendance.studentId, effectiveStudentId));
    }

    if (subjectId) {
      conditions.push(eq(attendance.subjectId, subjectId as string));
    }

    if (startDate) {
      conditions.push(gte(attendance.date, new Date(startDate as string)));
    }

    if (endDate) {
      conditions.push(lte(attendance.date, new Date(endDate as string)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    const records = await query;

    res.json(records);
  } catch (error: any) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: error.message || "Failed to fetch attendance" });
  }
});

// Get attendance summary/percentage for a student
router.get("/summary/:studentId", requireRole("teacher", "student"), async (req: AuthRequest, res) => {
  try {
    const { studentId } = req.params;
    const { subjectId } = req.query;

    // RBAC: Students can only see their own summary
    if (req.user!.role === "student") {
      const [student] = await db
        .select({ id: students.id })
        .from(students)
        .where(eq(students.userId, req.user!.id))
        .limit(1);
      
      if (!student) {
        return res.status(404).json({ message: "Student record not found" });
      }
      
      if (student.id !== studentId) {
        return res.status(403).json({ message: "You can only view your own attendance" });
      }
    }

    // Get overall attendance summary
    const summaryQuery = db
      .select({
        subjectId: attendance.subjectId,
        subjectName: subjects.name,
        subjectCode: subjects.code,
        total: sql<number>`count(*)`,
        present: sql<number>`sum(case when ${attendance.status} = 'present' then 1 else 0 end)`,
        absent: sql<number>`sum(case when ${attendance.status} = 'absent' then 1 else 0 end)`,
        leave: sql<number>`sum(case when ${attendance.status} = 'leave' then 1 else 0 end)`,
        percentage: sql<number>`round((sum(case when ${attendance.status} = 'present' then 1 else 0 end)::decimal / count(*)) * 100, 2)`,
      })
      .from(attendance)
      .leftJoin(subjects, eq(attendance.subjectId, subjects.id))
      .where(eq(attendance.studentId, studentId))
      .groupBy(attendance.subjectId, subjects.name, subjects.code);

    let summary;
    if (subjectId) {
      summary = await summaryQuery.having(eq(attendance.subjectId, subjectId as string));
    } else {
      summary = await summaryQuery;
    }

    // Calculate overall percentage
    const overall = await db
      .select({
        total: sql<number>`count(*)`,
        present: sql<number>`sum(case when ${attendance.status} = 'present' then 1 else 0 end)`,
        absent: sql<number>`sum(case when ${attendance.status} = 'absent' then 1 else 0 end)`,
        leave: sql<number>`sum(case when ${attendance.status} = 'leave' then 1 else 0 end)`,
        percentage: sql<number>`round((sum(case when ${attendance.status} = 'present' then 1 else 0 end)::decimal / count(*)) * 100, 2)`,
      })
      .from(attendance)
      .where(eq(attendance.studentId, studentId));

    res.json({
      overall: overall[0] || { total: 0, present: 0, absent: 0, leave: 0, percentage: 0 },
      bySubject: summary,
    });
  } catch (error: any) {
    console.error("Error fetching attendance summary:", error);
    res.status(500).json({ message: error.message || "Failed to fetch summary" });
  }
});

export default router;
