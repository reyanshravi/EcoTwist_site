
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Plus, AlertTriangle, TrendingUp, Target, Calendar } from 'lucide-react';

const budgetData = [
  { category: 'Marketing', budgeted: 5000, actual: 4200, variance: 800, status: 'under' },
  { category: 'Operations', budgeted: 3000, actual: 3400, variance: -400, status: 'over' },
  { category: 'Payroll', budgeted: 8000, actual: 8000, variance: 0, status: 'on-track' },
  { category: 'Technology', budgeted: 2000, actual: 1600, variance: 400, status: 'under' },
  { category: 'Travel', budgeted: 1500, actual: 2100, variance: -600, status: 'over' },
];

const forecastData = [
  { month: 'Jan', actual: 18000, forecast: 18000 },
  { month: 'Feb', actual: 22000, forecast: 20000 },
  { month: 'Mar', actual: 25000, forecast: 24000 },
  { month: 'Apr', actual: null, forecast: 26000 },
  { month: 'May', actual: null, forecast: 28000 },
  { month: 'Jun', actual: null, forecast: 30000 },
];

const scenarioData = [
  { scenario: 'Conservative', q1: 65000, q2: 70000, q3: 72000, q4: 75000 },
  { scenario: 'Realistic', q1: 75000, q2: 82000, q3: 88000, q4: 95000 },
  { scenario: 'Optimistic', q1: 85000, q2: 95000, q3: 105000, q4: 115000 },
];

const BudgetForecasting = () => {
  const [timeframe, setTimeframe] = useState('quarterly');
  const [scenario, setScenario] = useState('realistic');

  const getBudgetStatus = (status) => {
    switch (status) {
      case 'under': return <Badge variant="default">Under Budget</Badge>;
      case 'over': return <Badge variant="destructive">Over Budget</Badge>;
      case 'on-track': return <Badge variant="secondary">On Track</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = budgetData.reduce((sum, item) => sum + item.actual, 0);
  const totalVariance = totalBudgeted - totalActual;

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actual Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActual.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current spending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalVariance >= 0 ? '+' : ''}${totalVariance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalVariance >= 0 ? 'Under budget' : 'Over budget'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalActual / totalBudgeted) * 100).toFixed(1)}%</div>
            <Progress value={(totalActual / totalBudgeted) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Budget Performance</CardTitle>
              <CardDescription>Track budget vs actual spending by category</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Budget Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium">{item.category}</h3>
                    {getBudgetStatus(item.status)}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${item.actual.toLocaleString()} / ${item.budgeted.toLocaleString()}</div>
                    <div className={`text-sm ${item.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.variance >= 0 ? '+' : ''}${item.variance.toLocaleString()} variance
                    </div>
                  </div>
                </div>
                <Progress value={(item.actual / item.budgeted) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Forecasting */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue Forecasting</CardTitle>
              <CardDescription>Predict future financial performance</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Select value={scenario} onValueChange={setScenario}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="realistic">Realistic</SelectItem>
                  <SelectItem value="optimistic">Optimistic</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#22c55e" 
                strokeWidth={3} 
                name="Actual Revenue"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                strokeDasharray="5 5"
                name="Forecasted Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Scenario Planning */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Planning</CardTitle>
          <CardDescription>Compare different financial scenarios for strategic planning</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scenarioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="q1" fill="#8884d8" name="Q1" />
              <Bar dataKey="q2" fill="#82ca9d" name="Q2" />
              <Bar dataKey="q3" fill="#ffc658" name="Q3" />
              <Bar dataKey="q4" fill="#ff7300" name="Q4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Alerts & Notifications</CardTitle>
          <CardDescription>Stay informed about important budget events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <h4 className="font-medium text-red-800">Travel Budget Exceeded</h4>
                <p className="text-sm text-red-600">Travel expenses are 40% over budget this quarter</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <div>
                <h4 className="font-medium text-yellow-800">Budget Review Due</h4>
                <p className="text-sm text-yellow-600">Q2 budget review scheduled for next week</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-medium text-green-800">Marketing Under Budget</h4>
                <p className="text-sm text-green-600">Marketing is 16% under budget - consider reallocating</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetForecasting;
