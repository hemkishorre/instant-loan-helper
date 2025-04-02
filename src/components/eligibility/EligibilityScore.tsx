
import React from 'react';
import { BadgeIcon, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface EligibilityScoreProps {
  score: number | null;
}

// Helper function to get status color based on score
function getScoreColorClass(score: number | null): string {
  if (score === null) return 'text-gray-500';
  if (score >= 70) return 'text-green-600';
  if (score >= 40) return 'text-yellow-500';
  return 'text-red-500';
}

// Helper function to get status text based on score
function getScoreStatusText(score: number | null): string {
  if (score === null) return 'Not Available';
  if (score >= 70) return 'Excellent';
  if (score >= 40) return 'Good';
  return 'Limited';
}

// Helper function to get status icon based on score
function getScoreStatusIcon(score: number | null) {
  if (score === null) return <BadgeIcon className="h-8 w-8 mx-auto text-gray-400" />;
  if (score >= 70) return <CheckCircle2 className="h-8 w-8 mx-auto text-green-500" />;
  if (score >= 40) return <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500" />;
  return <XCircle className="h-8 w-8 mx-auto text-red-500" />;
}

const EligibilityScore: React.FC<EligibilityScoreProps> = ({ score }) => {
  return (
    <>
      {score !== null && (
        <div className="mt-6">
          <div className="inline-block">
            <h3 className="text-xl font-bold mb-2">Your Eligibility Score</h3>
            <div className="bg-white rounded-full h-8 w-64 border overflow-hidden">
              <div 
                className={`h-full ${
                  score >= 70 ? 'bg-green-500' : 
                  score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>0</span>
              <span className="font-medium">{score}/100</span>
              <span>100</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { 
  EligibilityScore, 
  getScoreColorClass, 
  getScoreStatusText, 
  getScoreStatusIcon 
};
