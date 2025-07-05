import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCcwDot,
  Key,
} from "lucide-react";

const integrations = [
  {
    id: "shopify",
    name: "Shopify",
    description: "Sync products and orders with Shopify store",
    category: "E-commerce",
    status: "connected",
    lastSync: "2 minutes ago",
    features: ["Product sync", "Order sync", "Inventory sync"],
    connected: true,
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    description: "Manage customer relationships and sales pipeline",
    category: "CRM",
    status: "connected",
    lastSync: "15 minutes ago",
    features: ["Contact sync", "Deal tracking", "Email automation"],
    connected: true,
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Automated accounting and financial management",
    category: "Accounting",
    status: "disconnected",
    lastSync: "Never",
    features: ["Invoice sync", "Expense tracking", "Tax reporting"],
    connected: false,
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    description: "Email marketing and customer segmentation",
    category: "Marketing",
    status: "connected",
    lastSync: "1 hour ago",
    features: ["List sync", "Campaign automation", "Analytics"],
    connected: true,
  },
  {
    id: "fedex",
    name: "FedEx",
    description: "Shipping rates and label generation",
    category: "Shipping",
    status: "connected",
    lastSync: "30 minutes ago",
    features: ["Rate calculation", "Label printing", "Tracking"],
    connected: true,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Automate workflows between different apps",
    category: "Automation",
    status: "disconnected",
    lastSync: "Never",
    features: ["Workflow automation", "Trigger actions", "Data sync"],
    connected: false,
  },
];

const ThirdPartyIntegrations = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showApiKeys, setShowApiKeys] = useState(false);

  const categories = [
    "all",
    "E-commerce",
    "CRM",
    "Accounting",
    "Marketing",
    "Shipping",
    "Automation",
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-600">Connected</Badge>;
      case "disconnected":
        return <Badge variant="outline">Disconnected</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredIntegrations = integrations.filter(
    (integration) =>
      selectedCategory === "all" || integration.category === selectedCategory
  );

  const ApiKeyManager = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="h-5 w-5 mr-2" />
          API Key Management
        </CardTitle>
        <CardDescription>
          Manage your API keys and authentication tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="stripeKey">Stripe API Key</Label>
          <Input id="stripeKey" type="password" defaultValue="sk_test_..." />
        </div>
        <div>
          <Label htmlFor="paypalKey">PayPal Client ID</Label>
          <Input id="paypalKey" type="password" defaultValue="AW4Q..." />
        </div>
        <div>
          <Label htmlFor="shippoKey">Shippo API Token</Label>
          <Input
            id="shippoKey"
            type="password"
            defaultValue="shippo_test_..."
          />
        </div>
        <Separator />
        <div className="flex space-x-2">
          <Button>Save Changes</Button>
          <Button variant="outline">Test Connections</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600">Connected services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Data Synced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4k</div>
            <p className="text-xs text-muted-foreground">Records this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.6k</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sync Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-red-600">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "All" : category}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowApiKeys(!showApiKeys)}
          >
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-2" />
            Browse Integrations
          </Button>
        </div>
      </div>

      {showApiKeys && <ApiKeyManager />}

      <div className="grid gap-6 md:grid-cols-2">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    {integration.name}
                  </CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(integration.status)}
                  <Switch checked={integration.connected} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Last sync: {integration.lastSync}
                  </span>
                  <Badge variant="secondary">{integration.category}</Badge>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCcwDot className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Health Monitor</CardTitle>
          <CardDescription>
            Monitor the health and performance of your integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">All systems operational</div>
                  <div className="text-sm text-muted-foreground">
                    Last checked: 2 minutes ago
                  </div>
                </div>
              </div>
              <Badge className="bg-green-600">Healthy</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium">QuickBooks sync delayed</div>
                  <div className="text-sm text-muted-foreground">
                    Retry in progress
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Warning</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThirdPartyIntegrations;
