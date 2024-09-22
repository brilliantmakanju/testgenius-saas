import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Authentication: React.FC = () => (
  <>
    <h2 className="text-2xl font-bold mb-4">Authentication</h2>
    <p className="mb-4">TestGenius API uses Bearer Token authentication. To authenticate an API request, you should provide your API key in the Authorization header.</p>
    <h3 className="text-xl font-semibold mb-2">Obtaining an API Key</h3>
    <p className="mb-4">You can obtain an API key from your TestGenius dashboard. Go to Settings &gt; API Keys to generate a new key.</p>
    <h3 className="text-xl font-semibold mb-2">Using the API Key</h3>
    <p className="mb-4">Include the API key in the Authorization header of your HTTP requests:</p>
    <SyntaxHighlighter language="bash" style={vscDarkPlus}>
      {`Authorization: Bearer YOUR_API_KEY`}
    </SyntaxHighlighter>
    <p className="mt-4">Replace YOUR_API_KEY with your actual API key.</p>
    <h3 className="text-xl font-semibold mb-2 mt-6">Example Request</h3>
    <SyntaxHighlighter language="bash" style={vscDarkPlus}>
      {`curl -X GET "https://api.testgenius.com/api/projects" \\
 -H "Authorization: Bearer YOUR_API_KEY"`}
    </SyntaxHighlighter>
    <p className="mt-4">Make sure to keep your API key secure and do not share it publicly.</p>
  </>
);

export default Authentication;