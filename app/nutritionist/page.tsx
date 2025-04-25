"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, FileEdit, Users, Download, Search, Filter, FileText } from "lucide-react"
import { userData } from "@/lib/mock-data"

export default function NutritionistPage() {
  const [activeTab, setActiveTab] = useState("clients")
  const [selectedClient, setSelectedClient] = useState(null)

  // Mock client data
  const clients = [
    { id: 1, name: "Zeyad Tamer", status: "Active", plan: "Weight Management", lastUpdate: "2 days ago" },
    ...userData.family.map((member, index) => ({
      id: index + 2,
      name: member.name,
      status: "Active",
      plan: member.goals,
      lastUpdate: "3 days ago",
    })),
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            <div>
              <h2 className="font-semibold">Dr. Sarah Johnson</h2>
              <p className="text-sm text-gray-500">Nutritionist</p>
            </div>
          </div>

          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-green-50 text-green-600">
              <Users className="h-5 w-5" />
              <span>Clients</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <FileEdit className="h-5 w-5" />
              <span>Meal Plans</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <BarChart className="h-5 w-5" />
              <span>Reports</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
              <FileText className="h-5 w-5" />
              <span>Resources</span>
            </a>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Nutritionist Dashboard</h1>
            <p className="text-gray-500">Manage client meal plans and track progress.</p>
          </div>

          <Tabs defaultValue="clients" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="clients">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search clients..." className="pl-8 w-[250px]" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>Filter</span>
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Client List</CardTitle>
                  <CardDescription>View and manage your clients' nutrition plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-gray-100 p-3 text-sm font-medium">
                      <div className="col-span-4">Name</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-3">Current Plan</div>
                      <div className="col-span-2">Last Update</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    <div className="divide-y">
                      {clients.map((client) => (
                        <div key={client.id} className="grid grid-cols-12 p-3 text-sm items-center">
                          <div className="col-span-4 font-medium">{client.name}</div>
                          <div className="col-span-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {client.status}
                            </span>
                          </div>
                          <div className="col-span-3">{client.plan}</div>
                          <div className="col-span-2">{client.lastUpdate}</div>
                          <div className="col-span-1">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedClient(client)}>
                              <FileEdit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedClient && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Edit Meal Plan for {selectedClient.name}</CardTitle>
                    <CardDescription>Override AI suggestions and customize the meal plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Current AI Suggestions</h3>
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm">
                            The AI has suggested a {selectedClient.plan} plan with 1,800 calories per day.
                          </p>
                          <div className="mt-2 flex gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              High Protein
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Low Carb
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Gluten-Free
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Professional Adjustments</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-500">Daily Calorie Target</label>
                            <Select defaultValue="1800">
                              <SelectTrigger>
                                <SelectValue placeholder="Select calories" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1500">1,500 calories</SelectItem>
                                <SelectItem value="1800">1,800 calories</SelectItem>
                                <SelectItem value="2000">2,000 calories</SelectItem>
                                <SelectItem value="2200">2,200 calories</SelectItem>
                                <SelectItem value="2500">2,500 calories</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-sm text-gray-500">Dietary Restrictions</label>
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="gluten-free" className="rounded text-green-500" />
                                <label htmlFor="gluten-free" className="text-sm">
                                  Gluten-Free
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="dairy-free" className="rounded text-green-500" />
                                <label htmlFor="dairy-free" className="text-sm">
                                  Dairy-Free
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="vegetarian" className="rounded text-green-500" />
                                <label htmlFor="vegetarian" className="text-sm">
                                  Vegetarian
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" id="low-carb" className="rounded text-green-500" checked />
                                <label htmlFor="low-carb" className="text-sm">
                                  Low-Carb
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-gray-500">Professional Notes</label>
                            <textarea
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              rows={3}
                              placeholder="Add your professional recommendations here..."
                              defaultValue="Client should focus on increasing protein intake and reducing processed carbohydrates. Consider supplementing with vitamin D."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setSelectedClient(null)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reports">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Export Reports</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrient Deficiencies</CardTitle>
                    <CardDescription>Aggregate data across all clients</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="w-full space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Vitamin D</span>
                          <span>68%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Iron</span>
                          <span>42%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Calcium</span>
                          <span>35%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Vitamin B12</span>
                          <span>29%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "29%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Magnesium</span>
                          <span>24%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "24%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Client Progress</CardTitle>
                    <CardDescription>Goal achievement rates</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="w-full space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Weight Management</span>
                          <span>72%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Increased Vegetable Intake</span>
                          <span>65%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Reduced Sugar Consumption</span>
                          <span>58%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "58%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Hydration Goals</span>
                          <span>45%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Protein Targets</span>
                          <span>38%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "38%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Client Compliance Report</CardTitle>
                  <CardDescription>Meal plan adherence and tracking consistency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-gray-100 p-3 text-sm font-medium">
                      <div className="col-span-3">Client</div>
                      <div className="col-span-2">Meal Logging</div>
                      <div className="col-span-2">Plan Adherence</div>
                      <div className="col-span-3">Improvement Areas</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                    <div className="divide-y">
                      {clients.map((client) => (
                        <div key={client.id} className="grid grid-cols-12 p-3 text-sm items-center">
                          <div className="col-span-3 font-medium">{client.name}</div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-3 h-3 rounded-full ${Math.random() > 0.3 ? "bg-green-500" : "bg-yellow-500"}`}
                              ></div>
                              <span>{Math.random() > 0.3 ? "Good" : "Fair"}</span>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span>{Math.floor(Math.random() * 40) + 60}%</span>
                          </div>
                          <div className="col-span-3">
                            <span>
                              {Math.random() > 0.5 ? "Protein intake, Hydration" : "Vegetable variety, Meal timing"}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileEdit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Generate Detailed PDF Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
