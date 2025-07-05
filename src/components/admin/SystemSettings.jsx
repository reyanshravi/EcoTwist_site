
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, CreditCard, Mail, Wrench, Shield, Flag } from 'lucide-react';

const SystemSettings = () => {
  const paymentGateways = [
    { name: 'Stripe', status: 'active', configured: true },
    { name: 'PayPal', status: 'active', configured: true },
    { name: 'Square', status: 'inactive', configured: false },
    { name: 'Razorpay', status: 'inactive', configured: false }
  ];

  const featureFlags = [
    { name: 'AI Recommendations', enabled: true, description: 'Enable AI-powered product recommendations' },
    { name: 'A/B Testing', enabled: false, description: 'Enable A/B testing for campaigns' },
    { name: 'Multi-Currency', enabled: true, description: 'Support for multiple currencies' },
    { name: 'Advanced Analytics', enabled: true, description: 'Enhanced analytics and reporting' },
    { name: 'Social Login', enabled: false, description: 'Login with social media accounts' }
  ];

  return (
    <div className="space-y-6">
      {/* Site Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Site Settings</span>
          </CardTitle>
          <CardDescription>Configure basic site information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="EcoTwist" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - US Dollar</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - British Pound</SelectItem>
                  <SelectItem value="inr">INR - Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST - Eastern Time</SelectItem>
                  <SelectItem value="pst">PST - Pacific Time</SelectItem>
                  <SelectItem value="ist">IST - India Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="internationalShipping" defaultChecked />
            <Label htmlFor="internationalShipping">Enable International Shipping</Label>
          </div>
          <Button>Save Site Settings</Button>
        </CardContent>
      </Card>

      {/* Payment Gateway Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Gateway Setup</span>
          </CardTitle>
          <CardDescription>Manage payment methods and API configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentGateways.map((gateway) => (
              <div key={gateway.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{gateway.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={gateway.status === 'active' ? 'default' : 'secondary'}>
                        {gateway.status}
                      </Badge>
                      {gateway.configured && (
                        <Badge variant="outline">Configured</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={gateway.status === 'active'} />
                  <Button variant="outline" size="sm">
                    {gateway.configured ? 'Edit' : 'Setup'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Email Configuration</span>
          </CardTitle>
          <CardDescription>SMTP settings and email templates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input id="smtpHost" placeholder="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input id="smtpPort" placeholder="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderName">Sender Name</Label>
              <Input id="senderName" placeholder="EcoTwist Support" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input id="senderEmail" type="email" placeholder="noreply@ecotwist.com" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button>Save Email Settings</Button>
            <Button variant="outline">Test Email</Button>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="w-5 h-5" />
            <span>Maintenance Mode</span>
          </CardTitle>
          <CardDescription>Temporarily disable the platform for updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
            <div>
              <h4 className="font-medium">Maintenance Mode</h4>
              <p className="text-sm text-gray-600">Platform is currently accessible to all users</p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
            <Input 
              id="maintenanceMessage" 
              placeholder="We're performing scheduled maintenance and will be back shortly"
            />
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Flag className="w-5 h-5" />
            <span>Feature Flags</span>
          </CardTitle>
          <CardDescription>Enable or disable platform features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureFlags.map((feature) => (
              <div key={feature.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{feature.name}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <Switch checked={feature.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security Settings</span>
          </CardTitle>
          <CardDescription>Configure security and access settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Require 2FA for admin users</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Session Timeout</h4>
              <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">IP Whitelisting</h4>
              <p className="text-sm text-gray-600">Restrict admin access by IP</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
