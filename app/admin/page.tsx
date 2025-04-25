"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  Search,
  MoreHorizontal,
  MessageSquare,
  Calendar,
  BarChart2,
  UserPlus,
  Filter,
  Download,
  ArrowUpDown,
  ChevronDown,
  Plus,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loginError, setLoginError] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)

  const handleLogin = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    // Simple validation
    if (email === "admin@nutriplay.com" && password === "admin123") {
      // Reset error state and proceed
      setLoginError("")
      // In a real app, this would handle auth state
      setActiveTab("dashboard")
    } else {
      setLoginAttempts((prev) => prev + 1)
      if (email !== "admin@nutriplay.com") {
        setLoginError("Invalid email address")
      } else {
        setLoginError("Incorrect password")
      }

      // Lock account after 5 attempts (demo only)
      if (loginAttempts >= 4) {
        setLoginError("Account temporarily locked. Please try again later or contact support.")
      }
    }
  }

  // Safe mock data for users
  const users = [
    {
      id: 1,
      name: "Basmala Hany",
      email: "basmala@example.com",
      status: "active",
      role: "parent",
      lastActive: "Today, 2:30 PM",
      dietaryRestrictions: ["Gluten-free"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Zeyad Tamer",
      email: "zeyad@example.com",
      status: "active",
      role: "parent",
      lastActive: "Today, 10:15 AM",
      dietaryRestrictions: ["Vegetarian", "Nut allergy"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Youssef Amr",
      email: "youssef@example.com",
      status: "active",
      role: "child",
      lastActive: "Yesterday, 4:45 PM",
      dietaryRestrictions: ["Dairy-free"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Mohamed Ahmed Beder",
      email: "mohamed@example.com",
      status: "active",
      role: "child",
      lastActive: "Today, 9:20 AM",
      dietaryRestrictions: ["Low-sodium"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Menna Atef",
      email: "menna@example.com",
      status: "active",
      role: "child",
      lastActive: "Yesterday, 1:30 PM",
      dietaryRestrictions: ["Vegan"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Safe mock data for consultations
  const consultations = [
    {
      id: 1,
      user: "Jane Doe",
      date: "April 22, 2025",
      time: "10:00 AM",
      type: "Initial Consultation",
      status: "scheduled",
      notes: "First-time consultation to discuss nutrition goals",
    },
    {
      id: 2,
      user: "John Smith",
      date: "April 22, 2025",
      time: "2:30 PM",
      type: "Follow-up",
      status: "scheduled",
      notes: "Monthly check-in on weight loss progress",
    },
    {
      id: 3,
      user: "Emily Johnson",
      date: "April 23, 2025",
      time: "11:15 AM",
      type: "Diet Plan Review",
      status: "scheduled",
      notes: "Review and adjust current meal plan",
    },
  ]

  // Safe data for charts
  const userActivityData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 15 },
    { name: "Wed", value: 12 },
    { name: "Thu", value: 18 },
    { name: "Fri", value: 20 },
    { name: "Sat", value: 16 },
    { name: "Sun", value: 14 },
  ]

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              Admin Dashboard
            </h1>
            <p className="text-gray-500">Manage users, consultations, and system settings</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 w-[250px]" />
            </div>
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="consultations" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Consultations</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            {loginError && (
              <Card className="mb-6 border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-500"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" x2="12" y1="8" y2="12"></line>
                      <line x1="12" x2="12.01" y1="16" y2="16"></line>
                    </svg>
                    <div>
                      <h3 className="font-medium text-red-700">Login Error</h3>
                      <p className="text-red-600 text-sm mt-1">{loginError}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "dashboard" && !loginError && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">152</CardTitle>
                    <CardDescription>Total Active Users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      +12% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">28</CardTitle>
                    <CardDescription>Scheduled Consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-blue-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      +5% from last week
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">87%</CardTitle>
                    <CardDescription>User Engagement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-green-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                          clipRule="evenodd"
                        />
                      </svg>
                      +3% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "dashboard" && loginError && (
              <Card>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="admin@nutriplay.com" required />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" placeholder="admin123" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "dashboard" && !loginError && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>User Activity</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <span>This Week</span>
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Today</DropdownMenuItem>
                          <DropdownMenuItem>This Week</DropdownMenuItem>
                          <DropdownMenuItem>This Month</DropdownMenuItem>
                          <DropdownMenuItem>This Year</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500">User activity chart would appear here</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download Report</span>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Dietary Preferences</CardTitle>
                      <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500">Dietary preferences chart would appear here</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download Report</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {activeTab === "dashboard" && !loginError && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                  <CardDescription>Latest actions from users on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Jane Doe</TableCell>
                        <TableCell>Updated meal preferences</TableCell>
                        <TableCell>10 minutes ago</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">John Smith</TableCell>
                        <TableCell>Logged breakfast</TableCell>
                        <TableCell>25 minutes ago</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Emily Johnson</TableCell>
                        <TableCell>Scheduled consultation</TableCell>
                        <TableCell>1 hour ago</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Michael Chen</TableCell>
                        <TableCell>Updated health profile</TableCell>
                        <TableCell>2 hours ago</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Sarah Williams</TableCell>
                        <TableCell>Created new goal</TableCell>
                        <TableCell>3 hours ago</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 mt-6">
            {activeTab === "users" && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Add, edit, or deactivate user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 border-r pr-4">
                      <h3 className="font-medium mb-3">User Actions</h3>
                      <div className="space-y-3">
                        <Button className="w-full">Add New User</Button>
                        <Button variant="outline" className="w-full">
                          Import Users
                        </Button>
                        <Button variant="outline" className="w-full">
                          Export User Data
                        </Button>
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
                          Manage Deactivated Users
                        </Button>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Bulk Actions</h3>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="message">Send Message</SelectItem>
                            <SelectItem value="approve">Approve Meal Plans</SelectItem>
                            <SelectItem value="export">Export Data</SelectItem>
                            <SelectItem value="deactivate">Deactivate</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="w-full mt-2">Apply to Selected</Button>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3">
                      <h3 className="font-medium mb-3">User Filters</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="nutritionist">Nutritionist</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Last Active" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="inactive">Inactive (30+ days)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b flex items-center">
                          <Checkbox id="select-all" className="mr-2" />
                          <Label htmlFor="select-all" className="text-sm font-medium">
                            Select All Users
                          </Label>
                        </div>
                        <ScrollArea className="h-[300px]">
                          <div className="divide-y">
                            {users &&
                              users.map((user) => (
                                <div key={user.id} className="p-3 flex items-center hover:bg-gray-50">
                                  <Checkbox id={`user-${user.id}`} className="mr-3" />
                                  <Avatar className="h-8 w-8 mr-3">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex justify-between">
                                      <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                      </div>
                                      <div className="text-right">
                                        <Badge
                                          variant="outline"
                                          className={
                                            user.status === "active"
                                              ? "bg-green-50 text-green-700"
                                              : "bg-gray-50 text-gray-700"
                                          }
                                        >
                                          {user.status}
                                        </Badge>
                                        <p className="text-xs text-gray-500 mt-1">{user.lastActive}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search users..." className="pl-10 w-[300px]" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filter</span>
                </Button>
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Add User</span>
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center gap-1">
                          <span>Name</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dietary Restrictions</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users &&
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {user.dietaryRestrictions &&
                                user.dietaryRestrictions.map((restriction, index) => (
                                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                                    {restriction}
                                  </Badge>
                                ))}
                            </div>
                          </TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuItem>Schedule Consultation</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Deactivate Account</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-gray-500">Showing 5 of 152 users</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-6 mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4 bg-blue-600 hover:bg-blue-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Schedule New Consultation</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule Consultation</DialogTitle>
                  <DialogDescription>Create a new consultation appointment with a user</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="user">Select User</Label>
                    <Select>
                      <SelectTrigger id="user">
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users &&
                          users.map((user) => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                              {user.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="consult-type">Consultation Type</Label>
                    <Select defaultValue="initial">
                      <SelectTrigger id="consult-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="initial">Initial Consultation</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="diet-review">Diet Plan Review</SelectItem>
                        <SelectItem value="emergency">Emergency Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Add any relevant notes about this consultation..." />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="send-notification" />
                    <Label htmlFor="send-notification">Send notification to user</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Schedule Consultation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search consultations..." className="pl-10 w-[300px]" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filter</span>
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                <span>Schedule Consultation</span>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Consultations</CardTitle>
                <CardDescription>Scheduled consultations with users</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations &&
                      consultations.map((consultation) => (
                        <TableRow key={consultation.id}>
                          <TableCell className="font-medium">{consultation.user}</TableCell>
                          <TableCell>{consultation.date}</TableCell>
                          <TableCell>{consultation.time}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                consultation.type === "Emergency Consultation"
                                  ? "bg-red-50 text-red-700"
                                  : consultation.type === "Initial Consultation"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-green-50 text-green-700"
                              }
                            >
                              {consultation.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{consultation.notes}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Consultation</DropdownMenuItem>
                                <DropdownMenuItem>Message User</DropdownMenuItem>
                                <DropdownMenuItem>Add Notes</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Cancel Consultation</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t p-4">
                <div className="text-sm text-gray-500">
                  Showing {consultations ? consultations.length : 0} of 28 consultations
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Chat Interface</CardTitle>
                <CardDescription>Message users and provide support</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center items-center h-[400px]">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Chat Interface</h3>
                    <p className="text-gray-500 mb-4">Select a user from the list to start a conversation</p>
                    <Button>View All Conversations</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  )
}
