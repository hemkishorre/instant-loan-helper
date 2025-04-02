
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProcessingStatusProps {
  progress: number;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ progress }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-loan-darkBlue">Processing Documents</h3>
        <span className="text-sm font-medium text-loan-blue">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2 mb-4" />
      <p className="text-sm text-gray-600">
        Please wait while we process your documents and check your eligibility.
        This might take a few moments.
      </p>
    </div>
  );
};

export default ProcessingStatus;
