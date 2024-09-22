'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { FolderIcon, FileIcon, AlertTriangle, Upload, ChevronRight, ChevronDown } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation'

interface CustomFile extends File {
  path?: string;
}

interface FileInfo {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileInfo[];
}

const FolderTree = ({ node, depth = 0 }: { node: FileInfo; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  const indent = depth * 20;

  return (
    <div>
      <div
        className="flex items-center cursor-pointer"
        style={{ paddingLeft: `${indent}px` }}
        onClick={toggleOpen}
      >
        {node.type === 'folder' && (
          isOpen ? <ChevronDown className="h-4 w-4 mr-1 flex-shrink-0" /> : <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
        )}
        {node.type === 'folder' ? (
          <FolderIcon className="h-4 w-4 mr-2 text-yellow-500 flex-shrink-0" />
        ) : (
          <FileIcon className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <FolderTree key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function FileUpload({ onComplete }: { onComplete: () => void }) {
  const [projectName, setProjectName] = useState('')
  const [folderStructure, setFolderStructure] = useState<FileInfo | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: CustomFile[]) => {
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a project name before uploading files.",
        variant: "destructive",
      })
      return
    }

    // Check for node_modules
    if (acceptedFiles.some(file => file.path && file.path.includes('node_modules'))) {
      toast({
        title: "Upload Error",
        description: "Please remove the node_modules folder before uploading.",
        variant: "destructive",
      })
      return
    }

    // Check total folder size
    const totalSize = acceptedFiles.reduce((acc, file) => acc + file.size, 0)
    const maxSize = 300 * 1024 * 1024 // 300MB in bytes

    if (totalSize > maxSize) {
      toast({
        title: "Upload Error",
        description: "Total folder size exceeds 300MB. Please reduce the size and try again.",
        variant: "destructive",
      })
      return
    }

    const structure = createFolderStructure(acceptedFiles)
    setFolderStructure(structure)
    simulateUploadProgress()
  }, [projectName, toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: true,
  })

  const createFolderStructure = (files: CustomFile[]): FileInfo => {
    const root: FileInfo = { id: uuidv4(), name: projectName, path: projectName, type: 'folder', children: [] }
    files.forEach(file => {
      const parts = (file.path || file.name).split('/')
      let currentNode = root
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          currentNode.children?.push({ id: uuidv4(), name: part, path: `${currentNode.path}/${part}`, type: 'file' })
        } else {
          let folderNode = currentNode.children?.find(child => child.name === part && child.type === 'folder')
          if (!folderNode) {
            folderNode = { id: uuidv4(), name: part, path: `${currentNode.path}/${part}`, type: 'folder', children: [] }
            currentNode.children?.push(folderNode)
          }
          currentNode = folderNode
        }
      })
    })
    return root
  }

  const simulateUploadProgress = () => {
    setOverallProgress(0)
    const interval = setInterval(() => {
      setOverallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleConfirm = () => {
    if (!projectName.trim() || !folderStructure) {
      toast({
        title: "Validation Error",
        description: "Please enter a project name and upload a folder.",
        variant: "destructive",
      })
      return
    }

    console.log('Sending to backend:', {
      projectName,
      folderStructure
    })

    toast({
      title: "Generating Tests",
      description: `Creating tests for project: ${projectName}`,
      duration: 5000,
    })

    router.push(`/test-generation?project=${encodeURIComponent(projectName)}`)
  }

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProjectName = e.target.value
    setProjectName(newProjectName)
    if (folderStructure) {
      setFolderStructure(prevStructure => ({
        ...prevStructure!,
        name: newProjectName,
        path: newProjectName
      }))
    }
  }

  const isGenerateButtonDisabled = !projectName.trim() || !folderStructure || overallProgress !== 100

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pb-[30px] invisible_scroll">
      <div className="space-y-2">
        <label htmlFor="projectName" className="text-sm font-medium">Project Name</label>
        <Input
          type="text"
          id="projectName"
          value={projectName}
          onChange={handleProjectNameChange}
          placeholder="Enter project name"
          className="w-full"
        />
      </div>

      <div {...getRootProps()} className="space-y-2">
        <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
        } ${!projectName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <input {...getInputProps()}  {...({ webkitdirectory: true } as any)} />
          <Upload className="w-12 h-12 mb-4 text-blue-500 mx-auto" />
          {isDragActive ? (
            <p className="text-lg font-semibold text-blue-500">Drop the folder here ...</p>
          ) : (
            <p className="text-sm text-gray-600">
              Drag 'n' drop a folder here
              <br />
              <span className="text-xs">(Make sure the folder doesn't contain node_modules and is less than 300MB)</span>
            </p>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          <AlertTriangle className="inline-block mr-1 h-4 w-4" />
          Please do not upload folders containing node_modules or exceeding 300MB.
        </p>
      </div>

      {folderStructure && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Uploaded Folder Structure</h4>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-h-60 overflow-auto">
            <FolderTree node={folderStructure} />
          </div>
          <div className="space-y-2">
            <p>Upload Progress:</p>
            <Progress value={overallProgress} className="h-2" />
          </div>
          {overallProgress === 100 && (
            <Button 
              onClick={handleConfirm} 
              className="w-full"
              disabled={isGenerateButtonDisabled}
            >
              Generate Tests
            </Button>
          )}
        </div>
      )}
    </div>
  )
}