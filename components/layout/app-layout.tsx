"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Apple,
  BarChart2,
  Calendar,
  Camera,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  Trophy,
  User,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// EDIT HERE: Customize navigation items
const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Manual Food Log", href: "/food-log", icon: FileText },
  { name: "Image Food Log", href: "/image-log", icon: Camera },
  { name: "Weekly Meal Plan", href: "/meal-plan", icon: Calendar },
  { name: "Challenges", href: "/challenges", icon: Trophy },
  { name: "Progress Tracker", href: "/progress", icon: BarChart2 },
  { name: "Admin View", href: "/admin", icon: Settings },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Apple className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold text-green-600">NutriPlay</span>
            </Link>
          </div>
          <div className="mt-8 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "bg-green-100 text-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-all duration-200",
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href ? "text-green-500" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 h-5 w-5 flex-shrink-0",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex w-full items-center justify-between px-2 py-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Jane Doe</p>
                      <p className="text-xs text-gray-500">Level 5</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/login">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Apple className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-green-600">NutriPlay</span>
          </Link>
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <Apple className="h-8 w-8 text-green-500" />
                    <span className="text-xl font-bold text-green-600">NutriPlay</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex-1 space-y-1 px-2 py-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-green-100 text-green-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                      )}
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href ? "text-green-500" : "text-gray-400 group-hover:text-gray-500",
                          "mr-3 h-5 w-5 flex-shrink-0",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Jane Doe</p>
                      <p className="text-xs text-gray-500">Level 5</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="mt-4 w-full justify-start text-gray-600" asChild>
                    <Link href="/login">
                      <LogOut className="mr-2 h-5 w-5" />
                      Log out
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="min-h-screen py-6 px-4 sm:px-6 md:px-8">{children}</main>
      </div>
    </div>
  )
}
