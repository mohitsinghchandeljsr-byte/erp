import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, TrendingDown } from "lucide-react";

type AttendanceSummary = {
  overall: {
    total: number;
    present: number;
    absent: number;
    leave: number;
    percentage: number;
  };
  bySubject: Array<{
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    total: number;
    present: number;
    absent: number;
    leave: number;
    percentage: number;
  }>;
};

interface AttendanceSummaryProps {
  studentId: string;
  studentName?: string;
}

export function AttendanceSummaryCard({ studentId, studentName }: AttendanceSummaryProps) {
  const { data: summary, isLoading } = useQuery<AttendanceSummary>({
    queryKey: ["/api/attendance/summary", studentId],
    queryFn: async ({ queryKey }) => {
      const [path, id] = queryKey;
      const response = await fetch(`${path}/${id}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch summary");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!summary || summary.overall.total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No attendance records found for this student.
          </div>
        </CardContent>
      </Card>
    );
  }

  const lowAttendanceThreshold = 75;
  const overallPercentage = Number(summary.overall.percentage) || 0;
  const isLowAttendance = overallPercentage < lowAttendanceThreshold;

  return (
    <div className="space-y-4">
      {isLowAttendance && (
        <Alert variant="destructive" data-testid="alert-low-attendance">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Low Attendance Alert</AlertTitle>
          <AlertDescription>
            {studentName ? `${studentName}'s attendance` : "Attendance"} is below {lowAttendanceThreshold}%. 
            Current: {overallPercentage.toFixed(1)}%
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Overall Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold" data-testid="text-overall-percentage">
                  {overallPercentage.toFixed(1)}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {summary.overall.present} / {summary.overall.total} classes
                </span>
              </div>
              <Progress value={overallPercentage} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Present</div>
                <div className="text-lg font-medium text-green-600" data-testid="text-overall-present">
                  {summary.overall.present}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Absent</div>
                <div className="text-lg font-medium text-red-600" data-testid="text-overall-absent">
                  {summary.overall.absent}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Leave</div>
                <div className="text-lg font-medium text-yellow-600" data-testid="text-overall-leave">
                  {summary.overall.leave}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.bySubject.map((subject) => {
              const subjectPercentage = Number(subject.percentage) || 0;
              return (
                <div key={subject.subjectId} className="space-y-2" data-testid={`subject-summary-${subject.subjectId}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{subject.subjectCode}</div>
                      <div className="text-sm text-muted-foreground">{subject.subjectName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {subjectPercentage.toFixed(1)}%
                        {subjectPercentage < lowAttendanceThreshold && (
                          <TrendingDown className="inline-block ml-1 h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {subject.present}/{subject.total}
                      </div>
                    </div>
                  </div>
                  <Progress value={subjectPercentage} className="h-1" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
