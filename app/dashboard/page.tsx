"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bell,
  Calendar,
  ChevronRight,
  Droplet,
  Flame,
  Heart,
  Info,
  Leaf,
  Plus,
  Star,
  Trophy,
  Utensils,
  Zap,
  Award,
  Sunrise,
  Dumbbell,
  Salad,
  Carrot,
  Droplets,
  Target,
} from "lucide-react"
import { userData, challenges, nutritionTips } from "@/lib/mock-data"

// Badge icon component to display colorful icons for badges
const BadgeIcon = ({ name }) => {
  const lowercaseName = name.toLowerCase()

  if (lowercaseName.includes("early bird")) return <Sunrise className="h-8 w-8 text-amber-500" />
  if (lowercaseName.includes("protein")) return <Dumbbell className="h-8 w-8 text-purple-500" />
  if (lowercaseName.includes("veggie")) return <Carrot className="h-8 w-8 text-green-500" />
  if (lowercaseName.includes("hydration")) return <Droplets className="h-8 w-8 text-blue-500" />
  if (lowercaseName.includes("meal")) return <Utensils className="h-8 w-8 text-orange-500" />

  // Default badge icon
  return <Award className="h-8 w-8 text-indigo-500" />
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate progress percentages
  const caloriesProgress = (userData.progress.calories / userData.dailyGoals.calories) * 100
  const proteinProgress = (userData.progress.protein / userData.dailyGoals.protein) * 100
  const carbsProgress = (userData.progress.carbs / userData.dailyGoals.carbs) * 100
  const fatProgress = (userData.progress.fat / userData.dailyGoals.fat) * 100
  const waterProgress = (userData.progress.water / userData.dailyGoals.water) * 100

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {userData.name}!</h1>
            <p className="text-gray-500">Track your nutrition, set goals, and improve your health.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Today</span>
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              <span>Log Meal</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Daily Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span>Daily Nutrition Progress</span>
                  </CardTitle>
                  <CardDescription>Your nutrition goals for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Calories</span>
                      </div>
                      <span className="text-sm">
                        {userData.progress.calories} / {userData.dailyGoals.calories} kcal
                      </span>
                    </div>
                    <Progress value={caloriesProgress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Protein</span>
                      </div>
                      <span className="text-sm">
                        {userData.progress.protein}g / {userData.dailyGoals.protein}g
                      </span>
                    </div>
                    <Progress value={proteinProgress} className="h-2 bg-purple-100">
                      <div className="h-full bg-purple-500 transition-all" style={{ width: `${proteinProgress}%` }} />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Carbs</span>
                      </div>
                      <span className="text-sm">
                        {userData.progress.carbs}g / {userData.dailyGoals.carbs}g
                      </span>
                    </div>
                    <Progress value={carbsProgress} className="h-2 bg-green-100">
                      <div className="h-full bg-green-500 transition-all" style={{ width: `${carbsProgress}%` }} />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Fat</span>
                      </div>
                      <span className="text-sm">
                        {userData.progress.fat}g / {userData.dailyGoals.fat}g
                      </span>
                    </div>
                    <Progress value={fatProgress} className="h-2 bg-red-100">
                      <div className="h-full bg-red-500 transition-all" style={{ width: `${fatProgress}%` }} />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Water</span>
                      </div>
                      <span className="text-sm">
                        {userData.progress.water} / {userData.dailyGoals.water} cups
                      </span>
                    </div>
                    <Progress value={waterProgress} className="h-2 bg-blue-100">
                      <div className="h-full bg-blue-500 transition-all" style={{ width: `${waterProgress}%` }} />
                    </Progress>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Update Progress
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <span>Achievements</span>
                  </CardTitle>
                  <CardDescription>Your earned badges and streaks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white p-3 rounded-full">
                      <Flame className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{userData.streakDays} Day Streak</p>
                      <p className="text-sm text-gray-500">Keep it up!</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {userData.badges.map((badge, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border flex items-start gap-3 ${
                          badge.earned
                            ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                      >
                        <div
                          className={`rounded-full p-2 ${
                            badge.earned
                              ? "bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-600"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <BadgeIcon name={badge.name} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${badge.earned ? "text-indigo-700" : "text-gray-500"}`}>
                            {badge.name}
                          </p>
                          <p className="text-xs text-gray-500">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Badges
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white p-3 rounded-full">
                      <Utensils className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-green-800">Plan Your Meals</h3>
                      <p className="text-sm text-green-700">Create a weekly meal plan</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-green-700">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-3 rounded-full">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-blue-800">Track Progress</h3>
                      <p className="text-sm text-blue-700">View your nutrition trends</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-blue-700">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-3 rounded-full">
                      <Bell className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-purple-800">Set Reminders</h3>
                      <p className="text-sm text-purple-700">Never miss a meal or water</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-purple-700">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nutrition Tip */}
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-amber-400 to-yellow-500 text-white p-3 rounded-full">
                    <Info className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-800 mb-1">Nutrition Tip of the Day</h3>
                    <p className="text-amber-700">{nutritionTips[0]}</p>
                    <Button variant="link" className="p-0 h-auto mt-2 text-amber-800">
                      Read More Tips
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    <span>Daily Challenges</span>
                  </CardTitle>
                  <CardDescription>Complete these challenges today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {challenges.daily.map((challenge) => (
                    <div key={challenge.id} className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          challenge.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {challenge.icon === "salad" ? (
                          <Salad className="h-5 w-5" />
                        ) : challenge.icon === "droplet" ? (
                          <Droplet className="h-5 w-5" />
                        ) : (
                          <Utensils className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{challenge.name}</p>
                          <Badge
                            variant="outline"
                            className={`${
                              challenge.completed
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }`}
                          >
                            {challenge.points} pts
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${challenge.completed ? "bg-green-500" : "bg-gray-300"}`}
                              style={{ width: challenge.completed ? "100%" : "0%" }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">
                            {challenge.completed ? "Completed" : "Incomplete"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View All Daily Challenges</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-500" />
                    <span>Weekly & Monthly Challenges</span>
                  </CardTitle>
                  <CardDescription>Your ongoing long-term challenges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...challenges.weekly, ...challenges.monthly].map((challenge) => (
                    <div key={challenge.id} className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                        {challenge.icon === "utensils" ? (
                          <Utensils className="h-5 w-5" />
                        ) : challenge.icon === "egg" ? (
                          <Zap className="h-5 w-5" />
                        ) : challenge.icon === "activity" ? (
                          <Zap className="h-5 w-5" />
                        ) : challenge.icon === "target" ? (
                          <Target className="h-5 w-5" />
                        ) : (
                          <Trophy className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{challenge.name}</p>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {challenge.points} pts
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">
                            {challenge.progress}/{challenge.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View All Challenges</Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Join New Challenges</CardTitle>
                <CardDescription>Boost your motivation with these challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <Salad className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-green-800">Plant-Based Week</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Try eating plant-based meals for a week and discover new recipes.
                    </p>
                    <Badge className="bg-green-100 text-green-700 border-green-200">200 points</Badge>
                  </div>

                  <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                        <Droplet className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-blue-800">Hydration Challenge</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Drink 10 cups of water daily for 30 days to improve your hydration habits.
                    </p>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">150 points</Badge>
                  </div>

                  <div className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                        <Zap className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-purple-800">Protein Power</h3>
                    </div>
                    <p className="text-sm text-purple-700 mb-3">
                      Meet your daily protein goals for 14 consecutive days.
                    </p>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">250 points</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Browse All Available Challenges</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Insights</CardTitle>
                <CardDescription>AI-powered analysis of your eating patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Meal Timing Patterns</h3>
                  <p className="text-blue-700">
                    You tend to eat dinner later than recommended (after 8 PM) on weekdays. This may affect your sleep
                    quality and metabolism.
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-200">
                      View Recommendations
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-green-50 border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Positive Trends</h3>
                  <p className="text-green-700">
                    Your vegetable intake has increased by 25% in the last month. Keep up the good work!
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="text-green-700 border-green-200">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-100">
                  <h3 className="font-medium text-yellow-800 mb-2">Areas for Improvement</h3>
                  <p className="text-yellow-700">
                    Your fiber intake is below recommended levels. Consider adding more whole grains, legumes, and
                    fruits to your diet.
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="text-yellow-700 border-yellow-200">
                      Get Suggestions
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Comprehensive Report</Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Tips</CardTitle>
                  <CardDescription>Helpful advice for your health journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nutritionTips.slice(0, 5).map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-amber-100 text-amber-600 mt-0.5">
                        <Info className="h-4 w-4" />
                      </div>
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Tips
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Activity</CardTitle>
                  <CardDescription>Recent actions and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">You earned the "Early Bird" badge!</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Utensils className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">You logged breakfast: Oatmeal with berries</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                      <Target className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">You completed your protein goal</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                      <Flame className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">You're on a 12-day streak!</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Activity History
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  )
}
