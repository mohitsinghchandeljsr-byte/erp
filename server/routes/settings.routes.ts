import { Router } from "express";
import { db } from "../db";
import { settings } from "@shared/schema";
import { eq } from "drizzle-orm";
import { authenticate, requireRole, type AuthRequest } from "../middleware/auth";

const router = Router();

// Get all settings
router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const allSettings = await db.select().from(settings);
    const settingsObj = allSettings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);
    res.json(settingsObj);
  } catch (error: any) {
    console.error("Get settings error:", error);
    res.status(500).json({ message: error.message || "Failed to fetch settings" });
  }
});

// Update a setting (teacher only)
router.put("/:key", authenticate, requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ message: "Value is required" });
    }

    const existing = await db.select().from(settings).where(eq(settings.key, key)).limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(settings)
        .set({ value, updatedBy: req.user!.id, updatedAt: new Date() })
        .where(eq(settings.key, key))
        .returning();
      res.json(updated);
    } else {
      const [created] = await db
        .insert(settings)
        .values({ key, value, updatedBy: req.user!.id })
        .returning();
      res.json(created);
    }
  } catch (error: any) {
    console.error("Update setting error:", error);
    res.status(500).json({ message: error.message || "Failed to update setting" });
  }
});

export default router;
