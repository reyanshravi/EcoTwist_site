
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, DollarSign, TrendingUp, MapPin, Calendar, Star } from 'lucide-react';

const customerSegments = [
  { segment: 'VIP Customers', count: 342, ltv: 2450, percentage: 15.2, color: '#2563eb' },
  { segment: 'Regular Customers', count: 1256, ltv: 850, percentage: 55.8, color: '#16a34a' },
  { segment: 'New Customers', count: 489, ltv: 180, percentage: 21.7, color: '#eab308' },
  { segment: 'At-Risk Customers', count: 167, ltv: 320, percentage: 7.3, color: '#dc2626' },
];

const customerJourney = [
  { stage: 'Awareness', touchpoints: ['Social Media', 'Search'], avgTime: '2 days' },
  { stage: 'Interest', touchpoints: ['Website Visit', 'Email Open'], avgTime: '5 days' },
  { stage: 'Consideration', touchpoints: ['Product View', 'Comparison'], avgTime: '3 days' },
  { stage: 'Purchase', touchpoints: ['Add to Cart', 'Checkout'], avgTime: '1 day' },
  { stage: 'Retention', touchpoints: ['Support', 'Follow-up'], avgTime: 'Ongoing' },
];

const geographicData = [
  { region: 'North America', customers: 1450, revenue: 125000 },
  { region: 'Europe', customers: 890, revenue: 78000 },
  { region: 'Asia Pacific', customers: 620, revenue: 52000 },
  { region: 'Latin America', customers: 340, revenue: 28000 },
  { region: 'Other', customers: 180, revenue: 15000 },
];

const ltvTrends = [
  { month: 'Jan', newCustomers: 125, avgLTV: 420 },
  { month: 'Feb', newCustomers: 142, avgLTV: 465 },
  { month: 'Mar', newCustomers: 158, avgLTV: 398 },
  { month: 'Apr', newCustomers: 189, avgLTV: 512 },
  { month: 'May', newCustomers: 206, avgLTV: 478 },
  { month: 'Jun', newCustomers: 234, avgLTV: 535 },
];

const feedbackData = [
  { category: 'Product Quality', rating: 4.5, responses: 1250 },
  { category: 'Customer Service', rating: 4.2, responses: 980 },
  { category: 'Shipping Speed', rating: 4.0, responses: 1180 },
  { category: 'Website Experience', rating: 4.3, responses: 856 },
  { category: 'Value for Money', rating: 4.1, responses: 1420 },
];

const CustomerInsights = () => {
  const [activeTab, setActiveTab] = useState('segments');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Insights</h2>
          <p className="text-muted-foreground">Deep dive into customer behavior and preferences</p>
        </div>
        <Button>Create Segment</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Users className="h-4 w-4 mr-2" />
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,254</div>
            <p className="text-xs text-green-600">+12.5% this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <DollarSign className="h-4 w-4 mr-2" />
              Avg Lifetime Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240</div>
            <p className="text-xs text-green-600">+8.2% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-2" />
              Retention Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-green-600">Above industry avg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              Satisfaction Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3/5</div>
            <p className="text-xs text-muted-foreground">Based on 5,680 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="segments">Customer Segmentation</TabsTrigger>
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Insights</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Surveys</TabsTrigger>
        </TabsList>

        <TabsContent value="segments">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution of customers by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="percentage"
                    >
                      {customerSegments.map((entry, index) => (
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
                <CardTitle>Segment Details</CardTitle>
                <CardDescription>Customer count and lifetime value by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.segment} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        />
                        <div>
                          <div className="font-medium">{segment.segment}</div>
                          <div className="text-sm text-muted-foreground">{segment.count} customers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${segment.ltv}</div>
                        <div className="text-sm text-muted-foreground">Avg LTV</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Lifetime Value Trends</CardTitle>
              <CardDescription>Track customer acquisition and lifetime value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ltvTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="newCustomers" stroke="#2563eb" strokeWidth={2} name="New Customers" />
                  <Line type="monotone" dataKey="avgLTV" stroke="#16a34a" strokeWidth={2} name="Avg LTV ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Mapping</CardTitle>
              <CardDescription>Visualize the typical customer journey and touchpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {customerJourney.map((stage, index) => (
                  <div key={stage.stage} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{stage.stage}</h3>
                        <Badge variant="outline">{stage.avgTime}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        {stage.touchpoints.map((touchpoint) => (
                          <Badge key={touchpoint} variant="secondary">{touchpoint}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Journey Insights</h4>
                <ul className="text-sm space-y-1">
                  <li>• Average customer journey takes 11 days from awareness to purchase</li>
                  <li>• Social media is the primary awareness channel</li>
                  <li>• Email engagement drives consideration phase</li>
                  <li>• Mobile optimization critical for purchase conversion</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Customer Distribution</CardTitle>
              <CardDescription>Customer base and revenue by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={geographicData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#2563eb" name="Customers" />
                  <Bar dataKey="revenue" fill="#16a34a" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Detailed breakdown by geographic region</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Avg Order Value</TableHead>
                    <TableHead>Growth Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {geographicData.map((region) => (
                    <TableRow key={region.region}>
                      <TableCell className="font-medium">{region.region}</TableCell>
                      <TableCell>{region.customers.toLocaleString()}</TableCell>
                      <TableCell>${region.revenue.toLocaleString()}</TableCell>
                      <TableCell>${Math.round(region.revenue / region.customers)}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-600">+12.5%</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback & Surveys</CardTitle>
              <CardDescription>Analyze customer satisfaction and feedback trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {feedbackData.map((item) => (
                    <div key={item.category} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-sm text-muted-foreground">{item.responses} responses</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{item.rating}</span>
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${(item.rating / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Recent Positive Feedback</h4>
                    <div className="space-y-2 text-sm">
                      <p>"Excellent product quality and fast shipping!"</p>
                      <p>"Customer service was very helpful and responsive."</p>
                      <p>"Great value for money, will definitely order again."</p>
                    </div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Areas for Improvement</h4>
                    <div className="space-y-2 text-sm">
                      <p>"Shipping could be faster for premium customers"</p>
                      <p>"Website search functionality needs improvement"</p>
                      <p>"More payment options would be appreciated"</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerInsights;
