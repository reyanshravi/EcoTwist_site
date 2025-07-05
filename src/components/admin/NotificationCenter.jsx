
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, AlertTriangle, Info, CheckCircle, X, Filter, Settings } from 'lucide-react';

const NotificationCenter = () => {
  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Payment Gateway Error',
      message: 'Stripe webhook verification failed for 3 transactions',
      source: 'finance',
      time: '2 minutes ago',
      action: 'Verify Webhook',
      resolved: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Stock Alert',
      message: '5 products are running low on stock',
      source: 'sales',
      time: '15 minutes ago',
      action: 'Manage Inventory',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New User Registration',
      message: '12 new users registered in the last hour',
      source: 'system',
      time: '1 hour ago',
      action: 'View Users',
      resolved: false
    },
    {
      id: 4,
      type: 'critical',
      title: 'Server Performance Issue',
      message: 'API response time increased by 300%',
      source: 'system',
      time: '2 hours ago',
      action: 'Check Logs',
      resolved: false
    },
    {
      id: 5,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully',
      source: 'system',
      time: '3 hours ago',
      action: null,
      resolved: true
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeBadgeVariant = (type) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
        return 'secondary';
      case 'success':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const alertTypes = [
    { value: 'all', label: 'All Notifications' },
    { value: 'critical', label: 'Critical', count: 2 },
    { value: 'warning', label: 'Warnings', count: 1 },
    { value: 'info', label: 'Info', count: 1 },
    { value: 'success', label: 'Success', count: 1 }
  ];

  const notificationSettings = [
    { name: 'Email Notifications', enabled: true, description: 'Receive notifications via email' },
    { name: 'Push Notifications', enabled: true, description: 'Browser push notifications' },
    { name: 'SMS Alerts (Critical)', enabled: false, description: 'SMS for critical issues only' },
    { name: 'Slack Integration', enabled: true, description: 'Send alerts to Slack channel' },
    { name: 'Auto-resolve Minor Issues', enabled: false, description: 'Automatically resolve low-priority alerts' }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Notification Filters</span>
          </CardTitle>
          <CardDescription>Filter notifications by type and source</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {alertTypes.map((type) => (
              <Button
                key={type.value}
                variant={type.value === 'all' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <span>{type.label}</span>
                {type.count && (
                  <Badge variant="secondary" className="ml-1">
                    {type.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Active Notifications</span>
              </CardTitle>
              <CardDescription>Platform-wide alerts and notifications</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Mark All Read</Button>
              <Button variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${notification.resolved ? 'bg-gray-50 opacity-75' : 'bg-white'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <Badge variant={getTypeBadgeVariant(notification.type)} className="text-xs">
                          {notification.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {notification.source}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {notification.action && !notification.resolved && (
                      <Button size="sm" variant="outline">
                        {notification.action}
                      </Button>
                    )}
                    {!notification.resolved && (
                      <Button size="sm" variant="ghost">
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {notificationSettings.map((setting) => (
              <div key={setting.name} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor={setting.name}>{setting.name}</Label>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <Switch id={setting.name} checked={setting.enabled} />
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alertThreshold">Alert Threshold</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - All notifications</SelectItem>
                    <SelectItem value="medium">Medium - Important only</SelectItem>
                    <SelectItem value="high">High - Critical only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quietHours">Quiet Hours</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No quiet hours</SelectItem>
                    <SelectItem value="night">10 PM - 8 AM</SelectItem>
                    <SelectItem value="weekend">Weekends</SelectItem>
                    <SelectItem value="custom">Custom schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
