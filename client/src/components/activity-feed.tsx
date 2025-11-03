import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, ClipboardCheck, Calendar, Upload } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "attendance",
    title: "Attendance Marked",
    description: "MBA Batch 2024-A • 45 students present",
    time: "2 hours ago",
    icon: ClipboardCheck,
    color: "text-blue-600 bg-blue-100",
  },
  {
    id: 2,
    type: "exam",
    title: "Exam Created",
    description: "Marketing Management Mid-Term",
    time: "5 hours ago",
    icon: BookOpen,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: 3,
    type: "event",
    title: "Guest Lecture Scheduled",
    description: "Dr. Sharma • Digital Marketing",
    time: "Yesterday",
    icon: Calendar,
    color: "text-green-600 bg-green-100",
  },
  {
    id: 4,
    type: "ebook",
    title: "E-Book Uploaded",
    description: "Strategic Management.pdf",
    time: "2 days ago",
    icon: Upload,
    color: "text-orange-600 bg-orange-100",
  },
];

export function ActivityFeed() {
  return (
    <Card className="shadow-sm border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 hover-elevate p-2 -m-2 rounded-lg transition-all"
            data-testid={`activity-${activity.type}-${activity.id}`}
          >
            <div className={`rounded-full p-2 ${activity.color} shrink-0`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activity.description}
              </p>
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {activity.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
