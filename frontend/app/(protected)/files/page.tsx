import { FileList } from '@/components/FileList'

export default function Files() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Uploaded Files and Tests</h1>
      <FileList />
    </div>
  )
}