import { Router } from "express";
import { db } from "../db";
import { ebooks, subjects, insertEbookSchema } from "../../shared/schema";
import { authenticate, AuthRequest } from "../middleware/auth";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const allEbooks = await db
      .select({
        id: ebooks.id,
        title: ebooks.title,
        subjectId: ebooks.subjectId,
        author: ebooks.author,
        fileUrl: ebooks.fileUrl,
        fileSize: ebooks.fileSize,
        accessPolicy: ebooks.accessPolicy,
        uploadedBy: ebooks.uploadedBy,
        createdAt: ebooks.createdAt,
        subjectName: subjects.name,
        subjectCode: subjects.code,
      })
      .from(ebooks)
      .leftJoin(subjects, eq(ebooks.subjectId, subjects.id))
      .orderBy(desc(ebooks.createdAt));

    res.json(allEbooks);
  } catch (error) {
    console.error("Error fetching ebooks:", error);
    res.status(500).json({ message: "Failed to fetch ebooks" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const result = await db
      .select({
        id: ebooks.id,
        title: ebooks.title,
        subjectId: ebooks.subjectId,
        author: ebooks.author,
        fileUrl: ebooks.fileUrl,
        fileSize: ebooks.fileSize,
        accessPolicy: ebooks.accessPolicy,
        uploadedBy: ebooks.uploadedBy,
        createdAt: ebooks.createdAt,
        subjectName: subjects.name,
        subjectCode: subjects.code,
      })
      .from(ebooks)
      .leftJoin(subjects, eq(ebooks.subjectId, subjects.id))
      .where(eq(ebooks.id, req.params.id));

    if (result.length === 0) {
      return res.status(404).json({ message: "E-book not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching ebook:", error);
    res.status(500).json({ message: "Failed to fetch ebook" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can upload ebooks" });
    }

    const validated = insertEbookSchema.parse({
      ...req.body,
      uploadedBy: req.user.id,
    });

    const [newEbook] = await db.insert(ebooks).values(validated).returning();
    res.status(201).json(newEbook);
  } catch (error: any) {
    console.error("Error creating ebook:", error);
    res.status(400).json({ message: error.message || "Failed to create ebook" });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can update ebooks" });
    }

    const updateSchema = insertEbookSchema.partial().omit({ uploadedBy: true, createdAt: true });
    const validated = updateSchema.parse(req.body);

    const [updated] = await db
      .update(ebooks)
      .set(validated)
      .where(eq(ebooks.id, req.params.id))
      .returning();

    if (!updated) {
      return res.status(404).json({ message: "E-book not found" });
    }

    res.json(updated);
  } catch (error: any) {
    console.error("Error updating ebook:", error);
    res.status(400).json({ message: error.message || "Failed to update ebook" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can delete ebooks" });
    }

    await db.delete(ebooks).where(eq(ebooks.id, req.params.id));
    res.json({ message: "E-book deleted successfully" });
  } catch (error) {
    console.error("Error deleting ebook:", error);
    res.status(500).json({ message: "Failed to delete ebook" });
  }
});

export default router;
