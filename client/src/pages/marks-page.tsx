import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MarksPage() {
  const students = [
    { id: 1, name: "Anita Verma", studentId: "MBA2024999", marketing: 45, finance: 38, analytics: 42, average: 41.67 },
    { id: 2, name: "Priya Sharma", studentId: "MBA2024002", marketing: 48, finance: 44, analytics: 46, average: 46.00 },
    { id: 3, name: "Rahul Kumar", studentId: "MBA2024001", marketing: 40, finance: 42, analytics: 38, average: 40.00 },
  ];

  const subjects = ["Marketing Management", "Financial Accounting", "Business Analytics"];

  return (
    <div className="space-y-6" data-testid="page-marks">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Marks & Grades</h1>
            <p className="text-muted-foreground mt-1">
              Track student performance and academic progress
            </p>
          </div>
        </div>
        <Button data-testid="button-enter-marks">Enter Marks</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Class Average</p>
                <h3 className="text-3xl font-bold mt-1">42.6</h3>
                <p className="text-xs text-muted-foreground mt-1">Out of 50</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Highest Score</p>
                <h3 className="text-3xl font-bold mt-1">48</h3>
                <p className="text-xs text-muted-foreground mt-1">Marketing Mgmt</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                <h3 className="text-3xl font-bold mt-1">85%</h3>
                <p className="text-xs text-muted-foreground mt-1">Above 40 marks</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {students.map(student => (
              <div key={student.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.studentId}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{student.average.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">Average</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-muted-foreground">Marketing</span>
                      <span className="font-medium">{student.marketing}/50</span>
                    </div>
                    <Progress value={(student.marketing / 50) * 100} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-muted-foreground">Finance</span>
                      <span className="font-medium">{student.finance}/50</span>
                    </div>
                    <Progress value={(student.finance / 50) * 100} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-muted-foreground">Analytics</span>
                      <span className="font-medium">{student.analytics}/50</span>
                    </div>
                    <Progress value={(student.analytics / 50) * 100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
