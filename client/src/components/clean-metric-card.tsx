import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CleanMetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function CleanMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: CleanMetricCardProps) {
  return (
    <Card className="border shadow-sm hover-elevate" data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground" style={{ fontFamily: "'Fira Code', monospace" }}>
                {title}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 
                  className="text-2xl font-semibold" 
                  data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {value}
                </h3>
                {trend && (
                  <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
