
import React from 'react';
import { useEligibilityResults } from '@/hooks/useEligibilityResults';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/eligibility/Header';
import StatusIndicators from '@/components/eligibility/StatusIndicators';
import LoanOfferCard from '@/components/eligibility/LoanOfferCard';
import NextStepsGuide from '@/components/eligibility/NextStepsGuide';
import SecurityNotice from '@/components/eligibility/SecurityNotice';

const EligibilityResults: React.FC = () => {
  const { eligibilityScore, loanOffers, handleApplyNow } = useEligibilityResults();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <Header eligibilityScore={eligibilityScore} />
          <StatusIndicators eligibilityScore={eligibilityScore} />
          
          <h2 className="text-2xl font-bold text-loan-darkBlue mb-6">
            {eligibilityScore !== null && eligibilityScore >= 40
              ? "Your Pre-Approved Loan Offers"
              : "Available Loan Options"}
          </h2>
          
          <div className="space-y-6">
            {loanOffers.map((offer, index) => (
              <LoanOfferCard
                key={offer.id}
                offer={offer}
                eligibilityScore={eligibilityScore}
                index={index}
                onApply={handleApplyNow}
              />
            ))}
          </div>
          
          <NextStepsGuide />
          <SecurityNotice />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EligibilityResults;
