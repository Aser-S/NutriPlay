"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Search,
  UserPlus,
  Filter,
  Download,
  ArrowUpDown,
  Trash2,
  Edit,
  Mail,
  X,
  CheckCheck,
  Ban,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function AdminUsersPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [showAddUser, setShowAddUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

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
      isCurrentUser: true, // Add this property
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
    {
      id: 6,
      name: "Omar Yasser",
      email: "omar@example.com",
      status: "inactive",
      role: "child",
      lastActive: "3 days ago",
      dietaryRestrictions: ["None"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Paula Hanna",
      email: "paula@example.com",
      status: "active",
      role: "child",
      lastActive: "Today, 11:45 AM",
      dietaryRestrictions: ["Vegetarian"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 8,
      name: "Rana Tarek",
      email: "rana@example.com",
      status: "active",
      role: "child",
      lastActive: "Yesterday, 3:15 PM",
      dietaryRestrictions: ["Gluten-free", "Dairy-free"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 9,
      name: "Hania Adel",
      email: "hania@example.com",
      status: "active",
      role: "child",
      lastActive: "Today, 1:20 PM",
      dietaryRestrictions: ["Nut allergy"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 10,
      name: "Aser Sherif",
      email: "aser@example.com",
      status: "inactive",
      role: "child",
      lastActive: "Last week",
      dietaryRestrictions: ["Low-carb"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditUser(true)
  }

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              User Management
            </h1>
            <p className="text-gray-500">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search users..." className="pl-10 w-[250px]" />
            </div>
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button variant="default" onClick={() => setShowAddUser(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              <span>Add User</span>
            </Button>
          </div>
        </div>

        {/* User Management Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Users</span>
                <span className="font-medium">152</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Active Users</span>
                <span className="font-medium">124</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Inactive Users</span>
                <span className="font-medium">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">New This Month</span>
                <span className="font-medium text-green-600">+18</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Download className="h-4 w-4 mr-2" />
                Export User Data
              </Button>
            </CardContent>
          </Card>

          <div className="md:col-span-3">
            <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  <TabsTrigger value="parents">Parents</TabsTrigger>
                  <TabsTrigger value="children">Children</TabsTrigger>
                </TabsList>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="message">Send Message</SelectItem>
                    <SelectItem value="activate">Activate</SelectItem>
                    <SelectItem value="deactivate">Deactivate</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Table - For All Tabs */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox id="select-all" />
                        </TableHead>
                        <TableHead className="w-[250px]">
                          <div className="flex items-center gap-1">
                            <span>Name</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users
                        .filter((user) => {
                          if (selectedTab === "all") return true
                          if (selectedTab === "active") return user.status === "active"
                          if (selectedTab === "inactive") return user.status === "inactive"
                          if (selectedTab === "parents") return user.role === "parent"
                          if (selectedTab === "children") return user.role === "child"
                          return true
                        })
                        .map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <Checkbox id={`select-user-${user.id}`} />
                            </TableCell>
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
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {user.role}
                              </Badge>
                            </TableCell>
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
                            <TableCell>{user.lastActive}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditUser(user)}
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                                {user.status === "active" ? (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                  >
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-green-600 hover:text-green-800 hover:bg-green-50"
                                  >
                                    <CheckCheck className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-gray-500">
                    Showing{" "}
                    {
                      users.filter((user) => {
                        if (selectedTab === "all") return true
                        if (selectedTab === "active") return user.status === "active"
                        if (selectedTab === "inactive") return user.status === "inactive"
                        if (selectedTab === "parents") return user.role === "parent"
                        if (selectedTab === "children") return user.role === "child"
                        return true
                      }).length
                    }{" "}
                    of {users.length} users
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
            </Tabs>
          </div>
        </div>

        {/* Add User Dialog */}
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account in the system.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="nutritionist">Nutritionist</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Restrictions</Label>
                <Select>
                  <SelectTrigger id="dietary">
                    <SelectValue placeholder="Select restrictions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten-free</SelectItem>
                    <SelectItem value="dairy-free">Dairy-free</SelectItem>
                    <SelectItem value="nut-allergy">Nut Allergy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information..." />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="send-welcome" defaultChecked />
                <Label htmlFor="send-welcome">Send welcome email</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information and settings.</DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4 py-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-first-name">First Name</Label>
                    <Input id="edit-first-name" defaultValue={selectedUser.name.split(" ")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-last-name">Last Name</Label>
                    <Input id="edit-last-name" defaultValue={selectedUser.name.split(" ")[1]} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <Select defaultValue={selectedUser.role}>
                      <SelectTrigger id="edit-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="nutritionist">Nutritionist</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select defaultValue={selectedUser.status}>
                      <SelectTrigger id="edit-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Dietary Restrictions</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.dietaryRestrictions.map((restriction, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 flex items-center gap-1">
                        <span>{restriction}</span>
                        <X className="h-3 w-3 cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-dietary">Add Dietary Restriction</Label>
                  <Select>
                    <SelectTrigger id="edit-dietary">
                      <SelectValue placeholder="Select restriction to add" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="gluten-free">Gluten-free</SelectItem>
                      <SelectItem value="dairy-free">Dairy-free</SelectItem>
                      <SelectItem value="nut-allergy">Nut Allergy</SelectItem>
                      <SelectItem value="low-sodium">Low Sodium</SelectItem>
                      <SelectItem value="low-carb">Low Carb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea id="edit-notes" placeholder="Any additional notes..." />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="edit-notification" />
                  <Label htmlFor="edit-notification">Notify user of changes</Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditUser(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppSidebar>
  )
}
