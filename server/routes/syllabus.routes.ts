import { Router } from "express";
import { db } from "../db";
import { syllabus, subjects, insertSyllabusSchema } from "../../shared/schema";
import { authenticate, AuthRequest } from "../middleware/auth";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const allSyllabus = await db
      .select({
        id: syllabus.id,
        subjectId: syllabus.subjectId,
        content: syllabus.content,
        version: syllabus.version,
        updatedBy: syllabus.updatedBy,
        createdAt: syllabus.createdAt,
        updatedAt: syllabus.updatedAt,
        subjectName: subjects.name,
        subjectCode: subjects.code,
        credits: subjects.credits,
      })
      .from(syllabus)
      .leftJoin(subjects, eq(syllabus.subjectId, subjects.id))
      .orderBy(desc(syllabus.createdAt));

    res.json(allSyllabus);
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    res.status(500).json({ message: "Failed to fetch syllabus" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const result = await db
      .select({
        id: syllabus.id,
        subjectId: syllabus.subjectId,
        content: syllabus.content,
        version: syllabus.version,
        updatedBy: syllabus.updatedBy,
        createdAt: syllabus.createdAt,
        updatedAt: syllabus.updatedAt,
        subjectName: subjects.name,
        subjectCode: subjects.code,
        credits: subjects.credits,
      })
      .from(syllabus)
      .leftJoin(subjects, eq(syllabus.subjectId, subjects.id))
      .where(eq(syllabus.id, req.params.id));

    if (result.length === 0) {
      return res.status(404).json({ message: "Syllabus not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    res.status(500).json({ message: "Failed to fetch syllabus" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create syllabus" });
    }

    const validated = insertSyllabusSchema.parse({
      ...req.body,
      updatedBy: req.user.id,
    });

    const [newSyllabus] = await db.insert(syllabus).values(validated).returning();
    res.status(201).json(newSyllabus);
  } catch (error: any) {
    console.error("Error creating syllabus:", error);
    res.status(400).json({ message: error.message || "Failed to create syllabus" });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can update syllabus" });
    }

    const updateSchema = insertSyllabusSchema.partial().omit({ updatedBy: true, createdAt: true, updatedAt: true });
    const validated = updateSchema.parse(req.body);

    const [updated] = await db
      .update(syllabus)
      .set({
        ...validated,
        updatedBy: req.user.id,
        updatedAt: new Date(),
      })
      .where(eq(syllabus.id, req.params.id))
      .returning();

    if (!updated) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    res.json(updated);
  } catch (error: any) {
    console.error("Error updating syllabus:", error);
    res.status(400).json({ message: error.message || "Failed to update syllabus" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can delete syllabus" });
    }

    await db.delete(syllabus).where(eq(syllabus.id, req.params.id));
    res.json({ message: "Syllabus deleted successfully" });
  } catch (error) {
    console.error("Error deleting syllabus:", error);
    res.status(500).json({ message: "Failed to delete syllabus" });
  }
});

export default router;
