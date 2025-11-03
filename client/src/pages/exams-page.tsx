import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Calendar, Clock, Users } from "lucide-react";

export default function ExamsPage() {
  const exams = [
    {
      id: 1,
      title: "Mid-Term Examination",
      subject: "Marketing Management",
      date: "2024-12-15",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      totalMarks: 50,
      status: "upcoming",
      enrolled: 42,
    },
    {
      id: 2,
      title: "Quiz 1",
      subject: "Financial Accounting",
      date: "2024-11-20",
      time: "02:00 PM - 03:00 PM",
      duration: "1 hour",
      totalMarks: 20,
      status: "upcoming",
      enrolled: 42,
    },
    {
      id: 3,
      title: "Assignment Submission",
      subject: "Business Analytics",
      date: "2024-11-10",
      time: "11:59 PM",
      duration: "N/A",
      totalMarks: 30,
      status: "completed",
      enrolled: 42,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "default";
      case "ongoing": return "secondary";
      case "completed": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6" data-testid="page-exams">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Examinations</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage exams, quizzes, and assignments
            </p>
          </div>
        </div>
        <Button data-testid="button-create-exam">
          <Plus className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <div className="grid gap-4">
        {exams.map(exam => (
          <Card key={exam.id} className="hover-elevate">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{exam.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{exam.subject}</p>
                </div>
                <Badge variant={getStatusColor(exam.status)}>
                  {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Date</div>
                    <div className="font-medium">{new Date(exam.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Time</div>
                    <div className="font-medium">{exam.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Marks</div>
                    <div className="font-medium">{exam.totalMarks}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Enrolled</div>
                    <div className="font-medium">{exam.enrolled} students</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
