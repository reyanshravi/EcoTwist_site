
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Users, Download, Calendar } from 'lucide-react';

const salesData = [
  { month: 'Jan', revenue: 12000, orders: 150, customers: 120 },
  { month: 'Feb', revenue: 15000, orders: 180, customers: 145 },
  { month: 'Mar', revenue: 18000, orders: 220, customers: 180 },
  { month: 'Apr', revenue: 22000, orders: 280, customers: 220 },
  { month: 'May', revenue: 25000, orders: 320, customers: 260 },
  { month: 'Jun', revenue: 28000, orders: 350, customers: 290 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#0088FE' },
  { name: 'Accessories', value: 25, color: '#00C49F' },
  { name: 'Drinkware', value: 20, color: '#FFBB28' },
  { name: 'Bags', value: 15, color: '#FF8042' },
  { name: 'Others', value: 5, color: '#8884D8' },
];

const topProducts = [
  { name: 'Solar Power Bank', revenue: 15420, units: 89, growth: 12.5 },
  { name: 'Eco Water Bottle', revenue: 12850, units: 156, growth: 8.3 },
  { name: 'Bamboo Phone Case', revenue: 8760, units: 124, growth: -2.1 },
  { name: 'Organic Cotton Tote', revenue: 6540, units: 98, growth: 15.7 },
];

const AnalyticsReporting = () => {
  const [dateRange, setDateRange] = useState('6months');
  const [reportType, setReportType] = useState('sales');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sales Analytics & Reporting</h2>
          <p className="text-muted-foreground">Comprehensive insights into your sales performance</p>
        </div>
        <div className="flex space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
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
              <DollarSign className="h-4 w-4 mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$156,420</div>
            <p className="text-xs text-green-600">+18.2% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-green-600">+12.5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Users className="h-4 w-4 mr-2" />
              New Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-green-600">+8.7% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-2" />
              Avg Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125.43</div>
            <p className="text-xs text-green-600">+5.2% from last period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
            <CardDescription>Monthly performance over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} name="Revenue ($)" />
                <Line type="monotone" dataKey="orders" stroke="#16a34a" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best-selling products by revenue and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.units} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${product.revenue.toLocaleString()}</div>
                  <div className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
          <CardDescription>Understanding your customer base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold">68%</div>
              <p className="text-sm text-muted-foreground">Repeat Purchase Rate</p>
              <p className="text-xs text-green-600">+5% from last month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.2</div>
              <p className="text-sm text-muted-foreground">Avg. Orders per Customer</p>
              <p className="text-xs text-green-600">+0.3 from last month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">23</div>
              <p className="text-sm text-muted-foreground">Customer Lifetime Value</p>
              <p className="text-xs text-green-600">+$12 from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReporting;
