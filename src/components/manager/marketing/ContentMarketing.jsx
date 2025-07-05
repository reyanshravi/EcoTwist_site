
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Plus, Eye, Calendar, TrendingUp, Search, Users, BookOpen } from 'lucide-react';

const mockBlogPosts = [
  { id: 1, title: '10 Ways to Live More Sustainably', status: 'published', views: 1534, publishDate: '2024-01-10', author: 'Sarah Johnson', category: 'Lifestyle', readTime: '5 min' },
  { id: 2, title: 'The Future of Eco-Friendly Products', status: 'draft', views: 0, publishDate: null, author: 'Mike Chen', category: 'Technology', readTime: '8 min' },
  { id: 3, title: 'Our Carbon Footprint Reduction Journey', status: 'scheduled', views: 0, publishDate: '2024-01-20', author: 'Emily Davis', category: 'Company', readTime: '6 min' },
  { id: 4, title: 'Sustainable Business Practices Guide', status: 'published', views: 2847, publishDate: '2024-01-08', author: 'David Wilson', category: 'Business', readTime: '12 min' },
];

const contentPerformanceData = [
  { date: '2024-01-10', views: 245, shares: 32, comments: 18 },
  { date: '2024-01-11', views: 312, shares: 45, comments: 28 },
  { date: '2024-01-12', views: 189, shares: 21, comments: 15 },
  { date: '2024-01-13', views: 425, shares: 67, comments: 42 },
  { date: '2024-01-14', views: 356, shares: 54, comments: 31 },
  { date: '2024-01-15', views: 298, shares: 38, comments: 24 },
];

const seoKeywords = [
  { keyword: 'sustainable products', ranking: 3, traffic: 1250, difficulty: 'Medium' },
  { keyword: 'eco-friendly business', ranking: 7, traffic: 890, difficulty: 'High' },
  { keyword: 'green technology', ranking: 12, traffic: 620, difficulty: 'Low' },
  { keyword: 'carbon footprint', ranking: 5, traffic: 1100, difficulty: 'Medium' },
];

const ContentMarketing = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published': return <Badge className="bg-green-600">Published</Badge>;
      case 'scheduled': return <Badge variant="secondary">Scheduled</Badge>;
      case 'draft': return <Badge variant="outline">Draft</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getRankingColor = (ranking) => {
    if (ranking <= 3) return 'text-green-600';
    if (ranking <= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Marketing & Blog Management</h2>
          <p className="text-muted-foreground">Create and manage your content strategy</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Content</DialogTitle>
              <DialogDescription>Create a new blog post or content piece</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="case-study">Case Study</SelectItem>
                      <SelectItem value="whitepaper">Whitepaper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Title</Label>
                <Input placeholder="Enter content title" />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea placeholder="SEO meta description" rows={2} />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea placeholder="Write your content here..." rows={8} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Author</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                      <SelectItem value="emily">Emily Davis</SelectItem>
                      <SelectItem value="david">David Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Publish Date (Optional)</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>Publish Now</Button>
                <Button variant="outline">Save Draft</Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <FileText className="h-4 w-4 mr-2" />
              Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockBlogPosts.length}</div>
            <p className="text-xs text-muted-foreground">Published content</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Eye className="h-4 w-4 mr-2" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-green-600">+18% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Users className="h-4 w-4 mr-2" />
              Avg. Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-green-600">Above industry avg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Search className="h-4 w-4 mr-2" />
              SEO Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-green-600">Good optimization</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="seo">SEO Insights</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog content and publications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Read Time</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBlogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.category}</Badge>
                      </TableCell>
                      <TableCell>{post.views.toLocaleString()}</TableCell>
                      <TableCell>{post.readTime}</TableCell>
                      <TableCell>{post.publishDate || 'Not scheduled'}</TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>Plan and schedule your content publication</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Content Calendar</h3>
                <p className="text-muted-foreground mb-4">Visualize your content publication schedule</p>
                <Button>Open Calendar View</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Keywords Performance</CardTitle>
              <CardDescription>Track your search engine rankings and traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Ranking</TableHead>
                    <TableHead>Monthly Traffic</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seoKeywords.map((keyword, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getRankingColor(keyword.ranking)}`}>
                          #{keyword.ranking}
                        </span>
                      </TableCell>
                      <TableCell>{keyword.traffic.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={keyword.difficulty === 'Low' ? 'default' : keyword.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {keyword.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Optimize</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Analytics</CardTitle>
              <CardDescription>Track views, shares, and engagement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={contentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} name="Views" />
                  <Line type="monotone" dataKey="shares" stroke="#16a34a" strokeWidth={2} name="Shares" />
                  <Line type="monotone" dataKey="comments" stroke="#dc2626" strokeWidth={2} name="Comments" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentMarketing;
