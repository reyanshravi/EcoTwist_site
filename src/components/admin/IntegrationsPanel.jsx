
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BarChart, Mail, MessageSquare, Users, Zap, Globe, CheckCircle, AlertCircle, Settings } from 'lucide-react';

const IntegrationsPanel = () => {
  const analyticsIntegrations = [
    {
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      status: 'connected',
      icon: BarChart,
      lastSync: '2 minutes ago',
      configured: true
    },
    {
      name: 'Hotjar',
      description: 'Heatmaps and user session recordings',
      status: 'disconnected',
      icon: BarChart,
      lastSync: 'Never',
      configured: false
    }
  ];

  const crmIntegrations = [
    {
      name: 'HubSpot',
      description: 'Customer relationship management',
      status: 'connected',
      icon: Users,
      lastSync: '15 minutes ago',
      configured: true
    },
    {
      name: 'Zoho CRM',
      description: 'Sales pipeline management',
      status: 'error',
      icon: Users,
      lastSync: '2 hours ago',
      configured: true
    }
  ];

  const marketingIntegrations = [
    {
      name: 'Mailchimp',
      description: 'Email marketing campaigns',
      status: 'connected',
      icon: Mail,
      lastSync: '5 minutes ago',
      configured: true
    },
    {
      name: 'Meta Ads Manager',
      description: 'Facebook and Instagram advertising',
      status: 'connected',
      icon: Globe,
      lastSync: '1 hour ago',
      configured: true
    },
    {
      name: 'Slack',
      description: 'Team communication and notifications',
      status: 'disconnected',
      icon: MessageSquare,
      lastSync: 'Never',
      configured: false
    }
  ];

  const webhookIntegrations = [
    {
      name: 'Order Notifications',
      url: 'https://api.company.com/webhooks/orders',
      status: 'active',
      events: ['order.created', 'order.updated', 'order.cancelled']
    },
    {
      name: 'User Events',
      url: 'https://api.company.com/webhooks/users',
      status: 'inactive',
      events: ['user.created', 'user.updated']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'disconnected':
      case 'inactive':
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
      case 'active':
        return <Badge variant="default">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'disconnected':
      case 'inactive':
      default:
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="w-5 h-5" />
            <span>Analytics Integrations</span>
          </CardTitle>
          <CardDescription>Connect analytics and tracking services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsIntegrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <integration.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      {getStatusIcon(integration.status)}
                    </div>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                    <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(integration.status)}
                  <Button variant="outline" size="sm">
                    {integration.configured ? 'Configure' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CRM Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>CRM Integrations</span>
          </CardTitle>
          <CardDescription>Customer relationship management systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crmIntegrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <integration.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      {getStatusIcon(integration.status)}
                    </div>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                    <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(integration.status)}
                  <Button variant="outline" size="sm">
                    {integration.status === 'error' ? 'Fix' : 'Configure'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Marketing Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Marketing Integrations</span>
          </CardTitle>
          <CardDescription>Marketing and communication tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketingIntegrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <integration.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      {getStatusIcon(integration.status)}
                    </div>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                    <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(integration.status)}
                  <Button variant="outline" size="sm">
                    {integration.configured ? 'Configure' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Webhook Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Webhook Management</span>
          </CardTitle>
          <CardDescription>Configure webhooks for real-time notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {webhookIntegrations.map((webhook, index) => (
              <div key={index}>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{webhook.name}</h4>
                      {getStatusBadge(webhook.status)}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-gray-500">Endpoint URL</Label>
                        <Input value={webhook.url} className="mt-1" readOnly />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Events</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Switch checked={webhook.status === 'active'} />
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                {index < webhookIntegrations.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
            
            <Button className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Add New Webhook
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Management */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys & OAuth Settings</CardTitle>
          <CardDescription>Manage API credentials and OAuth applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="googleApi">Google Analytics API Key</Label>
                <Input id="googleApi" type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookApi">Facebook App ID</Label>
                <Input id="facebookApi" placeholder="Enter Facebook App ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mailchimpApi">Mailchimp API Key</Label>
                <Input id="mailchimpApi" type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slackToken">Slack Bot Token</Label>
                <Input id="slackToken" type="password" placeholder="••••••••••••••••" />
              </div>
            </div>
            <Button>Save API Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsPanel;
