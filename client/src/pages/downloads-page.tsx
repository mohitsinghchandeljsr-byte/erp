import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Monitor, HardDrive, Wifi, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DownloadsPage() {
  const installerUrl = "public/CARVI(cu)-Setup-1.0.0.msi";
  const installerVersion = "1.0.0";
  const installerSize = "~150-200 MB";

  const handleDownload = () => {
    window.open(`/api/downloads/installer`, '_blank');
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Downloads</h1>
        <p className="text-muted-foreground">
          Download the CARVI(cu) desktop application for Windows 11
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          The desktop application connects to this server and uses the same database. 
          Internet connection is required.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <Monitor className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Windows Desktop App</CardTitle>
                <CardDescription>Native application for Windows 10/11</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Version {installerVersion}</Badge>
              <Badge variant="outline">{installerSize}</Badge>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                <span>Windows 10/11 (64-bit)</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span>Internet connection required</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleDownload}
              data-testid="button-download-installer"
            >
              <Download className="mr-2 h-4 w-4" />
              Download .msi Installer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Installation Instructions</CardTitle>
            <CardDescription>How to install CARVI(cu) on Windows</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">1</span>
                <span>Download the .msi installer file</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">2</span>
                <span>Double-click the downloaded file</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">3</span>
                <span>If Windows SmartScreen appears, click "More info" then "Run anyway"</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">4</span>
                <span>Follow the installation wizard</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">5</span>
                <span>Launch from desktop shortcut or Start Menu</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Minimum Requirements</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Windows 10/11 (64-bit)</li>
                <li>• 4 GB RAM</li>
                <li>• 500 MB disk space</li>
                <li>• Internet connection</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Recommended</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Windows 11 (64-bit)</li>
                <li>• 8 GB RAM</li>
                <li>• 1 GB disk space</li>
                <li>• Broadband internet</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex gap-2">
              <div className="text-primary">✓</div>
              <div className="text-sm">Native Windows application</div>
            </div>
            <div className="flex gap-2">
              <div className="text-primary">✓</div>
              <div className="text-sm">Desktop shortcuts</div>
            </div>
            <div className="flex gap-2">
              <div className="text-primary">✓</div>
              <div className="text-sm">Start Menu integration</div>
            </div>
            <div className="flex gap-2">
              <div className="text-primary">✓</div>
              <div className="text-sm">Professional menu bar</div>
            </div>
            <div className="flex gap-2">
              <div className="text-primary">✓</div>
              <div className="text-sm">Centralized database</div>
            </div>
            <div className="flex gap-2">
              <div className="text-primary">✓</div>
              <div className="text-sm">Automatic updates</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
