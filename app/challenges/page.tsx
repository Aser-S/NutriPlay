"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Trophy,
  Target,
  Calendar,
  Clock,
  CheckCircle,
  Zap,
  Award,
  Crown,
  Users,
  Plus,
  ArrowRight,
  Flame,
  Salad,
  Droplet,
  Egg,
  Activity,
} from "lucide-react"

// Mock data
const challenges = {
  daily: [
    {
      id: 1,
      name: "Eat 5 Vegetables",
      points: 50,
      completed: true,
      icon: "salad",
    },
    {
      id: 2,
      name: "Drink 8 Cups of Water",
      points: 30,
      completed: false,
      icon: "droplet",
    },
    {
      id: 3,
      name: "Log All Meals",
      points: 40,
      completed: true,
      icon: "clipboard-list",
    },
  ],
  weekly: [
    {
      id: 4,
      name: "Meal Prep Sunday",
      points: 100,
      progress: 1,
      total: 1,
      icon: "utensils",
    },
    {
      id: 5,
      name: "Protein Goal Streak",
      points: 150,
      progress: 3,
      total: 7,
      icon: "egg",
    },
    {
      id: 6,
      name: "Try New Recipe",
      points: 80,
      progress: 2,
      total: 3,
      icon: "activity",
    },
  ],
  monthly: [
    {
      id: 7,
      name: "Weight Goal",
      points: 300,
      progress: 60,
      total: 100,
      icon: "target",
    },
    {
      id: 8,
      name: "Reduce Added Sugar",
      points: 250,
      progress: 75,
      total: 100,
      icon: "trending-down",
    },
  ],
}

