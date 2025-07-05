
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, Download, Search, Filter, Eye, MapPin, Monitor } from 'lucide-react';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const auditLogs = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'Product Updated',
      details: 'Updated pricing for "Eco-Friendly Water Bottle"',
      department: 'Sales',
      timestamp: '2024-01-15 14:30:22',
      ip: '192.168.1.100',
      device: 'Desktop - Chrome',
      location: 'New York, US'
    },
    {
      id: 2,
      user: 'Michael Chen',
      action: 'Invoice Generated',
      details: 'Generated invoice #INV-2024-001 for ₹1,249.50',
      department: 'Finance',
      timestamp: '2024-01-15 14:15:10',
      ip: '192.168.1.105',
      device: 'Mobile - Safari',
      location: 'San Francisco, US'
    },
    {
      id: 3,
      user: 'Emma Rodriguez',
      action: 'Campaign Created',
      details: 'Created email campaign "Spring Collection Launch"',
      department: 'Marketing',
      timestamp: '2024-01-15 13:45:33',
      ip: '192.168.1.110',
      device: 'Desktop - Firefox',
      location: 'Los Angeles, US'
    },
    {
      id: 4,
      user: 'John Admin',
      action: 'User Role Changed',
      details: 'Assigned "Marketing Manager" role to Lisa Brown',
      department: 'Admin',
      timestamp: '2024-01-15 12:20:45',
      ip: '192.168.1.90',
      device: 'Desktop - Chrome',
      location: 'Chicago, US'
    },
    {
      id: 5,
      user: 'System',
      action: 'Backup Completed',
      details: 'Automated daily backup completed successfully',
      department: 'System',
      timestamp: '2024-01-15 02:00:00',
      ip: 'Internal',
      device: 'Server',
      location: 'Data Center'
    }
  ];

  const loginAttempts = [
    {
      id: 1,
      user: 'sarah.johnson@company.com',
      status: 'Success',
      ip: '192.168.1.100',
      device: 'Desktop - Chrome',
      location: 'New York, US',
      timestamp: '2024-01-15 09:15:20'
    },
    {
      id: 2,
      user: 'unknown.user@gmail.com',
      status: 'Failed',
      ip: '185.220.101.25',
      device: 'Mobile - Unknown',
      location: 'Unknown',
      timestamp: '2024-01-15 08:45:12'
    },
    {
      id: 3,
      user: 'michael.chen@company.com',
      status: 'Success',
      ip: '192.168.1.105',
      device: 'Mobile - Safari',
      location: 'San Francisco, US',
      timestamp: '2024-01-15 08:30:45'
    }
  ];

  const getDepartmentBadgeColor = (department) => {
    switch (department.toLowerCase()) {
      case 'sales':
        return 'bg-blue-100 text-blue-800';
      case 'finance':
        return 'bg-green-100 text-green-800';
      case 'marketing':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = auditLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Audit Log Filters</span>
          </CardTitle>
          <CardDescription>Filter and search audit logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="login">Login</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>System Activity Logs</span>
          </CardTitle>
          <CardDescription>Track all system changes and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                  <TableCell>
                    <Badge className={getDepartmentBadgeColor(log.department)}>
                      {log.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{log.timestamp}</TableCell>
                  <TableCell className="text-sm">{log.ip}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Login & Device Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>Login & Device Logs</span>
          </CardTitle>
          <CardDescription>Monitor login attempts and device usage</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginAttempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell className="font-medium">{attempt.user}</TableCell>
                  <TableCell>
                    <Badge variant={attempt.status === 'Success' ? 'default' : 'destructive'}>
                      {attempt.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{attempt.ip}</TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <span>{attempt.device}</span>
                  </TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{attempt.location}</span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{attempt.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
