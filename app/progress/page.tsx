"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart2, PieChartIcon, Download, Share2, Calendar, Flame, Droplet, Scale, ArrowRight } from "lucide-react"
import { progressData } from "@/lib/mock-data"

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("week")

  // Ensure data exists and is properly formatted
  const safeCaloriesData = progressData?.calories?.data || []
  const safeCaloriesLabels = progressData?.calories?.labels || []
  const safeCaloriesGoal = progressData?.calories?.goal || 2000

  const safeMacrosData = progressData?.macros?.data || []
  const safeMacrosLabels = progressData?.macros?.labels || []

  const safeWaterData = progressData?.water?.data || []
  const safeWaterLabels = progressData?.water?.labels || []
  const safeWaterGoal = progressData?.water?.goal || 8

  const safeWeightData = progressData?.weightProgress?.data || []
  const safeWeightLabels = progressData?.weightProgress?.labels || []

  const safeChallengeData = progressData?.challengeCompletions?.data || []
  const safeChallengeLabels = progressData?.challengeCompletions?.labels || []

  const safeNutritionScores = progressData?.nutritionScores || {
    overall: 0,
    protein: 0,
    vegetables: 0,
    processedFoods: 0,
  }

  // Calculate average calories safely
  const averageCalories =
    safeCaloriesData.length > 0 ? Math.round(safeCaloriesData.reduce((a, b) => a + b, 0) / safeCaloriesData.length) : 0

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-blue-500" />
              Progress Tracker
            </h1>
            <p className="text-gray-500">Track your nutrition and health progress over time</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="week" onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calories Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span>Calorie Intake</span>
                </CardTitle>
                <Badge variant="outline" className="font-normal">
                  Goal: {safeCaloriesGoal} kcal
                </Badge>
              </div>
              <CardDescription>Daily calorie consumption</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{averageCalories}</div>
                  <p className="text-gray-500">Average daily calories</p>
                  <div className="mt-4 h-2 bg-gray-100 rounded-full w-64 overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${Math.min(100, (averageCalories / safeCaloriesGoal) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {Math.round((averageCalories / safeCaloriesGoal) * 100)}% of daily goal
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">Average: {averageCalories} kcal</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Macros Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-blue-500" />
                <span>Macronutrient Distribution</span>
              </CardTitle>
              <CardDescription>Protein, carbs, and fat breakdown</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 w-full max-w-md">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-purple-100 border-4 border-purple-500 flex items-center justify-center mx-auto">
                      <span className="text-xl font-bold text-purple-700">{safeMacrosData[0] || 0}g</span>
                    </div>
                    <p className="mt-2 font-medium text-purple-700">Protein</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-500 flex items-center justify-center mx-auto">
                      <span className="text-xl font-bold text-yellow-700">{safeMacrosData[1] || 0}g</span>
                    </div>
                    <p className="mt-2 font-medium text-yellow-700">Carbs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center mx-auto">
                      <span className="text-xl font-bold text-green-700">{safeMacrosData[2] || 0}g</span>
                    </div>
                    <p className="mt-2 font-medium text-green-700">Fat</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Protein: {safeMacrosData[0] || 0}g</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Carbs: {safeMacrosData[1] || 0}g</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Fat: {safeMacrosData[2] || 0}g</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Water Intake */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-blue-500" />
                  <span>Water Intake</span>
                </CardTitle>
                <Badge variant="outline" className="font-normal">
                  Goal: {safeWaterGoal} cups
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-60 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">
                    {safeWaterData.length > 0 ? safeWaterData[safeWaterData.length - 1] : 0}
                  </div>
                  <p className="text-gray-500">Cups today</p>
                  <div className="mt-4 h-2 bg-gray-100 rounded-full w-48 overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${Math.min(100, ((safeWaterData.length > 0 ? safeWaterData[safeWaterData.length - 1] : 0) / safeWaterGoal) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weight Tracking */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-500" />
                <span>Weight Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-60 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">
                    {safeWeightData.length > 0 ? safeWeightData[safeWeightData.length - 1] : 0}
                  </div>
                  <p className="text-gray-500">Current weight (lbs)</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-sm text-green-600">
                      {safeWeightData.length > 1
                        ? (safeWeightData[safeWeightData.length - 1] - safeWeightData[0]).toFixed(1)
                        : 0}{" "}
                      lbs
                    </span>
                    <span className="text-sm text-gray-500">since start</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Challenge Completions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>Challenge Completions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-60 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    {safeChallengeData.reduce((sum, val) => sum + val, 0)}
                  </div>
                  <p className="text-gray-500">Total challenges completed</p>
                  <div className="mt-4">
                    <Button size="sm" variant="outline">
                      View All Challenges
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nutrition Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Quality Scores</CardTitle>
            <CardDescription>Your nutrition quality metrics based on your eating patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="text-sm font-medium">{safeNutritionScores.overall}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    style={{ width: `${safeNutritionScores.overall}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">Your overall nutrition quality</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Protein Quality</span>
                  <span className="text-sm font-medium">{safeNutritionScores.protein}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${safeNutritionScores.protein}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">Lean protein sources</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Vegetable Intake</span>
                  <span className="text-sm font-medium">{safeNutritionScores.vegetables}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${safeNutritionScores.vegetables}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">Variety and quantity</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Processed Foods</span>
                  <span className="text-sm font-medium">{safeNutritionScores.processedFoods}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${safeNutritionScores.processedFoods}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">Lower is better</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <span>View Detailed Nutrition Analysis</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Eating Pattern Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Eating Pattern Analysis</CardTitle>
            <CardDescription>AI-powered insights based on your food logging history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                  Your fiber intake is below recommended levels. Consider adding more whole grains, legumes, and fruits
                  to your diet.
                </p>
                <div className="mt-2">
                  <Button size="sm" variant="outline" className="text-yellow-700 border-yellow-200">
                    Get Suggestions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Schedule Consultation with Nutritionist
            </Button>
          </CardFooter>
        </Card>

        {/* AI Report Generation */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
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
                className="text-purple-600"
              >
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2"></path>
                <path d="M12 17v.01"></path>
                <path d="M12 13.5a1.5 1.5 0 1 1 1.14-2.5"></path>
                <path d="M6.79 12.57a5.5 5.5 0 1 1 11.41-1.56"></path>
                <path d="M12.7 12.43a1.5 1.5 0 1 0-2.4-1.43"></path>
                <path d="M6.53 9.43a5.5 5.5 0 1 0 10.95 1.14"></path>
              </svg>
              <span>AI Nutrition Analysis</span>
            </CardTitle>
            <CardDescription>
              Get personalized AI-generated reports and meal plans based on your nutrition data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
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
                    className="text-purple-600 mr-2"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Comprehensive Nutrition Report
                </h3>
                <p className="text-gray-600 mb-4">
                  Our AI agent will analyze your nutrition patterns and generate a detailed report with insights and
                  recommendations.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Generate AI Report</Button>
              </div>

              <div className="p-6 border rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
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
                    className="text-blue-600 mr-2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M8 7h.01"></path>
                    <path d="M11 19v-5.87"></path>
                    <path d="M11 19h0"></path>
                    <path d="M11 13.13V9a2 2 0 0 1 4 0v2h.032"></path>
                  </svg>
                  AI Meal Plan Recommendation
                </h3>
                <p className="text-gray-600 mb-4">
                  Get a customized meal plan created by our AI agent based on your nutrition goals, preferences, and
                  health data.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create AI Meal Plan</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full text-sm text-gray-500">
              AI reports are generated using advanced machine learning algorithms and are for reference only. Always
              consult with healthcare professionals.
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppSidebar>
  )
}
