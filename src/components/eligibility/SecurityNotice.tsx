
import React from 'react';
import { AlertCircle } from 'lucide-react';

const SecurityNotice: React.FC = () => {
  return (
    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
      <div className="flex-shrink-0 mt-0.5">
        <AlertCircle className="h-5 w-5 text-loan-blue" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-loan-darkBlue mb-1">Document Security</h4>
        <p className="text-sm text-gray-600">
          All uploaded documents are encrypted and will be automatically deleted after processing.
          We do not store any of your personal documents on our servers for security reasons.
        </p>
      </div>
    </div>
  );
};

export default SecurityNotice;
