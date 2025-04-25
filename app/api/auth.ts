// Mock authentication API for frontend demo

export interface User {
  id: number
  name: string
  email: string
  role: "user" | "parent" | "admin"
  avatar: string
}

// Mock user data
const users = [
  {
    id: 1,
    name: "Zeyad Tamer",
    email: "zeyad@example.com",
    password: "password123",
    role: "parent",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@nutriplay.com",
    password: "admin123",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emma Johnson",
    email: "emma@example.com",
    password: "password123",
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock authentication functions
export const login = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.email === email && u.password === password)
      if (user) {
        const { password, ...userWithoutPassword } = user
        resolve(userWithoutPassword as User)
      } else {
        resolve(null)
      }
    }, 500)
  })
}

export const register = (userData: { name: string; email: string; password: string }): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, we would validate and save the user
      const newUser = {
        id: users.length + 1,
        name: userData.name,
        email: userData.email,
        role: "user",
        avatar: "/placeholder.svg?height=40&width=40",
      }
      resolve(newUser)
    }, 500)
  })
}

export const getCurrentUser = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Always return Zeyad Tamer as the current user for demo purposes
      const zeyadUser = users.find((u) => u.name === "Zeyad Tamer")
      const { password, ...userWithoutPassword } = zeyadUser
      resolve(userWithoutPassword as User)
    }, 200)
  })
}

export const getAdminUser = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const adminUser = users.find((u) => u.role === "admin")
      const { password, ...userWithoutPassword } = adminUser
      resolve(userWithoutPassword as User)
    }, 200)
  })
}
