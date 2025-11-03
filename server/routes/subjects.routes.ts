import { Router } from "express";
import { db } from "../db";
import { subjects } from "@shared/schema";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";

const router = Router();

router.use(authenticate);

// Get all subjects
router.get("/", requireRole("teacher", "student"), async (req: AuthRequest, res) => {
  try {
    const allSubjects = await db.select().from(subjects);
    res.json(allSubjects);
  } catch (error: any) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: error.message || "Failed to fetch subjects" });
  }
});

export default router;
