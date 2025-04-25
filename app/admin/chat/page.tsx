"use client"

import { useState, useRef, useEffect } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, User, Clock, Calendar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Mock data for chat users
const chatUsers = [
  {
    id: 1,
    name: "Zeyad Tamer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "I need help with my meal plan",
    time: "10:30 AM",
    unread: 2,
    isParent: true,
  },
  {
    id: 2,
    name: "Menna Atef",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Thanks for the advice!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Omar Yasser",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "How can I track my progress?",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 4,
    name: "Paula Hanna",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Is this meal suitable for allergies?",
    time: "Monday",
    unread: 0,
  },
  {
    id: 5,
    name: "Rana Tarek",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "I'll try that recipe tonight",
    time: "Monday",
    unread: 0,
  },
]

// Mock chat messages for Zeyad Tamer
const zeyadMessages = [
  {
    id: 1,
    sender: "user",
    message: "Hello, I need some help with my son's meal plan. He's been having trouble with his current diet.",
    time: "10:15 AM",
  },
  {
    id: 2,
    sender: "admin",
    message:
      "Hi Zeyad, I'd be happy to help with your son's meal plan. Could you tell me more about his current diet and what issues he's experiencing?",
    time: "10:18 AM",
  },
  {
    id: 3,
    sender: "user",
    message:
      "He's 8 years old and has been following the standard meal plan from the app, but he's been complaining about stomach discomfort after meals.",
    time: "10:22 AM",
  },
  {
    id: 4,
    sender: "admin",
    message:
      "I'm sorry to hear that. There could be several reasons for the discomfort. Has he been diagnosed with any food allergies or intolerances?",
    time: "10:25 AM",
  },
  {
    id: 5,
    sender: "user",
    message: "No diagnosed allergies, but we suspect he might be sensitive to dairy. We haven't had him tested yet.",
    time: "10:28 AM",
  },
  {
    id: 6,
    sender: "admin",
    message:
      "That's helpful information. I can suggest a modified meal plan that reduces dairy while we figure out if that's the issue. Would you like me to create a custom plan for him?",
    time: "10:30 AM",
  },
]

export default function AdminChatPage() {
  const [activeUser, setActiveUser] = useState(chatUsers[0])
  const [messages, setMessages] = useState(zeyadMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef(null)

  // Filter users based on search term
  const filteredUsers = chatUsers.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      sender: "admin",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <AppSidebar>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Left sidebar - User list */}
          <div className="w-full md:w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="flex-1 flex flex-col min-h-0">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                  <TabsTrigger value="parents" className="flex-1">
                    Parents
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <TabsContent value="all" className="m-0">
                  <div className="divide-y">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`p-3 flex items-start gap-3 cursor-pointer hover:bg-gray-50 ${activeUser.id === user.id ? "bg-gray-50" : ""}`}
                        onClick={() => setActiveUser(user)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${user.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                          ></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">{user.name}</h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap">{user.time}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                        </div>
                        {user.unread > 0 && (
                          <Badge variant="default" className="ml-auto">
                            {user.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="unread" className="m-0">
                  <div className="divide-y">
                    {filteredUsers
                      .filter((user) => user.unread > 0)
                      .map((user) => (
                        <div
                          key={user.id}
                          className={`p-3 flex items-start gap-3 cursor-pointer hover:bg-gray-50 ${activeUser.id === user.id ? "bg-gray-50" : ""}`}
                          onClick={() => setActiveUser(user)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${user.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                            ></span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium truncate">{user.name}</h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap">{user.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                          </div>
                          <Badge variant="default" className="ml-auto">
                            {user.unread}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="parents" className="m-0">
                  <div className="divide-y">
                    {filteredUsers
                      .filter((user) => user.isParent)
                      .map((user) => (
                        <div
                          key={user.id}
                          className={`p-3 flex items-start gap-3 cursor-pointer hover:bg-gray-50 ${activeUser.id === user.id ? "bg-gray-50" : ""}`}
                          onClick={() => setActiveUser(user)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span
                              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${user.status === "online" ? "bg-green-500" : "bg-gray-300"}`}
                            ></span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium truncate">{user.name}</h3>
                              <span className="text-xs text-gray-500 whitespace-nowrap">{user.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                          </div>
                          {user.unread > 0 && (
                            <Badge variant="default" className="ml-auto">
                              {user.unread}
                            </Badge>
                          )}
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Right side - Chat area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeUser.avatar || "/placeholder.svg"} alt={activeUser.name} />
                  <AvatarFallback>{activeUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{activeUser.name}</h2>
                  <p className="text-sm text-gray-500">{activeUser.status === "online" ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] ${msg.sender === "admin" ? "bg-blue-500 text-white" : "bg-gray-100"} rounded-lg p-3`}
                    >
                      <p>{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "admin" ? "text-blue-100" : "text-gray-500"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Chat input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  <span>Send</span>
                </Button>
              </div>
            </div>
          </div>

          {/* User info sidebar - Only visible on larger screens */}
          <div className="hidden lg:block w-80 border-l">
            <div className="p-4 flex flex-col items-center text-center border-b">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={activeUser.avatar || "/placeholder.svg"} alt={activeUser.name} />
                <AvatarFallback>{activeUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{activeUser.name}</h2>
              <p className="text-sm text-gray-500">{activeUser.isParent ? "Parent" : "User"}</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  <span>View Profile</span>
                </Button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium mb-2">User Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Last Active</p>
                    <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    <p className="text-sm text-gray-500">March 15, 2025</p>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mt-6 mb-2">Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Schedule Consultation</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  <span>View Meal Plan</span>
                </Button>
              </div>

              <h3 className="font-medium mt-6 mb-2">Notes</h3>
              <Card>
                <CardContent className="p-3">
                  <p className="text-sm">
                    Parent of an 8-year-old boy with possible dairy sensitivity. Currently using standard meal plan but
                    experiencing discomfort.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppSidebar>
  )
}
