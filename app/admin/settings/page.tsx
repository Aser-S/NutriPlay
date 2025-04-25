"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UserCog,
  Save,
  Lock,
  Bell,
  Upload,
  Database,
  Shield,
  Layout,
  PencilLine,
  Trash2,
  Building,
  UsersRound,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminSettingsPage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=120&width=120")
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)

  const handleSaveChanges = () => {
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <UserCog className="h-6 w-6 text-blue-500" />
              Admin Settings
            </h1>
            <p className="text-gray-500">Configure system settings and manage admin preferences</p>
          </div>
          <Button onClick={handleSaveChanges}>
            <Save className="h-4 w-4 mr-2" />
            <span>Save All Changes</span>
          </Button>
        </div>

        {showSaveConfirmation && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your settings have been saved successfully.</span>
          </div>
        )}

        {/* Settings Tabs */}
        <Tabs defaultValue="account">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-6">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                  <TabsTrigger value="account" className="justify-start w-full">
                    <UserCog className="h-4 w-4 mr-2" />
                    <span>Account</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start w-full">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Security</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="system" className="justify-start w-full">
                    <Database className="h-4 w-4 mr-2" />
                    <span>System</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="justify-start w-full">
                    <Layout className="h-4 w-4 mr-2" />
                    <span>Appearance</span>
                  </TabsTrigger>
                  <TabsTrigger value="organization" className="justify-start w-full">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Organization</span>
                  </TabsTrigger>
                  <TabsTrigger value="team" className="justify-start w-full">
                    <UsersRound className="h-4 w-4 mr-2" />
                    <span>Team Members</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and profile settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex flex-col items-center space-y-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={profileImage || "/placeholder.svg"} alt="Admin" />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            <span>Upload</span>
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex-1 grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Admin" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="User" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="admin@nutriplay.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Admin Role</Label>
                          <Select defaultValue="superadmin">
                            <SelectTrigger id="role">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="superadmin">Super Admin</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                              <SelectItem value="nutritionist">Nutritionist Admin</SelectItem>
                              <SelectItem value="support">Support Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Add a short professional bio..."
                            defaultValue="Experienced administrator with a focus on nutrition and child health."
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                    <CardDescription>Manage your account settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Time Zone</Label>
                        <p className="text-sm text-gray-500">Set your local time zone for scheduling</p>
                      </div>
                      <Select defaultValue="America/New_York">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Language</Label>
                        <p className="text-sm text-gray-500">Select your preferred language</p>
                      </div>
                      <Select defaultValue="en-US">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Date Format</Label>
                        <p className="text-sm text-gray-500">Set your preferred date display format</p>
                      </div>
                      <Select defaultValue="MM/DD/YYYY">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Enable additional security for your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password Settings</CardTitle>
                    <CardDescription>Update your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-gray-500">
                      Password must be at least 8 characters and include uppercase, lowercase, number, and special
                      character.
                    </div>
                    <Button onClick={handleSaveChanges}>Update Password</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Configure advanced security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Require a verification code when logging in</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <Button variant="outline" size="sm">
                          Setup
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Session Timeout</Label>
                        <p className="text-sm text-gray-500">Automatically log out after period of inactivity</p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Notifications</Label>
                        <p className="text-sm text-gray-500">Get notified of new logins to your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP Restrictions</Label>
                        <p className="text-sm text-gray-500">Limit access to specific IP addresses</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>Recent login activity and security events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b">
                          <div className="flex justify-between text-sm font-medium">
                            <span>Activity</span>
                            <span>Date & Time</span>
                          </div>
                        </div>
                        <div className="divide-y">
                          <div className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              <div>
                                <p className="font-medium">Successful login</p>
                                <p className="text-sm text-gray-500">IP: 192.168.1.1 - Chrome on macOS</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">Today, 9:30 AM</p>
                          </div>
                          <div className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <PencilLine className="h-4 w-4 text-blue-500" />
                              <div>
                                <p className="font-medium">Password changed</p>
                                <p className="text-sm text-gray-500">IP: 192.168.1.1 - Chrome on macOS</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">Yesterday, 2:45 PM</p>
                          </div>
                          <div className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              <div>
                                <p className="font-medium">Successful login</p>
                                <p className="text-sm text-gray-500">IP: 192.168.1.1 - Safari on iOS</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">April 20, 2025, 10:15 AM</p>
                          </div>
                          <div className="px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-red-500" />
                              <div>
                                <p className="font-medium">Failed login attempt</p>
                                <p className="text-sm text-gray-500">IP: 203.0.113.1 - Unknown</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">April 19, 2025, 11:30 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">View Full Activity Log</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Configure how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="email-system" defaultChecked />
                            <div>
                              <Label htmlFor="email-system">System Alerts</Label>
                              <p className="text-sm text-gray-500">Important system notifications and updates</p>
                            </div>
                          </div>
                          <Select defaultValue="real-time">
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="real-time">Real-time</SelectItem>
                              <SelectItem value="daily">Daily Digest</SelectItem>
                              <SelectItem value="off">Off</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="email-users" defaultChecked />
                            <div>
                              <Label htmlFor="email-users">User Activity</Label>
                              <p className="text-sm text-gray-500">New user registrations and profile updates</p>
                            </div>
                          </div>
                          <Select defaultValue="daily">
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="real-time">Real-time</SelectItem>
                              <SelectItem value="daily">Daily Digest</SelectItem>
                              <SelectItem value="off">Off</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="email-emergency" defaultChecked />
                            <div>
                              <Label htmlFor="email-emergency">Emergency Alerts</Label>
                              <p className="text-sm text-gray-500">Critical health alerts and emergencies</p>
                            </div>
                          </div>
                          <Select defaultValue="real-time">
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="real-time">Real-time</SelectItem>
                              <SelectItem value="daily">Daily Digest</SelectItem>
                              <SelectItem value="off">Off</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="email-consultations" defaultChecked />
                            <div>
                              <Label htmlFor="email-consultations">Consultations</Label>
                              <p className="text-sm text-gray-500">Consultation scheduling and updates</p>
                            </div>
                          </div>
                          <Select defaultValue="real-time">
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="real-time">Real-time</SelectItem>
                              <SelectItem value="daily">Daily Digest</SelectItem>
                              <SelectItem value="off">Off</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="push-emergency" defaultChecked />
                            <div>
                              <Label htmlFor="push-emergency">Emergency Alerts</Label>
                              <p className="text-sm text-gray-500">Critical health alerts and emergencies</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="push-messages" defaultChecked />
                            <div>
                              <Label htmlFor="push-messages">New Messages</Label>
                              <p className="text-sm text-gray-500">User chat and direct messages</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox id="push-consultations" defaultChecked />
                            <div>
                              <Label htmlFor="push-consultations">Consultation Reminders</Label>
                              <p className="text-sm text-gray-500">Upcoming consultations and schedule changes</p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveChanges}>Save Preferences</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Notification Settings</CardTitle>
                    <CardDescription>Configure notification delivery methods and quiet hours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Quiet Hours</Label>
                        <p className="text-sm text-gray-500">Don't send notifications during these hours</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive critical alerts via text message</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch />
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Desktop Notifications</Label>
                        <p className="text-sm text-gray-500">Show notifications in your browser</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Configuration</CardTitle>
                    <CardDescription>Manage system-wide settings and configurations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">General Settings</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Maintenance Mode</Label>
                          <p className="text-sm text-gray-500">Temporarily disable user access for maintenance</p>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>User Registration</Label>
                          <p className="text-sm text-gray-500">Allow new user registrations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maximum File Upload Size</Label>
                          <p className="text-sm text-gray-500">Set maximum size for user file uploads</p>
                        </div>
                        <Select defaultValue="10">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 MB</SelectItem>
                            <SelectItem value="10">10 MB</SelectItem>
                            <SelectItem value="20">20 MB</SelectItem>
                            <SelectItem value="50">50 MB</SelectItem>
                            <SelectItem value="100">100 MB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Database Settings</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Database Backup</Label>
                          <p className="text-sm text-gray-500">Schedule automatic database backups</p>
                        </div>
                        <Select defaultValue="daily">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="off">Off</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Data Retention</Label>
                          <p className="text-sm text-gray-500">Set how long to keep user data</p>
                        </div>
                        <Select defaultValue="1-year">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30-days">30 Days</SelectItem>
                            <SelectItem value="90-days">90 Days</SelectItem>
                            <SelectItem value="6-months">6 Months</SelectItem>
                            <SelectItem value="1-year">1 Year</SelectItem>
                            <SelectItem value="forever">Forever</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Configuration</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>API Access</Label>
                          <p className="text-sm text-gray-500">Enable external API access</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Rate Limiting</Label>
                          <p className="text-sm text-gray-500">Limit API requests per minute</p>
                        </div>
                        <Select defaultValue="100">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">50 requests/min</SelectItem>
                            <SelectItem value="100">100 requests/min</SelectItem>
                            <SelectItem value="500">500 requests/min</SelectItem>
                            <SelectItem value="1000">1000 requests/min</SelectItem>
                            <SelectItem value="unlimited">Unlimited</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveChanges}>Save Configuration</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Monitor system performance and health metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-800">System Status</h4>
                          <p className="text-2xl font-bold text-green-600">Healthy</p>
                          <p className="text-sm text-green-700">All systems operational</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-800">Server Load</h4>
                          <p className="text-2xl font-bold text-blue-600">23%</p>
                          <p className="text-sm text-blue-700">Normal operating range</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <h4 className="font-medium text-purple-800">Memory Usage</h4>
                          <p className="text-2xl font-bold text-purple-600">42%</p>
                          <p className="text-sm text-purple-700">3.4 GB of 8 GB used</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Recent System Events</h4>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="divide-y">
                            <div className="px-4 py-3 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <p className="font-medium">Database backup completed</p>
                              </div>
                              <p className="text-sm text-gray-500">Today, 3:15 AM</p>
                            </div>
                            <div className="px-4 py-3 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                <p className="font-medium">High server load detected</p>
                              </div>
                              <p className="text-sm text-gray-500">Yesterday, 2:30 PM</p>
                            </div>
                            <div className="px-4 py-3 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <p className="font-medium">System update installed</p>
                              </div>
                              <p className="text-sm text-gray-500">April 21, 2025, 1:45 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">View System Logs</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Settings</CardTitle>
                    <CardDescription>Customize the appearance of the admin dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Color Theme</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer bg-white">
                          <div className="h-20 w-full bg-blue-500 rounded-md"></div>
                          <p className="font-medium">Blue (Default)</p>
                          <div className="h-4 w-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer">
                          <div className="h-20 w-full bg-purple-500 rounded-md"></div>
                          <p className="font-medium">Purple</p>
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer">
                          <div className="h-20 w-full bg-green-500 rounded-md"></div>
                          <p className="font-medium">Green</p>
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Display Mode</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer bg-white">
                          <div className="h-20 w-full bg-white border rounded-md flex items-center justify-center">
                            <div className="h-12 w-12 bg-gray-800 rounded"></div>
                          </div>
                          <p className="font-medium">Light Mode</p>
                          <div className="h-4 w-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer">
                          <div className="h-20 w-full bg-gray-800 border rounded-md flex items-center justify-center">
                            <div className="h-12 w-12 bg-white rounded"></div>
                          </div>
                          <p className="font-medium">Dark Mode</p>
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Layout Options</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Sidebar Position</Label>
                            <p className="text-sm text-gray-500">Choose the sidebar position</p>
                          </div>
                          <Select defaultValue="left">
                            <SelectTrigger className="w-[200px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="left">Left</SelectItem>
                              <SelectItem value="right">Right</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Compact Mode</Label>
                            <p className="text-sm text-gray-500">Use a more compact layout</p>
                          </div>
                          <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Show Quick Actions</Label>
                            <p className="text-sm text-gray-500">Display quick action buttons in header</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveChanges}>Save Appearance</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Branding</CardTitle>
                    <CardDescription>Customize branding elements for your organization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="h-24 w-24 bg-gray-100 rounded-md flex items-center justify-center">
                          <img src="/placeholder.svg?height=96&width=96" alt="Logo" className="h-16 w-16" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            <span>Upload Logo</span>
                          </Button>
                        </div>
                      </div>

                      <div className="flex-1 grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company-name">Organization Name</Label>
                          <Input id="company-name" defaultValue="NutriPlay Health" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="primary-color">Primary Brand Color</Label>
                          <div className="flex gap-2">
                            <Input id="primary-color" defaultValue="#3B82F6" />
                            <div className="h-10 w-10 rounded bg-blue-500 border"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="favicon">Favicon</Label>
                          <div className="flex gap-2 items-center">
                            <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                              <img src="/placeholder.svg?height=32&width=32" alt="Favicon" className="h-6 w-6" />
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              <span>Upload Favicon</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Reset</Button>
                    <Button onClick={handleSaveChanges}>Save Branding</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="organization" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                    <CardDescription>Manage your organization information and settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization Name</Label>
                      <Input id="org-name" defaultValue="NutriPlay Health" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-email">Organization Email</Label>
                      <Input id="org-email" type="email" defaultValue="contact@nutriplay.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-phone">Organization Phone</Label>
                      <Input id="org-phone" type="tel" defaultValue="+1 (555) 987-6543" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-website">Website</Label>
                      <Input id="org-website" type="url" defaultValue="https://nutriplay.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-address">Address</Label>
                      <Textarea
                        id="org-address"
                        defaultValue="123 Nutrition Way, Health City, CA 90210, United States"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org-description">Organization Description</Label>
                      <Textarea
                        id="org-description"
                        defaultValue="NutriPlay Health is dedicated to improving children's nutrition through interactive and educational tools that make healthy eating fun and engaging."
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveChanges}>Save Organization</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Legal Information</CardTitle>
                    <CardDescription>Manage legal documents and compliance settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Privacy Policy</Label>
                        <p className="text-sm text-gray-500">Last updated: April 15, 2025</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Terms of Service</Label>
                        <p className="text-sm text-gray-500">Last updated: April 10, 2025</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Cookie Policy</Label>
                        <p className="text-sm text-gray-500">Last updated: April 5, 2025</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>GDPR Compliance</Label>
                        <p className="text-sm text-gray-500">Configure GDPR settings and consent management</p>
                      </div>
                      <Button variant="outline">Configure</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                    <CardDescription>Manage billing details and subscription information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800">Current Plan: Enterprise</h3>
                      <p className="text-sm text-blue-700">Your subscription renews on May 15, 2025</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Billing Contact</Label>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Finance Department</p>
                          <p className="text-sm text-gray-500">finance@nutriplay.com</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/2026</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Billing Address</Label>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">NutriPlay Health Inc.</p>
                          <p className="text-sm text-gray-500">123 Nutrition Way, Health City, CA 90210</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">View Invoices</Button>
                    <Button>Manage Subscription</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>Manage team members and their access permissions</CardDescription>
                    </div>
                    <Button>
                      <UsersRound className="h-4 w-4 mr-2" />
                      <span>Add Member</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2 border-b">
                          <div className="grid grid-cols-12 text-sm font-medium">
                            <span className="col-span-4">Name</span>
                            <span className="col-span-3">Role</span>
                            <span className="col-span-3">Status</span>
                            <span className="col-span-2">Actions</span>
                          </div>
                        </div>
                        <div className="divide-y">
                          <div className="px-4 py-3 grid grid-cols-12 items-center">
                            <div className="col-span-4 flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin User" />
                                <AvatarFallback>AU</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Admin User</p>
                                <p className="text-sm text-gray-500">admin@nutriplay.com</p>
                              </div>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Super Admin
                              </span>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Active
                              </span>
                            </div>
                            <div className="col-span-2 flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                          <div className="px-4 py-3 grid grid-cols-12 items-center">
                            <div className="col-span-4 flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Johnson" />
                                <AvatarFallback>SJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Sarah Johnson</p>
                                <p className="text-sm text-gray-500">sarah@nutriplay.com</p>
                              </div>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Nutritionist
                              </span>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Active
                              </span>
                            </div>
                            <div className="col-span-2 flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                          <div className="px-4 py-3 grid grid-cols-12 items-center">
                            <div className="col-span-4 flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Michael Chen" />
                                <AvatarFallback>MC</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Michael Chen</p>
                                <p className="text-sm text-gray-500">michael@nutriplay.com</p>
                              </div>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Support
                              </span>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Active
                              </span>
                            </div>
                            <div className="col-span-2 flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                          <div className="px-4 py-3 grid grid-cols-12 items-center">
                            <div className="col-span-4 flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jessica Lee" />
                                <AvatarFallback>JL</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Jessica Lee</p>
                                <p className="text-sm text-gray-500">jessica@nutriplay.com</p>
                              </div>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Content Manager
                              </span>
                            </div>
                            <div className="col-span-3">
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Invited
                              </span>
                            </div>
                            <div className="col-span-2 flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-gray-500">Showing 4 of 4 team members</div>
                    <div className="flex gap-2">
                      <Button variant="outline" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" disabled>
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Role Management</CardTitle>
                    <CardDescription>Configure roles and permissions for team members</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Super Admin</h3>
                          <p className="text-sm text-gray-500">Full access to all system features and settings</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Administrator</h3>
                          <p className="text-sm text-gray-500">Manage users, content, and most settings</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Nutritionist</h3>
                          <p className="text-sm text-gray-500">
                            Manage meal plans, consultations, and user health data
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Support</h3>
                          <p className="text-sm text-gray-500">Handle user inquiries and basic content management</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Content Manager</h3>
                          <p className="text-sm text-gray-500">Create and manage content, articles, and resources</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>
                      <PencilLine className="h-4 w-4 mr-2" />
                      <span>Create New Role</span>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </AppSidebar>
  )
}
