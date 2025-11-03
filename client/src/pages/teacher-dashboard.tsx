import { MetricCard } from "@/components/metric-card";
import { StudentTable } from "@/components/student-table";
import { Users, ClipboardCheck, BookOpen, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeacherDashboard() {
  // TODO: Remove mock data
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
      status: "active" as const,
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-teacher-dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your department's key metrics
          </p>
        </div>
        <Button data-testid="button-add-student">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Students"
          value="246"
          subtitle="Active enrollments"
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        <MetricCard
          title="Attendance Rate"
          value="87.5%"
          subtitle="This month"
          icon={ClipboardCheck}
          trend={{ value: 3, positive: true }}
        />
        <MetricCard
          title="E-Books"
          value="42"
          subtitle="Available resources"
          icon={BookOpen}
        />
        <MetricCard
          title="Average Marks"
          value="78.2"
          subtitle="Overall performance"
          icon={TrendingUp}
          trend={{ value: 5, positive: false }}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Recent Students</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <StudentTable
            students={mockStudents}
            onEdit={(student) => console.log("Edit:", student)}
            onDelete={(student) => console.log("Delete:", student)}
            onArchive={(student) => console.log("Archive:", student)}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" data-testid="button-mark-attendance">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-create-exam">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-upload-ebook">
              <Plus className="h-4 w-4 mr-2" />
              Upload E-Book
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Backup</span>
              <span className="text-sm text-green-600 font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bot Status</span>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Storage Used</span>
              <span className="text-sm font-medium">245 MB / 10 GB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
