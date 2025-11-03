import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, CheckCircle2, XCircle, Ban } from "lucide-react";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Student = {
  id: string;
  studentId: string;
  name: string;
  email: string;
};

type Subject = {
  id: string;
  name: string;
  code: string;
};

export function AttendanceMarkingDialog() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [subjectId, setSubjectId] = useState<string>("");
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "leave">>({});
  const { toast } = useToast();

  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ["/api/students"],
    enabled: open,
  });

  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
    enabled: open,
  });

  const markAttendanceMutation = useMutation({
    mutationFn: async () => {
      const records = Object.entries(attendance).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      const response = await apiRequest("POST", "/api/attendance/bulk", {
        subjectId,
        date: date.toISOString(),
        records,
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/attendance"] });
      // Invalidate summaries for all affected students
      data.records?.forEach((record: any) => {
        queryClient.invalidateQueries({ queryKey: ["/api/attendance/summary", record.studentId] });
      });
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      });
      setOpen(false);
      setAttendance({});
      setSubjectId("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark attendance",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!subjectId) {
      toast({
        title: "Error",
        description: "Please select a subject",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(attendance).length === 0) {
      toast({
        title: "Error",
        description: "Please mark attendance for at least one student",
        variant: "destructive",
      });
      return;
    }

    markAttendanceMutation.mutate();
  };

  const markAll = (status: "present" | "absent" | "leave") => {
    const allAttendance: Record<string, "present" | "absent" | "leave"> = {};
    students.forEach(student => {
      allAttendance[student.id] = status;
    });
    setAttendance(allAttendance);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start" data-testid="button-mark-attendance">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Mark Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            Select date and subject, then mark attendance for each student
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="button-select-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subjectId} onValueChange={setSubjectId}>
                <SelectTrigger data-testid="select-subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => markAll("present")}
              data-testid="button-mark-all-present"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark All Present
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => markAll("absent")}
              data-testid="button-mark-all-absent"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Mark All Absent
            </Button>
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-4 gap-2 p-3 bg-muted font-medium text-sm">
              <div className="col-span-2">Student</div>
              <div>ID</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              {students.map((student) => (
                <div key={student.id} className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="col-span-2" data-testid={`text-student-name-${student.id}`}>
                    {student.name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-student-id-${student.id}`}>
                    {student.studentId}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant={attendance[student.id] === "present" ? "default" : "outline"}
                      onClick={() => setAttendance(prev => ({ ...prev, [student.id]: "present" }))}
                      data-testid={`button-present-${student.id}`}
                      className="h-8 w-8"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant={attendance[student.id] === "absent" ? "default" : "outline"}
                      onClick={() => setAttendance(prev => ({ ...prev, [student.id]: "absent" }))}
                      data-testid={`button-absent-${student.id}`}
                      className="h-8 w-8"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant={attendance[student.id] === "leave" ? "default" : "outline"}
                      onClick={() => setAttendance(prev => ({ ...prev, [student.id]: "leave" }))}
                      data-testid={`button-leave-${student.id}`}
                      className="h-8 w-8"
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="button-cancel-attendance"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={markAttendanceMutation.isPending}
              data-testid="button-submit-attendance"
            >
              {markAttendanceMutation.isPending ? "Submitting..." : "Submit Attendance"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
