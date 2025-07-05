
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Download, Calendar, Target, Users, DollarSign } from 'lucide-react';

const multiChannelData = [
  { channel: 'Email', leads: 450, conversions: 36, spend: 1200, roi: 285 },
  { channel: 'Social Media', leads: 320, conversions: 28, spend: 1800, roi: 156 },
  { channel: 'Paid Ads', leads: 680, conversions: 54, spend: 3200, roi: 169 },
  { channel: 'Content', leads: 290, conversions: 22, spend: 800, roi: 275 },
  { channel: 'SEO', leads: 520, conversions: 41, spend: 600, roi: 683 },
];

const funnelData = [
  { stage: 'Awareness', visitors: 10000, percentage: 100 },
  { stage: 'Interest', visitors: 4500, percentage: 45 },
  { stage: 'Consideration', visitors: 1800, percentage: 18 },
  { stage: 'Intent', visitors: 720, percentage: 7.2 },
  { stage: 'Purchase', visitors: 144, percentage: 1.44 },
];

const attributionData = [
  { touchpoint: 'Direct', value: 35, color: '#2563eb' },
  { touchpoint: 'Email', value: 25, color: '#16a34a' },
  { touchpoint: 'Social Media', value: 20, color: '#dc2626' },
  { touchpoint: 'Paid Search', value: 15, color: '#eab308' },
  { touchpoint: 'Organic Search', value: 5, color: '#8b5cf6' },
];

const performanceTrends = [
  { date: '2024-01-01', leads: 120, conversions: 15, cost: 800 },
  { date: '2024-01-02', leads: 150, conversions: 18, cost: 950 },
  { date: '2024-01-03', leads: 110, conversions: 12, cost: 750 },
  { date: '2024-01-04', leads: 180, conversions: 22, cost: 1100 },
  { date: '2024-01-05', leads: 210, conversions: 25, cost: 1200 },
  { date: '2024-01-06', leads: 190, conversions: 21, cost: 1050 },
  { date: '2024-01-07', leads: 160, conversions: 19, cost: 900 },
];

const AnalyticsReporting = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
          <p className="text-muted-foreground">Comprehensive marketing performance insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Target className="h-4 w-4 mr-2" />
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,260</div>
            <p className="text-xs text-green-600">+18.2% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Users className="h-4 w-4 mr-2" />
              Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">181</div>
            <p className="text-xs text-green-600">8.0% conversion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <DollarSign className="h-4 w-4 mr-2" />
              Marketing Spend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,600</div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-2" />
              Average ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254%</div>
            <p className="text-xs text-green-600">Above target</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Multi-Channel Overview</TabsTrigger>
          <TabsTrigger value="funnel">Funnel Analysis</TabsTrigger>
          <TabsTrigger value="attribution">Attribution Modeling</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Channel Performance</CardTitle>
                <CardDescription>Compare performance across all marketing channels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={multiChannelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#2563eb" name="Leads" />
                    <Bar dataKey="conversions" fill="#16a34a" name="Conversions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Track leads, conversions, and costs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={2} name="Leads" />
                    <Line type="monotone" dataKey="conversions" stroke="#16a34a" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnel">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Funnel Analysis</CardTitle>
              <CardDescription>Track visitor progression through the conversion funnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelData.map((stage, index) => (
                  <div key={stage.stage} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium">{stage.stage}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                      <div
                        className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ width: `${stage.percentage}%` }}
                      >
                        {stage.visitors.toLocaleString()}
                      </div>
                    </div>
                    <div className="w-16 text-sm text-muted-foreground">{stage.percentage}%</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Funnel Insights</h4>
                <ul className="text-sm space-y-1">
                  <li>• Biggest drop-off occurs between Interest and Consideration (27% loss)</li>
                  <li>• Conversion rate from Intent to Purchase is strong at 20%</li>
                  <li>• Overall funnel conversion rate: 1.44%</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attribution">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attribution Model</CardTitle>
                <CardDescription>Last-touch attribution for conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attribution Breakdown</CardTitle>
                <CardDescription>Conversion attribution by touchpoint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attributionData.map((item) => (
                    <div key={item.touchpoint} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.touchpoint}</span>
                      </div>
                      <div className="font-bold">{item.value}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Insights</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Direct traffic accounts for 35% of conversions</li>
                    <li>• Email marketing is the second highest contributor</li>
                    <li>• Social media shows strong engagement potential</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Create and manage custom marketing reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Monthly Marketing Performance</div>
                    <div className="text-sm text-muted-foreground">Comprehensive monthly summary report</div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge>Scheduled</Badge>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Campaign ROI Analysis</div>
                    <div className="text-sm text-muted-foreground">Detailed ROI breakdown by campaign</div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Draft</Badge>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Channel Performance Comparison</div>
                    <div className="text-sm text-muted-foreground">Weekly comparison across all channels</div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-600">Active</Badge>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button>Create New Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsReporting;
