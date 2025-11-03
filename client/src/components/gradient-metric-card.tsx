import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientMetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  gradient: string;
  className?: string;
}

export function GradientMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  gradient,
  className,
}: GradientMetricCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden border-0 shadow-lg hover-elevate",
        gradient,
        className
      )} 
      data-testid={`card-gradient-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-white/90">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 
                className="text-4xl font-bold text-white" 
                data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {value}
              </h3>
              {trend && (
                <span className="text-sm font-semibold text-white/90">
                  {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-white/80">{subtitle}</p>
            )}
          </div>
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
      <div className="absolute -right-6 -bottom-6 opacity-10">
        <Icon className="h-32 w-32 text-white" />
      </div>
    </Card>
  );
}
