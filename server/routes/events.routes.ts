import { Router } from "express";
import { db } from "../db";
import { events, insertEventSchema } from "../../shared/schema";
import { authenticate, AuthRequest } from "../middleware/auth";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const allEvents = await db.select().from(events).orderBy(desc(events.startDate));
    res.json(allEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const event = await db.select().from(events).where(eq(events.id, req.params.id));
    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create events" });
    }

    const validated = insertEventSchema.parse({
      ...req.body,
      createdBy: req.user.id,
    });

    const [newEvent] = await db.insert(events).values(validated).returning();
    res.status(201).json(newEvent);
  } catch (error: any) {
    console.error("Error creating event:", error);
    res.status(400).json({ message: error.message || "Failed to create event" });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can update events" });
    }

    const updateSchema = insertEventSchema.partial().omit({ createdBy: true, createdAt: true });
    const validated = updateSchema.parse(req.body);

    const [updated] = await db
      .update(events)
      .set(validated)
      .where(eq(events.id, req.params.id))
      .returning();

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updated);
  } catch (error: any) {
    console.error("Error updating event:", error);
    res.status(400).json({ message: error.message || "Failed to update event" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    if (req.user?.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can delete events" });
    }

    await db.delete(events).where(eq(events.id, req.params.id));
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
});

export default router;