const leaderboard = [
  {
    id: 1,
    name: "NutriChamp",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 3750,
    isCurrentUser: false,
  },
  {
    id: 2,
    name: "HealthyHero",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 3420,
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "FitFoodie",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 3180,
    isCurrentUser: false,
  },
  {
    id: 4,
    name: "VeggieVanguard",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 2950,
    isCurrentUser: false,
  },
  {
    id: 5,
    name: "ProteinPro",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 2780,
    isCurrentUser: false,
  },
  {
    id: 6,
    name: "MealMaster",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 2540,
    isCurrentUser: false,
  },
  {
    id: 7,
    name: "NutritionNinja",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 2320,
    isCurrentUser: false,
  },
  {
    id: 8,
    name: "WellnessWarrior",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 2150,
    isCurrentUser: false,
  },
  {
    id: 9,
    name: "BalanceBuddy",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 1980,
    isCurrentUser: false,
  },
  {
    id: 10,
    name: "Jane Doe",
    avatar: "/placeholder.svg?height=50&width=50",
    points: 1250,
    isCurrentUser: true,
  },
]

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("daily")

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Challenges & Rewards
            </h1>
            <p className="text-gray-500">Complete challenges to earn points and badges</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>🎯 Create Your Own Challenge (Demo Only)</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Custom Challenge</DialogTitle>
                <DialogDescription>Design your own nutrition challenge to motivate yourself.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="challenge-name">Challenge Name</Label>
                  <Input id="challenge-name" placeholder="e.g., Eat 5 vegetables daily" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="challenge-description">Description</Label>
                  <Textarea id="challenge-description" placeholder="Describe your challenge..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="challenge-type">Type</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="challenge-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="challenge-points">Points</Label>
                    <Input id="challenge-points" type="number" placeholder="50" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="challenge-icon">Icon</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                    {[Salad, Droplet, Egg, Activity, Flame, Target].map((Icon, index) => (
                      <Button key={index} variant="outline" size="icon" className="h-10 w-10">
                        <Icon className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Challenge</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Challenge Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Challenge */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                Daily Challenge
              </CardTitle>
              <CardDescription>Complete today to earn points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Salad className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">🥦 Eat 5 green veggies!</h3>
                <p className="text-gray-600 mb-4">Include 5 different green vegetables in your meals today.</p>
                <Badge className="bg-green-500 hover:bg-green-600 mb-4">50 points</Badge>
                <Button className="w-full">Mark as Completed</Button>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Challenge */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Weekly Challenge
              </CardTitle>
              <CardDescription>Progress for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Droplet className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hydration Hero</h3>
                <p className="text-gray-600 mb-4">Drink 8 glasses of water every day this week.</p>
                <div className="w-full mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>3/7 days</span>
                  </div>
                  <Progress value={(3 / 7) * 100} className="h-2" />
                </div>
                <Badge className="bg-blue-500 hover:bg-blue-600 mb-4">100 points</Badge>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Your Badges
              </CardTitle>
              <CardDescription>Achievements you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                    <img src="/placeholder.svg?height=32&width=32" alt="Early Bird Badge" className="h-8 w-8" />
                  </div>
                  <span className="text-xs text-center">Early Bird</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                    <img src="/placeholder.svg?height=32&width=32" alt="Veggie Master Badge" className="h-8 w-8" />
                  </div>
                  <span className="text-xs text-center">Veggie Master</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                    <img src="/placeholder.svg?height=32&width=32" alt="Protein Pro Badge" className="h-8 w-8" />
                  </div>
                  <span className="text-xs text-center">Protein Pro</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Badges
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Challenge Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Challenge List */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Challenges</CardTitle>
                <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="daily" className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>Daily</span>
                    </TabsTrigger>
                    <TabsTrigger value="weekly" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Weekly</span>
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Monthly</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily" className="space-y-4 mt-4">
                    {challenges.daily.map((challenge) => (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          challenge.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${challenge.completed ? "bg-green-100" : "bg-gray-100"}`}>
                            {challenge.icon === "salad" && <Salad className="h-5 w-5 text-green-500" />}
                            {challenge.icon === "droplet" && <Droplet className="h-5 w-5 text-blue-500" />}
                            {challenge.icon === "clipboard-list" && <CheckCircle className="h-5 w-5 text-purple-500" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{challenge.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {challenge.points} points
                              </Badge>
                              {challenge.completed && <Badge className="bg-green-500 text-xs">Completed</Badge>}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={challenge.completed ? "outline" : "default"}
                          size="sm"
                          disabled={challenge.completed}
                        >
                          {challenge.completed ? "Completed" : "Complete"}
                        </Button>
                      </motion.div>
                    ))}
                  </TabsContent>

                  <TabsContent value="weekly" className="space-y-4 mt-4">
                    {challenges.weekly.map((challenge) => (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-gray-100">
                            {challenge.icon === "egg" && <Egg className="h-5 w-5 text-purple-500" />}
                            {challenge.icon === "utensils" && <Salad className="h-5 w-5 text-green-500" />}
                            {challenge.icon === "activity" && <Activity className="h-5 w-5 text-blue-500" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{challenge.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {challenge.points} points
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">
                            {challenge.progress}/{challenge.total}
                          </div>
                          <Progress value={(challenge.progress / challenge.total) * 100} className="h-2 w-24" />
                        </div>
                      </motion.div>
                    ))}
                  </TabsContent>

                  <TabsContent value="monthly" className="space-y-4 mt-4">
                    {challenges.monthly.map((challenge) => (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-gray-100">
                            {challenge.icon === "target" && <Target className="h-5 w-5 text-red-500" />}
                            {challenge.icon === "trending-down" && <Flame className="h-5 w-5 text-orange-500" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{challenge.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {challenge.points} points
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">{challenge.progress}%</div>
                          <Progress value={challenge.progress} className="h-2 w-24" />
                        </div>
                      </motion.div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardHeader>
              <CardContent>{/* Content is now inside TabsContent */}</CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  Leaderboard
                </CardTitle>
                <CardDescription>See how you rank against others</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-2">
                    {leaderboard.map((user, index) => (
                      <div
                        key={user.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.isCurrentUser ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 font-semibold text-gray-500">
                            {index + 1}
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {user.name}
                              {user.isCurrentUser && <span className="text-xs text-blue-500 ml-2">(You)</span>}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="font-semibold">{user.points}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Invite Friends</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Upcoming Challenges */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Challenges</CardTitle>
            <CardDescription>Special challenges starting soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <Badge className="bg-purple-500 mb-2">Starts in 2 days</Badge>
                <h3 className="text-lg font-semibold mb-2">7-Day Sugar Detox</h3>
                <p className="text-sm text-gray-600 mb-4">Eliminate added sugars from your diet for 7 days.</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">200 points</Badge>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <span>Join</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
                <Badge className="bg-blue-500 mb-2">Starts in 5 days</Badge>
                <h3 className="text-lg font-semibold mb-2">Protein Power Week</h3>
                <p className="text-sm text-gray-600 mb-4">Meet your protein goals every day for a week.</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">150 points</Badge>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <span>Join</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-teal-50">
                <Badge className="bg-green-500 mb-2">Starts in 1 week</Badge>
                <h3 className="text-lg font-semibold mb-2">Veggie Variety Challenge</h3>
                <p className="text-sm text-gray-600 mb-4">Try 15 different vegetables in two weeks.</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">175 points</Badge>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <span>Join</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppSidebar>
  )
}
