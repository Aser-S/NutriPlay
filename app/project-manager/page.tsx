"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  FileCode,
  GitBranch,
  GitPullRequest,
  HelpCircle,
  LayoutDashboard,
  List,
  ListFilter,
  Loader2,
  Plus,
  Search,
  Server,
  Settings,
  Shield,
  Tag,
  Terminal,
  Users,
} from "lucide-react"
import { projectData } from "@/lib/mock-data"

export default function ProjectManagerPage() {
  const [activeTab, setActiveTab] = useState("features")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter features based on search query and status filter
  const filteredFeatures = projectData.features.filter((feature) => {
    const matchesSearch =
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || feature.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
      case "Testing":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Testing</Badge>
      case "Planned":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Planned</Badge>
      case "Failed":
        return <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>
      case "Passed":
        return <Badge className="bg-green-500 hover:bg-green-600">Passed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Get priority badge variant
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "Must Have":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Must Have
          </Badge>
        )
      case "Should Have":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Should Have
          </Badge>
        )
      case "Could Have":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Could Have
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <AppSidebar>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-blue-500" />
              Project Manager
            </h1>
            <p className="text-gray-500">Manage features, tests, and deployments for the NutriPlay app</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Feature
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <GitPullRequest className="h-5 w-5" />
                Create Pull Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600 text-sm">Submit your code changes for review and integration</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Create PR
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-700 flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Run Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-600 text-sm">Execute test suite to verify application functionality</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Run Tests
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-700 flex items-center gap-2">
                <Server className="h-5 w-5" />
                Deploy to Staging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-600 text-sm">Deploy the latest changes to the staging environment</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Deploy
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and changes to the project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Gamification Elements feature completed</p>
                  <p className="text-sm text-gray-500">Dev Team A completed implementation of badges and challenges</p>
                  <p className="text-xs text-gray-400 mt-1">Today at 10:23 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Loader2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Food Image Recognition moved to testing</p>
                  <p className="text-sm text-gray-500">Dev Team C completed initial implementation and moved to QA</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday at 4:45 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Meal Planning Integration Tests failed</p>
                  <p className="text-sm text-gray-500">3 tests failed due to API response format changes</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday at 2:12 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-purple-700">
              View All Activity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList className="mb-4">
              <TabsTrigger value="features" className="flex items-center gap-1">
                <List className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="tests" className="flex items-center gap-1">
                <Code2 className="h-4 w-4" />
                Tests
              </TabsTrigger>
              <TabsTrigger value="deployments" className="flex items-center gap-1">
                <Server className="h-4 w-4" />
                Deployments
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-1">
                <FileCode className="h-4 w-4" />
                API Endpoints
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <CardTitle>Feature Management</CardTitle>
                    <CardDescription>Manage and track feature development</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search features..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select defaultValue="all" onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[160px]">
                        <ListFilter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Testing">Testing</SelectItem>
                        <SelectItem value="Planned">Planned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeatures.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No features found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFeatures.map((feature) => (
                        <TableRow key={feature.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{feature.name}</p>
                              <p className="text-sm text-gray-500 truncate max-w-[250px]">{feature.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(feature.status)}</TableCell>
                          <TableCell>{getPriorityBadge(feature.priority)}</TableCell>
                          <TableCell>{feature.assignee}</TableCell>
                          <TableCell>{feature.dueDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredFeatures.length} of {projectData.features.length} features
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <CardTitle>Test Management</CardTitle>
                <CardDescription>Monitor test execution and results</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectData.tests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell>
                          <div className="font-medium">{test.name}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(test.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{test.type}</Badge>
                        </TableCell>
                        <TableCell>{test.lastRun}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Terminal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Terminal className="mr-2 h-4 w-4" />
                  Run All Tests
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Deployments Tab */}
          <TabsContent value="deployments">
            <Card>
              <CardHeader>
                <CardTitle>Deployment History</CardTitle>
                <CardDescription>Track application deployments across environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {projectData.deployments.map((deployment) => (
                    <div key={deployment.id} className="relative pl-6 border-l-2 border-gray-200">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500"></div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Tag className="h-4 w-4 text-blue-500" />
                            Version {deployment.version}
                          </h3>
                          <p className="text-sm text-gray-500">{deployment.date}</p>
                        </div>
                        <Badge className={deployment.status === "Successful" ? "bg-green-500" : "bg-amber-500"}>
                          {deployment.status}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-sm font-medium mb-1">Features included:</h4>
                        <div className="flex flex-wrap gap-2">
                          {deployment.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <GitBranch className="mr-2 h-3 w-3" />
                          View Commit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Clock className="mr-2 h-3 w-3" />
                          Deployment Logs
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Server className="mr-2 h-4 w-4" />
                  New Deployment
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* API Endpoints Tab */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>Manage and monitor API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>API Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Documentation</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectData.apiEndpoints.map((api) => (
                      <TableRow key={api.id}>
                        <TableCell>
                          <div className="font-medium">{api.name}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={api.status === "Active" ? "bg-green-500" : "bg-amber-500"}>
                            {api.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{api.version}</TableCell>
                        <TableCell>
                          <a
                            href={api.documentation}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Docs
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Audit
                </Button>
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Access
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h3 className="font-medium text-lg mb-2 text-blue-700">Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Access comprehensive documentation for project management tools and processes.
                </p>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700">
                  View Documentation
                </Button>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h3 className="font-medium text-lg mb-2 text-blue-700">Support Team</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our support team for assistance with project management issues.
                </p>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700">
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppSidebar>
  )
}
