import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type SyllabusItem = {
  id: string;
  subjectId: string;
  content: string;
  version: number;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  subjectName: string | null;
  subjectCode: string | null;
  credits: number | null;
};

export default function SyllabusPage() {
  const { data: syllabusItems = [], isLoading } = useQuery<SyllabusItem[]>({
    queryKey: ["/api/syllabus"],
  });

  return (
    <div className="space-y-6" data-testid="page-syllabus">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Course Syllabus</h1>
            <p className="text-muted-foreground mt-1">
              Detailed curriculum and course outlines
            </p>
          </div>
        </div>
        <Button data-testid="button-add-syllabus">
          <Plus className="mr-2 h-4 w-4" />
          Add Syllabus
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading syllabus...</div>
      ) : syllabusItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No syllabus found. Add syllabus for your subjects to get started!
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {syllabusItems.map(syllabus => (
            <Card key={syllabus.id} className="hover-elevate">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3 flex-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <CardTitle className="text-lg">{syllabus.subjectName || "Subject"}</CardTitle>
                        {syllabus.subjectCode && (
                          <Badge variant="secondary">{syllabus.subjectCode}</Badge>
                        )}
                        <Badge variant="outline">v{syllabus.version}</Badge>
                      </div>
                      {syllabus.credits && (
                        <p className="text-sm text-muted-foreground">Credits: {syllabus.credits}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Syllabus Content:</h4>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">{syllabus.content}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
