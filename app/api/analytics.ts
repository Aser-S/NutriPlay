// Mock analytics API for frontend demo

export interface NutritionData {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
}

export interface ActivityData {
  date: string
  steps: number
  activeMinutes: number
  water: number // in oz
}

export interface GoalProgress {
  id: number
  name: string
  target: number
  current: number
  unit: string
  startDate: string
  endDate: string
  completed: boolean
}

// Mock data for Zeyad Tamer's family
const nutritionData: NutritionData[] = [
  { date: "2025-04-17", calories: 1850, protein: 65, carbs: 220, fat: 60, fiber: 22, sugar: 35 },
  { date: "2025-04-18", calories: 1920, protein: 70, carbs: 230, fat: 62, fiber: 25, sugar: 30 },
  { date: "2025-04-19", calories: 1750, protein: 62, carbs: 210, fat: 55, fiber: 20, sugar: 40 },
  { date: "2025-04-20", calories: 1880, protein: 68, carbs: 225, fat: 58, fiber: 23, sugar: 32 },
  { date: "2025-04-21", calories: 1800, protein: 64, carbs: 215, fat: 59, fiber: 21, sugar: 38 },
  { date: "2025-04-22", calories: 1950, protein: 72, carbs: 235, fat: 63, fiber: 26, sugar: 28 },
  { date: "2025-04-23", calories: 1830, protein: 66, carbs: 218, fat: 61, fiber: 24, sugar: 33 },
]

const activityData: ActivityData[] = [
  { date: "2025-04-17", steps: 8500, activeMinutes: 45, water: 48 },
  { date: "2025-04-18", steps: 9200, activeMinutes: 55, water: 56 },
  { date: "2025-04-19", steps: 7800, activeMinutes: 40, water: 40 },
  { date: "2025-04-20", steps: 10500, activeMinutes: 65, water: 64 },
  { date: "2025-04-21", steps: 8900, activeMinutes: 50, water: 52 },
  { date: "2025-04-22", steps: 9500, activeMinutes: 60, water: 60 },
  { date: "2025-04-23", steps: 8700, activeMinutes: 48, water: 50 },
]

const goalProgress: GoalProgress[] = [
  {
    id: 1,
    name: "Increase vegetable intake",
    target: 5,
    current: 4,
    unit: "servings/day",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    completed: false,
  },
  {
    id: 2,
    name: "Reduce sugary drinks",
    target: 0,
    current: 1,
    unit: "drinks/day",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    completed: false,
  },
  {
    id: 3,
    name: "Try new fruits",
    target: 10,
    current: 7,
    unit: "different fruits",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    completed: false,
  },
  {
    id: 4,
    name: "Family cooking sessions",
    target: 8,
    current: 5,
    unit: "sessions",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    completed: false,
  },
  {
    id: 5,
    name: "Drink more water",
    target: 64,
    current: 52,
    unit: "oz/day",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    completed: false,
  },
]

// Mock API functions
export const getNutritionData = (
  userId: number,
  dateRange: { start: string; end: string },
): Promise<NutritionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter by date range in a real app
      resolve(nutritionData)
    }, 500)
  })
}

export const getActivityData = (userId: number, dateRange: { start: string; end: string }): Promise<ActivityData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter by date range in a real app
      resolve(activityData)
    }, 500)
  })
}

export const getGoalProgress = (userId: number): Promise<GoalProgress[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(goalProgress)
    }, 300)
  })
}

export const updateGoalProgress = (goalId: number, progress: number): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = goalProgress.findIndex((g) => g.id === goalId)
      if (index !== -1) {
        goalProgress[index].current = progress
        goalProgress[index].completed = progress >= goalProgress[index].target
        resolve({ success: true })
      } else {
        resolve({ success: false })
      }
    }, 300)
  })
}

export const analyzeEatingPatterns = (
  userId: number,
): Promise<{
  regularMeals: boolean
  balancedNutrition: boolean
  sufficientProtein: boolean
  excessiveSugar: boolean
  recommendations: string[]
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would analyze actual data
      resolve({
        regularMeals: true,
        balancedNutrition: false,
        sufficientProtein: true,
        excessiveSugar: true,
        recommendations: [
          "Try to include more vegetables in lunch and dinner",
          "Reduce sugary snacks and replace with fruits",
          "Maintain regular meal times to establish healthy eating patterns",
          "Consider adding more whole grains to increase fiber intake",
        ],
      })
    }, 800)
  })
}
