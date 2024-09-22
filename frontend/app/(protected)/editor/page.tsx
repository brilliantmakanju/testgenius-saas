import { FileEditor } from '@/components/FileEditor'
import { TestRunner } from '@/components/TestRunner'

export default function Editor() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">File Editor and Test Runner</h1>
      <div className="grid grid-cols-2 gap-8">
        <FileEditor />
        <TestRunner />
      </div>
    </div>
  )
}