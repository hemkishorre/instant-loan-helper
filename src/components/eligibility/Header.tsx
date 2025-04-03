
import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { EligibilityScore } from './EligibilityScore';

interface HeaderProps {
  eligibilityScore: number | null;
}

const Header: React.FC<HeaderProps> = ({ eligibilityScore }) => {
  const isApproved = eligibilityScore !== null && eligibilityScore >= 40;
  
  return (
    <div className="text-center mb-12 animate-fadeIn">
      <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-6">
        {isApproved ? (
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        ) : (
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
        )}
      </div>
      <h1 className="text-3xl font-bold text-loan-darkBlue mb-4">
        {isApproved
          ? "Congratulations! You're Pre-Approved"
          : "Thank You for Your Application"}
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        {isApproved
          ? "Based on your submitted documents, you're eligible for the following loan offers. Choose the one that best suits your needs."
          : "Based on your submitted documents, we've assessed your current eligibility. See below for available options."}
      </p>
      
      <EligibilityScore score={eligibilityScore} />
    </div>
  );
};

export default Header;
