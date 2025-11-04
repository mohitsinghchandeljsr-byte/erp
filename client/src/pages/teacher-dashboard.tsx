import { CleanMetricCard } from "@/components/clean-metric-card";
import { WelcomeCard } from "@/components/welcome-card";
import { ShortcutSection } from "@/components/shortcut-section";
import { ActivityFeed } from "@/components/activity-feed";
import { PerformanceChart } from "@/components/performance-chart";
import { StudentTable } from "@/components/student-table";
import { StudentCreateDialog } from "@/components/student-create-dialog";
import { AttendanceMarkingDialog } from "@/components/attendance-marking-dialog";
import { Users, ClipboardCheck, BookOpen, TrendingUp, Upload, GraduationCap, Calendar, FileText } from "lucide-react";
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

  const welcomeItems = [
    { id: "student", label: "Create your first student", completed: students.length > 0 },
    { id: "attendance", label: "Mark attendance for a class", completed: false },
    { id: "timetable", label: "Set up class timetable", completed: false },
  ];

  const shortcuts = [
    { id: "students", title: "Students", url: "/teacher/students" },
    { id: "attendance", title: "Attendance", url: "/teacher/attendance" },
    { id: "timetable", title: "Timetable", url: "/teacher/timetable" },
    { id: "exams", title: "Exams", url: "/teacher/exams" },
    { id: "marks", title: "Marks", url: "/teacher/marks" },
  ];

  return (
    <div className="space-y-6" data-testid="page-teacher-dashboard">
      <WelcomeCard
        title="Let's begin your journey with ERP"
        description="Student Management, Attendance, Timetable and more"
        items={welcomeItems}
        onDismiss={() => console.log("Dismissed")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CleanMetricCard
          title="Total Students"
          value={students.length.toString()}
          subtitle="Active enrollments"
          icon={Users}
        />
        <CleanMetricCard
          title="Attendance"
          value="87.5%"
          subtitle="This month"
          icon={ClipboardCheck}
          trend={{ value: 3, positive: true }}
        />
        <CleanMetricCard
          title="E-Books"
          value="42"
          subtitle="Resources"
          icon={BookOpen}
        />
        <CleanMetricCard
          title="Avg Marks"
          value="78.2"
          subtitle="Performance"
          icon={TrendingUp}
          trend={{ value: 5, positive: false }}
        />
      </div>

      <ShortcutSection title="Your Shortcuts" shortcuts={shortcuts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <ActivityFeed />
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
          <CardTitle className="text-lg font-semibold">Recent Students</CardTitle>
          <StudentCreateDialog />
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

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Reports & Masters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-md hover-elevate active-elevate-2 cursor-pointer">
              <Users className="h-5 w-5 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Students</p>
            </div>
            <div className="p-4 border rounded-md hover-elevate active-elevate-2 cursor-pointer">
              <ClipboardCheck className="h-5 w-5 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Attendance</p>
            </div>
            <div className="p-4 border rounded-md hover-elevate active-elevate-2 cursor-pointer">
              <GraduationCap className="h-5 w-5 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Academics</p>
            </div>
            <div className="p-4 border rounded-md hover-elevate active-elevate-2 cursor-pointer">
              <BookOpen className="h-5 w-5 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Resources</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border shadow-sm">
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

        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Database Backup</span>
              <span className="text-sm text-primary font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Bot Status</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Storage Used</span>
              <span className="text-sm font-medium">245 MB / 10 GB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
