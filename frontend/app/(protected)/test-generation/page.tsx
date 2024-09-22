'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Download, Edit, FileIcon, Loader2, Play, Save, CheckCircle, AlertCircle, Info, ArrowLeft } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Dynamically import the Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface GeneratedTest {
    fileName: string;
    testContent: string;
}

export default function TestGenerationPage() {
    const [generatedTests, setGeneratedTests] = useState<GeneratedTest[]>([])
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState('')
    const [terminalOutput, setTerminalOutput] = useState('')
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
    const [testsToExport, setTestsToExport] = useState<string[]>([])
    const [isRunningTests, setIsRunningTests] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { theme } = useTheme()

    const showToast = (title: string, description: string, type: 'success' | 'error' | 'info') => {
        const IconComponent = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : Info
        toast({
            title: (
                <div className="flex items-center">
                    <IconComponent className="h-5 w-5 mr-2" />
                    <span>{title}</span>
                </div>
            ) as any,
            description,
            variant: type === 'error' ? 'destructive' : 'default',
            className: `${type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : ''} text-white`,
        })
    }

    useEffect(() => {
        const projectName = searchParams.get('project')
        if (projectName) {
            setIsGenerating(true)
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval)
                        setIsGenerating(false)
                        const tests = [
                            { fileName: 'Component.js', testContent: 'describe("Component", () => {\n  it("should render correctly", () => {\n    // Test implementation\n  });\n});' },
                            { fileName: 'Utils.js', testContent: 'test("utility function", () => {\n  // Test implementation\n});' },
                            { fileName: 'API.js', testContent: 'describe("API", () => {\n  test("should make API call", async () => {\n    // Test implementation\n  });\n});' },
                        ]
                        setGeneratedTests(tests)
                        setSelectedFile(tests[0].fileName)
                        showToast("Test Generation Complete", "Your tests have been generated successfully.", "success")
                        return 100
                    }
                    return prevProgress + 2
                })
            }, 100)
        }
    }, [searchParams])

    const handleBackToDashboard = () => {
        router.push('/dashboard')
    }

    const handleExport = () => {
        setIsExportDialogOpen(true)
        setTestsToExport([])
    }

    const handleExportConfirm = () => {
        const zip = new JSZip();

        testsToExport.forEach(fileName => {
            const test = generatedTests.find(t => t.fileName === fileName);
            if (test) {
                zip.file(test.fileName, test.testContent);
            }
        });

        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, "generated_tests.zip");
                showToast("Tests Exported", `${testsToExport.length} tests have been exported successfully.`, "success");
                setIsExportDialogOpen(false);
            });
    }

    const handleRunTest = async () => {
        setIsRunningTests(true)
        setTerminalOutput("Running tests...\n")
        
        // Simulate running Jest tests
        for (const test of generatedTests) {
            setTerminalOutput(prev => prev + `\nRunning tests for ${test.fileName}...\n`)
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate test execution time
            setTerminalOutput(prev => prev + `${test.fileName}: All tests passed\n`)
        }

        setTerminalOutput(prev => prev + "\nTest suite passed: 3 tests passed, 0 failed\n")
        showToast("Tests Completed", "All tests passed successfully.", "success")
        setIsRunningTests(false)
    }

    const handleEdit = (fileName: string) => {
        setIsEditing(true)
        setEditedContent(generatedTests.find(t => t.fileName === fileName)?.testContent || '')
        showToast("Editing Test", `Now editing test for ${fileName}`, "info")
    }

    const handleSaveEdit = () => {
        if (selectedFile) {
            setGeneratedTests(prev => prev.map(test =>
                test.fileName === selectedFile ? { ...test, testContent: editedContent } : test
            ))
            setIsEditing(false)
            showToast("Test Updated", `Test for ${selectedFile} has been updated.`, "success")
        }
    }

    // Function to configure Monaco Editor
    const handleEditorWillMount = (monaco: any) => {
        // Add type definitions for Jest
        monaco.languages.typescript.javascriptDefaults.addExtraLib(`
      declare function describe(name: string, fn: () => void): void;
      declare function it(name: string, fn: () => void): void;
      declare function test(name: string, fn: () => void): void;
      declare function expect(actual: any): any;
      declare function beforeEach(fn: () => void): void;
      declare function afterEach(fn: () => void): void;
    `, 'jest.d.ts')

        // Add type definitions for React
        monaco.languages.typescript.javascriptDefaults.addExtraLib(`
      declare module 'react' {
        export function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
        export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
        export function useContext<T>(context: React.Context<T>): T;
        // Add more React hooks and types as needed
      }
    `, 'react.d.ts')

        // Add type definitions for Next.js
        monaco.languages.typescript.javascriptDefaults.addExtraLib(`
      declare module 'next/router' {
        export function useRouter(): {
          push(url: string): Promise<boolean>;
          replace(url: string): Promise<boolean>;
          // Add more router methods as needed
        };
      }
    `, 'next.d.ts')

        // Add type definitions for Node.js
        monaco.languages.typescript.javascriptDefaults.addExtraLib(`
      declare module 'fs' {
        export function readFileSync(path: string, options?: { encoding?: string; flag?: string; }): string | Buffer;
        // Add more fs methods as needed
      }
      declare module 'path' {
        export function join(...paths: string[]): string;
        // Add more path methods as needed
      }
    `, 'node.d.ts')

        // Configure JavaScript language features
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            jsx: monaco.languages.typescript.JsxEmit.React,
            reactNamespace: 'React',
            allowJs: true,
            typeRoots: ['node_modules/@types']
        })
    }

    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {isGenerating ? (
                <>
                    <Dialog open={isGenerating} onOpenChange={() => { }}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Generating Tests</DialogTitle>
                                <DialogDescription>
                                    Analyzing code and generating tests...
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 pt-6">
                                <div className="flex items-center space-x-4">
                                    <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                                    <span>Processing...</span>
                                </div>
                                <Progress value={progress} className="w-full" />
                                <p className="text-sm text-center">{progress}% Complete</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold">Generated Tests</h1>
                        <Button onClick={handleBackToDashboard} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </div>

                    {generatedTests.length === 0 ? (
                        // Skeleton loader
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/4 space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="w-full h-10" />
                                ))}
                            </div>
                            <div className="w-full md:w-3/4">
                                <Card className="h-[calc(100vh-200px)] overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <Skeleton className="h-6 w-1/4" />
                                        <Skeleton className="h-9 w-20" />
                                    </CardHeader>
                                    <CardContent className="p-0 h-[calc(100%-60px)] overflow-hidden">
                                        <Skeleton className="w-full h-full" />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        // Actual content
                        <>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/4 space-y-2">
                                    {generatedTests.map((test) => (
                                        <Button
                                            key={test.fileName}
                                            variant="outline"
                                            className={`w-full justify-start ${selectedFile === test.fileName ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                                            onClick={() => {
                                                setSelectedFile(test.fileName)
                                                setIsEditing(false)
                                            }}
                                        >
                                            <FileIcon className="mr-2 h-4 w-4" />
                                            {test.fileName}
                                        </Button>
                                    ))}
                                </div>
                                <div className="w-full md:w-3/4">
                                    {selectedFile && (
                                        <Card className="h-[calc(100vh-200px)] overflow-hidden">
                                            <CardHeader className="flex flex-row items-center justify-between">
                                                <CardTitle>{selectedFile}</CardTitle>
                                                {isEditing ? (
                                                    <Button size="sm" variant="outline" onClick={handleSaveEdit}>
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" variant="outline" onClick={() => handleEdit(selectedFile)}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                )}
                                            </CardHeader>
                                            <CardContent className="p-0 h-[calc(100%-60px)] overflow-hidden">
                                                <MonacoEditor
                                                    height="100%"
                                                    language="javascript"
                                                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                                                    value={isEditing ? editedContent : generatedTests.find(t => t.fileName === selectedFile)?.testContent}
                                                    options={{
                                                        minimap: { enabled: false },
                                                        fontSize: 16,
                                                        readOnly: !isEditing,
                                                        suggestOnTriggerCharacters: true,
                                                        quickSuggestions: true,
                                                    }}
                                                    beforeMount={handleEditorWillMount}
                                                    onChange={(value) => setEditedContent(value || '')}
                                                />
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </div>

                            <div className="mt-[50px] space-y-4">
                                <div className="flex space-x-4">
                                    <Button onClick={handleExport} className="flex-1">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Tests
                                    </Button>
                                    <Button onClick={handleRunTest} className="flex-1" disabled={isRunningTests}>
                                        {isRunningTests ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
                                        Run Tests
                                    </Button>
                                </div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Terminal Output</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap h-40">
                                            {terminalOutput || "Terminal output will appear here..."}
                                        </pre>
                                    </CardContent>
                                </Card>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold">Generated Tests</h1>
                        <Button onClick={handleBackToDashboard} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </div>

                    {generatedTests.length === 0 ? (
                        // Skeleton loader
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/4 space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="w-full h-10" />
                                ))}
                            </div>
                            <div className="w-full md:w-3/4">
                                <Card className="h-[calc(100vh-200px)] overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <Skeleton className="h-6 w-1/4" />
                                        <Skeleton className="h-9 w-20" />
                                    </CardHeader>
                                    <CardContent className="p-0 h-[calc(100%-60px)] overflow-hidden">
                                        <Skeleton className="w-full h-full" />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        // Actual content
                        <>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-1/4 space-y-2">
                                    {generatedTests.map((test) => (
                                        <Button
                                            key={test.fileName}
                                            variant="outline"
                                            className={`w-full justify-start ${selectedFile === test.fileName ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                                            onClick={() => {
                                                setSelectedFile(test.fileName)
                                                setIsEditing(false)
                                            }}
                                        >
                                            <FileIcon className="mr-2 h-4 w-4" />
                                            {test.fileName}
                                        </Button>
                                    ))}
                                </div>
                                <div className="w-full md:w-3/4">
                                    {selectedFile && (
                                        <Card className="h-[calc(100vh-200px)] overflow-hidden">
                                            <CardHeader className="flex flex-row items-center justify-between">
                                                <CardTitle>{selectedFile}</CardTitle>
                                                {isEditing ? (
                                                    <Button size="sm" variant="outline" onClick={handleSaveEdit}>
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Save
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" variant="outline" onClick={() => handleEdit(selectedFile)}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Button>
                                                )}
                                            </CardHeader>
                                            <CardContent className="p-0 h-[calc(100%-60px)] overflow-hidden">
                                                <MonacoEditor
                                                    height="100%"
                                                    language="javascript"
                                                    theme={theme === 'dark' ? 'vs-dark' : 'light'}
                                                    value={isEditing ? editedContent : generatedTests.find(t => t.fileName === selectedFile)?.testContent}
                                                    options={{
                                                        minimap: { enabled: false },
                                                        fontSize: 16,
                                                        readOnly: !isEditing,
                                                        suggestOnTriggerCharacters: true,
                                                        quickSuggestions: true,
                                                    }}
                                                    beforeMount={handleEditorWillMount}
                                                    onChange={(value) => setEditedContent(value || '')}
                                                />
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </div>

                            <div className="mt-[50px] space-y-4">
                                <div className="flex space-x-4">
                                    <Button onClick={handleExport} className="flex-1">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export Tests
                                    </Button>
                                    <Button onClick={handleRunTest} className="flex-1" disabled={isRunningTests}>
                                        {isRunningTests ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
                                        Run Tests
                                    </Button>
                                </div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Terminal Output</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap h-40">
                                            {terminalOutput || "Terminal output will appear here..."}
                                        </pre>
                                    </CardContent>
                                </Card>
                            </div>
                        </>
                    )}
                </>
            )}

            <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Select Tests to Export</DialogTitle>
                        <DialogDescription>
                            Choose which tests you want to export. The selected tests will be downloaded as a zip file.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        {generatedTests.map((test) => (
                            <div key={test.fileName} className="flex items-center space-x-2">
                                <Checkbox
                                    id={test.fileName}
                                    checked={testsToExport.includes(test.fileName)}
                                    onCheckedChange={(checked) => {
                                        setTestsToExport(prev =>
                                            checked
                                                ? [...prev, test.fileName]
                                                : prev.filter(f => f !== test.fileName)
                                        )
                                    }}
                                />
                                <label htmlFor={test.fileName} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {test.fileName}
                                </label>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsExportDialogOpen(false)} variant="outline">Cancel</Button>
                        <Button onClick={handleExportConfirm} disabled={testsToExport.length === 0}>Export Selected</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}