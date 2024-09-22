'use client'

import { useState, useRef, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from 'lucide-react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Skeleton } from "@/components/ui/skeleton"

// Function to get initials from name
const getInitials = (name: string) => {
  const names = name.split(' ')
  return names.length > 1
    ? `${names[0][0]}${names[1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

export default function SettingsPage() {
  const {user, error, isLoading} = useUser()
  const [activeTab, setActiveTab] = useState('account')
  const [avatarSrc, setAvatarSrc] = useState(`${user?.picture}`)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageLoading, setImageLoading] = useState(true)

  const handleSave = () => {
    // Implement save functionality
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const SkeletonInput = () => (
    <Skeleton className="h-10 w-full" />
  )

  const SkeletonSwitch = () => (
    <Skeleton className="h-6 w-11" />
  )

  const SkeletonButton = () => (
    <Skeleton className="h-10 w-full sm:w-32" />
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-6 px-1 sm:px-1 lg:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-900">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-full">
            <Card className="bg-white bg-opacity-40 backdrop-blur-sm">
              <CardContent className="p-4">
                <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="w-full  bg-transparent">
                  <TabsList className="flex flex-col items-stretch h-full bg-transparent">
                    <TabsTrigger value="account" className="justify-start mb-2 py-[12px]">Account</TabsTrigger>
                    <TabsTrigger value="test-generation-and-integrations" className="justify-start mb-2 py-[12px]">Test Generation & Integrations</TabsTrigger>
                    <TabsTrigger value="billing" className="justify-start mb-2 py-[12px]">Billing</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-full">
            <Card className="bg-white bg-opacity-70 backdrop-blur-sm">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="account">
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account details and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col items-center space-y-4">
                        {isLoading ? (
                          <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
                        ) : (
                          <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                            {imageLoading && <Skeleton className="w-full h-full rounded-full" />}
                            <AvatarImage 
                              src={`${user?.picture}`} 
                              alt="Profile picture" 
                              onLoad={() => setImageLoading(false)}
                              style={{ display: imageLoading ? 'none' : 'block' }}
                            />
                            <AvatarFallback>{user?.name ? getInitials(user.name) : 'JD'}</AvatarFallback>
                          </Avatar>
                        )}
                        {isLoading ? (
                          <SkeletonButton />
                        ) : (
                          <Button 
                            variant="outline" 
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Change Profile Picture
                          </Button>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        {isLoading ? <SkeletonInput /> : <Input id="email" defaultValue={`${user?.email}`} />}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        {isLoading ? <SkeletonInput /> : <Input id="name" defaultValue={`${user?.name}`} />}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="current-password">Current Password</Label>
                        {isLoading ? <SkeletonInput /> : <Input id="current-password" type="password" />}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new-password">New Password</Label>
                        {isLoading ? <SkeletonInput /> : <Input id="new-password" type="password" />}
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        {isLoading ? <SkeletonSwitch /> : <Switch id="dark-mode" />}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {isLoading ? <SkeletonButton /> : <Button onClick={handleSave} className="w-full sm:w-auto">Save Changes</Button>}
                    </CardFooter>
                  </TabsContent>

                  {/* Test Generation & Integrations and Billing tabs remain unchanged */}
                  {/* ... */}

                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}