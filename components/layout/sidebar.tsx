"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  BarChart3,
  Target,
  Users,
  Camera,
  Trophy,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  Salad,
  User,
  CalendarClock,
  BarChart2,
  AlertTriangle,
  Cog,
} from "lucide-react"

export function AppSidebar({ children }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const isProjectManager = pathname.startsWith("/project-manager")

  const userNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Food Log",
      href: "/food-log",
      icon: <UtensilsCrossed className="h-5 w-5" />,
    },
    {
      title: "Image Log",
      href: "/image-log",
      icon: <Camera className="h-5 w-5" />,
    },
    {
      title: "Meal Plan",
      href: "/meal-plan",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "AI Meal Plan",
      href: "/ai-meal-plan",
      icon: <Salad className="h-5 w-5" />,
      badge: "New",
    },
    {
      title: "Progress",
      href: "/progress",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Goals",
      href: "/goals",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Family",
      href: "/family",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Challenges",
      href: "/challenges",
      icon: <Trophy className="h-5 w-5" />,
    },
  ]

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Chat",
      href: "/admin/chat",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: "3",
    },
    {
      title: "Consultations",
      href: "/admin/consultations",
      icon: <CalendarClock className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Alerts",
      href: "/admin/alerts",
      icon: <AlertTriangle className="h-5 w-5" />,
      badge: "2",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Cog className="h-5 w-5" />,
    },
  ]

  const projectManagerNavItems = [
    {
      title: "Dashboard",
      href: "/project-manager",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Features",
      href: "/project-manager/features",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Deployments",
      href: "/project-manager/deployments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "API Access",
      href: "/project-manager/api",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Tests",
      href: "/project-manager/tests",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/project-manager/analytics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/project-manager/settings",
      icon: <Cog className="h-5 w-5" />,
    },
  ]

  let navItems = userNavItems
  if (isAdmin) {
    navItems = adminNavItems
  } else if (isProjectManager) {
    navItems = projectManagerNavItems
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="p-4 border-b">
          <Link
            href={isAdmin ? "/admin" : isProjectManager ? "/project-manager" : "/dashboard"}
            className="flex items-center gap-2"
          >
            <Salad className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              NutriPlay
            </span>
          </Link>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              {/* Use a colored background with initials as fallback */}
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white">
                {isAdmin ? "A" : isProjectManager ? "PM" : "ZT"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{isAdmin ? "Admin" : isProjectManager ? "Project Manager" : "Zeyad Tamer"}</p>
              <p className="text-sm text-gray-500">
                {isAdmin ? "Administrator" : isProjectManager ? "Developer" : "Parent"}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${isActive ? "text-green-500" : "text-gray-500"} transition-colors`}>
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className={`${
                        item.badge === "New"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sidebar button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button className="rounded-full h-14 w-14 shadow-lg">
          <Salad className="h-6 w-6" />
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>

      {/* Notifications */}
      <div className="hidden md:block fixed top-4 right-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
