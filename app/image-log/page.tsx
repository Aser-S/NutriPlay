"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Camera,
  Upload,
  ImageIcon,
  Check,
  Edit,
  Trash2,
  Brain,
  Flame,
  Egg,
  Apple,
  Info,
  Plus,
  Minus,
} from "lucide-react"
import { foodDatabase, userData } from "@/lib/mock-data"

export default function ImageLogPage() {
  const [step, setStep] = useState<"upload" | "analyzing" | "results">("upload")
  const [image, setImage] = useState<string | null>(null)
  const [recognizedFoods, setRecognizedFoods] = useState<
    Array<{
      id: number
      name: string
      confidence: number
      quantity: number
      calories: number
      protein: number
      carbs: number
      fat: number
    }>
  >([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState<number | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setStep("analyzing")

        // Simulate API call for image recognition
        setTimeout(() => {
          // Mock recognized foods
          const mockRecognizedFoods = [
            {
              ...foodDatabase[2], // Chicken Breast
              confidence: 0.92,
              quantity: 1,
            },
            {
              ...foodDatabase[11], // Sweet Potato
              confidence: 0.87,
              quantity: 1,
            },
            {
              ...foodDatabase[7], // Spinach
              confidence: 0.78,
              quantity: 0.5,
            },
          ]

          setRecognizedFoods(mockRecognizedFoods)
          setStep("results")
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleQuantityChange = (id: number, value: number) => {
    setRecognizedFoods(
      recognizedFoods.map((food) =>
        food.id === id
          ? {
              ...food,
              quantity: value,
              calories: Math.round(foodDatabase.find((f) => f.id === food.id)!.calories * value),
              protein: Math.round(foodDatabase.find((f) => f.id === food.id)!.protein * value * 10) / 10,
              carbs: Math.round(foodDatabase.find((f) => f.id === food.id)!.carbs * value * 10) / 10,
              fat: Math.round(foodDatabase.find((f) => f.id === food.id)!.fat * value * 10) / 10,
            }
          : food,
      ),
    )
  }

  const handleRemoveFood = (id: number) => {
    setRecognizedFoods(recognizedFoods.filter((food) => food.id !== id))
  }

  const handleAddFood = () => {
    // Find a random food from the database that's not already recognized
    const existingIds = recognizedFoods.map((food) => food.id)
    const availableFoods = foodDatabase.filter((food) => !existingIds.includes(food.id))

    if (availableFoods.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableFoods.length)
      const newFood = availableFoods[randomIndex]

      setRecognizedFoods([
        ...recognizedFoods,
        {
          ...newFood,
          confidence: 0.7,
          quantity: 1,
        },
      ])
    }
  }

  const handleLogMeal = () => {
    // Simulate API call to log the meal
    setTimeout(() => {
      // Reset the form
      setImage(null)
      setRecognizedFoods([])
      setStep("upload")

      // Show success message (in a real app, you'd use a toast or notification)
      alert("Meal logged successfully!")
    }, 1000)
  }

  // Calculate totals
  const totalCalories = recognizedFoods.reduce((sum, food) => sum + food.calories, 0)
  const totalProtein = recognizedFoods.reduce((sum, food) => sum + food.protein, 0)
  const totalCarbs = recognizedFoods.reduce((sum, food) => sum + food.carbs, 0)
  const totalFat = recognizedFoods.reduce((sum, food) => sum + food.fat, 0)

  return (
    <AppSidebar>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Upload and Recognition Section */}
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Log Food with Image</CardTitle>
                <CardDescription>
                  Take a photo of your meal or upload an image for automatic recognition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {step === "upload" && (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload a photo of your meal</h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Take a clear photo of your food for the best recognition results
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={handleCameraCapture}
                          className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
                        >
                          <Camera className="h-4 w-4" />
                          <span>Take Photo</span>
                        </Button>
                        <Button variant="outline" onClick={handleCameraCapture} className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>Upload Image</span>
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  )}

                  {step === "analyzing" && (
                    <div className="space-y-6">
                      {image && (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200">
                          <img src={image || "/placeholder.svg"} alt="Food" className="w-full h-64 object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="mb-4">
                                <svg
                                  className="animate-spin h-10 w-10 text-white mx-auto"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              </div>
                              <h3 className="text-xl font-bold mb-2">Analyzing your meal...</h3>
                              <p className="text-sm opacity-80">Our AI is identifying the foods in your image</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === "results" && (
                    <div className="space-y-6">
                      {image && (
                        <div className="rounded-lg overflow-hidden border border-gray-200">
                          <img src={image || "/placeholder.svg"} alt="Food" className="w-full h-64 object-cover" />
                        </div>
                      )}

                      <Alert className="bg-blue-50 border-blue-200">
                        <Brain className="h-4 w-4 text-blue-500" />
                        <AlertTitle>AI detected your meal</AlertTitle>
                        <AlertDescription>
                          {/* // EDIT HERE: AI detection message */}🧠 AI detected your meal—edit if it missed anything!
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Recognized Foods</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 flex items-center gap-1"
                            onClick={handleAddFood}
                          >
                            <Plus className="h-3 w-3" />
                            <span>Add Food</span>
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <AnimatePresence>
                            {recognizedFoods.map((food) => (
                              <motion.div
                                key={food.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border rounded-lg p-4 bg-white"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium">{food.name}</h4>
                                      <Badge variant="outline" className="text-xs">
                                        {Math.round(food.confidence * 100)}% confidence
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {isEditing === food.id ? (
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() =>
                                            handleQuantityChange(food.id, Math.max(0.5, food.quantity - 0.5))
                                          }
                                        >
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center">{food.quantity}</span>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() => handleQuantityChange(food.id, food.quantity + 0.5)}
                                        >
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 text-green-500"
                                          onClick={() => setIsEditing(null)}
                                        >
                                          <Check className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8"
                                          onClick={() => setIsEditing(food.id)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 text-red-500"
                                          onClick={() => handleRemoveFood(food.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {isEditing === food.id && (
                                  <div className="pt-2">
                                    <Label className="text-xs text-gray-500 mb-1 block">Adjust quantity</Label>
                                    <Slider
                                      value={[food.quantity]}
                                      min={0.5}
                                      max={5}
                                      step={0.5}
                                      onValueChange={(value) => handleQuantityChange(food.id, value[0])}
                                      className="py-2"
                                    />
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {recognizedFoods.length > 0 && (
                          <div className="pt-4">
                            <Button className="w-full bg-green-500 hover:bg-green-600" onClick={handleLogMeal}>
                              Log This Meal
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nutrition Summary Section */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Summary</CardTitle>
                <CardDescription>Nutritional breakdown of your meal</CardDescription>
              </CardHeader>
              <CardContent>
                {step === "results" && recognizedFoods.length > 0 ? (
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

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <h4 className="font-medium">Meal Quality</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                            style={{ width: "75%" }}
                          />
                        </div>
                        <span className="text-sm font-medium">Good</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        This meal is well-balanced but could use more vegetables for additional nutrients.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Info className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No meal data available.</p>
                    <p className="text-sm">Upload an image to see nutritional information.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for Better Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Take photos from above for better food visibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Ensure good lighting for accurate recognition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Separate different foods on the plate when possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>Always review and adjust the recognized foods for accuracy</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Image Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Previous meal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Previous meal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Previous meal"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppSidebar>
  )
}
