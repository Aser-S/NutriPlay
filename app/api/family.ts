import type { Child } from "@/lib/types"
import { mockChildren } from "@/lib/mock-data-updates"

// Mock family data
let children: Child[] = [...mockChildren]

// API functions
export async function getChildren(): Promise<Child[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(children)
    }, 500)
  })
}

export async function getChild(id: string): Promise<Child | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const child = children.find((child) => child.id === id)
      resolve(child || null)
    }, 500)
  })
}

export async function addChild(child: Omit<Child, "id">): Promise<Child> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newChild: Child = {
        ...child,
        id: Math.random().toString(36).substring(2, 9),
      }
      children.push(newChild)
      resolve(newChild)
    }, 500)
  })
}

export async function updateChild(id: string, updates: Partial<Child>): Promise<Child | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = children.findIndex((child) => child.id === id)
      if (index === -1) {
        resolve(null)
        return
      }

      children[index] = { ...children[index], ...updates }
      resolve(children[index])
    }, 500)
  })
}

export async function deleteChild(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = children.length
      children = children.filter((child) => child.id !== id)
      resolve(children.length < initialLength)
    }, 500)
  })
}
