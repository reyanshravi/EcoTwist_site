import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Copy, Plus, Download } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  sent: number;
  opens: number;
  openRate: number;
  clicks: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled';
}

interface EmailList {
  id: string;
  name: string;
  description: string;
  subscribers: number;
  growthRate: number;
}

interface ABTest {
  id: string;
  name: string;
  testType: string;
  versionA: {
    sends: number;
    openRate: number;
  };
  versionB: {
    sends: number;
    openRate: number;
  };
  winner: 'A' | 'B' | null;
}

const mockCampaigns: Campaign[] = [
  {
    id: 'CMP-001',
    name: 'Welcome Email Series',
    subject: 'Welcome to Our Community!',
    sent: 2500,
    opens: 1250,
    openRate: 50,
    clicks: 250,
    clickRate: 10,
    status: 'sent',
  },
  {
    id: 'CMP-002',
    name: 'Product Launch Announcement',
    subject: 'Introducing Our New Product!',
    sent: 3000,
    opens: 1800,
    openRate: 60,
    clicks: 600,
    clickRate: 20,
    status: 'sent',
  },
  {
    id: 'CMP-003',
    name: 'Holiday Sale Promotion',
    subject: 'Limited Time Offer - Save Big!',
    sent: 2000,
    opens: 1400,
    openRate: 70,
    clicks: 400,
    clickRate: 20,
    status: 'draft',
  },
];

const mockLists: EmailList[] = [
  {
    id: 'LST-001',
    name: 'New Subscribers',
    description: 'List of users who recently subscribed',
    subscribers: 5000,
    growthRate: 5,
  },
  {
    id: 'LST-002',
    name: 'Active Customers',
    description: 'List of users who made a purchase in the last month',
    subscribers: 2500,
    growthRate: 2,
  },
  {
    id: 'LST-003',
    name: 'Inactive Users',
    description: 'List of users who have not been active in the last 3 months',
    subscribers: 1000,
    growthRate: -1,
  },
];

const mockABTests: ABTest[] = [
  {
    id: 'ABT-001',
    name: 'Subject Line Test',
    testType: 'Subject Line',
    versionA: {
      sends: 1000,
      openRate: 50,
    },
    versionB: {
      sends: 1000,
      openRate: 60,
    },
    winner: 'B',
  },
  {
    id: 'ABT-002',
    name: 'Call to Action Test',
    testType: 'Call to Action',
    versionA: {
      sends: 1200,
      openRate: 55,
    },
    versionB: {
      sends: 1200,
      openRate: 50,
    },
    winner: 'A',
  },
];

const EmailMarketing = () => {
  const [totalSent, setTotalSent] = useState(5000);
  const [totalOpens, setTotalOpens] = useState(3000);
  const [totalClicks, setTotalClicks] = useState(1000);
  const [conversionRate, setConversionRate] = useState(5);

  return (
    <div className="space-y-6">
      {/* Email Campaign Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOpens.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {conversionRate > 0 ? '+' : ''}
              {conversionRate}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Manage and track your email marketing campaigns</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opens</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.subject}</TableCell>
                  <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{campaign.opens.toLocaleString()}</span>
                      <Badge variant="outline">{campaign.openRate}%</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{campaign.clicks.toLocaleString()}</span>
                      <Badge variant="outline">{campaign.clickRate}%</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === 'sent' ? 'default' : campaign.status === 'draft' ? 'secondary' : 'outline'}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Email Lists */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Lists</CardTitle>
              <CardDescription>Manage your subscriber lists and segments</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New List
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockLists.map((list) => (
              <Card key={list.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{list.name}</h3>
                    <Badge variant="outline">{list.subscribers.toLocaleString()}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{list.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>Growth Rate</span>
                    <span className="text-green-600">+{list.growthRate}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* A/B Testing */}
      <Card>
        <CardHeader>
          <CardTitle>A/B Testing</CardTitle>
          <CardDescription>Test different versions of your emails to optimize performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockABTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{test.name}</h3>
                  <p className="text-sm text-muted-foreground">Testing: {test.testType}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">Version A</div>
                    <div className="text-lg font-bold">{test.versionA.openRate}%</div>
                    <div className="text-xs text-muted-foreground">{test.versionA.sends} sends</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">Version B</div>
                    <div className="text-lg font-bold">{test.versionB.openRate}%</div>
                    <div className="text-xs text-muted-foreground">{test.versionB.sends} sends</div>
                  </div>
                  <Badge variant={test.winner === 'A' ? 'default' : test.winner === 'B' ? 'secondary' : 'outline'}>
                    {test.winner ? `Winner: ${test.winner}` : 'Testing'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailMarketing;
