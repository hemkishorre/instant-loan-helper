
import React from 'react';

const NextStepsGuide: React.FC = () => {
  return (
    <div className="mt-10 bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fadeIn">
      <h3 className="text-xl font-semibold text-loan-darkBlue mb-3">What's Next?</h3>
      <ol className="space-y-3">
        <li className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-loan-blue text-white flex items-center justify-center mr-3 mt-0.5">
            1
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Choose a loan offer</span> that best suits your requirements
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-loan-blue text-white flex items-center justify-center mr-3 mt-0.5">
            2
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Complete the application</span> by providing your bank account details
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-loan-blue text-white flex items-center justify-center mr-3 mt-0.5">
            3
          </div>
          <div>
            <p className="text-gray-700">
              <span className="font-medium">Receive funds</span> directly in your bank account within 24 hours
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default NextStepsGuide;
