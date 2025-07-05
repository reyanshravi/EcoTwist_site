
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Plus, Eye, Calendar, Users, Heart, MessageSquare, Share, TrendingUp, Instagram } from 'lucide-react';

const mockPosts = [
  { id: 1, platform: 'Instagram', content: 'New eco-friendly products now available! 🌱 #sustainable #eco', scheduled: '2024-01-16 10:00', status: 'scheduled', likes: 245, comments: 18, shares: 32, reach: 1200 },
  { id: 2, platform: 'Facebook', content: 'Check out our sustainability report and see how we\'re making a difference...', scheduled: '2024-01-15 14:30', status: 'published', likes: 89, comments: 12, shares: 15, reach: 856 },
  { id: 3, platform: 'Twitter', content: 'Join our green movement! Every purchase plants a tree 🌳', scheduled: '2024-01-17 09:00', status: 'draft', likes: 0, comments: 0, shares: 0, reach: 0 },
  { id: 4, platform: 'LinkedIn', content: 'How sustainable business practices drive long-term success', scheduled: '2024-01-18 11:00', status: 'scheduled', likes: 156, comments: 24, shares: 41, reach: 2100 },
];

const engagementData = [
  { date: '2024-01-10', likes: 245, comments: 32, shares: 18 },
  { date: '2024-01-11', likes: 312, comments: 45, shares: 28 },
  { date: '2024-01-12', likes: 189, comments: 21, shares: 15 },
  { date: '2024-01-13', likes: 425, comments: 67, shares: 42 },
  { date: '2024-01-14', likes: 356, comments: 54, shares: 31 },
  { date: '2024-01-15', likes: 298, comments: 38, shares: 24 },
];

const platformData = [
  { platform: 'Instagram', followers: 12500, growth: 8.5 },
  { platform: 'Facebook', followers: 8900, growth: 4.2 },
  { platform: 'Twitter', followers: 5600, growth: 12.8 },
  { platform: 'LinkedIn', followers: 3400, growth: 15.3 },
];

const SocialMediaManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published': return <Badge className="bg-green-600">Published</Badge>;
      case 'scheduled': return <Badge variant="secondary">Scheduled</Badge>;
      case 'draft': return <Badge variant="outline">Draft</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'facebook': return <Users className="h-4 w-4" />;
      case 'twitter': return <MessageSquare className="h-4 w-4" />;
      case 'linkedin': return <Share className="h-4 w-4" />;
      default: return <Share className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Social Media Management</h2>
          <p className="text-muted-foreground">Manage your social media presence across all platforms</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Social Media Post</DialogTitle>
              <DialogDescription>Schedule and publish content across your social platforms</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Platform</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Schedule Date & Time</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
              <div>
                <Label>Post Content</Label>
                <Textarea placeholder="Write your post content here..." rows={4} />
              </div>
              <div>
                <Label>Hashtags</Label>
                <Input placeholder="#hashtag1 #hashtag2 #hashtag3" />
              </div>
              <div className="flex space-x-2">
                <Button>Schedule Post</Button>
                <Button variant="outline">Save Draft</Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {platformData.map((platform) => (
          <Card key={platform.platform}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                {getPlatformIcon(platform.platform)}
                <span className="ml-2">{platform.platform}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platform.followers.toLocaleString()}</div>
              <p className="text-xs text-green-600">+{platform.growth}% growth</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Content Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtag Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Manage your scheduled and published content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Reach</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(post.platform)}
                          <span>{post.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{post.content}</TableCell>
                      <TableCell>{post.scheduled}</TableCell>
                      <TableCell>{post.likes}</TableCell>
                      <TableCell>{post.comments}</TableCell>
                      <TableCell>{post.shares}</TableCell>
                      <TableCell>{post.reach.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>Track likes, comments, and shares over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="likes" stroke="#2563eb" strokeWidth={2} name="Likes" />
                    <Line type="monotone" dataKey="comments" stroke="#16a34a" strokeWidth={2} name="Comments" />
                    <Line type="monotone" dataKey="shares" stroke="#dc2626" strokeWidth={2} name="Shares" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Compare follower growth across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="followers" fill="#2563eb" name="Followers" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>Visual overview of your scheduled posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Content Calendar</h3>
                <p className="text-muted-foreground mb-4">View and manage your content schedule</p>
                <Button>Open Calendar View</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hashtags">
          <Card>
            <CardHeader>
              <CardTitle>Hashtag Performance</CardTitle>
              <CardDescription>Track which hashtags drive the most engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">#sustainable</div>
                    <div className="text-sm text-muted-foreground">Used in 12 posts</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">1,245 engagements</div>
                    <div className="text-sm text-green-600">+18% reach</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">#eco</div>
                    <div className="text-sm text-muted-foreground">Used in 8 posts</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">856 engagements</div>
                    <div className="text-sm text-green-600">+12% reach</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">#green</div>
                    <div className="text-sm text-muted-foreground">Used in 15 posts</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">2,134 engagements</div>
                    <div className="text-sm text-green-600">+25% reach</div>
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

export default SocialMediaManagement;
