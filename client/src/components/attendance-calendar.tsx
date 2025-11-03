import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";

export interface AttendanceRecord {
  date: string;
  status: "present" | "absent" | "leave";
}

interface AttendanceCalendarProps {
  month: Date;
  records: AttendanceRecord[];
  percentage: number;
}

export function AttendanceCalendar({ month, records, percentage }: AttendanceCalendarProps) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const recordsMap = new Map(
    records.map((r) => [r.date, r.status])
  );

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-muted";
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "leave":
        return "bg-yellow-500";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card data-testid="card-attendance-calendar">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{format(month, "MMMM yyyy")}</CardTitle>
          <Badge variant={percentage >= 75 ? "default" : "destructive"} data-testid="badge-attendance-percentage">
            {percentage}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground p-2"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const status = recordsMap.get(dateStr);
            return (
              <div
                key={day.toString()}
                className={cn(
                  "aspect-square rounded-md flex items-center justify-center text-sm relative",
                  !isSameMonth(day, month) && "opacity-30",
                  isToday(day) && "ring-2 ring-primary"
                )}
                data-testid={`day-${dateStr}`}
              >
                <div
                  className={cn(
                    "absolute inset-0 rounded-md",
                    getStatusColor(status),
                    status && "opacity-20"
                  )}
                />
                <span className="relative z-10">{format(day, "d")}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Present</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Absent</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Leave</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
