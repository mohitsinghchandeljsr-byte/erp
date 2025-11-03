import type { Express } from "express";
import { createServer, type Server } from "http";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import studentsRoutes from "./routes/students.routes";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware
  app.use(cookieParser());

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/students", studentsRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
