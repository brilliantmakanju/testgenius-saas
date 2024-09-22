import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Switch } from '@/components/ui/switch';
import { apiReference } from '@/data/apiReference';

const ApiReference: React.FC = () => {
  const [activeAPI, setActiveAPI] = useState<string | null>(null);
  const [activeAPIGroup, setActiveAPIGroup] = useState<string | null>(apiReference[0]?.id || null);
  const [showSuccessResponse, setShowSuccessResponse] = useState<Record<string, boolean>>({});

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">API Reference</h2>
      <p className="mb-4">TestGenius provides a RESTful API for integrating test generation into your CI/CD pipeline. Here are the main endpoints grouped by resource:</p>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Card className="bg-white bg-opacity-70 backdrop-blur-sm">
            <CardContent className="p-4">
              {apiReference.map((group) => (
                <Button
                  key={group.id}
                  variant={activeAPIGroup === group.id ? "default" : "ghost"}
                  className={`w-full justify-start mb-2 ${
                    activeAPIGroup === group.id 
                      ? 'bg-blue-100 text-blue-900 hover:bg-blue-100' 
                      : 'hover:bg-blue-50 text-blue-800'
                  }`}
                  onClick={() => setActiveAPIGroup(group.id)}
                >
                  <span className="ml-2">{group.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-3/4">
          {apiReference.map((group) => (
            group.id === activeAPIGroup && (
              <Card key={group.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{group.title}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {group.endpoints.map((endpoint) => (
                    <div key={endpoint.path} className="mb-4">
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => setActiveAPI(activeAPI === endpoint.path ? null : endpoint.path)}
                      >
                        <span>{endpoint.method} {endpoint.path}</span>
                        {activeAPI === endpoint.path ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </Button>
                      {activeAPI === endpoint.path && (
                        <div className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                          <p className="mb-2">{endpoint.description}</p>
                          {endpoint.authRequired && (
                            <p className="text-yellow-600 dark:text-yellow-400 mb-2">
                              <Lock className="inline-block mr-1 h-4 w-4" />
                              Authentication required
                            </p>
                          )}
                          {endpoint.requestBody && (
                            <>
                              <h4 className="font-semibold mt-2 mb-1">Request Body:</h4>
                              <SyntaxHighlighter language="json" style={vscDarkPlus}>
                                {JSON.stringify(endpoint.requestBody, null, 2)}
                              </SyntaxHighlighter>
                            </>
                          )}
                          <h4 className="font-semibold mt-2 mb-1">Response:</h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span>Show Success Response</span>
                            <Switch
                              checked={showSuccessResponse[endpoint.path] ?? true}
                              onCheckedChange={(checked) => setShowSuccessResponse(prev => ({ ...prev, [endpoint.path]: checked }))}
                            />
                          </div>
                          {(showSuccessResponse[endpoint.path] ?? true) ? (
                            <>
                              <p className="text-green-600 dark:text-green-400 mb-1">Success Response (200 OK):</p>
                              <SyntaxHighlighter language="json" style={vscDarkPlus}>
                                {JSON.stringify(endpoint.response, null, 2)}
                              </SyntaxHighlighter>
                            </>
                          ) : (
                            <>
                              <p className="text-red-600 dark:text-red-400 mb-1">Error Response (400 Bad Request):</p>
                              <SyntaxHighlighter language="json" style={vscDarkPlus}>
                                {`{
  "error": "Bad Request",
  "message": "Invalid input data",
  "details": {
    "field": "The error details specific to this endpoint"
  }
}`}
                              </SyntaxHighlighter>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
      <p>For full API documentation, please refer to our API docs site.</p>
    </>
  );
};

export default ApiReference;