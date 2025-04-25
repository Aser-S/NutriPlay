"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import {
  Users,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Utensils,
  Calendar,
  Target,
  Trophy,
  Salad,
  Coffee,
  Apple,
  Beef,
  Fish,
  Egg,
  Sandwich,
  Pizza,
  Leaf,
  Wheat,
  Flame,
  Activity,
  Heart,
  ChefHat,
} from "lucide-react"
import { userData } from "@/lib/mock-data"

// Custom icon component for meals
const MealIcon = ({ type, mealName }) => {
  // Determine the appropriate icon based on meal name keywords
  const lowercaseName = mealName.toLowerCase()

  if (type === "breakfast") {
    if (lowercaseName.includes("pancake")) return <Wheat className="h-8 w-8 text-amber-500" />
    if (lowercaseName.includes("egg")) return <Egg className="h-8 w-8 text-yellow-500" />
    if (lowercaseName.includes("yogurt")) return <Coffee className="h-8 w-8 text-blue-100" />
    if (lowercaseName.includes("smoothie")) return <Apple className="h-8 w-8 text-yellow-400" />
    if (lowercaseName.includes("oatmeal")) return <Wheat className="h-8 w-8 text-amber-700" />
    return <Coffee className="h-8 w-8 text-amber-800" />
  }

  if (type === "lunch") {
    if (lowercaseName.includes("salad")) return <Salad className="h-8 w-8 text-green-500" />
    if (lowercaseName.includes("sandwich")) return <Sandwich className="h-8 w-8 text-amber-600" />
    if (lowercaseName.includes("soup")) return <Utensils className="h-8 w-8 text-orange-400" />
    if (lowercaseName.includes("bowl")) return <Utensils className="h-8 w-8 text-purple-500" />
    if (lowercaseName.includes("wrap")) return <Sandwich className="h-8 w-8 text-green-400" />
    return <Utensils className="h-8 w-8 text-blue-500" />
  }

  if (type === "dinner") {
    if (lowercaseName.includes("chicken")) return <Egg className="h-8 w-8 text-orange-300" />
    if (lowercaseName.includes("fish") || lowercaseName.includes("salmon") || lowercaseName.includes("cod"))
      return <Fish className="h-8 w-8 text-blue-400" />
    if (lowercaseName.includes("steak") || lowercaseName.includes("beef"))
      return <Beef className="h-8 w-8 text-red-500" />
    if (lowercaseName.includes("pizza")) return <Pizza className="h-8 w-8 text-red-400" />
    if (lowercaseName.includes("pasta")) return <Utensils className="h-8 w-8 text-yellow-600" />
    return <ChefHat className="h-8 w-8 text-purple-500" />
  }

  return <Utensils className="h-8 w-8 text-gray-400" />
}

