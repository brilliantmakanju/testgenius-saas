import React from 'react';

const GettingStarted: React.FC = () => (
  <>
    <h2 className="text-2xl font-bold mb-4">Welcome to TestGenius</h2>
    <p className="mb-4">TestGenius is an AI-powered platform for generating Jest tests for your JavaScript and TypeScript projects. Follow these steps to get started:</p>
    <ol className="list-decimal list-inside space-y-2 mb-4">
      <li>Sign up for an account or log in if you already have one.</li>
      <li>Navigate to the dashboard and click on "New Project".</li>
      <li>Upload your project files or connect your GitHub repository.</li>
      <li>Wait for TestGenius to analyze your code and generate tests.</li>
      <li>Review, edit, and export the generated tests.</li>
    </ol>
    <p>For more detailed information, check out the other sections in this documentation.</p>
  </>
);

export default GettingStarted;