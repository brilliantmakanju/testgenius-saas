import React from 'react';

const UserGuide: React.FC = () => (
  <>
    <h2 className="text-2xl font-bold mb-4">User Guide</h2>
    <h3 className="text-xl font-semibold mb-2">Creating a New Project</h3>
    <p className="mb-4">To create a new project, go to your dashboard and click the "New Project" button. You can either upload files directly or connect your GitHub repository.</p>
    <h3 className="text-xl font-semibold mb-2">Generating Tests</h3>
    <p className="mb-4">Once your project is set up, TestGenius will automatically start analyzing your code and generating tests. This process may take a few minutes depending on the size of your project.</p>
    <h3 className="text-xl font-semibold mb-2">Reviewing and Editing Tests</h3>
    <p className="mb-4">After the tests are generated, you can review them in the test editor. You can make changes, add new test cases, or delete unnecessary tests.</p>
    <h3 className="text-xl font-semibold mb-2">Exporting Tests</h3>
    <p>When you're satisfied with the generated tests, you can export them to integrate into your project. TestGenius provides options to export as individual files or as a zip archive.</p>
  </>
);

export default UserGuide;