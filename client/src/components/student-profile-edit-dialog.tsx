import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Upload, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface StudentData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
}

export function StudentProfileEditDialog() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const { data: studentData } = useQuery<StudentData>({
    queryKey: ["/api/students", user?.id],
    queryFn: async () => {
      const students = await fetch("/api/students", { credentials: "include" }).then(r => r.json());
      const student = students.find((s: any) => s.email === user?.email);
      return student;
    },
    enabled: !!user && open,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

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
    mutationFn: async (data: { name: string; phone?: string; photoUrl?: string }) => {
      let photoUrl = data.photoUrl;

      if (photoFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("path", `public/student-photos/${user?.studentId || Date.now()}.jpg`);

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

      const response = await apiRequest("PATCH", `/api/students/${studentData?.id}`, {
        ...data,
        photoUrl,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setOpen(false);
      setPhotoFile(null);
      setPhotoPreview("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && studentData) {
      setFormData({
        name: studentData.name || "",
        phone: studentData.phone || "",
      });
      setPhotoPreview(studentData.photoUrl || "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid="button-edit-profile">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and photo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              {photoPreview || studentData?.photoUrl ? (
                <AvatarImage src={photoPreview || studentData?.photoUrl} />
              ) : (
                <AvatarFallback className="text-2xl">
                  {user?.name.split(" ").map(n => n[0]).join("").toUpperCase()}
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
              placeholder="Enter your full name"
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
              placeholder="Enter your phone number"
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2">
            <Label>Email (read-only)</Label>
            <Input value={user?.email || ""} disabled />
          </div>

          <div className="space-y-2">
            <Label>Student ID (read-only)</Label>
            <Input value={user?.studentId || ""} disabled />
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
