import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { useLocation } from "wouter";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [role, setRole] = useState<"teacher" | "student" | null>(null);

  const handleLogin = () => {
    console.log("Login attempt:", credentials, role);
    if (role === "teacher") {
      setLocation("/teacher");
    } else if (role === "student") {
      setLocation("/student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">
        <Card className="w-full" data-testid="card-login">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-10 w-10" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Gaya College</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                MBA Department ERP System
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={role === "teacher" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setRole("teacher")}
                data-testid="button-select-teacher"
              >
                Teacher
              </Button>
              <Button
                variant={role === "student" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setRole("student")}
                data-testid="button-select-student"
              >
                Student
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username / Student ID</Label>
                <Input
                  id="username"
                  placeholder={role === "student" ? "MBA2024001" : "username"}
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  data-testid="input-username"
                  className={role === "student" ? "font-mono" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  data-testid="input-password"
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={!role || !credentials.username || !credentials.password}
              data-testid="button-login"
            >
              Sign In
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              For demo purposes, select a role and enter any credentials
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
