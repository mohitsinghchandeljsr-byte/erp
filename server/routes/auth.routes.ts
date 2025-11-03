import { Router } from "express";
import { authService } from "../services/auth.service";
import { authenticate, AuthRequest } from "../middleware/auth";
import { z } from "zod";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerStudentSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  studentId: z.string().min(1),
  program: z.string().min(1),
  batch: z.string().min(1),
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.login(email, password);
    
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Login failed" });
  }
});

// SECURITY: Registration disabled for production
// Teachers must be created via seed script or admin interface
// Students can only be created by authenticated teachers via /api/students
router.post("/register", async (req, res) => {
  return res.status(403).json({ 
    message: "Public registration is disabled. Students must be created by teachers. Contact your administrator for access." 
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/me", authenticate, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await authService.getCurrentUser(req.user.id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Failed to get user" });
  }
});

export default router;
