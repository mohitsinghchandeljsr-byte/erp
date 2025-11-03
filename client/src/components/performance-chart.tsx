import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", attendance: 85, marks: 72 },
  { month: "Feb", attendance: 88, marks: 75 },
  { month: "Mar", attendance: 82, marks: 78 },
  { month: "Apr", attendance: 87, marks: 80 },
  { month: "May", attendance: 90, marks: 82 },
  { month: "Jun", attendance: 87, marks: 78 },
];

export function PerformanceChart() {
  return (
    <Card className="shadow-sm border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 56%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(142, 76%, 56%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="hsl(142, 76%, 36%)"
              fillOpacity={1}
              fill="url(#colorAttendance)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="marks"
              stroke="hsl(142, 76%, 56%)"
              fillOpacity={1}
              fill="url(#colorMarks)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(142,76%,36%)]"></div>
            <span className="text-xs text-muted-foreground">Attendance %</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(142,76%,56%)]"></div>
            <span className="text-xs text-muted-foreground">Average Marks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
