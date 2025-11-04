import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Upload, Search, Eye } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type Ebook = {
  id: string;
  title: string;
  subjectId: string | null;
  author: string | null;
  fileUrl: string;
  fileSize: string | null;
  accessPolicy: string;
  uploadedBy: string;
  createdAt: string;
  subjectName: string | null;
  subjectCode: string | null;
};

export default function EBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingBook, setViewingBook] = useState<Ebook | null>(null);

  const { data: ebooks = [], isLoading } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
  });

  const filteredBooks = ebooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (book.subjectName && book.subjectName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6" data-testid="page-ebooks">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">E-Books Library</h1>
            <p className="text-muted-foreground mt-1">
              Access course materials and reference books
            </p>
          </div>
        </div>
        <Button data-testid="button-upload-ebook">
          <Upload className="mr-2 h-4 w-4" />
          Upload E-Book
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-ebooks"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading e-books...</div>
      ) : filteredBooks.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            {ebooks.length === 0 ? "No e-books found. Upload your first e-book to get started!" : "No e-books match your search."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBooks.map(book => (
            <Card key={book.id} className="hover-elevate">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base line-clamp-2">{book.title}</CardTitle>
                      {book.author && <p className="text-sm text-muted-foreground">{book.author}</p>}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {book.subjectName && <Badge variant="secondary">{book.subjectName}</Badge>}
                  {book.fileSize && <span className="text-xs text-muted-foreground">{book.fileSize}</span>}
                  <Badge variant="outline">{book.accessPolicy === "public" ? "Public" : "Protected"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setViewingBook(book)}
                      data-testid={`button-view-${book.id}`}
                    >
                      <Eye className="mr-2 h-3 w-3" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!viewingBook} onOpenChange={() => setViewingBook(null)}>
        <DialogContent className="max-w-5xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {viewingBook?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden rounded-lg border">
            {viewingBook && (
              <iframe
                src={viewingBook.fileUrl}
                className="w-full h-full"
                title={viewingBook.title}
                style={{ minHeight: "calc(90vh - 120px)" }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
