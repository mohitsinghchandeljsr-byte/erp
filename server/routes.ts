import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import studentsRoutes from "./routes/students.routes";
import attendanceRoutes from "./routes/attendance.routes";
import subjectsRoutes from "./routes/subjects.routes";
import uploadRoutes from "./routes/upload.routes";
import settingsRoutes from "./routes/settings.routes";
import eventsRoutes from "./routes/events.routes";
import syllabusRoutes from "./routes/syllabus.routes";
import ebooksRoutes from "./routes/ebooks.routes";
import downloadsRoutes from "./routes/downloads.routes";
import { ObjectStorageService } from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware
  app.use(cookieParser());

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/students", studentsRoutes);
  app.use("/api/attendance", attendanceRoutes);
  app.use("/api/subjects", subjectsRoutes);
  app.use("/api/upload", uploadRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api/events", eventsRoutes);
  app.use("/api/syllabus", syllabusRoutes);
  app.use("/api/ebooks", ebooksRoutes);
  app.use("/api/downloads", downloadsRoutes);

  // Serve public object storage files
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
