import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface Shortcut {
  id: string;
  title: string;
  url: string;
}

interface ShortcutSectionProps {
  title: string;
  shortcuts: Shortcut[];
}

export function ShortcutSection({ title, shortcuts }: ShortcutSectionProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {shortcuts.map((shortcut) => (
            <Link 
              key={shortcut.id} 
              href={shortcut.url}
              className="group"
            >
              <div 
                className="flex items-center justify-between p-3 border rounded-md hover-elevate active-elevate-2 transition-all"
                data-testid={`shortcut-${shortcut.id}`}
              >
                <span className="text-sm font-medium">{shortcut.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
