"use client"

import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Calendar,
  Share2,
  Printer,
} from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <AppSidebar>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-500">Monitor user activity and nutrition trends</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="current">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-2xl">152</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Users</CardDescription>
              <CardTitle className="text-2xl">126</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Meal Logs</CardDescription>
              <CardTitle className="text-2xl">1,842</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-green-600 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>15% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Consultations</CardDescription>
              <CardTitle className="text-2xl">28</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-red-600 flex items-center">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>3% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Growth</CardTitle>
                <Select defaultValue="sixMonths">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="threeMonths">3 Months</SelectItem>
                    <SelectItem value="sixMonths">6 Months</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <LineChart className="h-60 w-60 text-gray-300" />
              <div className="absolute text-center">
                <p className="text-sm text-gray-500">Chart visualization would appear here</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Growth</p>
                <p className="text-lg font-semibold">45%</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                <span>Download</span>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Activity</CardTitle>
                <Select defaultValue="week">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>Active users and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <BarChart3 className="h-60 w-60 text-gray-300" />
              <div className="absolute text-center">
                <p className="text-sm text-gray-500">Chart visualization would appear here</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Daily Active Users</p>
                <p className="text-lg font-semibold">78</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                <span>Download</span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Detailed Analytics Tabs */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Detailed Analytics</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Date Range</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  <span>Share</span>
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  <span>Print</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="usage">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
                <TabsTrigger value="usage">App Usage</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition Data</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="usage">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Feature Usage</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <PieChart className="h-40 w-40 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">App Sessions</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <LineChart className="h-40 w-40 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Time Spent</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <BarChart3 className="h-40 w-40 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Most Used Features</CardTitle>
                      <CardDescription>Feature usage breakdown by percentage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Meal Logging</span>
                            <span>42%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "42%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Nutritional Analysis</span>
                            <span>28%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "28%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Goal Setting</span>
                            <span>15%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Recipe Browsing</span>
                            <span>10%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "10%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Chat with Nutritionist</span>
                            <span>5%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "5%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="nutrition">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dietary Preferences</CardTitle>
                        <CardDescription>Distribution of dietary preferences among users</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px] flex items-center justify-center">
                        <PieChart className="h-60 w-60 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Nutritional Trends</CardTitle>
                        <CardDescription>Avg. nutritional intake metrics over time</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px] flex items-center justify-center">
                        <LineChart className="h-60 w-60 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Most Logged Foods</CardTitle>
                      <CardDescription>Most frequently logged food items across all users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Chicken Breast</span>
                            <span>1,243 logs</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Brown Rice</span>
                            <span>956 logs</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Salmon</span>
                            <span>823 logs</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: "55%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Greek Yogurt</span>
                            <span>712 logs</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Avocado</span>
                            <span>654 logs</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "40%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="demographics">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Age Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <BarChart3 className="h-40 w-40 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Gender Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <PieChart className="h-40 w-40 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Geographic Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] flex items-center justify-center">
                        <div className="h-40 w-40 bg-gray-100 rounded-full flex items-center justify-center">
                          <p className="text-sm text-gray-500">Map would appear here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">User Health Goals</CardTitle>
                      <CardDescription>Primary health goals reported by users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Weight Management</span>
                            <span>45%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Improved Energy</span>
                            <span>20%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sports Performance</span>
                            <span>15%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Manage Health Condition</span>
                            <span>12%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "12%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Other Goals</span>
                            <span>8%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "8%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">App Performance</CardTitle>
                        <CardDescription>Average load times and response metrics</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px] flex items-center justify-center">
                        <LineChart className="h-60 w-60 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Error Rates</CardTitle>
                        <CardDescription>Error frequency by feature</CardDescription>
                      </CardHeader>
                      <CardContent className="h-[300px] flex items-center justify-center">
                        <BarChart3 className="h-60 w-60 text-gray-300" />
                        <div className="absolute text-center">
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">System Health</CardTitle>
                      <CardDescription>Current system performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Server Uptime</span>
                            <span>99.98%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "99.98%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>API Response Time</span>
                            <span>245ms</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "24.5%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Error Rate</span>
                            <span>0.02%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "0.02%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="ml-auto">
              <Download className="h-4 w-4 mr-2" />
              <span>Export Full Report</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppSidebar>
  )
}
