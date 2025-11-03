import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimetableEventDialog } from "@/components/timetable-event-dialog";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";

interface Session {
  title: string;
  type: "regular" | "lunch" | "free" | "special";
  location?: string;
}

export default function TimetablePage() {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "09:00 - 10:30",
    "10:45 - 12:15",
    "13:00 - 14:30",
    "14:45 - 16:15",
  ];

  const sampleSchedule: Record<string, Session[]> = {
    Monday: [
      { title: "Marketing Management", type: "regular", location: "Room 101" },
      { title: "Financial Accounting", type: "regular", location: "Room 102" },
      { title: "Lunch Break", type: "lunch" },
      { title: "Business Analytics", type: "regular", location: "Lab 1" }
    ],
    Tuesday: [
      { title: "Organizational Behavior", type: "regular", location: "Room 103" },
      { title: "Operations Management", type: "regular", location: "Room 101" },
      { title: "Lunch Break", type: "lunch" },
      { title: "Marketing Management", type: "regular", location: "Room 102" }
    ],
    Wednesday: [
      { title: "Financial Accounting", type: "regular", location: "Room 102" },
      { title: "Business Analytics", type: "regular", location: "Lab 1" },
      { title: "Lunch Break", type: "lunch" },
      { title: "Free Period", type: "free" }
    ],
    Thursday: [
      { title: "Operations Management", type: "regular", location: "Room 101" },
      { title: "Marketing Management", type: "regular", location: "Room 102" },
      { title: "Lunch Break", type: "lunch" },
      { title: "Organizational Behavior", type: "regular", location: "Room 103" }
    ],
    Friday: [
      { title: "Business Analytics", type: "regular", location: "Lab 1" },
      { title: "Financial Accounting", type: "regular", location: "Room 102" },
      { title: "Lunch Break", type: "lunch" },
      { title: "Guest Lecture: AI in Business", type: "special", location: "Auditorium" }
    ],
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case "regular":
        return "bg-green-50 border-green-200 hover:bg-green-100 text-green-900";
      case "lunch":
        return "bg-muted/50 border-muted text-muted-foreground";
      case "free":
        return "bg-background border-border hover:bg-muted/30";
      case "special":
        return "bg-emerald-100 border-emerald-300 hover:bg-emerald-200 text-emerald-900";
      default:
        return "bg-green-50 border-green-200";
    }
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
        <TimetableEventDialog />
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
          <span className="text-sm text-muted-foreground">Regular Class</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300"></div>
          <span className="text-sm text-muted-foreground">Special Event</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted/50 border border-muted"></div>
          <span className="text-sm text-muted-foreground">Break</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-background border border-border"></div>
          <span className="text-sm text-muted-foreground">Free Period</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-6 gap-3">
                <div className="font-medium text-sm text-muted-foreground p-3"></div>
                {days.map(day => (
                  <div key={day} className="font-medium text-sm p-3 text-center bg-green-50 border border-green-100 rounded-md text-green-900">
                    {day}
                  </div>
                ))}
              </div>
              {timeSlots.map((slot, idx) => (
                <div key={slot} className="grid grid-cols-6 gap-3 mt-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/30 rounded-md">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{slot}</span>
                  </div>
                  {days.map(day => {
                    const session = sampleSchedule[day][idx];
                    return (
                      <button
                        key={`${day}-${idx}`}
                        onClick={() => setSelectedSlot({ day, time: slot })}
                        className={`p-3 rounded-md border text-sm transition-all cursor-pointer text-left hover-elevate active-elevate-2 ${getSessionColor(session.type)}`}
                        data-testid={`slot-${day}-${idx}`}
                      >
                        <div className="space-y-1">
                          <div className="font-medium text-sm">
                            {session.title}
                          </div>
                          {session.location && session.type !== "lunch" && session.type !== "free" && (
                            <div className="flex items-center gap-1 text-xs opacity-70">
                              <MapPin className="h-3 w-3" />
                              {session.location}
                            </div>
                          )}
                          {session.type === "special" && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              Special
                            </Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedSlot && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Selected Slot</p>
                <p className="font-medium">{selectedSlot.day} • {selectedSlot.time}</p>
              </div>
              <TimetableEventDialog />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
