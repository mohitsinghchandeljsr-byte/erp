import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Upload, Search, Download, Eye } from "lucide-react";
import { useState } from "react";

export default function EBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingBook, setViewingBook] = useState<typeof ebooks[0] | null>(null);

  const ebooks = [
    {
      id: 1,
      title: "Marketing Management - Philip Kotler",
      subject: "Marketing Management",
      author: "Philip Kotler",
      size: "24.5 MB",
      pages: 856,
      uploadedBy: "Dr. Priya Sharma",
      pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 2,
      title: "Financial Accounting - Fundamentals",
      subject: "Financial Accounting",
      author: "Warren & Reeve",
      size: "18.2 MB",
      pages: 642,
      uploadedBy: "Dr. Priya Sharma",
      pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 3,
      title: "Business Analytics - Data Science for Managers",
      subject: "Business Analytics",
      author: "Foster Provost",
      size: "15.8 MB",
      pages: 528,
      uploadedBy: "Dr. Priya Sharma",
      pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 4,
      title: "Organizational Behavior - Essentials",
      subject: "Organizational Behavior",
      author: "Stephen Robbins",
      size: "20.1 MB",
      pages: 712,
      uploadedBy: "Dr. Priya Sharma",
      pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
  ];

  const filteredBooks = ebooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{book.subject}</Badge>
                <span className="text-xs text-muted-foreground">{book.pages} pages</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{book.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Uploaded by {book.uploadedBy}</span>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    data-testid={`button-download-${book.id}`}
                  >
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                src={viewingBook.pdfUrl}
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
