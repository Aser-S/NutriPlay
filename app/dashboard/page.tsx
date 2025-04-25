"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
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
import {
  UtensilsCrossed,
  Trophy,
  BarChart3,
  Droplet,
  Apple,
  Egg,
  Flame,
  Edit,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bell,
  Users,
  Goal,
  Filter,
  AlertTriangle,
  MessageSquare,
  CalendarIcon,
} from "lucide-react"
import { userData, challenges, nutritionTips } from "@/lib/mock-data"
import { generateUserReport } from "@/lib/mock-data-updates"

export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [dailyGoals, setDailyGoals] = useState(userData.dailyGoals)
  const [randomTip, setRandomTip] = useState("")
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)

  // Add a state for the user report
  const [userReport, setUserReport] = useState(null)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  // Add a function to handle report generation
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    try {
      const report = await generateUserReport("1") // Assuming Zeyad's ID is 1
      setUserReport(report)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGeneratingReport(false)
    }
  }

  // Add a report dialog to the component
  // Add this before the return statement
  const [showReportDialog, setShowReportDialog] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // Get a random nutrition tip
    const tipIndex = Math.floor(Math.random() * nutritionTips.length)
    setRandomTip(nutritionTips[tipIndex])

    // Show emergency alert after 5 seconds for demo purposes
    const timer = setTimeout(() => {
      setShowEmergencyAlert(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleGoalUpdate = (newGoals) => {
    setDailyGoals(newGoals)
  }

  const dismissAlert = () => {
    setShowEmergencyAlert(false)
  }

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Emergency Alert */}
        {showEmergencyAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start justify-between"
          >
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-700">Emergency Alert: High Sodium Intake</h3>
                <p className="text-red-600">
                  Your sodium intake has exceeded your daily limit by 45%. This could affect your blood pressure.
                </p>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="text-red-600 border-red-300 mr-2">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Contact Nutritionist
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-500">
              Dismiss
            </Button>
          </motion.div>
        )}

        {/* Welcome Section */}
        <section className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-green-200">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Zeyad Tamer!</h1>
                <p className="text-gray-500">You're on a {userData.streakDays}-day streak. Keep it up!</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <Flame className="h-4 w-4 mr-1" />
                {userData.streakDays} Day Streak
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                <Trophy className="h-4 w-4 mr-1" />
                {userData.badges.filter((b) => b.earned).length} Badges
              </Badge>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 px-3 py-1">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                {challenges.daily.filter((c) => c.completed).length} Challenges
              </Badge>
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {isLoaded && (
              <>
                <QuickAccessCard
                  icon={<UtensilsCrossed className="h-8 w-8 text-orange-500" />}
                  title="Log Meal"
                  description="Track your meals and nutrition"
                  href="/food-log"
                  delay={0.1}
                />
                <QuickAccessCard
                  icon={<Filter className="h-8 w-8 text-purple-500" />}
                  title="Filter Meals"
                  description="Based on health conditions"
                  href="/meal-plan"
                  delay={0.2}
                />
                <QuickAccessCard
                  icon={<Goal className="h-8 w-8 text-blue-500" />}
                  title="Set Goals"
                  description="Track your nutrition goals"
                  href="/goals"
                  delay={0.3}
                />
                <QuickAccessCard
                  icon={<Users className="h-8 w-8 text-green-500" />}
                  title="Family Goals"
                  description="View family nutrition"
                  href="/family"
                  delay={0.4}
                />
                <QuickAccessCard
                  icon={<BarChart3 className="h-8 w-8 text-yellow-500" />}
                  title="Eating Patterns"
                  description="Analyze your nutrition habits"
                  href="/progress"
                  delay={0.5}
                />
                <QuickAccessCard
                  icon={<BarChart3 className="h-8 w-8 text-purple-500" />}
                  title="AI Nutrition Report"
                  description="Get personalized insights"
                  onClick={() => setShowReportDialog(true)}
                  delay={0.6}
                />
              </>
            )}
          </div>
        </section>

        {/* Daily Goals and Progress */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Today's Progress</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit Goals</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Customize Your Daily Goals</DialogTitle>
                      <DialogDescription>Set your nutrition targets based on your personal needs.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="calories" className="text-right">
                          Calories
                        </Label>
                        <Input id="calories" type="number" defaultValue={dailyGoals.calories} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="protein" className="text-right">
                          Protein (g)
                        </Label>
                        <Input id="protein" type="number" defaultValue={dailyGoals.protein} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="carbs" className="text-right">
                          Carbs (g)
                        </Label>
                        <Input id="carbs" type="number" defaultValue={dailyGoals.carbs} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fat" className="text-right">
                          Fat (g)
                        </Label>
                        <Input id="fat" type="number" defaultValue={dailyGoals.fat} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="water" className="text-right">
                          Water (cups)
                        </Label>
                        <Input id="water" type="number" defaultValue={dailyGoals.water} className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={() => handleGoalUpdate(dailyGoals)}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                <span className="text-blue-500 cursor-pointer hover:underline">
                  📝 Click here to customize your daily goal
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Flame className="h-4 w-4 mr-2 text-orange-500" />
                      <span>Calories</span>
                    </div>
                    <span className="text-sm font-medium">
                      {userData.progress.calories} / {dailyGoals.calories} kcal
                    </span>
                  </div>
                  <Progress
                    value={(userData.progress.calories / dailyGoals.calories) * 100}
                    className="h-2 bg-orange-100"
                    indicatorClassName="bg-orange-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Egg className="h-4 w-4 mr-2 text-purple-500" />
                      <span>Protein</span>
                    </div>
                    <span className="text-sm font-medium">
                      {userData.progress.protein} / {dailyGoals.protein} g
                    </span>
                  </div>
                  <Progress
                    value={(userData.progress.protein / dailyGoals.protein) * 100}
                    className="h-2 bg-purple-100"
                    indicatorClassName="bg-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Apple className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>Carbs</span>
                    </div>
                    <span className="text-sm font-medium">
                      {userData.progress.carbs} / {dailyGoals.carbs} g
                    </span>
                  </div>
                  <Progress
                    value={(userData.progress.carbs / dailyGoals.carbs) * 100}
                    className="h-2 bg-yellow-100"
                    indicatorClassName="bg-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="h-4 w-4 mr-2 rounded-full bg-green-500" />
                      <span>Fat</span>
                    </div>
                    <span className="text-sm font-medium">
                      {userData.progress.fat} / {dailyGoals.fat} g
                    </span>
                  </div>
                  <Progress
                    value={(userData.progress.fat / dailyGoals.fat) * 100}
                    className="h-2 bg-green-100"
                    indicatorClassName="bg-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Water</span>
                    </div>
                    <span className="text-sm font-medium">
                      {userData.progress.water} / {dailyGoals.water} cups
                    </span>
                  </div>
                  <Progress
                    value={(userData.progress.water / dailyGoals.water) * 100}
                    className="h-2 bg-blue-100"
                    indicatorClassName="bg-blue-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Log Food Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Challenges</CardTitle>
              <CardDescription>Complete challenges to earn points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenges.daily.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      challenge.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${challenge.completed ? "bg-green-500" : "bg-gray-200"}`}>
                        {challenge.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{challenge.name}</p>
                        <p className="text-sm text-gray-500">{challenge.points} points</p>
                      </div>
                    </div>
                    <Button
                      variant={challenge.completed ? "ghost" : "outline"}
                      size="sm"
                      disabled={challenge.completed}
                    >
                      {challenge.completed ? "Completed" : "Complete"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-500 hover:bg-green-600">View All Challenges</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Additional Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                Reminders & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-blue-100 bg-blue-50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <Bell className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Lunch Reminder</p>
                      <p className="text-sm text-gray-600">It's time for your lunch! Don't forget to log your meal.</p>
                      <p className="text-xs text-gray-500 mt-1">12:30 PM</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-green-100 bg-green-50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <Droplet className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Hydration Alert</p>
                      <p className="text-sm text-gray-600">You're 2 cups behind your water goal for today.</p>
                      <p className="text-xs text-gray-500 mt-1">2:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Notifications
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                Nutritionist Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-purple-100 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">I've been feeling tired after lunch. Could my diet be causing this?</p>
                    <p className="text-xs text-gray-500 mt-1">You, 10:30 AM</p>
                  </div>
                </div>

                <div className="flex">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Nutritionist" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">
                      It could be related to blood sugar spikes. Try adding more protein to your lunch and reducing
                      simple carbs.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Dr. Smith, 10:45 AM</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex">
                <Input placeholder="Type your message..." className="rounded-r-none" />
                <Button className="rounded-l-none">Send</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Chat
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-orange-500" />
                Upcoming Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-orange-100 bg-orange-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Nutritionist Check-in</p>
                      <p className="text-sm text-gray-600">Dr. Emily Johnson</p>
                      <p className="text-xs text-gray-500 mt-1">Tomorrow, 2:00 PM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Diet Plan Review</p>
                      <p className="text-sm text-gray-600">Dr. Michael Chen</p>
                      <p className="text-xs text-gray-500 mt-1">April 25, 10:30 AM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Schedule New Consultation
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* Nutrition Tip */}
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Tip</CardTitle>
            <CardDescription>Daily advice for healthy eating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <p className="text-gray-700 italic">"{randomTip}"</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              More Tips
            </Button>
          </CardFooter>
        </Card>
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>AI-Generated Nutrition Report</DialogTitle>
              <DialogDescription>
                Personalized insights and recommendations based on your nutrition data
              </DialogDescription>
            </DialogHeader>

            {isGeneratingReport ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
                <p className="text-gray-500">Analyzing your nutrition data...</p>
              </div>
            ) : userReport ? (
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Nutrition Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Average Daily Calories</p>
                      <p className="font-medium">{userReport.nutritionSummary.averageCalories} kcal</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Average Protein</p>
                      <p className="font-medium">{userReport.nutritionSummary.averageProtein}g</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Average Carbs</p>
                      <p className="font-medium">{userReport.nutritionSummary.averageCarbs}g</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Average Fat</p>
                      <p className="font-medium">{userReport.nutritionSummary.averageFat}g</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Goal Adherence</p>
                      <p className="font-medium">{userReport.nutritionSummary.adherenceToGoals}%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Recommendations</h3>
                  <ul className="space-y-2">
                    {userReport.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Insights</h3>
                  <ul className="space-y-2">
                    {userReport.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No report generated yet</p>
                <Button onClick={handleGenerateReport}>Generate Report</Button>
              </div>
            )}

            <DialogFooter>
              {userReport && (
                <Button variant="outline" onClick={() => setUserReport(null)}>
                  Reset Report
                </Button>
              )}
              <Button onClick={() => setShowReportDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppSidebar>
  )
}

function QuickAccessCard({ icon, title, description, href, onClick, delay = 0 }) {
  if (onClick) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
        <Card
          className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-green-200"
          onClick={onClick}
        >
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-gray-100">{icon}</div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Link href={href}>
        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-green-200">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-3 rounded-full bg-gray-100">{icon}</div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
