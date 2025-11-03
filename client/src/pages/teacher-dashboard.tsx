import { MetricCard } from "@/components/metric-card";
import { StudentTable } from "@/components/student-table";
import { StudentCreateDialog } from "@/components/student-create-dialog";
import { AttendanceMarkingDialog } from "@/components/attendance-marking-dialog";
import { Users, ClipboardCheck, BookOpen, TrendingUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  batch: string;
  program: string;
  status: "active" | "archived";
}

export default function TeacherDashboard() {
  const { toast } = useToast();
  
  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const archiveMutation = useMutation({
    mutationFn: async (studentId: string) => {
      await apiRequest("DELETE", `/api/students/${studentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      toast({
        title: "Success",
        description: "Student archived successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to archive student",
        variant: "destructive",
      });
    },
  });

  const handleArchive = (student: Student) => {
    if (confirm(`Are you sure you want to archive ${student.name}?`)) {
      archiveMutation.mutate(student.id);
    }
  };

  return (
    <div className="space-y-8" data-testid="page-teacher-dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <StudentCreateDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value={students.length.toString()}
          subtitle="Active enrollments"
          icon={Users}
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
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
          <div>
            <CardTitle className="text-xl">Recent Students</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Manage your student roster</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading students...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No students found. Create your first student to get started.
            </div>
          ) : (
            <StudentTable
              students={students}
              onEdit={(student) => console.log("Edit:", student)}
              onDelete={(student) => console.log("Delete:", student)}
              onArchive={handleArchive}
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <AttendanceMarkingDialog />
            <Button variant="outline" className="w-full justify-start" data-testid="button-create-exam">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-upload-ebook">
              <Upload className="h-4 w-4 mr-2" />
              Upload E-Book
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Database Backup</span>
              <span className="text-sm text-green-600 font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Bot Status</span>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Storage Used</span>
              <span className="text-sm font-medium">245 MB / 10 GB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