export default function FamilyPage() {
  const [activeTab, setActiveTab] = useState("members")
  const [showAddMember, setShowAddMember] = useState(false)
  const [showAddGoal, setShowAddGoal] = useState(false)

  // Family meal plan data
  const familyMeals = [
    {
      id: 1,
      title: "Today's Dinner",
      name: "Grilled Chicken with Roasted Vegetables",
      time: "6:30 PM",
      type: "dinner",
    },
    {
      id: 2,
      title: "Tomorrow's Breakfast",
      name: "Whole Grain Pancakes with Fresh Fruit",
      time: "7:30 AM",
      type: "breakfast",
    },
    {
      id: 3,
      title: "Tomorrow's Lunch",
      name: "Mediterranean Quinoa Salad",
      time: "12:30 PM",
      type: "lunch",
    },
  ]

  // Family challenges data
  const familyChallenges = [
    {
      id: 1,
      name: "Family Veggie Challenge",
      description: "Each family member eats 3 different vegetables daily",
      deadline: "April 30, 2025",
      progress: 65,
    },
    {
      id: 2,
      name: "Reduce Processed Foods",
      description: "Limit processed foods to 3 meals per week",
      deadline: "Ongoing",
      progress: 80,
    },
    {
      id: 3,
      name: "Family Cooking Night",
      description: "Cook a healthy meal together once a week",
      deadline: "Weekly",
      progress: 50,
    },
  ]

  // Family goals data
  const familyGoals = [
    {
      id: 1,
      name: "Increase Vegetable Intake",
      target: "Add one extra serving of vegetables to each meal",
      deadline: "June 1, 2025",
      progress: 45,
    },
    {
      id: 2,
      name: "Reduce Sugar Consumption",
      target: "Cut family sugar intake by 30%",
      deadline: "May 15, 2025",
      progress: 60,
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
            <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add Family Member</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Family Member</DialogTitle>
                  <DialogDescription>Add a new family member to track their nutrition.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Enter age" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select restrictions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input id="allergies" placeholder="Enter allergies (comma separated)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goals">Nutrition Goals</Label>
                    <Textarea id="goals" placeholder="Enter nutrition goals" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddMember(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddMember(false)}>Add Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            {/* Parents */}
            <Card>
              <CardHeader>
                <CardTitle>Parents</CardTitle>
                <CardDescription>Primary account holders and meal planners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-blue-200">
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white text-xl">
                          ZT
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{userData.name}</h3>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">Primary</Badge>
                        </div>
                        <p className="text-gray-500">Parent</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Gluten-free
                          </Badge>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Peanut Allergy
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-purple-200">
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl">
                          BH
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">Basmala Hany</h3>
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">Co-Parent</Badge>
                        </div>
                        <p className="text-gray-500">Parent</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Vegetarian
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children */}
            <Card>
              <CardHeader>
                <CardTitle>Children</CardTitle>
                <CardDescription>Manage your children's nutrition profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData.family.map((child) => (
                  <div
                    key={child.id}
                    className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-teal-50 border-green-100"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-green-200">
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-teal-500 text-white">
                          {child.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{child.name}</h3>
                        <p className="text-sm text-gray-500">{child.age} years old</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {child.dietaryRestrictions && child.dietaryRestrictions.length > 0 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {child.dietaryRestrictions.join(", ")}
                            </Badge>
                          )}
                          {child.allergies && child.allergies.length > 0 && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Allergies: {child.allergies.join(", ")}
                            </Badge>
                          )}
                        </div>
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
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">Goals: {child.goals}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => setShowAddMember(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Child</span>
                </Button>
              </CardFooter>
            </Card>

            {/* Dietary Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Family Dietary Preferences</CardTitle>
                <CardDescription>Common dietary preferences for your family</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-yellow-100 text-yellow-700">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-yellow-800">Allergies & Restrictions</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Your family has the following allergies and dietary restrictions:
                        </p>
                        <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                          <li>Peanut allergy (Zeyad)</li>
                          <li>Gluten-free (Zeyad, Rana)</li>
                          <li>Vegetarian (Basmala, Paula)</li>
                          <li>Dairy-free (Rana)</li>
                          <li>Nut allergy (Hania)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Favorite Foods</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Chicken</Badge>
                        <Badge variant="outline">Pasta</Badge>
                        <Badge variant="outline">Broccoli</Badge>
                        <Badge variant="outline">Strawberries</Badge>
                        <Badge variant="outline">Yogurt</Badge>
                        <Badge variant="outline">Rice</Badge>
                        <Badge variant="outline">Sweet Potatoes</Badge>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Disliked Foods</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-gray-50">
                          Mushrooms
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          Olives
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          Brussels Sprouts
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          Liver
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          Eggplant
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Family Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Meal Plan Tab */}
          <TabsContent value="meal-plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  Family Meal Plan
                </CardTitle>
                <CardDescription>Upcoming meals for the family</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyMeals.map((meal) => (
                  <div key={meal.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                        <MealIcon type={meal.type} mealName={meal.name} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{meal.title}</h3>
                        <p className="text-gray-700">{meal.name}</p>
                        <p className="text-sm text-gray-500">{meal.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Recipe
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Full Meal Plan</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-purple-500" />
                  Meal Planning Tools
                </CardTitle>
                <CardDescription>Tools to help plan family meals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-green-800">Weekly Planner</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-3">Plan all family meals for the week in advance.</p>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Create Plan
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                        <Utensils className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-blue-800">Recipe Finder</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Find recipes that work for your family's dietary needs and preferences.
                    </p>
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Find Recipes
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                        <Salad className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-purple-800">Shopping List</h3>
                    </div>
                    <p className="text-sm text-purple-700 mb-3">Generate a shopping list based on your meal plan.</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Create List
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Family Challenges
                </CardTitle>
                <CardDescription>Active challenges for your family</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{challenge.name}</h3>
                          <Badge
                            className={`${challenge.progress >= 75 ? "bg-green-100 text-green-700" : challenge.progress >= 50 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}
                          >
                            {challenge.progress}%
                          </Badge>
                        </div>
                        <p className="text-gray-700 mt-1">{challenge.description}</p>
                        <p className="text-sm text-gray-500 mt-1">Deadline: {challenge.deadline}</p>

                        <div className="mt-3">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${challenge.progress >= 75 ? "bg-green-500" : challenge.progress >= 50 ? "bg-blue-500" : "bg-amber-500"}`}
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Update Progress
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Create New Challenge</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Challenge Ideas
                </CardTitle>
                <CardDescription>Try these nutrition challenges with your family</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <Salad className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-green-800">Rainbow Week</h3>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Eat fruits and vegetables of every color of the rainbow each day for a week.
                    </p>
                    <Button size="sm" variant="outline" className="w-full text-green-700 border-green-200">
                      Start Challenge
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                        <Utensils className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-blue-800">New Food Explorer</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Try one new healthy food each week as a family for a month.
                    </p>
                    <Button size="sm" variant="outline" className="w-full text-blue-700 border-blue-200">
                      Start Challenge
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                        <ChefHat className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-purple-800">Kids Chef Challenge</h3>
                    </div>
                    <p className="text-sm text-purple-700 mb-3">
                      Each child plans and helps prepare one healthy meal per week.
                    </p>
                    <Button size="sm" variant="outline" className="w-full text-purple-700 border-purple-200">
                      Start Challenge
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                        <Apple className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium text-amber-800">Snack Swap</h3>
                    </div>
                    <p className="text-sm text-amber-700 mb-3">
                      Replace processed snacks with fresh fruits and vegetables for two weeks.
                    </p>
                    <Button size="sm" variant="outline" className="w-full text-amber-700 border-amber-200">
                      Start Challenge
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Family Nutrition Goals
                </CardTitle>
                <CardDescription>Track your family's nutrition and health goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {familyGoals.map((goal) => (
                  <div key={goal.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{goal.name}</h3>
                        <p className="text-gray-700 mt-1">Target: {goal.target}</p>
                        <p className="text-sm text-gray-500 mt-1">Deadline: {goal.deadline}</p>

                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${goal.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setShowAddGoal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Add New Goal</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Family Goal</DialogTitle>
                      <DialogDescription>Create a new nutrition or health goal for your family.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="goal-name">Goal Name</Label>
                        <Input id="goal-name" placeholder="Enter goal name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal-target">Target</Label>
                        <Textarea id="goal-target" placeholder="What do you want to achieve?" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal-deadline">Deadline</Label>
                        <Input id="goal-deadline" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal-type">Goal Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select goal type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nutrition">Nutrition</SelectItem>
                            <SelectItem value="activity">Physical Activity</SelectItem>
                            <SelectItem value="habits">Healthy Habits</SelectItem>
                            <SelectItem value="weight">Weight Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setShowAddGoal(false)}>Add Goal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Health Conditions
                </CardTitle>
                <CardDescription>Manage health conditions that affect your family's nutrition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <Leaf className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium">Vegan</h3>
                    </div>
                    <p className="text-sm text-gray-500">Plant-based diet excluding all animal products</p>
                    <div className="mt-3">
                      <Badge>Basmala, Paula</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                        <Wheat className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium">Gluten-Free</h3>
                    </div>
                    <p className="text-sm text-gray-500">Diet excluding gluten-containing grains</p>
                    <div className="mt-3">
                      <Badge>Zeyad, Rana</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-red-100 text-red-600">
                        <Flame className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium">Nut Allergy</h3>
                    </div>
                    <p className="text-sm text-gray-500">Avoid all nuts and nut-containing products</p>
                    <div className="mt-3">
                      <Badge>Zeyad, Hania</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                        <Activity className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium">Sports Nutrition</h3>
                    </div>
                    <p className="text-sm text-gray-500">Enhanced nutrition for athletic performance</p>
                    <div className="mt-3">
                      <Badge>Paula, Aser</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Health Conditions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  )
}
