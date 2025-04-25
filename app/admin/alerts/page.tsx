"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  Info,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Search,
  AlarmClock,
  Clock,
  Trash,
  Filter,
  BellRing,
  UserPlus,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAlertsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [showNewAlert, setShowNewAlert] = useState(false)
  const [showAlertDetails, setShowAlertDetails] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)

  const alerts = [
    {
      id: 1,
      user: {
        name: "Youssef Amr",
        email: "youssef@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "allergy",
      severity: "high",
      status: "active",
      message: "Reported severe allergic reaction to peanuts after consuming school lunch",
      timestamp: "10 minutes ago",
      needsAction: true,
    },
    {
      id: 2,
      user: {
        name: "Mohamed Ahmed Beder",
        email: "mohamed@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "emergency",
      severity: "critical",
      status: "active",
      message: "Multiple vomiting episodes after dinner, possible food poisoning",
      timestamp: "25 minutes ago",
      needsAction: true,
    },
    {
      id: 3,
      user: {
        name: "Menna Atef",
        email: "menna@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "dietary",
      severity: "medium",
      status: "active",
      message: "Reports that recommended meal plan is causing stomach discomfort",
      timestamp: "45 minutes ago",
      needsAction: true,
    },
    {
      id: 4,
      user: {
        name: "Paula Hanna",
        email: "paula@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "allergy",
      severity: "low",
      status: "resolved",
      message: "Mild rash after eating strawberries - parent notified",
      timestamp: "2 hours ago",
      needsAction: false,
    },
    {
      id: 5,
      user: {
        name: "Basmala Hany",
        email: "basmala@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "dietary",
      severity: "medium",
      status: "resolved",
      message: "Child refusing to eat vegetables in meal plan - nutritionist contacted",
      timestamp: "3 hours ago",
      needsAction: false,
    },
    {
      id: 6,
      user: {
        name: "Omar Yasser",
        email: "omar@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      type: "emergency",
      severity: "high",
      status: "resolved",
      message: "Dizziness and nausea after workout - recommended immediate hydration and rest",
      timestamp: "Yesterday",
      needsAction: false,
    },
  ]

  const getTypeBadge = (type) => {
    switch (type) {
      case "allergy":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Allergy
          </Badge>
        )
      case "emergency":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            Emergency
          </Badge>
        )
      case "dietary":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Dietary
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge>{severity}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            Active
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert)
    setShowAlertDetails(true)
  }

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              Emergency Alerts
            </h1>
            <p className="text-gray-500">Monitor and respond to user health emergencies and concerns</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button variant="destructive" onClick={() => setShowNewAlert(true)}>
              <BellRing className="h-4 w-4 mr-2" />
              <span>New Alert</span>
            </Button>
          </div>
        </div>

        {/* Active Alerts Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-orange-700">3</CardTitle>
              <CardDescription className="text-orange-600">Active Alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-orange-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Requires immediate attention</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-red-700">1</CardTitle>
              <CardDescription className="text-red-600">Critical Alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Potential medical emergency</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-blue-700">2</CardTitle>
              <CardDescription className="text-blue-600">New Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Reported in the last 24 hours</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-green-700">12</CardTitle>
              <CardDescription className="text-green-600">Resolved This Week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Successfully addressed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <CardTitle>All Alerts</CardTitle>
                <CardDescription>View and manage user-reported health alerts</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search alerts..." className="pl-10" />
                </div>
                <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active" className="relative">
                      Active
                      {alerts.filter((a) => a.status === "active").length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {alerts.filter((a) => a.status === "active").length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts
                  .filter((alert) => {
                    if (selectedTab === "all") return true
                    return alert.status === selectedTab
                  })
                  .map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={alert.user.avatar || "/placeholder.svg"} alt={alert.user.name} />
                            <AvatarFallback>{alert.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{alert.user.name}</div>
                            <div className="text-sm text-gray-500">{alert.user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(alert.type)}</TableCell>
                      <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell className="max-w-[250px]">
                        <p className="truncate">{alert.message}</p>
                      </TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewAlert(alert)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-800 hover:bg-green-50"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                <span>Mark as Resolved</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserPlus className="mr-2 h-4 w-4" />
                                <span>Assign to Specialist</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Clock className="mr-2 h-4 w-4" />
                                <span>Schedule Follow-up</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete Alert</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                alerts.filter((alert) => {
                  if (selectedTab === "all") return true
                  return alert.status === selectedTab
                }).length
              }{" "}
              of {alerts.length} alerts
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

        {/* New Alert Dialog */}
        <Dialog open={showNewAlert} onOpenChange={setShowNewAlert}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Emergency Alert</DialogTitle>
              <DialogDescription>Create a new alert to notify the appropriate personnel</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="alert-user">User</Label>
                <Select>
                  <SelectTrigger id="alert-user">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {alerts.map((alert) => (
                      <SelectItem key={alert.id} value={alert.user.name}>
                        {alert.user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="alert-type">Alert Type</Label>
                <Select>
                  <SelectTrigger id="alert-type">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allergy">Allergy Reaction</SelectItem>
                    <SelectItem value="emergency">Medical Emergency</SelectItem>
                    <SelectItem value="dietary">Dietary Concern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Severity Level</Label>
                <RadioGroup defaultValue="medium">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="critical" />
                    <Label htmlFor="critical" className="text-red-700 font-medium">
                      Critical
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="text-orange-700 font-medium">
                      High
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="text-yellow-700 font-medium">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="text-green-700 font-medium">
                      Low
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="alert-message">Alert Message</Label>
                <Textarea id="alert-message" placeholder="Describe the emergency or health concern..." rows={4} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="alert-action">Recommended Action</Label>
                <Textarea id="alert-action" placeholder="Suggest immediate actions to be taken..." rows={2} />
              </div>
            </div>
            <DialogFooter className="flex justify-between gap-2">
              <Button variant="outline" onClick={() => setShowNewAlert(false)}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button variant="destructive">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Create & Call</span>
                </Button>
                <Button>
                  <BellRing className="h-4 w-4 mr-2" />
                  <span>Create Alert</span>
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Alert Details Dialog */}
        <Dialog open={showAlertDetails} onOpenChange={setShowAlertDetails}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <DialogTitle>Alert Details</DialogTitle>
              </div>
              <DialogDescription>
                {selectedAlert && (
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeBadge(selectedAlert.type)}
                    {getSeverityBadge(selectedAlert.severity)}
                    <span className="text-gray-500">{selectedAlert.timestamp}</span>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            {selectedAlert && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedAlert.user.avatar || "/placeholder.svg"} alt={selectedAlert.user.name} />
                    <AvatarFallback>{selectedAlert.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{selectedAlert.user.name}</h3>
                    <p className="text-gray-500">{selectedAlert.user.email}</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Alert Message</h4>
                  <p className="text-orange-700">{selectedAlert.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Status</p>
                    <div>{getStatusBadge(selectedAlert.status)}</div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Reported</p>
                    <p className="font-medium">{selectedAlert.timestamp}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Recent Health Data</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Meal Logged:</span>
                      <span>Today, 12:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Recent Symptoms:</span>
                      <span>Nausea, Vomiting</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Known Allergies:</span>
                      <span>Peanuts, Shellfish</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Take Action</h4>
                  <div className="space-y-2">
                    <Label htmlFor="alert-response">Response Notes</Label>
                    <Textarea id="alert-response" placeholder="Add your response notes here..." rows={3} />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-between gap-2">
              <Button variant="outline" onClick={() => setShowAlertDetails(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                  <AlarmClock className="h-4 w-4 mr-2" />
                  <span>Schedule Follow-up</span>
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Message</span>
                </Button>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Call</span>
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Resolve</span>
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppSidebar>
  )
}
