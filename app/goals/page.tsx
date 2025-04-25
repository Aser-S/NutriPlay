"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Target, Plus, Calendar, Trophy, CheckCircle, Clock, ArrowRight, Edit, Trash2 } from "lucide-react"

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState("active")

  const activeGoals = [
    {
      id: 1,
      title: "Increase Protein Intake",
      description: "Consume at least 100g of protein daily",
      category: "nutrition",
      progress: 65,
      deadline: "April 30, 2025",
      created: "April 1, 2025",
    },
    {
      id: 2,
      title: "Reduce Sugar Consumption",
      description: "Limit added sugars to less than 25g per day",
      category: "nutrition",
      progress: 40,
      deadline: "Ongoing",
      created: "March 15, 2025",
    },
    {
      id: 3,
      title: "Stay Hydrated",
      description: "Drink at least 8 cups of water daily",
      category: "hydration",
      progress: 75,
      deadline: "Daily",
      created: "February 10, 2025",
    },
  ]

  const completedGoals = [
    {
      id: 4,
      title: "Try 5 New Vegetables",
      description: "Incorporate 5 new vegetables into my diet",
      category: "nutrition",
      progress: 100,
      deadline: "Completed",
      created: "January 5, 2025",
      completed: "March 20, 2025",
    },
    {
      id: 5,
      title: "Cook at Home",
      description: "Prepare at least 5 home-cooked meals per week",
      category: "habits",
      progress: 100,
      deadline: "Completed",
      created: "February 1, 2025",
      completed: "March 15, 2025",
    },
  ]

  const suggestedGoals = [
    {
      id: 6,
      title: "Eat More Fiber",
      description: "Consume at least 25g of fiber daily",
      category: "nutrition",
      difficulty: "Medium",
    },
    {
      id: 7,
      title: "Meal Prep Sundays",
      description: "Prepare meals for the week every Sunday",
      category: "habits",
      difficulty: "Easy",
    },
    {
      id: 8,
      title: "Reduce Sodium Intake",
      description: "Keep sodium intake under 2,300mg per day",
      category: "nutrition",
      difficulty: "Hard",
    },
  ]

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Target className="h-6 w-6 text-green-500" />
              Nutrition Goals
            </h1>
            <p className="text-gray-500">Set, track, and achieve your nutrition goals</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create New Goal</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Goal</DialogTitle>
                <DialogDescription>Set a specific, measurable nutrition goal to improve your health.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input id="goal-title" placeholder="E.g., Increase Protein Intake" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="goal-description">Description</Label>
                  <Textarea id="goal-description" placeholder="Describe your goal in detail..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="goal-category">Category</Label>
                    <Select defaultValue="nutrition">
                      <SelectTrigger id="goal-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="hydration">Hydration</SelectItem>
                        <SelectItem value="habits">Eating Habits</SelectItem>
                        <SelectItem value="weight">Weight Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="goal-deadline">Deadline</Label>
                    <Input id="goal-deadline" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="goal-target">Target Value</Label>
                  <div className="flex gap-2">
                    <Input id="goal-target" type="number" placeholder="E.g., 100" />
                    <Select defaultValue="grams">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grams">grams</SelectItem>
                        <SelectItem value="cups">cups</SelectItem>
                        <SelectItem value="servings">servings</SelectItem>
                        <SelectItem value="calories">calories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="goal-reminder" />
                  <Label htmlFor="goal-reminder">Set daily reminders for this goal</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="active" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>Active</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </TabsTrigger>
            <TabsTrigger value="suggested" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span>Suggested</span>
            </TabsTrigger>
          </TabsList>

          {/* Active Goals Tab */}
          <TabsContent value="active" className="space-y-6 mt-6">
            {activeGoals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{goal.category}</span>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Created: {goal.created}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Deadline: {goal.deadline}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Update Progress</Button>
                    <Button variant="outline" className="text-green-600 border-green-200">
                      Mark as Complete
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Completed Goals Tab */}
          <TabsContent value="completed" className="space-y-6 mt-6">
            {completedGoals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-green-50 border-green-100">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{goal.title}</CardTitle>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-green-100 rounded-full text-xs">{goal.category}</span>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>Created: {goal.created}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          <span>Completed: {goal.completed}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>
                        <Progress
                          value={goal.progress}
                          className="h-2 bg-green-100"
                          indicatorClassName="bg-green-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Details</Button>
                    <Button variant="outline">Set Similar Goal</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Suggested Goals Tab */}
          <TabsContent value="suggested" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Recommended Goals</CardTitle>
                <CardDescription>Personalized goals based on your nutrition patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedGoals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{goal.title}</h3>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            goal.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : goal.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {goal.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{goal.category}</span>
                        <Button size="sm">Add This Goal</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2">
                  <span>Get More Personalized Suggestions</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Community Goals</CardTitle>
                <CardDescription>Goals that other users are working on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">30-Day Sugar Detox</h3>
                        <p className="text-sm text-gray-600">Eliminate added sugars for 30 days</p>
                      </div>
                      <span className="text-xs text-gray-500">2,453 users</span>
                    </div>
                    <Button size="sm">Add This Goal</Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Meatless Mondays</h3>
                        <p className="text-sm text-gray-600">Go vegetarian every Monday</p>
                      </div>
                      <span className="text-xs text-gray-500">1,872 users</span>
                    </div>
                    <Button size="sm">Add This Goal</Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Hydration Challenge</h3>
                        <p className="text-sm text-gray-600">Drink 8 glasses of water daily for 21 days</p>
                      </div>
                      <span className="text-xs text-gray-500">3,214 users</span>
                    </div>
                    <Button size="sm">Add This Goal</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Community Goals
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  )
}
