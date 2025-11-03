import { Router } from "express";
import { authService } from "../services/auth.service";
import { authenticate, AuthRequest } from "../middleware/auth";
import { z } from "zod";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["teacher", "student"]),
  name: z.string().min(1),
  studentId: z.string().optional(),
  program: z.string().optional(),
  batch: z.string().optional(),
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

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
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
