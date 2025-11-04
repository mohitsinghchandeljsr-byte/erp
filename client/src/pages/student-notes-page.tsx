import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Search, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function StudentNotesPage() {
  const notes = [
    {
      id: 1,
      title: "Financial Management Chapter 3",
      subject: "Financial Management",
      date: "2024-11-15",
      preview: "Key concepts: Time value of money, NPV calculations, IRR analysis...",
      tags: ["Finance", "Important"],
    },
    {
      id: 2,
      title: "Marketing Strategy Notes",
      subject: "Marketing Strategy",
      date: "2024-11-12",
      preview: "4Ps framework, market segmentation strategies, competitive analysis...",
      tags: ["Marketing"],
    },
    {
      id: 3,
      title: "Operations Management",
      subject: "Operations Management",
      date: "2024-11-10",
      preview: "Supply chain optimization, inventory management, lean principles...",
      tags: ["Operations", "Exam"],
    },
  ];

  return (
    <div className="space-y-6" data-testid="page-student-notes">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
            <p className="text-muted-foreground mt-1">
              Personal study notes and journal
            </p>
          </div>
        </div>
        <Button data-testid="button-create-note">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, subject, or tags..."
              className="pl-9"
              data-testid="input-search-notes"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="hover-elevate" data-testid={`card-note-${note.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-xl">{note.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{note.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" data-testid={`button-edit-${note.id}`}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid={`button-delete-${note.id}`}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{note.preview}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{note.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
