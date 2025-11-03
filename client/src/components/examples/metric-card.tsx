import { MetricCard } from "../metric-card";
import { Users, ClipboardCheck, BookOpen, TrendingUp } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="p-8 space-y-6 bg-background">
      <h2 className="text-2xl font-semibold">Metric Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Students"
          value="246"
          subtitle="Active enrollments"
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        <MetricCard
          title="Attendance Rate"
          value="87.5%"
          subtitle="This month"
          icon={ClipboardCheck}
          trend={{ value: 3, positive: true }}
        />
        <MetricCard
          title="E-Books"
          value="42"
          subtitle="Available resources"
          icon={BookOpen}
        />
        <MetricCard
          title="Average Marks"
          value="78.2"
          subtitle="Overall performance"
          icon={TrendingUp}
          trend={{ value: 5, positive: false }}
        />
      </div>
    </div>
  );
}
