'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type File = {
  id: string
  name: string
  type: 'source' | 'test'
  project: string
}

export function FileList() {
  const [files, setFiles] = useState<File[]>([
    { id: '1', name: 'app.js', type: 'source', project: 'Project A' },
    { id: '2', name: 'app.test.js', type: 'test', project: 'Project A' },
    { id: '3', name: 'utils.js', type: 'source', project: 'Project B' },
    { id: '4', name: 'utils.test.js', type: 'test', project: 'Project B' },
  ])
  const [filter, setFilter] = useState('')

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(filter.toLowerCase()) ||
    file.project.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Input
        type="text"
        placeholder="Filter by name or project"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />
      <ul className="space-y-2">
        {filteredFiles.map(file => (
          <li key={file.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div>
              <span className="font-medium">{file.name}</span>
              <span className="ml-2 text-sm text-gray-500">{file.project}</span>
            </div>
            <span className={`px-2 py-1 rounded ${file.type === 'source' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>
              {file.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}