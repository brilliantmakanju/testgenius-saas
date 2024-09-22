'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Book, Lightbulb, Code, Lock } from 'lucide-react'
import GettingStarted from '@/components/documentation/GettingStarted'
import UserGuide from '@/components/documentation/UserGuide'
import BestPractices from '@/components/documentation/BestPractices'
import Authentication from '@/components/documentation/Authentication'
import ApiReference from '@/components/documentation/ApiReference'

const DocumentationPage = () => {
    const [activeTab, setActiveTab] = useState('getting-started')

    const documentationSections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            icon: <FileText className="h-5 w-5" />,
            content: <GettingStarted />
        },
        {
            id: 'user-guide',
            title: 'User Guide',
            icon: <Book className="h-5 w-5" />,
            content: <UserGuide />
        },
        {
            id: 'best-practices',
            title: 'Best Practices',
            icon: <Lightbulb className="h-5 w-5" />,
            content: <BestPractices />
        },
        {
            id: 'authentication',
            title: 'Authentication',
            icon: <Lock className="h-5 w-5" />,
            content: <Authentication />
        },
        {
            id: 'api-reference',
            title: 'API Reference',
            icon: <Code className="h-5 w-5" />,
            content: <ApiReference />
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-6 text-blue-900">Documentation</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/4">
                        <Card className="bg-white bg-opacity-70 backdrop-blur-sm">
                            <CardContent className="p-4">
                                {documentationSections.map((section) => (
                                    <Button
                                        key={section.id}
                                        variant={activeTab === section.id ? "default" : "ghost"}
                                        className={`w-full justify-start mb-2 ${
                                            activeTab === section.id 
                                                ? 'bg-blue-100 text-blue-900 hover:bg-blue-100' 
                                                : 'hover:bg-blue-50 text-blue-800'
                                        }`}
                                        onClick={() => setActiveTab(section.id)}
                                    >
                                        {section.icon}
                                        <span className="ml-2">{section.title}</span>
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full md:w-3/4">
                        <Card className="bg-white bg-opacity-70 backdrop-blur-sm">
                            <CardContent className="p-6">
                                {documentationSections.find(section => section.id === activeTab)?.content}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentationPage