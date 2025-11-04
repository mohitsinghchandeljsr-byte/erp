import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2, Circle } from "lucide-react";

interface WelcomeCardProps {
  title: string;
  description: string;
  items?: Array<{
    id: string;
    label: string;
    completed: boolean;
  }>;
  onDismiss?: () => void;
}

export function WelcomeCard({ title, description, items = [], onDismiss }: WelcomeCardProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <Card className="border shadow-sm" data-testid="card-welcome">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm mt-1">{description}</CardDescription>
        </div>
        {onDismiss && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDismiss}
            className="h-8 w-8 -mt-1 -mr-2"
            data-testid="button-dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      {items.length > 0 && (
        <CardContent className="space-y-3">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-3 text-sm"
              data-testid={`checklist-item-${item.id}`}
            >
              {item.completed ? (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className={item.completed ? "text-muted-foreground" : "text-foreground"}>
                {item.label}
              </span>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
