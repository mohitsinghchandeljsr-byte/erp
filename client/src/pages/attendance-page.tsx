import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AttendanceMarkingDialog } from "@/components/attendance-marking-dialog";
import { AttendanceSummaryCard } from "@/components/attendance-summary";
import { CalendarIcon, Download, Filter } from "lucide-react";
import { format, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";

type AttendanceRecord = {
  id: string;
  studentId: string;
  studentName: string;
  studentIdNumber: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  date: string;
  status: "present" | "absent" | "leave";
  markedByName: string;
};

type Student = {
  id: string;
  studentId: string;
  name: string;
};

type Subject = {
  id: string;
  name: string;
  code: string;
};

export default function AttendancePage() {
  const [selectedStudent, setSelectedStudent] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date>(new Date());

  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
  });

  const queryParams = new URLSearchParams();
  if (selectedStudent !== "all") queryParams.append("studentId", selectedStudent);
  if (selectedSubject !== "all") queryParams.append("subjectId", selectedSubject);
  queryParams.append("startDate", startDate.toISOString());
  queryParams.append("endDate", endDate.toISOString());

  const { data: records = [], isLoading } = useQuery<AttendanceRecord[]>({
    queryKey: ["/api/attendance", queryParams.toString()],
    queryFn: async ({ queryKey }) => {
      const [path, params] = queryKey;
      const response = await fetch(`${path}?${params}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch attendance");
      return response.json();
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "outline" | "secondary"> = {
      present: "default",
      absent: "outline",
      leave: "secondary",
    };
    return (
      <Badge variant={variants[status]} data-testid={`badge-status-${status}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6" data-testid="page-attendance">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Attendance</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage student attendance
          </p>
        </div>
        <AttendanceMarkingDialog />
      </div>

      {selectedStudent !== "all" && (
        <AttendanceSummaryCard
          studentId={selectedStudent}
          studentName={students.find(s => s.id === selectedStudent)?.name}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger data-testid="select-filter-student">
                  <SelectValue placeholder="All students" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.studentId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger data-testid="select-filter-subject">
                  <SelectValue placeholder="All subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="button-start-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(d) => d && setStartDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="button-end-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(d) => d && setEndDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Attendance Records</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading attendance records...</div>
          ) : records.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No attendance records found for the selected filters.
            </div>
          ) : (
            <div className="border rounded-md">
              <div className="grid grid-cols-6 gap-4 p-3 bg-muted font-medium text-sm">
                <div>Date</div>
                <div>Student</div>
                <div>ID</div>
                <div>Subject</div>
                <div>Status</div>
                <div>Marked By</div>
              </div>
              <div className="divide-y">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="grid grid-cols-6 gap-4 p-3 items-center"
                    data-testid={`row-attendance-${record.id}`}
                  >
                    <div className="text-sm">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </div>
                    <div className="text-sm">{record.studentName}</div>
                    <div className="text-sm text-muted-foreground">{record.studentIdNumber}</div>
                    <div className="text-sm">
                      {record.subjectCode}
                    </div>
                    <div>{getStatusBadge(record.status)}</div>
                    <div className="text-sm text-muted-foreground">{record.markedByName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
