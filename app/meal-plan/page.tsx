"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Utensils,
  Coffee,
  Apple,
  Beef,
  Fish,
  Egg,
  Salad,
  Sandwich,
  Milk,
  Banana,
  Cherry,
  Carrot,
  Wheat,
  Soup,
  Pizza,
  Drumstick,
  Zap,
  Activity,
} from "lucide-react"
import { mealPlan } from "@/lib/mock-data"

// Component to display appropriate icon based on meal type and content
const MealIcon = ({ type, name, day }) => {
  const lowerName = name.toLowerCase()

  // Special handling for Friday meals
  if (day === "Friday") {
    if (type === "breakfast" && (lowerName.includes("avocado") || lowerName.includes("toast"))) {
      return <Sandwich className="h-5 w-5 text-green-500" />
    }
    if (type === "lunch" && (lowerName.includes("tuna") || lowerName.includes("salad"))) {
      return <Salad className="h-5 w-5 text-green-500" />
    }
    if (type === "dinner" && (lowerName.includes("bean") || lowerName.includes("burrito"))) {
      return <Utensils className="h-5 w-5 text-orange-500" />
    }
  }

  // Special handling for Monday meals
  if (day === "Monday") {
    if (type === "breakfast" && (lowerName.includes("yogurt") || lowerName.includes("greek"))) {
      return <Milk className="h-5 w-5 text-blue-500" />
    }
    if (type === "lunch" && (lowerName.includes("chicken") || lowerName.includes("quinoa"))) {
      return <Drumstick className="h-5 w-5 text-orange-500" />
    }
    if (type === "snack" && lowerName.includes("protein")) {
      return <Activity className="h-5 w-5 text-purple-500" />
    }
  }

  // General meal icon detection
  if (lowerName.includes("coffee") || lowerName.includes("tea")) {
    return <Coffee className="h-5 w-5 text-brown-500" />
  }
  if (lowerName.includes("yogurt") || lowerName.includes("milk")) {
    return <Milk className="h-5 w-5 text-blue-500" />
  }
  if (lowerName.includes("egg")) {
    return <Egg className="h-5 w-5 text-yellow-500" />
  }
  if (lowerName.includes("salad")) {
    return <Salad className="h-5 w-5 text-green-500" />
  }
  if (lowerName.includes("sandwich") || lowerName.includes("toast") || lowerName.includes("bread")) {
    return <Sandwich className="h-5 w-5 text-yellow-700" />
  }
  if (lowerName.includes("chicken") || lowerName.includes("turkey")) {
    return <Drumstick className="h-5 w-5 text-orange-500" />
  }
  if (lowerName.includes("beef") || lowerName.includes("steak")) {
    return <Beef className="h-5 w-5 text-red-500" />
  }
  if (lowerName.includes("fish") || lowerName.includes("tuna") || lowerName.includes("salmon")) {
    return <Fish className="h-5 w-5 text-blue-500" />
  }
  if (lowerName.includes("fruit") || lowerName.includes("apple")) {
    return <Apple className="h-5 w-5 text-red-500" />
  }
  if (lowerName.includes("banana")) {
    return <Banana className="h-5 w-5 text-yellow-500" />
  }
  if (lowerName.includes("berry") || lowerName.includes("berries")) {
    return <Cherry className="h-5 w-5 text-red-500" />
  }
  if (lowerName.includes("carrot") || lowerName.includes("vegetable")) {
    return <Carrot className="h-5 w-5 text-orange-500" />
  }
  if (lowerName.includes("grain") || lowerName.includes("oat") || lowerName.includes("cereal")) {
    return <Wheat className="h-5 w-5 text-yellow-700" />
  }
  if (lowerName.includes("soup")) {
    return <Soup className="h-5 w-5 text-orange-500" />
  }
  if (lowerName.includes("pizza")) {
    return <Pizza className="h-5 w-5 text-red-500" />
  }
  if (lowerName.includes("protein") || lowerName.includes("shake")) {
    return <Zap className="h-5 w-5 text-purple-500" />
  }

  // Default icons based on meal type
  if (type === "breakfast") {
    return <Coffee className="h-5 w-5 text-orange-500" />
  }
  if (type === "lunch" || type === "dinner") {
    return <Utensils className="h-5 w-5 text-blue-500" />
  }
  if (type === "snack") {
    return <Apple className="h-5 w-5 text-green-500" />
  }

  return <Utensils className="h-5 w-5 text-gray-500" />
}

export default function MealPlanPage() {
  const [activeTab, setActiveTab] = useState("this-week")

  return (
    <AppSidebar>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Meal Plan</h1>
          <p className="text-gray-500">Plan and track your meals for optimal nutrition</p>
        </div>

        <Tabs defaultValue="this-week" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="this-week">This Week</TabsTrigger>
            <TabsTrigger value="meal-ideas">Meal Ideas</TabsTrigger>
          </TabsList>

          <TabsContent value="this-week" className="space-y-6">
            {Object.entries(mealPlan).map(([day, meals]) => (
              <Card key={day}>
                <CardHeader>
                  <CardTitle>{day}</CardTitle>
                  <CardDescription>Your planned meals for {day}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(meals).map(([mealType, meal]) => (
                      <div key={mealType} className="flex items-start gap-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <MealIcon type={mealType} name={meal.name} day={day} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium capitalize">{mealType}</p>
                              <p className="text-sm text-gray-500">{meal.time}</p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {meal.calories} kcal
                            </Badge>
                          </div>
                          <p className="mt-1">{meal.name}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                              {meal.protein}g protein
                            </Badge>
                            <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                              {meal.carbs}g carbs
                            </Badge>
                            <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100">
                              {meal.fat}g fat
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit {day}'s Meals
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="meal-ideas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <Utensils className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {
                        [
                          "Grilled Salmon",
                          "Quinoa Bowl",
                          "Greek Salad",
                          "Chicken Stir-Fry",
                          "Vegetable Curry",
                          "Avocado Toast",
                          "Protein Pancakes",
                          "Mediterranean Wrap",
                          "Buddha Bowl",
                        ][i]
                      }
                    </CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {Math.floor(Math.random() * 30) + 20}g protein
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {Math.floor(Math.random() * 400) + 300} kcal
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      Add to Meal Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button>Browse More Meal Ideas</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  )
}
