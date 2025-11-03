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
import { useCallback } from "react";

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

  const handleArchive = useCallback((student: Student) => {
    if (confirm(`Are you sure you want to archive ${student.name}?`)) {
      archiveMutation.mutate(student.id);
    }
  }, [archiveMutation]);

  return (
    <div className="space-y-4" data-testid="page-teacher-dashboard">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-xs text-muted-foreground">
              Gaya College MBA • AY 2024-2025
            </p>
          </div>
        </div>
        <StudentCreateDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
          <CardTitle className="text-base">Recent Students</CardTitle>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
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
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database Backup</span>
              <span className="text-sm text-green-600 font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Bot Status</span>
              <span className="text-sm text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Storage Used</span>
              <span className="text-sm font-medium">245 MB / 10 GB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
