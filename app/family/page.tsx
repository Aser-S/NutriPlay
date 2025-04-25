"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  UserPlus,
  Settings,
  BarChart3,
  Flame,
  Apple,
  Egg,
  Droplet,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Info,
  Calendar,
  Trophy,
  Target,
} from "lucide-react"
import { userData } from "@/lib/mock-data"

export default function FamilyPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddMember, setShowAddMember] = useState(false)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [familyMembers, setFamilyMembers] = useState([
    ...userData.family,
    {
      id: 0,
      name: "Basmala Hany",
      age: 35,
      avatar: "/placeholder.svg?height=40&width=40",
      dietaryRestrictions: ["Low-carb"],
      allergies: ["Shellfish"],
      goals: "Weight management and healthy eating",
    },
  ])
  const [selectedMember, setSelectedMember] = useState(null)

  const handleAddMember = (e) => {
    e.preventDefault()
    // In a real app, this would add a new family member
    setShowAddMember(false)
  }

  const handleAddGoal = (e) => {
    e.preventDefault()
    // In a real app, this would add a new family goal
    setShowAddGoal(false)
  }

  const handleSelectMember = (member) => {
    setSelectedMember(member)
    setActiveTab("member")
  }

  // Family meal plan data
  const familyMeals = [
    {
      id: 1,
      title: "Today's Dinner",
      meal: "Grilled Chicken with Roasted Vegetables",
      time: "6:30 PM",
    },
    {
      id: 2,
      title: "Tomorrow's Breakfast",
      meal: "Whole Grain Pancakes with Fresh Fruit",
      time: "7:30 AM",
    },
    {
      id: 3,
      title: "Tomorrow's Lunch",
      meal: "Mediterranean Quinoa Salad",
      time: "12:30 PM",
    },
  ]

  // Family challenges data
  const familyChallenges = [
    {
      id: 1,
      title: "Family Veggie Challenge",
      description: "Each family member eats 3 different vegetables daily",
      progress: 65,
      deadline: "April 30, 2025",
    },
    {
      id: 2,
      title: "Reduce Processed Foods",
      description: "Limit processed foods to 3 meals per week",
      progress: 80,
      deadline: "Ongoing",
    },
    {
      id: 3,
      title: "Family Cooking Night",
      description: "Cook a healthy meal together once a week",
      progress: 50,
      deadline: "Weekly",
    },
  ]

  // Family goals data
  const familyGoals = [
    {
      id: 1,
      title: "Increase Vegetable Intake",
      description: "Eat at least 5 servings of vegetables daily as a family",
      progress: 70,
      deadline: "May 15, 2025",
    },
    {
      id: 2,
      title: "Reduce Sugar Consumption",
      description: "Cut family sugar intake by 30%",
      progress: 45,
      deadline: "June 1, 2025",
    },
    {
      id: 3,
      title: "Weekly Outdoor Activities",
      description: "Engage in outdoor physical activities twice a week",
      progress: 60,
      deadline: "Ongoing",
    },
  ]

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-500" />
              Family Nutrition
            </h1>
            <p className="text-gray-500">Manage nutrition for your entire family</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setActiveTab("overview")}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Settings</span>
            </Button>
            <Button onClick={() => setShowAddMember(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              <span>Add Family Member</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Family Overview</TabsTrigger>
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="member" disabled={!selectedMember}>
              {selectedMember ? selectedMember.name : "Member Details"}
            </TabsTrigger>
          </TabsList>

          {/* Family Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Family Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Parent Cards */}
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>Parent</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      You
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/assets/avatars/zeyad.jpg" alt="Zeyad Tamer" />
                      <AvatarFallback>ZT</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">Zeyad Tamer</h3>
                      <p className="text-sm text-gray-500">Parent Account</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Gluten-free
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("settings")}>
                    Manage Account
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-purple-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>Parent</span>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      Co-Parent
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Basmala Hany" />
                      <AvatarFallback>BH</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">Basmala Hany</h3>
                      <p className="text-sm text-gray-500">Co-Parent Account</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Low-carb
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => handleSelectMember(familyMembers[0])}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>

              {/* Children Cards */}
              {familyMembers.slice(1).map((member) => (
                <Card key={member.id} className="border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <span>Child</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {member.age} years
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={member.avatar || "/assets/avatars/default.jpg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.goals}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {member.dietaryRestrictions.map((restriction, index) => (
                            <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-700">
                              {restriction}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="flex-1" onClick={() => handleSelectMember(member)}>
                      View Details
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {/* Add Member Card */}
              <Card className="border-dashed border-gray-300 bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center h-full py-10">
                  <UserPlus className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="font-medium text-lg text-gray-700 mb-2">Add Family Member</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Add a child or another family member to manage their nutrition
                  </p>
                  <Button onClick={() => setShowAddMember(true)}>Add Member</Button>
                </CardContent>
              </Card>
            </div>

            {/* Family Goals Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Family Goals
                  </CardTitle>
                  <Button size="sm" onClick={() => setShowAddGoal(true)}>
                    Add Goal
                  </Button>
                </div>
                <CardDescription>Track your family's nutrition and health goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyGoals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-blue-800">{goal.title}</h3>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {goal.deadline}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Family Goals
                </Button>
              </CardFooter>
            </Card>

            {/* Family Nutrition Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Family Nutrition Summary</CardTitle>
                <CardDescription>Overview of your family's nutritional habits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Daily Calorie Goals</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Zeyad Tamer</span>
                        <span className="text-sm text-gray-500">2000 kcal</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Basmala Hany</span>
                        <span className="text-sm text-gray-500">1800 kcal</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    {familyMembers.slice(1).map((member) => (
                      <div key={member.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{member.name}</span>
                          <span className="text-sm text-gray-500">{1500 + member.age * 50} kcal</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Nutritional Balance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>Protein Intake</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-orange-500">85%</span>
                          <p className="text-xs text-gray-500">of daily goal</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Apple className="h-4 w-4 text-green-500" />
                          <span>Fruits & Vegetables</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-green-500">70%</span>
                          <p className="text-xs text-gray-500">of daily goal</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Droplet className="h-4 w-4 text-blue-500" />
                          <span>Hydration</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-blue-500">65%</span>
                          <p className="text-xs text-gray-500">of daily goal</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Dietary Restrictions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Gluten-free (1)
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Vegetarian (1)
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                      Nut Allergy (1)
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      Dairy-free (1)
                    </Badge>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                      Low-carb (1)
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Family Meal Plan</Button>
              </CardFooter>
            </Card>

            {/* Alerts and Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts & Recommendations</CardTitle>
                <CardDescription>Important nutrition information for your family</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Low Vegetable Intake</h3>
                      <p className="text-sm text-yellow-700">
                        Menna and Omar have been consuming fewer vegetables than recommended. Consider adding more
                        vegetables to their meals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">Great Protein Intake</h3>
                      <p className="text-sm text-green-700">
                        Paula and Aser are meeting their protein goals consistently. Keep up the good work!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Hydration Reminder</h3>
                      <p className="text-sm text-blue-700">
                        Most family members need to increase water intake. Try setting reminders throughout the day.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Family Meal Plan Tab */}
          <TabsContent value="meal-plan" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Family Meal Plan
                </CardTitle>
                <CardDescription>Upcoming meals for the family</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyMeals.map((meal) => (
                  <div key={meal.id} className="p-4 bg-white rounded-lg border border-green-100 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-green-800">{meal.title}</h3>
                      <span className="text-sm text-gray-500">{meal.time}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{meal.meal}</p>
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline" className="text-green-700 border-green-200">
                        View Recipe
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700">View Full Meal Plan</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Meal Schedule</CardTitle>
                <CardDescription>Plan your family's meals for the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="border rounded-lg p-3">
                        <h3 className="font-medium text-center mb-2">{day}</h3>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-500">Breakfast</div>
                          <div className="text-sm bg-gray-50 p-2 rounded min-h-10 flex items-center justify-center">
                            {day === "Tuesday" ? "Pancakes" : "Add meal"}
                          </div>

                          <div className="text-xs text-gray-500">Lunch</div>
                          <div className="text-sm bg-gray-50 p-2 rounded min-h-10 flex items-center justify-center">
                            {day === "Tuesday" ? "Quinoa Salad" : "Add meal"}
                          </div>

                          <div className="text-xs text-gray-500">Dinner</div>
                          <div className="text-sm bg-gray-50 p-2 rounded min-h-10 flex items-center justify-center">
                            {day === "Monday" ? "Grilled Chicken" : "Add meal"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Import Recipes</Button>
                <Button>Save Meal Plan</Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>Family dietary restrictions and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Allergies & Restrictions</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          Gluten-free
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          Peanuts
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          Shellfish
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          Dairy-free
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Preferences</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Vegetarian options
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Low-carb options
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Kid-friendly
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Preferences
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shopping List</CardTitle>
                  <CardDescription>Based on your meal plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Produce</h3>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Broccoli (2 heads)</span>
                        </li>
                        <li className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Bell peppers (3)</span>
                        </li>
                        <li className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Bananas (bunch)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Protein</h3>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Chicken breast (2 lbs)</span>
                        </li>
                        <li className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Eggs (dozen)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Generate Complete Shopping List</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Family Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-600" />
                  Family Challenges
                </CardTitle>
                <CardDescription>Active challenges for your family</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 bg-white rounded-lg border border-orange-100 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-start gap-2">
                        <div className="bg-orange-100 text-orange-700 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                          <Trophy className="h-3 w-3" />
                        </div>
                        <div>
                          <h3 className="font-medium text-orange-800">{challenge.title}</h3>
                          <p className="text-sm text-gray-600">{challenge.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        {challenge.progress}%
                      </Badge>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>Deadline: {challenge.deadline}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: `${challenge.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Create New Challenge</Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Leaderboard</CardTitle>
                  <CardDescription>See how family members are performing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <div className="font-medium">Paula Hanna</div>
                          <div className="text-xs text-gray-500">5 challenges completed</div>
                        </div>
                      </div>
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-400 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <div className="font-medium">Zeyad Tamer</div>
                          <div className="text-xs text-gray-500">4 challenges completed</div>
                        </div>
                      </div>
                      <Trophy className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <div className="font-medium">Basmala Hany</div>
                          <div className="text-xs text-gray-500">3 challenges completed</div>
                        </div>
                      </div>
                      <Trophy className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Full Leaderboard
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Challenge History</CardTitle>
                  <CardDescription>Previously completed challenges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-green-500 pl-4 py-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <h3 className="font-medium">Sugar-Free Week</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Completed on April 15, 2025</p>
                    </div>

                    <div className="border-l-2 border-green-500 pl-4 py-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <h3 className="font-medium">Meatless Monday Challenge</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Completed on April 8, 2025</p>
                    </div>

                    <div className="border-l-2 border-green-500 pl-4 py-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <h3 className="font-medium">Hydration Challenge</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Completed on March 30, 2025</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Completed Challenges
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Challenge Ideas</CardTitle>
                <CardDescription>Try these nutrition challenges with your family</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-purple-50 border-purple-100">
                    <h3 className="font-medium text-purple-800 mb-2">Rainbow Week</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Eat fruits and vegetables of every color of the rainbow each day
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Start Challenge
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2">No Added Sugar</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Avoid foods with added sugar for one week to reset taste buds
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Start Challenge
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 bg-green-50 border-green-100">
                    <h3 className="font-medium text-green-800 mb-2">Home Cooking</h3>
                    <p className="text-sm text-gray-600 mb-3">Cook all meals at home for one week, no takeout</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Start Challenge
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse More Challenge Ideas
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Member Details Tab */}
          <TabsContent value="member" className="space-y-6">
            {selectedMember && (
              <>
                {/* Member Profile */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Profile</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage
                            src={selectedMember.avatar || "/assets/avatars/default.jpg"}
                            alt={selectedMember.name}
                          />
                          <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold">{selectedMember.name}</h2>
                        <p className="text-gray-500">{selectedMember.age} years old</p>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Dietary Restrictions</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedMember.dietaryRestrictions.map((restriction, index) => (
                              <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-700">
                                {restriction}
                              </Badge>
                            ))}
                            {selectedMember.dietaryRestrictions.length === 0 && (
                              <span className="text-sm text-gray-500">No dietary restrictions</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Allergies</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedMember.allergies.map((allergy, index) => (
                              <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                                {allergy}
                              </Badge>
                            ))}
                            {selectedMember.allergies.length === 0 && (
                              <span className="text-sm text-gray-500">No allergies</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Nutrition Goals</h3>
                          <p className="text-sm">{selectedMember.goals}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nutrition Dashboard */}
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition Dashboard</CardTitle>
                    <CardDescription>Current nutritional status for {selectedMember.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Daily Intake</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Flame className="h-4 w-4 mr-2 text-orange-500" />
                              <span className="text-sm">Calories</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {Math.floor(Math.random() * 500) + 1000} / {1500 + selectedMember.age * 50} kcal
                            </span>
                          </div>
                          <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Egg className="h-4 w-4 mr-2 text-purple-500" />
                              <span className="text-sm">Protein</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {Math.floor(Math.random() * 30) + 40} / {Math.floor(selectedMember.age * 2) + 40} g
                            </span>
                          </div>
                          <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Apple className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-sm">Fruits & Vegetables</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {Math.floor(Math.random() * 3) + 2} / 5 servings
                            </span>
                          </div>
                          <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                              <span className="text-sm">Water</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {Math.floor(Math.random() * 4) + 2} / {Math.floor(selectedMember.age / 4) + 4} cups
                            </span>
                          </div>
                          <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Weekly Progress</h3>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          <span>View Details</span>
                        </Button>
                      </div>
                      <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">Weekly progress chart would appear here</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full">Generate Personalized Meal Plan</Button>
                    <Button variant="outline" className="w-full">
                      View Food Log
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Family Member Dialog */}
        <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
              <DialogDescription>Add a new family member to manage their nutrition</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddMember}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Enter name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="age" className="text-right">
                    Age
                  </Label>
                  <Input id="age" type="number" placeholder="Enter age" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="relationship" className="text-right">
                    Relationship
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dietary" className="text-right">
                    Dietary Needs
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select dietary needs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                      <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                      <SelectItem value="nut-free">Nut-Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="allergies" className="text-right">
                    Allergies
                  </Label>
                  <Input id="allergies" placeholder="Enter allergies" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goals" className="text-right">
                    Goals
                  </Label>
                  <Textarea id="goals" placeholder="Enter nutrition goals" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddMember(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Family Goal Dialog */}
        <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Goal</DialogTitle>
              <DialogDescription>Create a new nutrition goal for your family</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddGoal}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-title" className="text-right">
                    Goal Title
                  </Label>
                  <Input id="goal-title" placeholder="Enter goal title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="goal-description" placeholder="Describe the goal" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-deadline" className="text-right">
                    Deadline
                  </Label>
                  <Input id="goal-deadline" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-type" className="text-right">
                    Goal Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select goal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                      <SelectItem value="activity">Physical Activity</SelectItem>
                      <SelectItem value="hydration">Hydration</SelectItem>
                      <SelectItem value="meal-planning">Meal Planning</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goal-members" className="text-right">
                    Members
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Who is participating?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Family Members</SelectItem>
                      <SelectItem value="parents">Parents Only</SelectItem>
                      <SelectItem value="children">Children Only</SelectItem>
                      <SelectItem value="custom">Select Specific Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowAddGoal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Goal</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppSidebar>
  )
}
