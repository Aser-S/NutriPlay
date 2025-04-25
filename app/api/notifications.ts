// Mock notifications API for frontend demo

export interface Notification {
  id: number
  userId: number
  type: "reminder" | "alert" | "achievement" | "tip" | "emergency"
  title: string
  message: string
  read: boolean
  createdAt: Date
  action?: {
    label: string
    url: string
  }
}

// Mock notifications data
const notifications: Notification[] = [
  {
    id: 1,
    userId: 1, // Zeyad Tamer
    type: "reminder",
    title: "Log Today's Meals",
    message: "Don't forget to log your child's meals for today to track their nutrition progress.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    action: {
      label: "Log Meal",
      url: "/food-log",
    },
  },
  {
    id: 2,
    userId: 1,
    type: "achievement",
    title: "Weekly Goal Completed!",
    message: "Congratulations! Your family has reached the weekly goal of 5 servings of vegetables per day.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    action: {
      label: "View Achievements",
      url: "/goals",
    },
  },
  {
    id: 3,
    userId: 1,
    type: "tip",
    title: "Nutrition Tip",
    message: "Try adding colorful vegetables to your child's plate to make meals more appealing and nutritious.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 4,
    userId: 1,
    type: "alert",
    title: "New Meal Plan Available",
    message: "A new customized meal plan is available for your family based on your preferences.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    action: {
      label: "View Meal Plan",
      url: "/meal-plan",
    },
  },
  {
    id: 5,
    userId: 1,
    type: "emergency",
    title: "Allergy Alert",
    message:
      "Recent food recall for peanut products. Please check your pantry if you have children with peanut allergies.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
  },
  {
    id: 6,
    userId: 1,
    type: "alert",
    title: "High Sodium Intake",
    message:
      "Your family's sodium intake has exceeded the recommended daily limit for 3 consecutive days. Consider reducing processed foods and adding more fresh ingredients.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    action: {
      label: "View Details",
      url: "/progress",
    },
  },
]

// Mock API functions
export const getNotifications = (userId: number): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userNotifications = notifications.filter((n) => n.userId === userId)
      resolve(userNotifications)
    }, 300)
  })
}

export const getUnreadNotificationsCount = (userId: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const count = notifications.filter((n) => n.userId === userId && !n.read).length
      resolve(count)
    }, 100)
  })
}

export const markNotificationAsRead = (notificationId: number): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = notifications.findIndex((n) => n.id === notificationId)
      if (index !== -1) {
        notifications[index].read = true
        resolve({ success: true })
      } else {
        resolve({ success: false })
      }
    }, 200)
  })
}

export const markAllNotificationsAsRead = (userId: number): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      notifications.forEach((n) => {
        if (n.userId === userId) {
          n.read = true
        }
      })
      resolve({ success: true })
    }, 300)
  })
}

export const sendEmergencyAlert = (message: string, userIds: number[]): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would create notifications for all specified users
      resolve({ success: true })
    }, 500)
  })
}
