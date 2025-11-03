import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, User } from "lucide-react";
import { useState } from "react";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

interface IDCardData {
  name: string;
  studentId: string;
  batch: string;
  program: string;
}

export function IDCardGenerator() {
  const [formData, setFormData] = useState<IDCardData>({
    name: "",
    studentId: "",
    batch: "",
    program: "MBA",
  });
  const [qrCode, setQrCode] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (formData.studentId) {
      QRCode.toDataURL(formData.studentId, { width: 80 }).then(setQrCode);
    }
  }, [formData.studentId]);

  const handleInputChange = (field: keyof IDCardData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card data-testid="card-id-form">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              data-testid="input-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              placeholder="MBA2024001"
              value={formData.studentId}
              onChange={(e) => handleInputChange("studentId", e.target.value)}
              data-testid="input-student-id"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch">Batch</Label>
            <Input
              id="batch"
              placeholder="2024-2026"
              value={formData.batch}
              onChange={(e) => handleInputChange("batch", e.target.value)}
              data-testid="input-batch"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Input
              id="program"
              value={formData.program}
              onChange={(e) => handleInputChange("program", e.target.value)}
              data-testid="input-program"
            />
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-id-preview">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>ID Card Preview</CardTitle>
            <Button
              onClick={handlePrint}
              size="sm"
              disabled={!formData.name || !formData.studentId}
              data-testid="button-print-id"
            >
              <Download className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-[3.5/2] max-w-sm mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border-2 border-primary p-6 relative">
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex items-start gap-4 h-full">
              <Avatar className="h-24 w-24 border-2 border-background">
                <AvatarFallback className="text-2xl font-semibold">
                  {formData.name
                    ? formData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : <User className="h-12 w-12" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight">
                    {formData.name || "Student Name"}
                  </h3>
                  <p className="text-sm font-mono font-semibold text-primary">
                    {formData.studentId || "Student ID"}
                  </p>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>{formData.program}</p>
                  <p>{formData.batch || "Batch"}</p>
                </div>
              </div>
              {qrCode && (
                <div className="absolute bottom-4 right-4">
                  <img src={qrCode} alt="QR Code" className="w-16 h-16" />
                </div>
              )}
            </div>
            <div className="absolute bottom-2 left-6 text-xs font-semibold text-primary">
              Gaya College MBA
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
