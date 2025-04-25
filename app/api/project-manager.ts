import type { ProjectTask, AutomatedTest, Feature } from "@/lib/types"
import { mockProjectTasks, mockAutomatedTests, mockFeatures } from "@/lib/mock-data-updates"

// Mock data
const projectTasks: ProjectTask[] = [...mockProjectTasks]
const automatedTests: AutomatedTest[] = [...mockAutomatedTests]
const features: Feature[] = [...mockFeatures]

// API functions for Project Tasks
export async function getProjectTasks(): Promise<ProjectTask[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projectTasks)
    }, 500)
  })
}

export async function getProjectTask(id: string): Promise<ProjectTask | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = projectTasks.find((task) => task.id === id)
      resolve(task || null)
    }, 500)
  })
}

export async function createProjectTask(task: Omit<ProjectTask, "id">): Promise<ProjectTask> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask: ProjectTask = {
        ...task,
        id: Math.random().toString(36).substring(2, 9),
      }
      projectTasks.push(newTask)
      resolve(newTask)
    }, 500)
  })
}

export async function updateProjectTask(id: string, updates: Partial<ProjectTask>): Promise<ProjectTask | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = projectTasks.findIndex((task) => task.id === id)
      if (index === -1) {
        resolve(null)
        return
      }

      projectTasks[index] = { ...projectTasks[index], ...updates }
      resolve(projectTasks[index])
    }, 500)
  })
}

// API functions for Automated Tests
export async function getAutomatedTests(): Promise<AutomatedTest[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(automatedTests)
    }, 500)
  })
}

export async function assignAutomatedTest(id: string, assignee: string): Promise<AutomatedTest | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = automatedTests.findIndex((test) => test.id === id)
      if (index === -1) {
        resolve(null)
        return
      }

      automatedTests[index] = { ...automatedTests[index], assignedTo: assignee }
      resolve(automatedTests[index])
    }, 500)
  })
}

export async function runAutomatedTest(id: string): Promise<AutomatedTest | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = automatedTests.findIndex((test) => test.id === id)
      if (index === -1) {
        resolve(null)
        return
      }

      const status = Math.random() > 0.3 ? "Passed" : "Failed"
      const lastRun = new Date().toISOString().split("T")[0]

      automatedTests[index] = {
        ...automatedTests[index],
        status,
        lastRun,
      }

      resolve(automatedTests[index])
    }, 500)
  })
}

// API functions for Features
export async function getFeatures(): Promise<Feature[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(features)
    }, 500)
  })
}

export async function deployFeature(id: string): Promise<Feature | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = features.findIndex((feature) => feature.id === id)
      if (index === -1) {
        resolve(null)
        return
      }

      const deploymentDate = new Date().toISOString().split("T")[0]

      features[index] = {
        ...features[index],
        status: "Deployed",
        deploymentDate,
      }

      resolve(features[index])
    }, 500)
  })
}

export async function updateFeatureStatus(id: string, status: Feature["status"]): Promise<Feature | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = features.findIndex((feature) => feature.id === id)
      if (index === -1) {
        resolve(null)
        return
      }

      features[index] = { ...features[index], status }
      resolve(features[index])
    }, 500)
  })
}
