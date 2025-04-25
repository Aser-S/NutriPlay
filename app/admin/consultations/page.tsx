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
import {
  Search,
  MoreHorizontal,
  Calendar,
  Filter,
  CheckCircle2,
  X,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
  BarChart3,
  MessageSquare,
  FileText,
  VideoIcon,
  CalendarPlus,
  Phone,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function AdminConsultationsPage() {
  const [showNewConsultation, setShowNewConsultation] = useState(false)
  const [showConsultationDetails, setShowConsultationDetails] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState(null)

  const consultations = [
    {
      id: 1,
      user: {
        name: "Basmala Hany",
        email: "basmala@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 28, 2025",
      time: "10:00 AM",
      duration: "30 min",
      type: "Initial Consultation",
      status: "scheduled",
      notes: "First-time consultation to discuss nutrition goals for her children",
      method: "video",
    },
    {
      id: 2,
      user: {
        name: "Zeyad Tamer",
        email: "zeyad@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 28, 2025",
      time: "2:30 PM",
      duration: "45 min",
      type: "Follow-up",
      status: "scheduled",
      notes: "Monthly check-in on children's nutrition progress",
      method: "video",
    },
    {
      id: 3,
      user: {
        name: "Youssef Amr",
        email: "youssef@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 29, 2025",
      time: "11:15 AM",
      duration: "30 min",
      type: "Diet Plan Review",
      status: "confirmed",
      notes: "Review and adjust current meal plan",
      method: "in-person",
    },
    {
      id: 4,
      user: {
        name: "Mohamed Ahmed Beder",
        email: "mohamed@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 30, 2025",
      time: "3:00 PM",
      duration: "30 min",
      type: "Follow-up",
      status: "pending",
      notes: "Discuss progress with new dietary restrictions",
      method: "phone",
    },
    {
      id: 5,
      user: {
        name: "Menna Atef",
        email: "menna@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 2, 2025",
      time: "9:30 AM",
      duration: "60 min",
      type: "Emergency Consultation",
      status: "scheduled",
      notes: "Addressing recent allergic reaction concerns",
      method: "video",
    },
    {
      id: 6,
      user: {
        name: "Omar Yasser",
        email: "omar@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 3, 2025",
      time: "1:00 PM",
      duration: "30 min",
      type: "Initial Consultation",
      status: "cancelled",
      notes: "Cancelled by user",
      method: "video",
    },
    {
      id: 7,
      user: {
        name: "Paula Hanna",
        email: "paula@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 5, 2025",
      time: "4:30 PM",
      duration: "45 min",
      type: "Diet Plan Review",
      status: "scheduled",
      notes: "Quarterly review of nutrition plan",
      method: "video",
    },
  ]

  const handleViewConsultation = (consultation) => {
    setSelectedConsultation(consultation)
    setShowConsultationDetails(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Confirmed
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Scheduled
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Cancelled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-500" />
              Consultations
            </h1>
            <p className="text-gray-500">Manage and schedule consultations with users</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button onClick={() => setShowNewConsultation(true)}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              <span>New Consultation</span>
            </Button>
          </div>
        </div>

        {/* Calendar and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Consultations</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">April 2025</span>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {/* Previous month days */}
                  {[28, 29, 30, 31].map((day) => (
                    <div key={`prev-${day}`} className="h-16 p-1 border rounded bg-gray-50 text-gray-400">
                      <div className="flex justify-between">
                        <span>{day}</span>
                      </div>
                    </div>
                  ))}

                  {/* Current month days */}
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const date = `April ${day}, 2025`
                    const dayConsultations = consultations.filter((c) => c.date === date)

                    return (
                      <div
                        key={`curr-${day}`}
                        className={`h-16 p-1 border rounded hover:bg-gray-50 cursor-pointer ${
                          day === 28 ? "bg-blue-50 border-blue-200" : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <span>{day}</span>
                          {dayConsultations.length > 0 && (
                            <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {dayConsultations.length}
                            </span>
                          )}
                        </div>
                        {dayConsultations.length > 0 && (
                          <div className="mt-1 space-y-1">
                            {dayConsultations.slice(0, 2).map((consultation, idx) => (
                              <div key={idx} className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate">
                                {consultation.time} - {consultation.user.name}
                              </div>
                            ))}
                            {dayConsultations.length > 2 && (
                              <div className="text-xs text-blue-600">+ {dayConsultations.length - 2} more</div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {/* Next month days */}
                  {[1, 2, 3, 4].map((day) => (
                    <div key={`next-${day}`} className="h-16 p-1 border rounded bg-gray-50 text-gray-400">
                      <div className="flex justify-between">
                        <span>{day}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Export Calendar</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex justify-between">
                    <span className="font-medium">10:00 AM</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Confirmed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                      <AvatarFallback>BH</AvatarFallback>
                    </Avatar>
                    <span>Basmala Hany</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <VideoIcon className="h-3 w-3" />
                    <span>Video Call - 30 min</span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between">
                    <span className="font-medium">11:30 AM</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                      <AvatarFallback>PT</AvatarFallback>
                    </Avatar>
                    <span>Rana Tarek</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>In-person - 45 min</span>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between">
                    <span className="font-medium">2:30 PM</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Scheduled
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                      <AvatarFallback>ZT</AvatarFallback>
                    </Avatar>
                    <span>Zeyad Tamer</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <VideoIcon className="h-3 w-3" />
                    <span>Video Call - 45 min</span>
                  </div>
                </div>

                <div className="flex justify-center mt-2">
                  <Button variant="link" className="text-sm">
                    View Full Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Consultation Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Today</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">This Week</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">This Month</span>
                  <span className="font-medium">28</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span>Full Analytics</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Consultations List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Upcoming Consultations</CardTitle>
                <CardDescription>View and manage scheduled consultations</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search consultations..." className="pl-10" />
                </div>
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
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
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={consultation.user.avatar || "/placeholder.svg"}
                            alt={consultation.user.name}
                          />
                          <AvatarFallback>{consultation.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{consultation.user.name}</div>
                          <div className="text-sm text-gray-500">{consultation.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{consultation.date}</div>
                      <div className="text-sm text-gray-500">
                        {consultation.time} ({consultation.duration})
                      </div>
                    </TableCell>
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {consultation.method === "video" ? (
                          <VideoIcon className="h-4 w-4 text-blue-500" />
                        ) : consultation.method === "phone" ? (
                          <Phone className="h-4 w-4 text-green-500" />
                        ) : (
                          <Calendar className="h-4 w-4 text-purple-500" />
                        )}
                        <span className="capitalize">{consultation.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewConsultation(consultation)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                          <X className="h-4 w-4" />
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
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Message User</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Reschedule</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                              <span>Send Reminder</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              <span>Cancel Consultation</span>
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
              Showing {consultations.length} of {consultations.length} consultations
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

        {/* New Consultation Dialog */}
        <Dialog open={showNewConsultation} onOpenChange={setShowNewConsultation}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Consultation</DialogTitle>
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
                    {consultations.map((consultation) => (
                      <SelectItem key={consultation.id} value={consultation.id.toString()}>
                        {consultation.user.name}
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

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="method">Method</Label>
                  <Select defaultValue="video">
                    <SelectTrigger id="method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add any relevant notes about this consultation..." />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="send-notification" defaultChecked />
                <Label htmlFor="send-notification">Send notification to user</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewConsultation(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Consultation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Consultation Details Dialog */}
        <Dialog open={showConsultationDetails} onOpenChange={setShowConsultationDetails}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Consultation Details</DialogTitle>
              <DialogDescription>
                {selectedConsultation && (
                  <span>
                    {selectedConsultation.date} at {selectedConsultation.time} ({selectedConsultation.duration})
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            {selectedConsultation && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedConsultation.user.avatar || "/placeholder.svg"}
                      alt={selectedConsultation.user.name}
                    />
                    <AvatarFallback>{selectedConsultation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{selectedConsultation.user.name}</h3>
                    <p className="text-gray-500">{selectedConsultation.user.email}</p>
                  </div>
                  {getStatusBadge(selectedConsultation.status)}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Consultation Type</p>
                    <p className="font-medium">{selectedConsultation.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Method</p>
                    <p className="font-medium capitalize">{selectedConsultation.method}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {selectedConsultation.date}, {selectedConsultation.time}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{selectedConsultation.duration}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-500 text-sm">Notes</p>
                  <div className="bg-gray-50 border rounded-md p-3 text-sm">{selectedConsultation.notes}</div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Recent User Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <div className="w-4 h-4 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <p>Updated meal preferences</p>
                        <p className="text-gray-500">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <p>Logged 5 meals</p>
                        <p className="text-gray-500">Last week</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <p>Completed weekly survey</p>
                        <p className="text-gray-500">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-between gap-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Message</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Reschedule</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <X className="h-4 w-4 mr-2" />
                  <span>Cancel</span>
                </Button>
                <Button>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <span>Confirm</span>
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppSidebar>
  )
}
