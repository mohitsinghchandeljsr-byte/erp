import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { data: settings = {} } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });

  const collegeName = settings.collegeName || "CARVI(cu)";

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(credentials.email, credentials.password);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">
        <Card className="w-full" data-testid="card-login">
          <CardHeader className="space-y-4 text-center" style={{ backgroundColor: '#222021' }}>
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-10 w-10" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl text-white" data-testid="text-college-name">{collegeName}</CardTitle>
              <p className="text-sm text-white/70 mt-2">
                MBA Department ERP System
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6" style={{ backgroundColor: '#222021' }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  data-testid="input-email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  data-testid="input-password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={!credentials.email || !credentials.password || isLoading}
              data-testid="button-login"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>

            <p className="text-xs text-center text-white/70">
              Demo: teacher@gaya.edu / student@gaya.edu, password: password123
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
