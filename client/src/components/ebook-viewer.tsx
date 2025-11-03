import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Eye, Lock } from "lucide-react";

export interface EBook {
  id: string;
  title: string;
  subject: string;
  author: string;
  uploadedBy: string;
  fileSize: string;
  isPublic: boolean;
}

interface EBookListProps {
  books: EBook[];
  onView?: (book: EBook) => void;
  onDownload?: (book: EBook) => void;
}

export function EBookList({ books, onView, onDownload }: EBookListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="ebook-list">
      {books.map((book) => (
        <Card key={book.id} className="hover-elevate" data-testid={`card-ebook-${book.id}`}>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base line-clamp-2">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{book.subject}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium">Author:</span> {book.author}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Size:</span> {book.fileSize}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={book.isPublic ? "default" : "secondary"}>
                {book.isPublic ? (
                  <Eye className="h-3 w-3 mr-1" />
                ) : (
                  <Lock className="h-3 w-3 mr-1" />
                )}
                {book.isPublic ? "Public" : "Protected"}
              </Badge>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => onView?.(book)}
                data-testid={`button-view-${book.id}`}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              {book.isPublic && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload?.(book)}
                  data-testid={`button-download-${book.id}`}
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
