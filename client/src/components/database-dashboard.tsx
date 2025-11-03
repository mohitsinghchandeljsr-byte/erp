import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  Activity,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DatabaseDashboard() {
  // Mock data - will be replaced with real data
  const dbStats = {
    totalTables: 12,
    totalRecords: 3420,
    storageUsed: "245 MB",
    storageLimit: "10 GB",
    lastBackup: "2 hours ago",
    backupStatus: "healthy",
    queryPerformance: 92,
  };

  return (
    <div className="space-y-6" data-testid="database-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tables
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalTables}</div>
            <p className="text-xs text-muted-foreground mt-1">Database tables</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Records
            </CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.totalRecords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all tables</p>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Backup
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.lastBackup}</div>
            <Badge variant="default" className="mt-1">
              {dbStats.backupStatus}
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Performance
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbStats.queryPerformance}%</div>
            <Progress value={dbStats.queryPerformance} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backup & Restore</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Continuous Backup</h4>
              <p className="text-sm text-muted-foreground">
                Automated backups to local PC every hour
              </p>
            </div>
            <Badge variant="default">Active</Badge>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" data-testid="button-backup-now">
              <Download className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
            <Button variant="secondary" className="flex-1" data-testid="button-restore">
              <Upload className="h-4 w-4 mr-2" />
              Restore
            </Button>
            <Button variant="outline" data-testid="button-refresh-status">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used Storage</span>
              <span className="font-medium">{dbStats.storageUsed} of {dbStats.storageLimit}</span>
            </div>
            <Progress value={2.45} />
          </div>

          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-medium">Backup Location</p>
              <p className="text-muted-foreground mt-1">
                C:\GayaCollege\Backups\ERP_Database
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
