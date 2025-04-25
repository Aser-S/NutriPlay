"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Settings,
  RefreshCw,
  Flame,
  Leaf,
  Wheat,
  Coffee,
  Salad,
  ChefHat,
  Apple,
  Activity,
  Droplet,
  Heart,
  Info,
  Egg,
  Fish,
  Beef,
  Sandwich,
  Pizza,
  Soup,
  Utensils,
  Banana,
  Cherry,
  Grape,
  Milk,
  Cookie,
} from "lucide-react"
import { mealPlan } from "@/lib/mock-data"

// Custom icon component for meals
const MealIcon = ({ type, mealName }) => {
  // Determine the appropriate icon based on meal name keywords
  const lowercaseName = mealName.toLowerCase()

  if (type === "breakfast") {
    if (lowercaseName.includes("pancake")) return <Wheat className="h-8 w-8 text-amber-500" />
    if (lowercaseName.includes("egg")) return <Egg className="h-8 w-8 text-yellow-500" />
    if (lowercaseName.includes("yogurt")) return <Milk className="h-8 w-8 text-blue-100" />
    if (lowercaseName.includes("smoothie")) return <Banana className="h-8 w-8 text-yellow-400" />
    if (lowercaseName.includes("oatmeal")) return <Wheat className="h-8 w-8 text-amber-700" />
    return <Coffee className="h-8 w-8 text-amber-800" />
  }

  if (type === "lunch") {
    if (lowercaseName.includes("salad")) return <Salad className="h-8 w-8 text-green-500" />
    if (lowercaseName.includes("sandwich")) return <Sandwich className="h-8 w-8 text-amber-600" />
    if (lowercaseName.includes("soup")) return <Soup className="h-8 w-8 text-orange-400" />
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

  if (type === "snack") {
    if (lowercaseName.includes("apple")) return <Apple className="h-8 w-8 text-red-500" />
    if (lowercaseName.includes("banana")) return <Banana className="h-8 w-8 text-yellow-400" />
    if (lowercaseName.includes("yogurt")) return <Milk className="h-8 w-8 text-blue-100" />
    if (lowercaseName.includes("nuts")) return <Cookie className="h-8 w-8 text-amber-700" />
    if (lowercaseName.includes("chocolate")) return <Cookie className="h-8 w-8 text-amber-900" />
    if (lowercaseName.includes("fruit") || lowercaseName.includes("berry"))
      return <Cherry className="h-8 w-8 text-red-400" />
    if (lowercaseName.includes("grape")) return <Grape className="h-8 w-8 text-purple-500" />
    return <Apple className="h-8 w-8 text-green-500" />
  }

  return <Utensils className="h-8 w-8 text-gray-400" />
}

export default function MealPlanPage() {
  const [activeDay, setActiveDay] = useState("monday")
  const [filters, setFilters] = useState({
    vegan: false,
    glutenFree: false,
    lowCarb: false,
    diabetes: false,
    lactoseIntolerant: false,
    pregnancy: false,
  })
  const [currentWeek, setCurrentWeek] = useState("This Week")
  const [showRecipe, setShowRecipe] = useState(null)

  const handleFilterChange = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter],
    })
  }

  const handleReplaceMeal = (meal) => {
    // In a real app, this would call an API to get a replacement meal
    alert(`Replacing ${meal}...`)
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

  const getConditionIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "vegan":
        return <Leaf className="h-4 w-4 text-green-500" />
      case "gluten-free":
        return <Wheat className="h-4 w-4 text-yellow-500" />
      case "low-carb":
        return <Flame className="h-4 w-4 text-orange-500" />
      case "diabetes":
        return <Activity className="h-4 w-4 text-blue-500" />
      case "lactose intolerant":
        return <Droplet className="h-4 w-4 text-cyan-500" />
      case "pregnancy":
        return <Heart className="h-4 w-4 text-pink-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header with Week Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            <h1 className="text-2xl font-bold">Weekly Meal Plan</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{currentWeek}</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch id="vegan" checked={filters.vegan} onCheckedChange={() => handleFilterChange("vegan")} />
                <Label htmlFor="vegan" className="flex items-center gap-1">
                  <Leaf className="h-4 w-4 text-green-500" />
                  <span>Vegan</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="gluten-free"
                  checked={filters.glutenFree}
                  onCheckedChange={() => handleFilterChange("glutenFree")}
                />
                <Label htmlFor="gluten-free" className="flex items-center gap-1">
                  <Wheat className="h-4 w-4 text-yellow-500" />
                  <span>Gluten-Free</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="low-carb" checked={filters.lowCarb} onCheckedChange={() => handleFilterChange("lowCarb")} />
                <Label htmlFor="low-carb" className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span>Low-Carb</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="diabetes"
                  checked={filters.diabetes}
                  onCheckedChange={() => handleFilterChange("diabetes")}
                />
                <Label htmlFor="diabetes" className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span>Diabetes</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="lactose-intolerant"
                  checked={filters.lactoseIntolerant}
                  onCheckedChange={() => handleFilterChange("lactoseIntolerant")}
                />
                <Label htmlFor="lactose-intolerant" className="flex items-center gap-1">
                  <Droplet className="h-4 w-4 text-cyan-500" />
                  <span>Lactose Intolerant</span>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="pregnancy"
                  checked={filters.pregnancy}
                  onCheckedChange={() => handleFilterChange("pregnancy")}
                />
                <Label htmlFor="pregnancy" className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span>Pregnancy</span>
                </Label>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span>⚙️ Adjust Preferences</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Meal Plan Preferences</DialogTitle>
                    <DialogDescription>
                      Customize your meal plan based on your dietary needs and preferences.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Dietary Restrictions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vegan-pref" />
                          <Label htmlFor="vegan-pref">Vegan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vegetarian-pref" />
                          <Label htmlFor="vegetarian-pref">Vegetarian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="gluten-free-pref" />
                          <Label htmlFor="gluten-free-pref">Gluten-Free</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="dairy-free-pref" />
                          <Label htmlFor="dairy-free-pref">Dairy-Free</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="nut-free-pref" />
                          <Label htmlFor="nut-free-pref">Nut-Free</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="low-carb-pref" />
                          <Label htmlFor="low-carb-pref">Low-Carb</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="diabetes-pref" />
                          <Label htmlFor="diabetes-pref">Diabetes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="lactose-pref" />
                          <Label htmlFor="lactose-pref">Lactose Intolerant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="pregnancy-pref" />
                          <Label htmlFor="pregnancy-pref">Pregnancy</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Reset</Button>
                    <Button>Save Preferences</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Day Tabs */}
        <Tabs defaultValue="monday" value={activeDay} onValueChange={setActiveDay}>
          <TabsList className="grid grid-cols-7 w-full">
            {days.map((day) => (
              <TabsTrigger key={day.value} value={day.value}>
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(mealPlan).map(([day, meals]) => (
            <TabsContent key={day} value={day} className="space-y-6">
              {/* Breakfast */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-orange-500" />
                      <span>Breakfast</span>
                    </CardTitle>
                    <Badge variant="outline" className="font-normal">
                      {meals.breakfast.calories} kcal
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                      <MealIcon type="breakfast" mealName={meals.breakfast.name} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{meals.breakfast.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {meals.breakfast.recipe.ingredients.slice(0, 3).join(", ")} and more...
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-500"
                        onClick={() => setShowRecipe({ ...meals.breakfast, type: "breakfast" })}
                      >
                        View Recipe
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleReplaceMeal(`${day}'s breakfast`)}
                        title="Replace meal"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <div className="text-sm text-gray-500">
                        <span className="text-xs">Don't like a meal? Click to replace.</span>
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
                      {meals.lunch.calories} kcal
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                      <MealIcon type="lunch" mealName={meals.lunch.name} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{meals.lunch.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {meals.lunch.recipe.ingredients.slice(0, 3).join(", ")} and more...
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-500"
                        onClick={() => setShowRecipe({ ...meals.lunch, type: "lunch" })}
                      >
                        View Recipe
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => handleReplaceMeal(`${day}'s lunch`)}
                      title="Replace meal"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
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
                      {meals.dinner.calories} kcal
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                      <MealIcon type="dinner" mealName={meals.dinner.name} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{meals.dinner.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {meals.dinner.recipe.ingredients.slice(0, 3).join(", ")} and more...
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-500"
                        onClick={() => setShowRecipe({ ...meals.dinner, type: "dinner" })}
                      >
                        View Recipe
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => handleReplaceMeal(`${day}'s dinner`)}
                      title="Replace meal"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
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
                    {meals.snacks.map((snack, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                          <MealIcon type="snack" mealName={snack.name} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{snack.name}</h3>
                          <div className="flex justify-between">
                            <p className="text-xs text-gray-500">{snack.calories} kcal</p>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-xs text-blue-500"
                              onClick={() => setShowRecipe({ ...snack, type: "snack" })}
                            >
                              Recipe
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-gray-400 hover:text-red-500"
                          onClick={() => handleReplaceMeal(`${day}'s snack ${index + 1}`)}
                          title="Replace snack"
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">
                    Add Snack
                  </Button>
                </CardFooter>
              </Card>

              {/* Daily Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="text-xl font-semibold text-orange-600">
                        {meals.breakfast.calories +
                          meals.lunch.calories +
                          meals.dinner.calories +
                          meals.snacks.reduce((sum, snack) => sum + snack.calories, 0)}{" "}
                        kcal
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                      <p className="text-sm text-gray-500">Protein</p>
                      <p className="text-xl font-semibold text-purple-600">110g</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                      <p className="text-sm text-gray-500">Carbs</p>
                      <p className="text-xl font-semibold text-green-600">180g</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full bg-green-500 hover:bg-green-600">Generate Shopping List</Button>
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
                  <div className="text-xs text-gray-500 italic text-center">Status: Pending review by Dr. Smith</div>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Recipe Dialog */}
        {showRecipe && (
          <Dialog open={!!showRecipe} onOpenChange={() => setShowRecipe(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl">{showRecipe.name} Recipe</DialogTitle>
                <DialogDescription>
                  {showRecipe.type.charAt(0).toUpperCase() + showRecipe.type.slice(1)} - {showRecipe.calories} calories
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="rounded-md overflow-hidden mb-4 bg-gray-100 h-48 flex items-center justify-center">
                    <MealIcon type={showRecipe.type} mealName={showRecipe.name} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Dietary Information</h3>
                      <div className="flex flex-wrap gap-2">
                        {showRecipe.recipe.dietaryInfo.map((info, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                            {info}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Prep Time</p>
                        <p className="font-medium">{showRecipe.recipe.prepTime}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Cook Time</p>
                        <p className="font-medium">{showRecipe.recipe.cookTime}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">Servings</p>
                        <p className="font-medium">{showRecipe.recipe.servings}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Ingredients</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {showRecipe.recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-sm">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Instructions</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      {showRecipe.recipe.instructions.map((instruction, index) => (
                        <li key={index} className="text-sm">
                          {instruction}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRecipe(null)}>
                  Close
                </Button>
                <Button>Save to Favorites</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AppSidebar>
  )
}
