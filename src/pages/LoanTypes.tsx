
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoanCard from '@/components/loans/LoanCard';
import LoanDetails from '@/components/loans/LoanDetails';
import { loanTypes } from '@/data/loanTypes';
import { LoanType } from '@/types/loan';

const LoanTypes: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<LoanType | null>(null);
  const navigate = useNavigate();

  const handleSelectLoan = (loan: LoanType) => {
    // Scroll to loan details section
    setSelectedLoan(loan);
    setTimeout(() => {
      const detailsSection = document.getElementById('loan-details-section');
      if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-loan-lightGray py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-loan-darkBlue mb-4">Choose Your Loan Type</h1>
              <p className="text-gray-700 text-lg">
                Compare our loan options to find the best fit for your financial needs. Each loan is designed to provide flexible terms and competitive rates.
              </p>
            </div>
          </div>
        </section>
        
        {/* Loan Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-loan-darkBlue mb-8">Available Loan Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanTypes.map((loan) => (
                <LoanCard 
                  key={loan.id} 
                  loan={loan} 
                  onSelect={handleSelectLoan} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Loan Details Section */}
        {selectedLoan && (
          <section id="loan-details-section" className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold text-loan-darkBlue mb-8">Loan Details</h2>
              <LoanDetails loan={selectedLoan} />
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LoanTypes;
