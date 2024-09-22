'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/FileUpload'
import { BarChart, Activity, FileText, Settings, LogOut, Plus, User, } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)


  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="px-4 py-6 sm:px-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className='w-full lg:w-[350px] overflow-hidden h-auto flex justify-start items-start gap-4 flex-wrap'>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tests Generated</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Coverage</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 new this month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Test Generations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 flex flex-col">
                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (

                    <Link href={`/test-generation?project=${item}`} >

                      <div key={item} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Project {item} Test Suite</p>
                          <p className="text-xs text-muted-foreground">Generated 30 tests with 95% coverage</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{item} hour ago</p>
                      </div>

                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Dialog open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                          Upload your files to create a new project and generate tests.
                        </DialogDescription>
                      </DialogHeader>
                      <FileUpload onComplete={() => setIsNewProjectModalOpen(false)} />
                    </DialogContent>
                  </Dialog>


                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold"></h2>
              <Dialog open={isNewProjectModalOpen} onOpenChange={setIsNewProjectModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Upload your files to create a new project and generate tests.
                    </DialogDescription>
                  </DialogHeader>
                  <FileUpload onComplete={() => setIsNewProjectModalOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((project) => (
                <Link href={`/test-generation?project=${project}`} >

                  <Card key={project}>
                    <CardHeader>
                      <CardTitle>Project {project}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Last updated: 2 days ago</p>
                      <p className="text-sm text-muted-foreground">Tests: 45 | Coverage: 92%</p>
                    </CardContent>
                  </Card>

                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 overflow-hidden">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4 flex flex-col">
              {[1, 2, 3, 4, 5].map((activity) => (

                <Link href={`/test-generation?project=${activity}`} >

                  <Card key={activity}>
                    <CardContent className="flex items-center py-4">
                      <Activity className="h-5 w-5 mr-4 text-blue-500" />
                      <div>
                        <p className="font-medium">Generated tests for Project {activity}</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </CardContent>
                  </Card>

                </Link>


              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}