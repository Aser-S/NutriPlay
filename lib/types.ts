export interface Recipe {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
  prepTime: number // in minutes
  cookTime: number // in minutes
  servings: number
  calories: number
  protein: number
  carbs: number
  fat: number
  image?: string
}

export interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image?: string
  recipe?: Recipe
  dietaryRestrictions?: string[]
}

export interface Child {
  id: string
  name: string
  age: number
  avatar?: string
  dietaryRestrictions?: string[]
  allergies?: string[]
  preferences?: string[]
}

export interface ProjectTask {
  id: string
  title: string
  description: string
  priority: "Must" | "Should" | "Could" | "Won't"
  assignee?: string
  dueDate: string
  status: "Backlog" | "In Progress" | "Testing" | "Done"
  tags: string[]
}

export interface AutomatedTest {
  id: string
  name: string
  description: string
  string
  status: "Pending" | "Running" | "Passed" | "Failed"
  assignedTo?: string
  lastRun?: string
}

export interface Feature {
  id: string
  name: string
  description: string
  status: "Development" | "Testing" | "Ready" | "Deployed"
  deploymentDate?: string
}

export interface UserReport {
  id: string
  userId: string
  generatedDate: string
  nutritionSummary: {
    averageCalories: number
    averageProtein: number
    averageCarbs: number
    averageFat: number
    adherenceToGoals: number // percentage
  }
  recommendations: string[]
  insights: string[]
}
