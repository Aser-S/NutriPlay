import type { UserReport } from "@/lib/types"

// Mock user reports
const userReports: UserReport[] = [
  {
    id: "1",
    userId: "1",
    generatedDate: "2023-06-01",
    nutritionSummary: {
      averageCalories: 1850,
      averageProtein: 85,
      averageCarbs: 200,
      averageFat: 60,
      adherenceToGoals: 78,
    },
    recommendations: [
      "Increase protein intake by 10-15g per day",
      "Reduce refined carbohydrates",
      "Add more leafy greens to your diet",
      "Consider spreading meals more evenly throughout the day",
    ],
    insights: [
      "Your protein intake is below your target on weekends",
      "You consistently meet your hydration goals",
      "Your meal timing is irregular, which may affect energy levels",
      "You're exceeding your sodium intake target by approximately 20%",
    ],
  },
]

// API functions
export async function getUserReports(userId: string): Promise<UserReport[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userReports.filter((report) => report.userId === userId))
    }, 500)
  })
}

export async function generateUserReport(userId: string): Promise<UserReport> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReport: UserReport = {
        id: Math.random().toString(36).substring(2, 9),
        userId,
        generatedDate: new Date().toISOString().split("T")[0],
        nutritionSummary: {
          averageCalories: Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500,
          averageProtein: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
          averageCarbs: Math.floor(Math.random() * (250 - 150 + 1)) + 150,
          averageFat: Math.floor(Math.random() * (70 - 40 + 1)) + 40,
          adherenceToGoals: Math.floor(Math.random() * (95 - 60 + 1)) + 60,
        },
        recommendations: [
          "Consider varying your protein sources",
          "Incorporate more complex carbohydrates",
          "Ensure adequate hydration throughout the day",
          "Try to maintain consistent meal times",
        ],
        insights: [
          "Your calorie intake fluctuates significantly",
          "You consistently meet your fiber goals",
          "Your fat intake is slightly above the recommended range",
          "You could benefit from more mindful eating practices",
        ],
      }
      resolve(newReport)
    }, 500)
  })
}
