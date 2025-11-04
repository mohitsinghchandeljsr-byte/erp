import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Download, FileText } from "lucide-react";

export default function SyllabusPage() {
  const syllabusItems = [
    {
      id: 1,
      subject: "Marketing Management",
      code: "MBA-MM-101",
      semester: "Semester 1",
      credits: 4,
      topics: [
        "Introduction to Marketing",
        "Consumer Behavior",
        "Marketing Research",
        "Product & Brand Management",
        "Pricing Strategies",
        "Marketing Communications"
      ],
      books: [
        "Marketing Management - Philip Kotler",
        "Principles of Marketing - Kotler & Armstrong"
      ],
      downloadUrl: "#",
    },
    {
      id: 2,
      subject: "Financial Accounting",
      code: "MBA-FA-102",
      semester: "Semester 1",
      credits: 4,
      topics: [
        "Accounting Principles",
        "Financial Statements",
        "Journal & Ledger",
        "Trial Balance",
        "Final Accounts",
        "Cash Flow Analysis"
      ],
      books: [
        "Financial Accounting - Warren & Reeve",
        "Accounting Principles - Weygandt"
      ],
      downloadUrl: "#",
    },
    {
      id: 3,
      subject: "Business Analytics",
      code: "MBA-BA-103",
      semester: "Semester 1",
      credits: 3,
      topics: [
        "Data Analytics Fundamentals",
        "Statistical Methods",
        "Data Visualization",
        "Predictive Modeling",
        "Business Intelligence",
        "Big Data Applications"
      ],
      books: [
        "Business Analytics - Evans",
        "Data Science for Business - Provost & Fawcett"
      ],
      downloadUrl: "#",
    },
    {
      id: 4,
      subject: "Organizational Behavior",
      code: "MBA-OB-104",
      semester: "Semester 1",
      credits: 3,
      topics: [
        "Individual Behavior",
        "Motivation Theories",
        "Leadership Styles",
        "Team Dynamics",
        "Organizational Culture",
        "Change Management"
      ],
      books: [
        "Organizational Behavior - Robbins",
        "Managing People - Luthans"
      ],
      downloadUrl: "#",
    },
  ];

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
                      <CardTitle className="text-lg">{syllabus.subject}</CardTitle>
                      <Badge variant="secondary">{syllabus.code}</Badge>
                      <Badge variant="outline">{syllabus.semester}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Credits: {syllabus.credits}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" data-testid={`button-download-${syllabus.id}`}>
                  <Download className="mr-2 h-3 w-3" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Topics Covered:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {syllabus.topics.map((topic, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">Recommended Books:</h4>
                <div className="space-y-1">
                  {syllabus.books.map((book, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span className="text-muted-foreground">{book}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
