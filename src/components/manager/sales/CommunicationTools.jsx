
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Mail, Bell, Send, Users, Phone, Calendar } from 'lucide-react';

const mockMessages = [
  { id: 1, customer: 'John Doe', subject: 'Order Status Inquiry', message: 'Hi, I wanted to check on my order #ORD-1234...', date: '2024-01-15', status: 'unread', priority: 'medium' },
  { id: 2, customer: 'Jane Smith', subject: 'Product Question', message: 'Is the bamboo phone case compatible with iPhone 15?', date: '2024-01-15', status: 'read', priority: 'low' },
  { id: 3, customer: 'Mike Johnson', subject: 'Return Request', message: 'I need to return the solar power bank I purchased...', date: '2024-01-14', status: 'replied', priority: 'high' },
];

const mockNotifications = [
  { id: 1, type: 'order', message: 'New order #ORD-1238 received', time: '2 minutes ago', read: false },
  { id: 2, type: 'payment', message: 'Payment failed for order #ORD-1237', time: '15 minutes ago', read: false },
  { id: 3, type: 'stock', message: 'Bamboo Phone Case is running low (5 left)', time: '1 hour ago', read: true },
  { id: 4, type: 'review', message: 'New 5-star review for Solar Power Bank', time: '2 hours ago', read: true },
];

const CommunicationTools = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [showComposer, setShowComposer] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'unread': return <Badge variant="destructive">Unread</Badge>;
      case 'read': return <Badge variant="secondary">Read</Badge>;
      case 'replied': return <Badge className="bg-green-600">Replied</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge variant="secondary">Medium</Badge>;
      case 'low': return <Badge variant="outline">Low</Badge>;
      default: return <Badge>{priority}</Badge>;
    }
  };

  const MessageComposer = () => (
    <Card>
      <CardHeader>
        <CardTitle>Compose Message</CardTitle>
        <CardDescription>Send a message to customers or team members</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="recipient">Recipient</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="team">Team Member</SelectItem>
                <SelectItem value="broadcast">Broadcast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter message subject" />
        </div>
        
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Type your message here..." rows={6} />
        </div>
        
        <div className="flex space-x-2">
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" onClick={() => setShowComposer(false)}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-green-600">-30min from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Ongoing threads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-green-600">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          onClick={() => {setActiveTab('messages'); setShowComposer(false);}}
          className={`pb-2 px-1 ${activeTab === 'messages' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <MessageSquare className="inline h-4 w-4 mr-2" />
          Customer Messages
        </button>
        <button
          onClick={() => {setActiveTab('notifications'); setShowComposer(false);}}
          className={`pb-2 px-1 ${activeTab === 'notifications' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <Bell className="inline h-4 w-4 mr-2" />
          Notifications
        </button>
        <button
          onClick={() => {setActiveTab('team'); setShowComposer(false);}}
          className={`pb-2 px-1 ${activeTab === 'team' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <Users className="inline h-4 w-4 mr-2" />
          Team Chat
        </button>
      </div>

      {showComposer && <MessageComposer />}

      {activeTab === 'messages' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customer Messages</CardTitle>
                <CardDescription>Manage customer inquiries and support requests</CardDescription>
              </div>
              <Button onClick={() => setShowComposer(!showComposer)}>
                <Send className="h-4 w-4 mr-2" />
                Compose
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMessages.map((msg) => (
                <div key={msg.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="font-medium">{msg.customer}</div>
                      {getStatusBadge(msg.status)}
                      {getPriorityBadge(msg.priority)}
                    </div>
                    <div className="font-medium text-sm mb-1">{msg.subject}</div>
                    <div className="text-sm text-muted-foreground mb-2">{msg.message}</div>
                    <div className="text-xs text-muted-foreground">{msg.date}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Reply</Button>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <CardTitle>System Notifications</CardTitle>
            <CardDescription>Important alerts and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNotifications.map((notification) => (
                <div key={notification.id} className={`flex items-center justify-between p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div>
                      <div className="font-medium">{notification.message}</div>
                      <div className="text-sm text-muted-foreground">{notification.time}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {notification.read ? 'Mark Unread' : 'Mark Read'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'team' && (
        <Card>
          <CardHeader>
            <CardTitle>Team Communication</CardTitle>
            <CardDescription>Internal messaging and collaboration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    SM
                  </div>
                  <div>
                    <div className="font-medium">Sales Team</div>
                    <div className="text-sm text-muted-foreground">5 members online</div>
                  </div>
                </div>
                <Button size="sm">Join Chat</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    CS
                  </div>
                  <div>
                    <div className="font-medium">Customer Support</div>
                    <div className="text-sm text-muted-foreground">3 members online</div>
                  </div>
                </div>
                <Button size="sm">Join Chat</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    MG
                  </div>
                  <div>
                    <div className="font-medium">Management</div>
                    <div className="text-sm text-muted-foreground">2 members online</div>
                  </div>
                </div>
                <Button size="sm">Join Chat</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunicationTools;
