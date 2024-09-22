'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function FileEditor() {
  const [content, setContent] = useState('')

  const handleSave = () => {
    // TODO: Implement saving file content
    console.log('Saving file:', content)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">File Editor</h2>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[400px] mb-4"
      />
      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
}