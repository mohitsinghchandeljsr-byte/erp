import { Router } from "express";
import { db } from "../db";
import { students, users, insertStudentSchema } from "@shared/schema";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
import { eq, and } from "drizzle-orm";

const router = Router();

router.use(authenticate);

router.get("/", requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const allStudents = await db
      .select({
        id: students.id,
        userId: students.userId,
        studentId: students.studentId,
        program: students.program,
        batch: students.batch,
        phone: students.phone,
        photoUrl: students.photoUrl,
        status: students.status,
        enrollmentDate: students.enrollmentDate,
        name: users.name,
        email: users.email,
      })
      .from(students)
      .leftJoin(users, eq(students.userId, users.id))
      .where(eq(students.status, "active"));

    res.json(allStudents);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch students" });
  }
});

router.get("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const [student] = await db
      .select({
        id: students.id,
        userId: students.userId,
        studentId: students.studentId,
        program: students.program,
        batch: students.batch,
        phone: students.phone,
        photoUrl: students.photoUrl,
        status: students.status,
        enrollmentDate: students.enrollmentDate,
        name: users.name,
        email: users.email,
      })
      .from(students)
      .leftJoin(users, eq(students.userId, users.id))
      .where(eq(students.id, id))
      .limit(1);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (req.user!.role === "student" && req.user!.id !== student.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(student);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch student" });
  }
});

router.post("/", requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const data = insertStudentSchema.parse(req.body);
    
    const [newStudent] = await db
      .insert(students)
      .values({
        ...data,
        createdBy: req.user!.id,
      })
      .returning();

    res.status(201).json(newStudent);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to create student" });
  }
});

router.patch("/:id", requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updatedStudent] = await db
      .update(students)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(students.id, id))
      .returning();

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to update student" });
  }
});

router.delete("/:id", requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const [archivedStudent] = await db
      .update(students)
      .set({
        status: "archived",
        archivedAt: new Date(),
        archivedBy: req.user!.id,
      })
      .where(eq(students.id, id))
      .returning();

    if (!archivedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student archived successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to archive student" });
  }
});

export default router;
