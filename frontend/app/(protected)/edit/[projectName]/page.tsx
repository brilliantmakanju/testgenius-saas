'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlayIcon, TerminalIcon, FolderIcon, FileIcon, ChevronUpIcon, ChevronDownIcon, ArrowLeftIcon, MenuIcon } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const CodeEditor = ({ content, onChange }: { content: string; onChange: (value: string) => void }) => {
  return (
    <CodeMirror
      value={content}
      height="100%"
      theme={vscodeDark}
      extensions={[javascript({ jsx: true })]}
      onChange={(value) => onChange(value)}
    />
  )
}

const Terminal = ({ onInput }: { onInput: (input: string) => void }) => {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onInput(input)
    setInput('')
  }

  return (
    <div className="bg-[#1e1e1e] text-white p-4 h-full overflow-y-auto flex flex-col">
      <form onSubmit={handleSubmit} className="flex mt-2">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent outline-none"
        />
      </form>
    </div>
  )
}

interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeNode[];
}

const FileTreeView = ({ node, onSelect, currentPath = '' }: { 
  node: FileTreeNode; 
  onSelect: (fileName: string) => void;
  currentPath?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const fullPath = currentPath ? `${currentPath}/${node.name}` : node.name;

  return (
    <div className="ml-4">
      <div 
        className="flex items-center cursor-pointer text-white" 
        onClick={() => node.type === 'folder' ? setIsOpen(!isOpen) : onSelect(fullPath)}
      >
        {node.type === 'folder' ? (
          <FolderIcon className="w-4 h-4 mr-2" />
        ) : (
          <FileIcon className="w-4 h-4 mr-2" />
        )}
        <span>{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div className="ml-4">
          {node.children.map((child, index) => (
            <FileTreeView 
              key={index} 
              node={child} 
              onSelect={onSelect}
              currentPath={fullPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function EditPage() {
  const { projectName } = useParams() as { projectName: string };
  const router = useRouter();
  const [activeFile, setActiveFile] = useState('');
  const [fileContents, setFileContents] = useState<Record<string, string>>({});
  const [fileTree, setFileTree] = useState<FileTreeNode>({ name: projectName, type: 'folder', children: [] });
  const [testResults, setTestResults] = useState({ total: 0, passed: 0, failed: 0 });
  const [isTerminalVisible, setIsTerminalVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Fetch project data from backend
    const fetchProjectData = async () => {
      // Mock API call
      const mockData = {
        fileTree: {
          name: projectName,
          type: 'folder' as const,
          children: [
            { name: 'src', type: 'folder' as const, children: [
              { name: 'components', type: 'folder' as const, children: [
                { name: 'Button.js', type: 'file' as const },
                { name: 'Button.test.js', type: 'file' as const },
              ]},
              { name: 'App.js', type: 'file' as const },
              { name: 'App.test.js', type: 'file' as const },
            ]},
            { name: 'package.json', type: 'file' as const },
          ]
        },
        fileContents: {
          [`${projectName}/src/components/Button.js`]: '// Button component code',
          [`${projectName}/src/components/Button.test.js`]: '// Button test code',
          [`${projectName}/src/App.js`]: '// App component code',
          [`${projectName}/src/App.test.js`]: '// App test code',
          [`${projectName}/package.json`]: '{ "name": "project" }'
        }
      };

      setFileTree(mockData.fileTree as FileTreeNode);
      setFileContents(mockData.fileContents);
      setActiveFile(`${projectName}/src/App.js`);
    };

    fetchProjectData();
  }, [projectName]);

  const handleFileSelect = (fileName: string) => {
    setActiveFile(fileName);
  };

  const handleCodeChange = (value: string) => {
    setFileContents(prev => ({ ...prev, [activeFile]: value }));
  };

  const runTests = () => {
    setIsTerminalVisible(true);
    // Mock test running
    setTestResults({ total: 10, passed: 8, failed: 2 });
    // You can add more detailed test results to the terminal output here
  };

  const handleTerminalInput = (input: string) => {
    console.log('Terminal input:', input);
    // Here you can handle the terminal input, e.g., run commands
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#1e1e1e] text-white">
      <header className="bg-[#333] text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mr-4 text-white hidden md:inline-flex"
          >
            <ArrowLeftIcon className="mr-2" /> Back
          </Button>
          <h1 className="text-xl font-bold">{projectName}</h1>
        </div>
        <div className="flex items-center">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsTerminalVisible(!isTerminalVisible)}
            className="text-white mr-2"
          >
            {isTerminalVisible ? <ChevronDownIcon /> : <ChevronUpIcon />}
            <span className="hidden md:inline ml-2">Terminal</span>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button size="sm" variant="ghost" className="text-white md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[385px] bg-[#252526]">
              <div className="h-full overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2">Files</h2>
                <FileTreeView 
                  node={fileTree} 
                  onSelect={(fileName) => {
                    handleFileSelect(fileName);
                    setIsMobileMenuOpen(false);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <ResizablePanelGroup direction="vertical" className="flex-grow">
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full">
            <div className="w-1/4 h-full bg-[#252526] text-white p-4 overflow-y-auto overflow-x-hidden hidden md:block">
              <h2 className="text-lg font-semibold mb-2">Files</h2>
              <FileTreeView 
                node={fileTree} 
                onSelect={handleFileSelect}
              />
            </div>
            <div className="flex-grow flex flex-col overflow-hidden">
              <Tabs defaultValue="code" className="flex-grow flex flex-col">
                <div className="bg-[#2d2d2d] p-2 flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="test">Test</TabsTrigger>
                  </TabsList>
                  <Button size="sm" onClick={runTests}>
                    <PlayIcon className="mr-2 h-4 w-4" /> Run Tests
                  </Button>
                </div>
                <TabsContent value="code" className="flex-grow overflow-hidden">
                  <CodeEditor 
                    content={fileContents[activeFile] || ''} 
                    onChange={handleCodeChange}
                  />
                </TabsContent>
                <TabsContent value="test" className="flex-grow overflow-hidden">
                  <CodeEditor 
                    content={fileContents[activeFile.replace('.js', '.test.js')] || '// No test file found'} 
                    onChange={(value) => setFileContents(prev => ({ ...prev, [activeFile.replace('.js', '.test.js')]: value }))}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ResizablePanel>
        {isTerminalVisible && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={20} minSize={10}>
              <div className="bg-[#252526] text-white p-2 flex justify-between">
                <span className="text-green-500">Passed: {testResults.passed}</span>
                <span className="text-red-500">Failed: {testResults.failed}</span>
                <span className="text-yellow-500">Total: {testResults.total}</span>
              </div>
              <Terminal onInput={handleTerminalInput} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}