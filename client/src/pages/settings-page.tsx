import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Settings, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [collegeName, setCollegeName] = useState("");

  const { data: settings = {}, isLoading } = useQuery<Record<string, string>>({
    queryKey: ["/api/settings"],
  });

  useEffect(() => {
    if (settings.collegeName) {
      setCollegeName(settings.collegeName);
    } else {
      setCollegeName("CARVI(cu)");
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (data: { key: string; value: string }) => {
      const response = await apiRequest("PUT", `/api/settings/${data.key}`, { value: data.value });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update settings",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ key: "collegeName", value: collegeName });
  };

  return (
    <div className="space-y-6" data-testid="page-settings">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure system settings and preferences
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>
            Update general system configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading settings...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="Enter college name"
                  required
                  data-testid="input-college-name"
                />
                <p className="text-sm text-muted-foreground">
                  This name will appear in the sidebar, ID cards, and other documents
                </p>
              </div>

              <Button
                type="submit"
                disabled={updateMutation.isPending}
                data-testid="button-save-settings"
              >
                {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
