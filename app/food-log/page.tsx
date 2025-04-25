"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Plus,
  Minus,
  Clock,
  UtensilsCrossed,
  Coffee,
  Salad,
  ChefHat,
  Flame,
  Egg,
  Apple,
  Info,
} from "lucide-react"
import { foodDatabase, nutritionTips, userData } from "@/lib/mock-data"

export default function FoodLogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFood, setSelectedFood] = useState<(typeof foodDatabase)[0] | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mealType, setMealType] = useState("breakfast")
  const [loggedFoods, setLoggedFoods] = useState<
    Array<{
      id: number
      name: string
      quantity: number
      calories: number
      protein: number
      carbs: number
      fat: number
      mealType: string
    }>
  >([])
  const [randomTip, setRandomTip] = useState("")

  useEffect(() => {
    // Get a random nutrition tip
    const tipIndex = Math.floor(Math.random() * nutritionTips.length)
    setRandomTip(nutritionTips[tipIndex])
  }, [])

  const filteredFoods = searchTerm
    ? foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const handleFoodSelect = (food: (typeof foodDatabase)[0]) => {
    setSelectedFood(food)
  }

  const handleQuantityChange = (value: number[]) => {
    setQuantity(value[0])
  }

  const handleAddFood = () => {
    if (selectedFood) {
      const newFood = {
        id: Date.now(),
        name: selectedFood.name,
        quantity,
        calories: selectedFood.calories * quantity,
        protein: selectedFood.protein * quantity,
        carbs: selectedFood.carbs * quantity,
        fat: selectedFood.fat * quantity,
        mealType,
      }

      setLoggedFoods([...loggedFoods, newFood])
      setSelectedFood(null)
      setQuantity(1)
      setSearchTerm("")
    }
  }

  const handleRemoveFood = (id: number) => {
    setLoggedFoods(loggedFoods.filter((food) => food.id !== id))
  }

  // Calculate totals
  const totalCalories = loggedFoods.reduce((sum, food) => sum + food.calories, 0)
  const totalProtein = loggedFoods.reduce((sum, food) => sum + food.protein, 0)
  const totalCarbs = loggedFoods.reduce((sum, food) => sum + food.carbs, 0)
  const totalFat = loggedFoods.reduce((sum, food) => sum + food.fat, 0)

  return (
    <AppSidebar>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Food Search and Logging Section */}
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Your Food</CardTitle>
                <CardDescription>Search for foods and add them to your daily log</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search for a food..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {searchTerm && (
                    <ScrollArea className="h-60 border rounded-md">
                      <div className="p-4 space-y-2">
                        {filteredFoods.length > 0 ? (
                          filteredFoods.map((food) => (
                            <motion.div
                              key={food.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className={`p-3 rounded-lg cursor-pointer ${
                                selectedFood?.id === food.id
                                  ? "bg-green-50 border-green-200 border"
                                  : "hover:bg-gray-50 border border-gray-100"
                              }`}
                              onClick={() => handleFoodSelect(food)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{food.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                  </p>
                                </div>
                                <Badge variant="outline" className="capitalize">
                                  {food.category}
                                </Badge>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 py-4">No foods found. Try a different search term.</p>
                        )}
                      </div>
                    </ScrollArea>
                  )}

                  {selectedFood && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <h3 className="font-semibold mb-2">
                        {selectedFood.name}
                        <Badge variant="outline" className="ml-2 capitalize">
                          {selectedFood.category}
                        </Badge>
                      </h3>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-white p-2 rounded border text-center">
                          <p className="text-xs text-gray-500">Calories</p>
                          <p className="font-semibold">{selectedFood.calories * quantity} kcal</p>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                          <p className="text-xs text-gray-500">Protein</p>
                          <p className="font-semibold">{selectedFood.protein * quantity}g</p>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                          <p className="text-xs text-gray-500">Carbs</p>
                          <p className="font-semibold">{selectedFood.carbs * quantity}g</p>
                        </div>
                        <div className="bg-white p-2 rounded border text-center">
                          <p className="text-xs text-gray-500">Fat</p>
                          <p className="font-semibold">{selectedFood.fat * quantity}g</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Quantity</Label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setQuantity(quantity + 0.5)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <Slider
                            value={[quantity]}
                            min={0.5}
                            max={5}
                            step={0.5}
                            onValueChange={handleQuantityChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Meal Type</Label>
                          <Tabs defaultValue="breakfast" onValueChange={setMealType}>
                            <TabsList className="grid grid-cols-4 w-full">
                              <TabsTrigger value="breakfast" className="flex items-center gap-1">
                                <Coffee className="h-3 w-3" />
                                <span className="text-xs">Breakfast</span>
                              </TabsTrigger>
                              <TabsTrigger value="lunch" className="flex items-center gap-1">
                                <Salad className="h-3 w-3" />
                                <span className="text-xs">Lunch</span>
                              </TabsTrigger>
                              <TabsTrigger value="dinner" className="flex items-center gap-1">
                                <ChefHat className="h-3 w-3" />
                                <span className="text-xs">Dinner</span>
                              </TabsTrigger>
                              <TabsTrigger value="snack" className="flex items-center gap-1">
                                <Apple className="h-3 w-3" />
                                <span className="text-xs">Snack</span>
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>

                        <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleAddFood}>
                          Add to Meal
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today's Food Log</CardTitle>
                <CardDescription>Foods you've logged today</CardDescription>
              </CardHeader>
              <CardContent>
                {loggedFoods.length > 0 ? (
                  <div className="space-y-4">
                    {["breakfast", "lunch", "dinner", "snack"].map((type) => {
                      const mealFoods = loggedFoods.filter((food) => food.mealType === type)
                      if (mealFoods.length === 0) return null

                      return (
                        <div key={type} className="space-y-2">
                          <h3 className="font-medium capitalize flex items-center">
                            {type === "breakfast" && <Coffee className="h-4 w-4 mr-2" />}
                            {type === "lunch" && <Salad className="h-4 w-4 mr-2" />}
                            {type === "dinner" && <ChefHat className="h-4 w-4 mr-2" />}
                            {type === "snack" && <Apple className="h-4 w-4 mr-2" />}
                            {type}
                          </h3>
                          <div className="space-y-2">
                            {mealFoods.map((food) => (
                              <div
                                key={food.id}
                                className="flex justify-between items-center p-3 rounded-lg border border-gray-100 bg-white"
                              >
                                <div>
                                  <p className="font-medium">{food.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {food.quantity} serving | {food.calories} kcal
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-gray-500">
                                    P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                                    onClick={() => handleRemoveFood(food.id)}
                                  >
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
                                      <path d="M3 6h18" />
                                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <UtensilsCrossed className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No foods logged yet today.</p>
                    <p className="text-sm">Search for foods above to add them to your log.</p>
                  </div>
                )}
              </CardContent>
              {loggedFoods.length > 0 && (
                <CardFooter className="flex justify-between border-t p-4">
                  <div className="text-sm">
                    <span className="font-medium">Total:</span> {totalCalories} kcal
                  </div>
                  <div className="text-sm">
                    P: {totalProtein}g | C: {totalCarbs}g | F: {totalFat}g
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>

          {/* Sidebar with Nutrition Summary and Tip */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Summary</CardTitle>
                <CardDescription>Your progress for today</CardDescription>
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
                        {totalCalories} / {userData.dailyGoals.calories} kcal
                      </span>
                    </div>
                    <Progress
                      value={(totalCalories / userData.dailyGoals.calories) * 100}
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
                        {totalProtein} / {userData.dailyGoals.protein} g
                      </span>
                    </div>
                    <Progress
                      value={(totalProtein / userData.dailyGoals.protein) * 100}
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
                        {totalCarbs} / {userData.dailyGoals.carbs} g
                      </span>
                    </div>
                    <Progress
                      value={(totalCarbs / userData.dailyGoals.carbs) * 100}
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
                        {totalFat} / {userData.dailyGoals.fat} g
                      </span>
                    </div>
                    <Progress
                      value={(totalFat / userData.dailyGoals.fat) * 100}
                      className="h-2 bg-green-100"
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  Recent Meals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Yesterday's Dinner</h4>
                      <Badge variant="outline" className="text-xs">
                        420 kcal
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Grilled Chicken with Sweet Potato</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-7 text-xs text-blue-500 hover:text-blue-600 p-0"
                    >
                      Log Again
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Yesterday's Lunch</h4>
                      <Badge variant="outline" className="text-xs">
                        350 kcal
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">Quinoa Salad with Avocado</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-7 text-xs text-blue-500 hover:text-blue-600 p-0"
                    >
                      Log Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-orange-500" />
                  Tip of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <p className="text-gray-700 italic">"{randomTip}"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppSidebar>
  )
}
