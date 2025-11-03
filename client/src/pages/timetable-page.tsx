import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock } from "lucide-react";

export default function TimetablePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "09:00 - 10:30",
    "10:45 - 12:15",
    "13:00 - 14:30",
    "14:45 - 16:15",
  ];

  const sampleSchedule = {
    Monday: ["Marketing Management", "Financial Accounting", "Lunch Break", "Business Analytics"],
    Tuesday: ["Organizational Behavior", "Operations Management", "Lunch Break", "Marketing Management"],
    Wednesday: ["Financial Accounting", "Business Analytics", "Lunch Break", "Free Period"],
    Thursday: ["Operations Management", "Marketing Management", "Lunch Break", "Organizational Behavior"],
    Friday: ["Business Analytics", "Financial Accounting", "Lunch Break", "Guest Lecture"],
  };

  return (
    <div className="space-y-6" data-testid="page-timetable">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
            <p className="text-muted-foreground mt-1">
              MBA 2024-2026 Batch • Semester 1
            </p>
          </div>
        </div>
        <Button data-testid="button-add-session">
          <Plus className="mr-2 h-4 w-4" />
          Add Session
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-6 gap-2">
                <div className="font-medium text-sm text-muted-foreground p-3"></div>
                {days.map(day => (
                  <div key={day} className="font-medium text-sm p-3 text-center bg-muted rounded-md">
                    {day}
                  </div>
                ))}
              </div>
              {timeSlots.map((slot, idx) => (
                <div key={slot} className="grid grid-cols-6 gap-2 mt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground p-3">
                    <Clock className="h-4 w-4" />
                    {slot}
                  </div>
                  {days.map(day => (
                    <div
                      key={`${day}-${idx}`}
                      className={`p-3 rounded-md border text-sm ${
                        sampleSchedule[day as keyof typeof sampleSchedule][idx] === "Lunch Break"
                          ? "bg-muted/50 text-muted-foreground"
                          : sampleSchedule[day as keyof typeof sampleSchedule][idx] === "Free Period"
                          ? "bg-background"
                          : "bg-primary/5 border-primary/20"
                      }`}
                    >
                      <div className="font-medium">
                        {sampleSchedule[day as keyof typeof sampleSchedule][idx]}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
