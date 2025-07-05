
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, DollarSign, AlertCircle, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockTransactions = [
  { id: 'TXN-1234', orderId: '#ORD-1234', amount: 87.97, method: 'Credit Card', status: 'completed', date: '2024-01-15', customer: 'John Doe', gateway: 'Stripe' },
  { id: 'TXN-1235', orderId: '#ORD-1235', amount: 25.99, method: 'PayPal', status: 'completed', date: '2024-01-15', customer: 'Jane Smith', gateway: 'PayPal' },
  { id: 'TXN-1236', orderId: '#ORD-1236', amount: 65.98, method: 'Credit Card', status: 'failed', date: '2024-01-14', customer: 'Mike Johnson', gateway: 'Stripe' },
  { id: 'TXN-1237', orderId: '#ORD-1237', amount: 156.47, method: 'Bank Transfer', status: 'pending', date: '2024-01-14', customer: 'Sarah Wilson', gateway: 'Bank' },
];

const revenueData = [
  { date: '2024-01-10', stripe: 1200, paypal: 800, bank: 400 },
  { date: '2024-01-11', stripe: 1500, paypal: 900, bank: 600 },
  { date: '2024-01-12', stripe: 1100, paypal: 700, bank: 300 },
  { date: '2024-01-13', stripe: 1800, paypal: 1200, bank: 800 },
  { date: '2024-01-14', stripe: 2100, paypal: 1100, bank: 500 },
  { date: '2024-01-15', stripe: 1900, paypal: 1000, bank: 700 },
];

const PaymentsAccounting = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-600">Completed</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      case 'refunded': return <Badge variant="outline">Refunded</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const filteredTransactions = mockTransactions.filter(txn => {
    return statusFilter === 'all' || txn.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <DollarSign className="h-4 w-4 mr-2" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,678</div>
            <p className="text-xs text-green-600">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <CreditCard className="h-4 w-4 mr-2" />
              Successful Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600">98.5% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <AlertCircle className="h-4 w-4 mr-2" />
              Failed Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-red-600">$1,245 lost revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-2" />
              Avg Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$84.50</div>
            <p className="text-xs text-green-600">+$3.20 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue by Payment Method</CardTitle>
                <CardDescription>Daily revenue breakdown by gateway</CardDescription>
              </div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 days</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stripe" fill="#635bff" name="Stripe" />
                <Bar dataKey="paypal" fill="#0070ba" name="PayPal" />
                <Bar dataKey="bank" fill="#22c55e" name="Bank Transfer" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Gateway Status</CardTitle>
            <CardDescription>Current status of integrated payment systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Stripe</div>
                    <div className="text-sm text-muted-foreground">Credit Cards, Apple Pay, Google Pay</div>
                  </div>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-muted-foreground">PayPal, Pay Later</div>
                  </div>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Bank Transfer</div>
                    <div className="text-sm text-muted-foreground">ACH, Wire Transfer</div>
                  </div>
                </div>
                <Badge variant="secondary">Pending Setup</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Detailed view of all payment transactions</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead>Transaction ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                  <TableCell className="font-medium">{txn.orderId}</TableCell>
                  <TableCell>{txn.customer}</TableCell>
                  <TableCell>${txn.amount}</TableCell>
                  <TableCell>{txn.method}</TableCell>
                  <TableCell>{txn.gateway}</TableCell>
                  <TableCell>{getStatusBadge(txn.status)}</TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      {txn.status === 'failed' && (
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax & Accounting</CardTitle>
          <CardDescription>Tax calculations and financial summaries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">$4,567</div>
              <p className="text-sm text-muted-foreground">Total Tax Collected</p>
              <p className="text-xs text-green-600">This month</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">$41,111</div>
              <p className="text-sm text-muted-foreground">Net Revenue</p>
              <p className="text-xs text-green-600">After fees & taxes</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">2.8%</div>
              <p className="text-sm text-muted-foreground">Avg Processing Fee</p>
              <p className="text-xs text-gray-600">Across all gateways</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsAccounting;
