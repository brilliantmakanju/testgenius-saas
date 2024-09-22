'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function TestRunner() {
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const runTests = async () => {
    setRunning(true)
    setResults([])
    // Simulate running tests
    await new Promise(resolve => setTimeout(resolve, 2000))
    setResults(['Test 1: Passed', 'Test 2: Failed', 'Test 3: Passed'])
    setRunning(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Test Runner</h2>
      <Button onClick={runTests} disabled={running}>
        {running ? 'Running Tests...' : 'Run Tests'}
      </Button>
      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Test Results:</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}