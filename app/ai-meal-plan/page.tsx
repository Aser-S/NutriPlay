"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Bot,
  Sparkles,
  Brain,
  Calendar,
  Loader2,
  CheckCircle2,
  Share2,
  Download,
  Printer,
  Clock,
  Coffee,
  Salad,
  ChefHat,
  Apple,
  Flame,
  Egg,
  Scale,
  Heart,
  Leaf,
  Target,
} from "lucide-react"

export default function AIMealPlanPage() {
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [activeDay, setActiveDay] = useState("monday")
  const [activeTab, setActiveTab] = useState("meal-plan")

  // Mock function to handle generation
  const handleGenerate = () => {
    setGenerating(true)
    // Simulate API call delay
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 3000)
  }

  const days = [
    { value: "monday", label: "Mon" },
    { value: "tuesday", label: "Tue" },
    { value: "wednesday", label: "Wed" },
    { value: "thursday", label: "Thu" },
    { value: "friday", label: "Fri" },
    { value: "saturday", label: "Sat" },
    { value: "sunday", label: "Sun" },
  ]

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bot className="h-6 w-6 text-purple-500" />
              AI Meal Plan Generator
            </h1>
            <p className="text-gray-500">
              Get a personalized meal plan created specifically for your nutritional needs
            </p>
          </div>
        </div>

        {/* AI Generator Area */}
        {!generated ? (
          <Card className="border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span>Create Your Personalized AI Meal Plan</span>
              </CardTitle>
              <CardDescription>
                Our advanced AI nutritionist analyzes your profile, preferences, and goals to create a tailored meal
                plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Primary Goal</Label>
                    <select
                      id="goal"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      <option>Weight Loss</option>
                      <option>Weight Maintenance</option>
                      <option>Weight Gain</option>
                      <option>Muscle Building</option>
                      <option>General Health</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Daily Calorie Target</Label>
                    <div className="pt-2">
                      <Slider defaultValue={[2000]} max={3500} min={1200} step={50} />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1200</span>
                        <span>2000 calories</span>
                        <span>3500</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Macronutrient Distribution</Label>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Protein</span>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <Slider defaultValue={[30]} max={60} step={5} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Carbs</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <Slider defaultValue={[45]} max={70} step={5} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Fat</span>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <Slider defaultValue={[25]} max={50} step={5} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Dietary Restrictions</Label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        "Vegetarian",
                        "Vegan",
                        "Gluten-Free",
                        "Dairy-Free",
                        "Nut-Free",
                        "Keto",
                        "Paleo",
                        "Low-FODMAP",
                      ].map((diet) => (
                        <div key={diet} className="flex items-center space-x-2">
                          <Switch id={`diet-${diet}`} />
                          <Label htmlFor={`diet-${diet}`} className="text-sm">
                            {diet}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies or Intolerances</Label>
                    <Input id="allergies" placeholder="e.g., shellfish, eggs, peanuts" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferences">Food Preferences</Label>
                    <Textarea
                      id="preferences"
                      placeholder="Foods you particularly enjoy or want to include in your meal plan"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dislikes">Food Dislikes</Label>
                    <Input id="dislikes" placeholder="e.g., mushrooms, olives, cilantro" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Your Personalized Meal Plan...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate AI Meal Plan
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-gray-500">
                Our AI creates a personalized plan based on your nutritional needs, preferences, and goals. Always
                consult with a healthcare professional before making significant dietary changes.
              </p>
            </CardFooter>
          </Card>
        ) : (
          <>
            {/* Success Message */}
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">AI Meal Plan Generated!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your personalized meal plan has been created by our AI nutritionist based on your profile and
                preferences.
              </AlertDescription>
            </Alert>

            {/* Tabs for Plan and Report */}
            <Tabs defaultValue="meal-plan" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="meal-plan" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Meal Plan</span>
                </TabsTrigger>
                <TabsTrigger value="report" className="flex items-center gap-1">
                  <Bot className="h-4 w-4" />
                  <span>AI Nutrition Report</span>
                </TabsTrigger>
              </TabsList>

              {/* Meal Plan Tab */}
              <TabsContent value="meal-plan" className="mt-6">
                {/* Actions Bar */}
                <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    Your 7-Day Meal Plan
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Printer className="h-4 w-4" />
                      <span className="hidden sm:inline">Print</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>

                {/* Day Tabs */}
                <Tabs defaultValue="monday" value={activeDay} onValueChange={setActiveDay}>
                  <TabsList className="grid grid-cols-7 w-full">
                    {days.map((day) => (
                      <TabsTrigger key={day.value} value={day.value}>
                        {day.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {days.map((day) => (
                    <TabsContent key={day.value} value={day.value} className="space-y-6 mt-6">
                      {/* Breakfast */}
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Coffee className="h-5 w-5 text-orange-500" />
                              <span>Breakfast</span>
                            </CardTitle>
                            <Badge variant="outline" className="font-normal">
                              350 kcal
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                              <img
                                src="/placeholder.svg?height=80&width=80"
                                alt="Breakfast"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">Greek Yogurt Parfait with Berries and Granola</h3>
                              <p className="text-sm text-gray-500">
                                A protein-rich breakfast with probiotics and antioxidants.
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                                  20g Protein
                                </Badge>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 text-xs">
                                  40g Carbs
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                                  10g Fat
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Lunch */}
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Salad className="h-5 w-5 text-green-500" />
                              <span>Lunch</span>
                            </CardTitle>
                            <Badge variant="outline" className="font-normal">
                              450 kcal
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                              <img
                                src="/placeholder.svg?height=80&width=80"
                                alt="Lunch"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">Quinoa Salad with Grilled Chicken</h3>
                              <p className="text-sm text-gray-500">
                                A balanced meal with complete proteins and fiber-rich vegetables.
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                                  30g Protein
                                </Badge>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 text-xs">
                                  45g Carbs
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                                  15g Fat
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Dinner */}
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <ChefHat className="h-5 w-5 text-purple-500" />
                              <span>Dinner</span>
                            </CardTitle>
                            <Badge variant="outline" className="font-normal">
                              520 kcal
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                              <img
                                src="/placeholder.svg?height=80&width=80"
                                alt="Dinner"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">Baked Salmon with Sweet Potato and Asparagus</h3>
                              <p className="text-sm text-gray-500">
                                Rich in omega-3 fatty acids and micronutrients for optimal health.
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                                  35g Protein
                                </Badge>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 text-xs">
                                  40g Carbs
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                                  22g Fat
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Snacks */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <Apple className="h-5 w-5 text-red-500" />
                            <span>Snacks</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                                <img
                                  src="/placeholder.svg?height=48&width=48"
                                  alt="Morning Snack"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">Apple with Almond Butter</h3>
                                <div className="flex justify-between">
                                  <p className="text-xs text-gray-500">Morning Snack</p>
                                  <p className="text-xs font-medium">180 kcal</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                                <img
                                  src="/placeholder.svg?height=48&width=48"
                                  alt="Afternoon Snack"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">Greek Yogurt with Berries</h3>
                                <div className="flex justify-between">
                                  <p className="text-xs text-gray-500">Afternoon Snack</p>
                                  <p className="text-xs font-medium">150 kcal</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Daily Summary */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Daily Nutritional Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                              <div className="flex items-center justify-center mb-1">
                                <Flame className="h-4 w-4 text-orange-500 mr-1" />
                                <p className="text-sm text-gray-700">Calories</p>
                              </div>
                              <p className="text-xl font-semibold text-orange-600">1,650 kcal</p>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                              <div className="flex items-center justify-center mb-1">
                                <Egg className="h-4 w-4 text-purple-500 mr-1" />
                                <p className="text-sm text-gray-700">Protein</p>
                              </div>
                              <p className="text-xl font-semibold text-purple-600">110g</p>
                            </div>
                            <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                              <div className="flex items-center justify-center mb-1">
                                <Leaf className="h-4 w-4 text-green-500 mr-1" />
                                <p className="text-sm text-gray-700">Fiber</p>
                              </div>
                              <p className="text-xl font-semibold text-green-600">28g</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            <Bot className="mr-2 h-4 w-4" />
                            <span>Regenerate This Day's Meals</span>
                          </Button>
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                              <circle cx="20" cy="8" r="2"></circle>
                            </svg>
                            <span>Request Doctor Approval</span>
                          </Button>
                          <div className="text-xs text-gray-500 italic text-center">
                            Status: Not submitted for review
                          </div>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>

              {/* AI Report Tab */}
              <TabsContent value="report" className="mt-6 space-y-6">
                {/* AI Report Header */}
                <Card className="border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-purple-500" />
                          <span>AI Nutritional Analysis</span>
                        </CardTitle>
                        <CardDescription>
                          Personalized insights and recommendations based on your profile and nutritional needs
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-purple-100 text-purple-700">
                          AI Generated
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Generated on April 22, 2025</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-3">Executive Summary</h3>
                      <p className="text-gray-700">
                        Based on your profile, goals, and nutritional preferences, I've created a personalized 7-day
                        meal plan focused on weight management while ensuring optimal nutrition. The plan is designed to
                        provide approximately 2,000 calories per day with a macronutrient distribution of 30% protein,
                        45% carbohydrates, and 25% fat – ideal for supporting your active lifestyle while maintaining
                        your weight.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Nutritional Goals Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span>Nutritional Goals Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Scale className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Weight Maintenance</span>
                        </div>
                        <span className="text-sm font-medium">2,000 calories/day</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on your height, weight, activity level, and goals, I've calculated your maintenance
                        calories to be approximately 2,000 per day. The meal plan is designed around this target.
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Egg className="h-4 w-4 mr-2 text-purple-500" />
                          <span>Protein Intake</span>
                        </div>
                        <span className="text-sm font-medium">150g/day (30%)</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Your plan emphasizes high-quality protein sources to support muscle maintenance and satiety. The
                        daily target of 150g (1.8g per kg of body weight) is optimal for your activity level.
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Leaf className="h-4 w-4 mr-2 text-green-500" />
                          <span>Fiber Intake</span>
                        </div>
                        <span className="text-sm font-medium">30g/day</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        The meal plan includes ample fruits, vegetables, and whole grains to meet the daily fiber
                        recommendation of 25-30g, supporting digestive health and helping to maintain steady blood sugar
                        levels throughout the day.
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-red-500" />
                          <span>Healthy Fats</span>
                        </div>
                        <span className="text-sm font-medium">55g/day (25%)</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Your meal plan incorporates sources of omega-3 fatty acids and monounsaturated fats from foods
                        like salmon, avocados, olive oil, and nuts to support heart and brain health.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Dietary Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      <span>Personalized Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                          <h3 className="font-medium text-blue-800 mb-2">Meal Timing Optimization</h3>
                          <p className="text-blue-700 text-sm">
                            Based on your schedule and preferences, I recommend eating your largest meals earlier in the
                            day, with dinner being lighter and consumed at least 3 hours before bedtime. This approach
                            supports better digestion and sleep quality.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg bg-green-50 border-green-100">
                          <h3 className="font-medium text-green-800 mb-2">Hydration Strategy</h3>
                          <p className="text-green-700 text-sm">
                            Aim for 8-10 cups of water daily, with increased intake during and after exercise. Consider
                            starting your day with a glass of water and keeping a reusable water bottle with you
                            throughout the day as a reminder.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg bg-purple-50 border-purple-100">
                          <h3 className="font-medium text-purple-800 mb-2">Supplement Considerations</h3>
                          <p className="text-purple-700 text-sm">
                            Based on your diet preferences and goals, consider supplementing with vitamin D3, especially
                            during winter months, and a high-quality omega-3 supplement if you don't regularly consume
                            fatty fish.
                          </p>
                        </div>

                        <div className="p-4 border rounded-lg bg-orange-50 border-orange-100">
                          <h3 className="font-medium text-orange-800 mb-2">Mindful Eating Practices</h3>
                          <p className="text-orange-700 text-sm">
                            Practice mindful eating by eliminating distractions during meals, chewing thoroughly, and
                            paying attention to hunger and fullness cues. This can help with portion control and enhance
                            satisfaction from meals.
                          </p>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Doctor Approval Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-teal-600"
                      >
                        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                        <circle cx="20" cy="8" r="2"></circle>
                      </svg>
                      <span>Healthcare Professional Review</span>
                    </CardTitle>
                    <CardDescription>
                      Have this meal plan and nutritional report reviewed by your healthcare provider
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <p className="text-gray-700 mb-4">
                        While this AI-generated meal plan is based on general nutritional guidelines and your provided
                        information, it's always recommended to consult with a registered dietitian or healthcare
                        provider before making significant changes to your diet, especially if you have any medical
                        conditions or take medications.
                      </p>
                      <Button className="w-full">Request Doctor Approval</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppSidebar>
  )
}
