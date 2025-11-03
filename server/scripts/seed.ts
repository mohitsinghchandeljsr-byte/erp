import { db } from "../db";
import { users, students, subjects } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Starting database seed...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const [teacher] = await db
    .insert(users)
    .values({
      email: "teacher@gaya.edu",
      password: hashedPassword,
      role: "teacher",
      name: "Dr. Priya Sharma",
      studentId: null,
    })
    .returning()
    .onConflictDoNothing();

  console.log("Created teacher:", teacher?.email);

  const [studentUser] = await db
    .insert(users)
    .values({
      email: "student@gaya.edu",
      password: hashedPassword,
      role: "student",
      name: "Rahul Kumar",
      studentId: "MBA2024001",
    })
    .returning()
    .onConflictDoNothing();

  console.log("Created student user:", studentUser?.email);

  if (studentUser) {
    const [student] = await db
      .insert(students)
      .values({
        userId: studentUser.id,
        studentId: "MBA2024001",
        program: "MBA",
        batch: "2024-2026",
        phone: "+91 9876543210",
        status: "active",
        enrollmentDate: new Date("2024-08-01"),
        createdBy: teacher?.id || studentUser.id,
      })
      .returning()
      .onConflictDoNothing();

    console.log("Created student record:", student?.studentId);
  }

  const subjectsList = [
    { name: "Marketing Management", code: "MBA101", credits: 4 },
    { name: "Financial Accounting", code: "MBA102", credits: 4 },
    { name: "Organizational Behavior", code: "MBA103", credits: 3 },
    { name: "Business Analytics", code: "MBA104", credits: 4 },
    { name: "Operations Management", code: "MBA105", credits: 3 },
  ];

  for (const subject of subjectsList) {
    await db
      .insert(subjects)
      .values(subject)
      .onConflictDoNothing();
  }

  console.log("Created subjects");
  console.log("Seed completed!");
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
