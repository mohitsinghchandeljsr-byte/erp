import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2, Archive } from "lucide-react";
import { useState } from "react";

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  batch: string;
  program: string;
  status: "active" | "archived";
  photoUrl?: string;
}

interface StudentTableProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete?: (student: Student) => void;
  onArchive?: (student: Student) => void;
}

export function StudentTable({ students, onEdit, onDelete, onArchive }: StudentTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} data-testid={`row-student-${student.id}`}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedRows.has(student.id)}
                  onChange={(e) => {
                    const newSet = new Set(selectedRows);
                    if (e.target.checked) {
                      newSet.add(student.id);
                    } else {
                      newSet.delete(student.id);
                    }
                    setSelectedRows(newSet);
                  }}
                  className="rounded"
                  data-testid={`checkbox-student-${student.id}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={student.photoUrl} />
                    <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium" data-testid={`text-student-name-${student.id}`}>{student.name}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm" data-testid={`text-student-id-${student.id}`}>{student.studentId}</TableCell>
              <TableCell className="text-muted-foreground">{student.email}</TableCell>
              <TableCell>{student.batch}</TableCell>
              <TableCell>{student.program}</TableCell>
              <TableCell>
                <Badge
                  variant={student.status === "active" ? "default" : "secondary"}
                  data-testid={`badge-status-${student.id}`}
                >
                  {student.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(student)}
                    data-testid={`button-edit-${student.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onArchive?.(student)}
                    data-testid={`button-archive-${student.id}`}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete?.(student)}
                    data-testid={`button-delete-${student.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
