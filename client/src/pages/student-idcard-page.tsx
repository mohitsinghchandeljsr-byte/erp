import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

export default function StudentIDCardPage() {
  const { user } = useAuth();
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  const { data: studentData } = useQuery<any>({
    queryKey: ["/api/students", user?.id],
    queryFn: async () => {
      const students = await fetch("/api/students", { credentials: "include" }).then(r => r.json());
      const student = students.find((s: any) => s.email === user?.email);
      return student;
    },
    enabled: !!user,
  });

  const { data: settings = {} } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });

  const collegeName = settings.collegeName || "Gaya College";

  useEffect(() => {
    if (qrCanvasRef.current && user) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        `STUDENT_ID:${user.studentId}`,
        { width: 128, margin: 1 },
        (error) => {
          if (error) console.error('QR Code generation error:', error);
        }
      );
    }
  }, [user]);

  return (
    <div className="space-y-6" data-testid="page-student-idcard">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student ID Card</h1>
            <p className="text-muted-foreground mt-1">
              Your digital student identification
            </p>
          </div>
        </div>
        <Button data-testid="button-download-id">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-2">
          <CardHeader className="pb-4 bg-primary text-primary-foreground">
            <CardTitle className="text-center text-xl">
              {collegeName} MBA Department
            </CardTitle>
            <p className="text-center text-sm opacity-90">Student Identification Card</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    {studentData?.photoUrl ? (
                      <AvatarImage src={studentData.photoUrl} />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        {user?.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold" data-testid="text-student-name">{studentData?.name || user?.name}</h2>
                    <p className="text-muted-foreground">MBA Student</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="font-semibold" data-testid="text-student-id">{user?.studentId || "MBA2024001"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-sm" data-testid="text-student-email">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Program</p>
                    <p className="font-semibold">MBA</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batch</p>
                    <p className="font-semibold">2024-2026</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Enrollment Date</p>
                    <p className="font-semibold">August 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valid Until</p>
                    <p className="font-semibold">July 2026</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l pl-6">
                <canvas ref={qrCanvasRef} data-testid="qr-code" />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Scan for verification
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground text-center">
                This card is the property of Gaya College. If found, please return to the administration office.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
