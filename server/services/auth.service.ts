import { db } from "../db";
import { users, students, InsertUser, InsertStudent } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    role: "teacher" | "student";
    name: string;
    studentId?: string;
    program?: string;
    batch?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(users)
      .values({
        email: data.email,
        password: hashedPassword,
        role: data.role,
        name: data.name,
        studentId: data.studentId,
      })
      .returning();

    if (data.role === "student" && data.studentId && data.program && data.batch) {
      await db.insert(students).values({
        userId: user.id,
        studentId: data.studentId,
        program: data.program,
        batch: data.batch,
        status: "active",
        enrollmentDate: new Date(),
        createdBy: user.id,
      });
    }

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        studentId: user.studentId,
      },
    };
  }

  async login(email: string, password: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        studentId: user.studentId,
      },
    };
  }

  async getCurrentUser(userId: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      studentId: user.studentId,
    };
  }
}

export const authService = new AuthService();
