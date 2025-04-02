
import React from 'react';
import { CreditCard, Shield } from 'lucide-react';
import { getScoreColorClass, getScoreStatusText, getScoreStatusIcon } from './EligibilityScore';

interface StatusIndicatorsProps {
  eligibilityScore: number | null;
}

const StatusIndicators: React.FC<StatusIndicatorsProps> = ({ eligibilityScore }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white rounded-lg shadow p-6 text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        <div className={getScoreColorClass(eligibilityScore) + " mb-2"}>
          {getScoreStatusIcon(eligibilityScore)}
        </div>
        <h3 className="text-xl font-bold text-loan-darkBlue mb-1">{getScoreStatusText(eligibilityScore)}</h3>
        <p className="text-gray-600">Credit Profile</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <div className="text-loan-blue mb-2">
          <CreditCard className="h-8 w-8 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-loan-darkBlue mb-1">
          {eligibilityScore !== null && eligibilityScore >= 70 
            ? "₹30,00,000" 
            : eligibilityScore !== null && eligibilityScore >= 40 
              ? "₹3,50,000" 
              : "₹50,000"}
        </h3>
        <p className="text-gray-600">Max Eligible Amount</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <div className="text-loan-blue mb-2">
          <Shield className="h-8 w-8 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-loan-darkBlue mb-1">100% Digital</h3>
        <p className="text-gray-600">Paperless Process</p>
      </div>
    </div>
  );
};

export default StatusIndicators;
