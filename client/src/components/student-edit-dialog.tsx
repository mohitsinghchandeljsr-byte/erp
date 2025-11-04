import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Upload, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  studentId: string;
  program: string;
  batch: string;
}

interface StudentEditDialogProps {
  student: Student;
}

export function StudentEditDialog({ student }: StudentEditDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: student.name,
    phone: student.phone || "",
    program: student.program,
    batch: student.batch,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        name: student.name,
        phone: student.phone || "",
        program: student.program,
        batch: student.batch,
      });
      setPhotoPreview(student.photoUrl || "");
      setPhotoFile(null);
    }
  }, [open, student]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Photo size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateMutation = useMutation({
    mutationFn: async (data: { name: string; phone?: string; program: string; batch: string; photoUrl?: string }) => {
      let photoUrl = data.photoUrl;

      if (photoFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("path", `public/student-photos/${student.studentId}-${Date.now()}.jpg`);

        try {
          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          if (!uploadResponse.ok) throw new Error("Upload failed");
          const uploadData = await uploadResponse.json();
          photoUrl = uploadData.url;
        } finally {
          setUploading(false);
        }
      }

      const response = await apiRequest("PATCH", `/api/students/${student.id}`, {
        ...data,
        photoUrl,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      toast({
        title: "Success",
        description: "Student profile updated successfully",
      });
      setOpen(false);
      setPhotoFile(null);
      setPhotoPreview("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update student profile",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" data-testid={`button-edit-${student.id}`}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Student Profile</DialogTitle>
          <DialogDescription>
            Update student information and ID card photo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              {photoPreview || student.photoUrl ? (
                <AvatarImage src={photoPreview || student.photoUrl} />
              ) : (
                <AvatarFallback className="text-2xl">
                  {student.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex gap-2">
              <Label htmlFor="photo-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover-elevate">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Upload Photo</span>
                </div>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                  data-testid="input-photo-upload"
                />
              </Label>
            </div>
            {photoFile && (
              <p className="text-xs text-muted-foreground">
                {photoFile.name} ({(photoFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
              data-testid="input-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Input
              id="program"
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              placeholder="Enter program"
              required
              data-testid="input-program"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Input
              id="batch"
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
              placeholder="Enter batch"
              required
              data-testid="input-batch"
            />
          </div>

          <div className="space-y-2">
            <Label>Email (read-only)</Label>
            <Input value={student.email} disabled />
          </div>

          <div className="space-y-2">
            <Label>Student ID (read-only)</Label>
            <Input value={student.studentId} disabled />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending || uploading}
              data-testid="button-save-profile"
            >
              {(updateMutation.isPending || uploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {uploading ? "Uploading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
