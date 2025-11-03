import { GradientMetricCard } from "@/components/gradient-metric-card";
import { ActivityFeed } from "@/components/activity-feed";
import { PerformanceChart } from "@/components/performance-chart";
import { StudentTable } from "@/components/student-table";
import { StudentCreateDialog } from "@/components/student-create-dialog";
import { AttendanceMarkingDialog } from "@/components/attendance-marking-dialog";
import { Users, ClipboardCheck, BookOpen, TrendingUp, Upload, Sparkles } from "lucide-react";
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
    <div className="space-y-6" data-testid="page-teacher-dashboard">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-green-600 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gaya College MBA Department • Academic Year 2024-2025
            </p>
          </div>
        </div>
        <StudentCreateDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientMetricCard
          title="Total Students"
          value={students.length.toString()}
          subtitle="Active enrollments"
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <GradientMetricCard
          title="Attendance"
          value="87.5%"
          subtitle="This month"
          icon={ClipboardCheck}
          trend={{ value: 3, positive: true }}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
        />
        <GradientMetricCard
          title="E-Books"
          value="42"
          subtitle="Resources"
          icon={BookOpen}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <GradientMetricCard
          title="Avg Marks"
          value="78.2"
          subtitle="Performance"
          icon={TrendingUp}
          trend={{ value: 5, positive: false }}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <ActivityFeed />
      </div>

      <Card className="shadow-sm border-border/40">
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
          <CardTitle className="text-lg font-semibold">Recent Students</CardTitle>
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
        <Card className="shadow-sm border-border/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
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

        <Card className="shadow-sm border-border/40 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database Backup</span>
              <span className="text-sm text-green-600 font-semibold">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Bot Status</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-green-600 font-semibold">Active</span>
              </div>
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
