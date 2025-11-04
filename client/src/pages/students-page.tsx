import { StudentTable } from "@/components/student-table";
import { StudentCreateDialog } from "@/components/student-create-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter } from "lucide-react";
import { useState, useMemo, useCallback } from "react";

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  batch: string;
  program: string;
  status: "active" | "archived";
}

export default function StudentsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState("all");
  
  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const archiveMutation = useMutation({
    mutationFn: async (studentId: string) => {
      await apiRequest("DELETE", `/api/students/${studentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      toast({
        title: "Success",
        description: "Student archived successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to archive student",
        variant: "destructive",
      });
    },
  });

  const handleArchive = useCallback((student: Student) => {
    if (confirm(`Are you sure you want to archive ${student.name}?`)) {
      archiveMutation.mutate(student.id);
    }
  }, [archiveMutation]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBatch = batchFilter === "all" || student.batch === batchFilter;
      return matchesSearch && matchesBatch;
    });
  }, [students, searchQuery, batchFilter]);

  const batches = useMemo(() => Array.from(new Set(students.map(s => s.batch))), [students]);

  return (
    <div className="space-y-6" data-testid="page-students">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground mt-1">
            Manage student records and enrollments
          </p>
        </div>
        <StudentCreateDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-students"
              />
            </div>
            <Select value={batchFilter} onValueChange={setBatchFilter}>
              <SelectTrigger data-testid="select-batch-filter">
                <SelectValue placeholder="All batches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map(batch => (
                  <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Student List ({filteredStudents.length} students)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading students...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No students found matching your criteria.
            </div>
          ) : (
            <StudentTable
              students={filteredStudents}
              onArchive={handleArchive}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
