
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, Download, Upload, Clock, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const BackupRecovery = () => {
  const backupHistory = [
    {
      id: 1,
      type: 'Full Backup',
      status: 'completed',
      date: '2024-01-15 02:00:00',
      size: '2.4 GB',
      duration: '45 minutes',
      automatic: true
    },
    {
      id: 2,
      type: 'Database Only',
      status: 'completed',
      date: '2024-01-14 02:00:00',
      size: '850 MB',
      duration: '12 minutes',
      automatic: true
    },
    {
      id: 3,
      type: 'Manual Backup',
      status: 'completed',
      date: '2024-01-13 15:30:00',
      size: '2.1 GB',
      duration: '38 minutes',
      automatic: false
    },
    {
      id: 4,
      type: 'Full Backup',
      status: 'failed',
      date: '2024-01-12 02:00:00',
      size: '0 MB',
      duration: '2 minutes',
      automatic: true
    },
    {
      id: 5,
      type: 'Database Only',
      status: 'completed',
      date: '2024-01-11 02:00:00',
      size: '820 MB',
      duration: '11 minutes',
      automatic: true
    }
  ];

  const recoveryPoints = [
    {
      id: 1,
      name: 'Pre-Migration Backup',
      date: '2024-01-10 10:00:00',
      type: 'Full System',
      size: '2.8 GB',
      verified: true
    },
    {
      id: 2,
      name: 'Monthly Checkpoint',
      date: '2024-01-01 00:00:00',
      type: 'Full System',
      size: '2.5 GB',
      verified: true
    },
    {
      id: 3,
      name: 'Product Launch Backup',
      date: '2023-12-15 18:00:00',
      type: 'Database + Files',
      size: '1.9 GB',
      verified: false
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'running':
        return <Badge variant="secondary">Running</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Backup Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
              <span>Manual Backup</span>
            </CardTitle>
            <CardDescription>Create an immediate backup of your system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backupType">Backup Type</Label>
              <Select defaultValue="full">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full System Backup</SelectItem>
                  <SelectItem value="database">Database Only</SelectItem>
                  <SelectItem value="files">Files Only</SelectItem>
                  <SelectItem value="config">Configuration Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Database className="w-4 h-4 mr-2" />
              Start Manual Backup
            </Button>
            <div className="text-sm text-gray-600">
              Last backup: 2 hours ago (2.4 GB)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Backup Schedule</span>
            </CardTitle>
            <CardDescription>Configure automatic backup settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup">Enable Automatic Backups</Label>
              <Switch id="autoBackup" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Every Hour</SelectItem>
                  <SelectItem value="daily">Daily at 2:00 AM</SelectItem>
                  <SelectItem value="weekly">Weekly (Sundays)</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention">Retention Period</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full">Update Schedule</Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Backup Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Current Backup Status</CardTitle>
          <CardDescription>No backup currently running</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>System Status: Ready</span>
              <span>Next Scheduled: Today at 2:00 AM</span>
            </div>
            <Progress value={0} className="h-2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2.4 GB</div>
                <div className="text-sm text-gray-600">Average Size</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">35 min</div>
                <div className="text-sm text-gray-600">Average Duration</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>Recent backup operations and their status</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Log
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backupHistory.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="font-medium">{backup.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(backup.status)}
                      {getStatusBadge(backup.status)}
                    </div>
                  </TableCell>
                  <TableCell>{backup.date}</TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>{backup.duration}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {backup.automatic ? 'Automatic' : 'Manual'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {backup.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">View Log</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recovery Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Recovery Points</span>
          </CardTitle>
          <CardDescription>Available restore points for system recovery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recoveryPoints.map((point) => (
              <div key={point.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{point.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{point.date}</span>
                      <span>•</span>
                      <span>{point.type}</span>
                      <span>•</span>
                      <span>{point.size}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {point.verified ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-yellow-600">Not Verified</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-3 h-3 mr-1" />
                    Restore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupRecovery;
