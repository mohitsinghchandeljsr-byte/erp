import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
}

interface TimetableViewProps {
  slots: TimetableSlot[];
  batch: string;
}

export function TimetableView({ slots, batch }: TimetableViewProps) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["9:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

  const slotsByDay = slots.reduce((acc, slot) => {
    if (!acc[slot.day]) acc[slot.day] = [];
    acc[slot.day].push(slot);
    return acc;
  }, {} as Record<string, TimetableSlot[]>);

  return (
    <Card data-testid="card-timetable">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Weekly Timetable</CardTitle>
          <Badge variant="secondary">{batch}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day} className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">{day}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {slotsByDay[day]?.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-3 rounded-md border bg-card hover-elevate"
                    data-testid={`slot-${slot.id}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm">{slot.subject}</h4>
                      <Badge variant="outline" className="text-xs">
                        {slot.startTime} - {slot.endTime}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{slot.teacher}</p>
                    <p className="text-xs text-muted-foreground">Room: {slot.room}</p>
                  </div>
                )) || (
                  <p className="text-sm text-muted-foreground italic col-span-full">No classes scheduled</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
