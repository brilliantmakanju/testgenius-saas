import React from 'react';

const BestPractices: React.FC = () => (
  <>
    <h2 className="text-2xl font-bold mb-4">Best Practices for Using TestGenius</h2>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li>Always review and understand the generated tests before integrating them into your project.</li>
      <li>Use descriptive names for your functions and variables to help TestGenius generate more accurate tests.</li>
      <li>Keep your code modular and follow SOLID principles for better test generation.</li>
      <li>Regularly update your project on TestGenius to keep your tests in sync with your latest code changes.</li>
      <li>Use TestGenius in combination with manual testing for comprehensive test coverage.</li>
      <li>Leverage TestGenius's AI suggestions to improve your testing strategy over time.</li>
    </ul>
    <p>Remember, while TestGenius is a powerful tool, it's meant to augment your testing process, not replace human oversight entirely.</p>
  </>
);

export default BestPractices;