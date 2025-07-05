
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Activity, ShoppingCart, DollarSign, Megaphone, Plus, Settings, Eye } from 'lucide-react';

const DepartmentOverview = () => {
  const departments = [
    {
      id: 1,
      name: 'Sales & Products',
      manager: 'Sarah Johnson',
      activeUsers: 8,
      totalActions: 1247,
      status: 'active',
      lastActivity: '2 minutes ago',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Finance & Accounting',
      manager: 'Michael Chen',
      activeUsers: 4,
      totalActions: 892,
      status: 'active',
      lastActivity: '15 minutes ago',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Marketing & Social Media',
      manager: 'Emma Rodriguez',
      activeUsers: 6,
      totalActions: 1456,
      status: 'active',
      lastActivity: '5 minutes ago',
      icon: Megaphone,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Customer Support',
      manager: 'Not Assigned',
      activeUsers: 0,
      totalActions: 0,
      status: 'inactive',
      lastActivity: 'Never',
      icon: Users,
      color: 'bg-gray-400'
    }
  ];

  const availableManagers = [
    { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Manager' },
    { id: 2, name: 'Lisa Brown', email: 'lisa@company.com', role: 'Senior Staff' },
    { id: 3, name: 'David Wilson', email: 'david@company.com', role: 'Manager' },
  ];

  const accessLogs = [
    { user: 'Sarah Johnson', department: 'Sales', action: 'Viewed dashboard', time: '2 minutes ago' },
    { user: 'Emma Rodriguez', department: 'Marketing', action: 'Created campaign', time: '5 minutes ago' },
    { user: 'Michael Chen', department: 'Finance', action: 'Generated report', time: '15 minutes ago' },
    { user: 'Sarah Johnson', department: 'Sales', action: 'Updated product', time: '1 hour ago' },
    { user: 'Emma Rodriguez', department: 'Marketing', action: 'Scheduled post', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg ${dept.color} flex items-center justify-center`}>
                  <dept.icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant={dept.status === 'active' ? 'default' : 'secondary'}>
                  {dept.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{dept.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Manager: {dept.manager}</p>
                <p className="text-sm text-gray-600">Active Users: {dept.activeUsers}</p>
                <p className="text-sm text-gray-600">Actions This Month: {dept.totalActions}</p>
                <p className="text-sm text-gray-600">Last Activity: {dept.lastActivity}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Management Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>Manage departments and assign managers</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Monthly Actions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded ${dept.color} flex items-center justify-center`}>
                        <dept.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{dept.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {dept.manager === 'Not Assigned' ? (
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Assign manager" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableManagers.map((manager) => (
                            <SelectItem key={manager.id} value={manager.id.toString()}>
                              {manager.name} - {manager.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span>{dept.manager}</span>
                    )}
                  </TableCell>
                  <TableCell>{dept.activeUsers}</TableCell>
                  <TableCell>{dept.totalActions.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={dept.status === 'active' ? 'default' : 'secondary'}>
                      {dept.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">View Metrics</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Department Access Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Department Access Logs</span>
          </CardTitle>
          <CardDescription>Recent department access and activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.department}</Badge>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="text-gray-500">{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentOverview;
