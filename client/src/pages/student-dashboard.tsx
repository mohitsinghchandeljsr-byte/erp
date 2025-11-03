import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceCalendar } from "@/components/attendance-calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, BookOpen, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import campusImage from "@assets/generated_images/College_campus_hero_image_b6bc2219.png";

export default function StudentDashboard() {
  // TODO: Remove mock data
  const mockAttendance = [
    { date: "2024-11-01", status: "present" as const },
    { date: "2024-11-02", status: "present" as const },
    { date: "2024-11-04", status: "absent" as const },
    { date: "2024-11-05", status: "present" as const },
    { date: "2024-11-06", status: "leave" as const },
  ];

  return (
    <div className="space-y-6" data-testid="page-student-dashboard">
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <img
          src={campusImage}
          alt="Campus"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="flex items-end gap-6">
            <Avatar className="h-24 w-24 border-4 border-white">
              <AvatarFallback className="text-2xl">RK</AvatarFallback>
            </Avatar>
            <div className="text-white pb-2">
              <h1 className="text-4xl font-bold">Welcome back, Rajesh!</h1>
              <p className="text-lg mt-2 opacity-90">
                MBA 2024-2026 • Student ID: MBA2024001
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attendance
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Marks
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.3</div>
            <p className="text-xs text-muted-foreground mt-1">Overall GPA: 3.8</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Exams
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Next 7 days</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              E-Books Accessed
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceCalendar
          month={new Date(2024, 10, 1)}
          records={mockAttendance}
          percentage={87}
        />

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { subject: "Financial Management", time: "9:00 AM - 10:30 AM", room: "101", day: "Tomorrow" },
              { subject: "Marketing Strategy", time: "11:00 AM - 12:30 PM", room: "203", day: "Tomorrow" },
              { subject: "Operations Management", time: "2:00 PM - 3:30 PM", room: "105", day: "Wed" },
            ].map((cls, i) => (
              <div key={i} className="flex items-start justify-between p-3 border rounded-lg hover-elevate">
                <div className="space-y-1">
                  <h4 className="font-medium">{cls.subject}</h4>
                  <p className="text-sm text-muted-foreground">{cls.time}</p>
                  <p className="text-xs text-muted-foreground">Room {cls.room}</p>
                </div>
                <Badge variant="outline">{cls.day}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>Recent Exam Results</CardTitle>
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
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{exam.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exam.marks} / {exam.total}
                  </p>
                </div>
                <Badge variant="default">{exam.grade}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
