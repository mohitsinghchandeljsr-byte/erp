import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceCalendar } from "@/components/attendance-calendar";
import { CleanMetricCard } from "@/components/clean-metric-card";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const mockAttendance = [
    { date: "2024-11-01", status: "present" as const },
    { date: "2024-11-02", status: "present" as const },
    { date: "2024-11-04", status: "absent" as const },
    { date: "2024-11-05", status: "present" as const },
    { date: "2024-11-06", status: "leave" as const },
  ];

  return (
    <div className="space-y-6" data-testid="page-student-dashboard">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Fira Code', monospace" }}>Welcome back, Rajesh!</h1>
        <p className="text-sm text-muted-foreground mt-1">
          MBA 2024-2026 • Student ID: MBA2024001
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CleanMetricCard
          title="Attendance"
          value="87.5%"
          subtitle="This semester"
          icon={Calendar}
        />
        <CleanMetricCard
          title="Average Marks"
          value="82.3"
          subtitle="Overall GPA: 3.8"
          icon={Award}
        />
        <CleanMetricCard
          title="Upcoming Exams"
          value="3"
          subtitle="Next 7 days"
          icon={FileText}
        />
        <CleanMetricCard
          title="E-Books Accessed"
          value="12"
          subtitle="This month"
          icon={BookOpen}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AttendanceCalendar
          month={new Date(2024, 10, 1)}
          records={mockAttendance}
          percentage={87}
        />

        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { subject: "Financial Management", time: "9:00 AM - 10:30 AM", room: "101", day: "Tomorrow" },
              { subject: "Marketing Strategy", time: "11:00 AM - 12:30 PM", room: "203", day: "Tomorrow" },
              { subject: "Operations Management", time: "2:00 PM - 3:30 PM", room: "105", day: "Wed" },
            ].map((cls, i) => (
              <div key={i} className="flex items-start justify-between p-3 border rounded-md hover-elevate">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{cls.subject}</h4>
                  <p className="text-xs text-muted-foreground">{cls.time}</p>
                  <p className="text-xs text-muted-foreground">Room {cls.room}</p>
                </div>
                <Badge variant="outline" className="text-xs">{cls.day}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg font-semibold">Recent Exam Results</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { subject: "Business Analytics", marks: 85, total: 100, grade: "A" },
              { subject: "Financial Accounting", marks: 78, total: 100, grade: "B+" },
              { subject: "Marketing Research", marks: 92, total: 100, grade: "A+" },
            ].map((exam, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <h4 className="font-medium text-sm">{exam.subject}</h4>
                  <p className="text-xs text-muted-foreground">
                    {exam.marks} / {exam.total}
                  </p>
                </div>
                <Badge variant="default" className="text-xs">{exam.grade}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
