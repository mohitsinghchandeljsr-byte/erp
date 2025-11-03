import { StudentTable } from "../student-table";

export default function StudentTableExample() {
  const mockStudents = [
    {
      id: "1",
      studentId: "MBA2024001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@student.gaya.edu",
      batch: "2024-2026",
      program: "MBA",
      status: "active" as const,
    },
    {
      id: "2",
      studentId: "MBA2024002",
      name: "Priya Sharma",
      email: "priya.sharma@student.gaya.edu",
      batch: "2024-2026",
      program: "MBA",
      status: "active" as const,
    },
    {
      id: "3",
      studentId: "MBA2023045",
      name: "Amit Patel",
      email: "amit.patel@student.gaya.edu",
      batch: "2023-2025",
      program: "MBA",
      status: "archived" as const,
    },
  ];

  return (
    <div className="p-8 space-y-4 bg-background">
      <h2 className="text-2xl font-semibold">Student Table</h2>
      <StudentTable
        students={mockStudents}
        onEdit={(student) => console.log("Edit:", student)}
        onDelete={(student) => console.log("Delete:", student)}
        onArchive={(student) => console.log("Archive:", student)}
      />
    </div>
  );
}
