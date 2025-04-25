import { mockRecipes } from "@/lib/mock-data-updates"

export interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image?: string
  recipeId?: string
  dietaryRestrictions?: string[]
}

export interface MealPlan {
  id: string
  userId: string
  name: string
  description: string
  meals: Meal[]
  dietaryRestrictions: string[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

// Mock meal data
const meals: Meal[] = [
  {
    id: "1",
    name: "Grilled Chicken Salad",
    calories: 350,
    protein: 30,
    carbs: 10,
    fat: 20,
    recipeId: "1",
    dietaryRestrictions: ["Low-Carb"],
  },
  {
    id: "2",
    name: "Vegetable Stir Fry",
    calories: 250,
    protein: 6,
    carbs: 40,
    fat: 8,
    recipeId: "2",
    dietaryRestrictions: ["Vegan", "Vegetarian"],
  },
  {
    id: "3",
    name: "Lentil Soup",
    calories: 200,
    protein: 12,
    carbs: 30,
    fat: 4,
    recipeId: "3",
    dietaryRestrictions: ["Vegan", "Vegetarian", "Gluten-Free"],
  },
  {
    id: "4",
    name: "Baked Salmon with Roasted Vegetables",
    calories: 320,
    protein: 28,
    carbs: 12,
    fat: 18,
    recipeId: "4",
    dietaryRestrictions: ["Low-Carb", "Gluten-Free"],
  },
  {
    id: "5",
    name: "Quinoa Bowl with Roasted Vegetables",
    calories: 380,
    protein: 10,
    carbs: 50,
    fat: 16,
    recipeId: "5",
    dietaryRestrictions: ["Vegan", "Vegetarian", "Gluten-Free"],
  },
]

// Mock meal plans
const mealPlans: MealPlan[] = [
  {
    id: "1",
    userId: "1",
    name: "Weight Loss Plan",
    description: "A balanced meal plan designed for weight loss",
    meals: [meals[0], meals[2], meals[3]],
    dietaryRestrictions: ["Low-Carb"],
    totalCalories: 870,
    totalProtein: 70,
    totalCarbs: 52,
    totalFat: 42,
  },
  {
    id: "2",
    userId: "1",
    name: "Vegetarian Plan",
    description: "A nutritious vegetarian meal plan",
    meals: [meals[1], meals[2], meals[4]],
    dietaryRestrictions: ["Vegetarian"],
    totalCalories: 830,
    totalProtein: 28,
    totalCarbs: 120,
    totalFat: 28,
  },
  {
    id: "3",
    userId: "1",
    name: "Diabetes-Friendly Plan",
    description: "A meal plan designed for managing diabetes",
    meals: [meals[0], meals[3], meals[4]],
    dietaryRestrictions: ["Diabetes"],
    totalCalories: 1050,
    totalProtein: 68,
    totalCarbs: 72,
    totalFat: 54,
  },
  {
    id: "4",
    userId: "1",
    name: "Pregnancy Nutrition Plan",
    description: "A nutritious meal plan for expectant mothers",
    meals: [meals[0], meals[2], meals[4]],
    dietaryRestrictions: ["Pregnancy"],
    totalCalories: 930,
    totalProtein: 52,
    totalCarbs: 90,
    totalFat: 40,
  },
  {
    id: "5",
    userId: "1",
    name: "Lactose-Free Plan",
    description: "A meal plan for those with lactose intolerance",
    meals: [meals[1], meals[3], meals[4]],
    dietaryRestrictions: ["Lactose Intolerant"],
    totalCalories: 950,
    totalProtein: 44,
    totalCarbs: 102,
    totalFat: 42,
  },
]

// API functions
export async function getMeals(): Promise<Meal[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(meals)
    }, 500)
  })
}

export async function getMealPlans(userId: string): Promise<MealPlan[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mealPlans.filter((plan) => plan.userId === userId))
    }, 500)
  })
}

export async function getMealPlan(id: string): Promise<MealPlan | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = mealPlans.find((plan) => plan.id === id)
      resolve(plan || null)
    }, 500)
  })
}

export async function getRecipe(id: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipe = mockRecipes.find((recipe) => recipe.id === id)
      resolve(recipe || null)
    }, 500)
  })
}

export async function createMealPlan(mealPlan: Omit<MealPlan, "id">): Promise<MealPlan> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMealPlan: MealPlan = {
        ...mealPlan,
        id: Math.random().toString(36).substring(2, 9),
      }
      mealPlans.push(newMealPlan)
      resolve(newMealPlan)
    }, 500)
  })
}
