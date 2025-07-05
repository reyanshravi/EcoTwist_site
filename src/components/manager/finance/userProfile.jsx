import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Shield, Bell, Activity, Save, Upload, Lock, BellOff, Search, Download } from 'lucide-react';
import { useState } from 'react';

const UserProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [bannerPic, setBannerPic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const activitiesPerPage = 4;

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleBannerPicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerPic(URL.createObjectURL(file));
    }
  };

  const handleClearActivities = () => {
    // Placeholder for clearing activities
    alert('Activity log cleared');
  };

  const handleExportActivities = () => {
    // Placeholder for exporting activities
    alert('Activity log exported');
  };

  const activities = [
    { id: 1, action: 'Updated product pricing', details: 'Solar Power Bank', time: '2 hours ago', type: 'Product' },
    { id: 2, action: 'Processed order #ORD-1234', details: 'Marked as shipped', time: '4 hours ago', type: 'Order' },
    { id: 3, action: 'Added inventory stock', details: 'Eco Water Bottle +50 units', time: 'Yesterday', type: 'Inventory' },
    { id: 4, action: 'Login from new device', details: 'Chrome on Windows', time: '2 days ago', type: 'Security' },
    { id: 5, action: 'Updated profile bio', details: 'Added new description', time: '3 days ago', type: 'Profile' },
  ];

  const filteredActivities = activities.filter(
    (activity) =>
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * activitiesPerPage,
    currentPage * activitiesPerPage
  );

  return (
    <div className="container max-w-7xl mx-auto  space-y-6 bg-gray-50 min-h-screen">
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
            {bannerPic && (
              <img
                src={bannerPic}
                alt="Profile Banner"
                className="w-full h-24 object-cover mb-4 rounded-t-2xl"
              />
            )}
            <CardTitle className="flex items-center text-xl sm:text-2xl font-bold text-gray-800">
              <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-indigo-600" />
              Profile Settings
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm sm:text-base">Customize your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex justify-center mb-4 sm:mb-6 relative">
              <div className="relative">
                <img
                  src={profilePic || 'https://via.placeholder.com/120'}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500"
                  aria-label="Upload profile picture"
                >
                  <Upload className="h-4 w-4" />
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="bannerPic" className="text-gray-700 font-medium text-sm sm:text-base">Profile Banner</Label>
              <Input
                id="bannerPic"
                type="file"
                accept="image/*"
                className="mt-1 rounded-lg"
                onChange={handleBannerPicChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-700 font-medium text-sm sm:text-base">First Name</Label>
                <Input id="firstName" defaultValue="John" className="mt-1 rounded-lg focus:ring-indigo-500" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 font-medium text-sm sm:text-base">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="mt-1 rounded-lg focus:ring-indigo-500" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" className="mt-1 rounded-lg focus:ring-indigo-500" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium text-sm sm:text-base">Phone Number</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1 rounded-lg focus:ring-indigo-500" />
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-700 font-medium text-sm sm:text-base">Bio</Label>
              <Input id="bio" defaultValue="Product enthusiast at Example Corp" className="mt-1 rounded-lg focus:ring-indigo-500" />
            </div>
            <div>
              <Label htmlFor="visibility" className="text-gray-700 font-medium text-sm sm:text-base">Profile Visibility</Label>
              <Select defaultValue="public">
                <SelectTrigger className="mt-1 rounded-lg focus:ring-indigo-500">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="team">Team Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone" className="text-gray-700 font-medium text-sm sm:text-base">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger className="mt-1 rounded-lg focus:ring-indigo-500">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                  <SelectItem value="ist">IST</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="twitter" className="text-gray-700 font-medium text-sm sm:text-base">Twitter Handle</Label>
                <Input id="twitter" defaultValue="@johndoe" className="mt-1 rounded-lg focus:ring-indigo-500" />
              </div>
              <div>
                <Label htmlFor="linkedin" className="text-gray-700 font-medium text-sm sm:text-base">LinkedIn Profile</Label>
                <Input id="linkedin" defaultValue="linkedin.com/in/johndoe" className="mt-1 rounded-lg focus:ring-indigo-500" />
              </div>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-indigo-500">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 p-5">
            <CardTitle className="flex items-center text-xl sm:text-2xl font-bold text-gray-800">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-teal-600" />
              Security Settings
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm sm:text-base">Secure your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Enable 2FA for extra security</p>
              </div>
              <Switch aria-label="Toggle two-factor authentication" />
            </div>
            <Separator />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Login Alerts</Label>
                <p className="text-sm text-gray-500">Receive alerts for unrecognized logins</p>
              </div>
              <Switch aria-label="Toggle login alerts" />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium text-sm sm:text-base">Security Question</Label>
              <Select defaultValue="question1">
                <SelectTrigger className="mt-1 rounded-lg focus:ring-teal-500">
                  <SelectValue placeholder="Select a question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="question1">What is your mother's maiden name?</SelectItem>
                  <SelectItem value="question2">What was your first pet's name?</SelectItem>
                  <SelectItem value="question3">What is your favorite book?</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Enter your answer"
                className="mt-1 rounded-lg focus:ring-teal-500"
                aria-label="Security question answer"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium text-sm sm:text-base">Trusted Devices</Label>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Chrome on Windows - Added 2025-07-01</div>
                <Button
                  variant="outline"
                  className="mt-2 border-red-600 text-red-600 hover:bg-red-50 text-sm focus:ring-2 focus:ring-red-500"
                >
                  Remove Device
                </Button>
              </div>
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700 transition-colors rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500">
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 p-5">
            <CardTitle className="flex items-center text-xl sm:text-2xl font-bold text-gray-800">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-purple-600" />
              Notification Settings
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm sm:text-base">Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Low Stock Alerts</Label>
                <p className="text-sm text-gray-500">Get notified when products are running low</p>
              </div>
              <Switch aria-label="Toggle low stock alerts" />
            </div>
            <Separator />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">New Order Notifications</Label>
                <p className="text-sm text-gray-500">Receive alerts for new customer orders</p>
              </div>
              <Switch defaultChecked aria-label="Toggle new order notifications" />
            </div>
            <Separator />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Payment Alerts</Label>
                <p className="text-sm text-gray-500">Get notified about payment issues</p>
              </div>
              <Switch aria-label="Toggle payment alerts" />
            </div>
            <Separator />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Weekly Reports</Label>
                <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
              </div>
              <Switch defaultChecked aria-label="Toggle weekly reports" />
            </div>
            <Separator />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Marketing Updates</Label>
                <p className="text-sm text-gray-500">Receive promotional campaign updates</p>
              </div>
              <Switch aria-label="Toggle marketing updates" />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium text-sm sm:text-base">Notification Delivery</Label>
              <Select defaultValue="email">
                <SelectTrigger className="mt-1 rounded-lg focus:ring-purple-500">
                  <SelectValue placeholder="Select delivery method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="push">Push Notifications</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Notification Sound</Label>
                <p className="text-sm text-gray-500">Enable sound for notifications</p>
              </div>
              <Switch aria-label="Toggle notification sound" />
            </div>
            <Separator />
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium text-sm sm:text-base">Notification Schedule</Label>
              <Select defaultValue="anytime">
                <SelectTrigger className="mt-1 rounded-lg focus:ring-purple-500">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">Anytime</SelectItem>
                  <SelectItem value="business">Business Hours (9 AM - 5 PM)</SelectItem>
                  <SelectItem value="custom">Custom Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <Label className="text-gray-700 font-medium text-sm sm:text-base">Snooze Notifications</Label>
                <p className="text-sm text-gray-500">Pause notifications temporarily</p>
              </div>
              <Switch aria-label="Toggle snooze notifications" />
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-purple-500">
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5">
            <CardTitle className="flex items-center text-xl sm:text-2xl font-bold text-gray-800">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-orange-600" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm sm:text-base">Your recent actions and login history</CardDescription>
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center w-full sm:w-auto">
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-lg focus:ring-indigo-500"
                  aria-label="Search activities"
                />
                <Search className="h-5 w-5 ml-2 text-gray-500" />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm focus:ring-2 focus:ring-indigo-500"
                  onClick={handleExportActivities}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Log
                </Button>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 text-sm focus:ring-2 focus:ring-red-500"
                  onClick={handleClearActivities}
                >
                  Clear Log
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {paginatedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-800 text-sm sm:text-base">{activity.action}</div>
                    <div className="text-sm text-gray-500">{activity.details} - {activity.time}</div>
                  </div>
                  <Badge variant="outline" className="border-indigo-600 text-indigo-600 text-sm">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm focus:ring-2 focus:ring-indigo-500"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-label="Previous page"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm focus:ring-2 focus:ring-indigo-500"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next page"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;