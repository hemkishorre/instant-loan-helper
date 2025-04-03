
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoanCard from '@/components/loans/LoanCard';
import LoanDetails from '@/components/loans/LoanDetails';
import { loanTypes } from '@/data/loanTypes';
import { LoanType } from '@/types/loan';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const LoanTypes: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<LoanType | null>(null);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareLoanIds, setCompareLoanIds] = useState<string[]>([]);
  const detailsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSelectLoan = (loan: LoanType) => {
    if (compareMode) {
      // In compare mode, add/remove from comparison list
      if (compareLoanIds.includes(loan.id)) {
        setCompareLoanIds(compareLoanIds.filter(id => id !== loan.id));
      } else if (compareLoanIds.length < 3) {
        setCompareLoanIds([...compareLoanIds, loan.id]);
      }
    } else {
      // Normal mode, just select the loan
      setSelectedLoan(loan);
    }
  };

  // Scroll to loan details section when a loan is selected
  useEffect(() => {
    if (selectedLoan && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [selectedLoan]);

  // Exit compare mode
  const exitCompareMode = () => {
    setCompareMode(false);
    setCompareLoanIds([]);
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
              
              {!compareMode ? (
                <Button 
                  onClick={() => setCompareMode(true)} 
                  variant="outline" 
                  className="mt-4 bg-white hover:bg-gray-50"
                >
                  Compare Loans
                </Button>
              ) : (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-loan-darkBlue font-medium">Select up to 3 loans to compare</p>
                  <div className="flex justify-center gap-2">
                    <Button 
                      onClick={exitCompareMode} 
                      variant="outline" 
                      className="bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        if (compareLoanIds.length > 0) {
                          // Handle comparison logic here
                          // For now, just select the first loan
                          const firstLoan = loanTypes.find(loan => loan.id === compareLoanIds[0]);
                          if (firstLoan) {
                            setSelectedLoan(firstLoan);
                            exitCompareMode();
                          }
                        }
                      }} 
                      disabled={compareLoanIds.length === 0}
                      className="bg-loan-blue hover:bg-loan-darkBlue"
                    >
                      Compare {compareLoanIds.length > 0 ? `(${compareLoanIds.length})` : ""}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Loan Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-loan-darkBlue mb-8">
              {compareMode ? "Select Loans to Compare" : "Available Loan Categories"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanTypes.map((loan) => (
                <LoanCard 
                  key={loan.id} 
                  loan={loan} 
                  onSelect={handleSelectLoan}
                  isSelected={compareMode ? compareLoanIds.includes(loan.id) : selectedLoan?.id === loan.id}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Loan Details Section */}
        {selectedLoan && !compareMode && (
          <section 
            ref={detailsRef}
            className="py-16 bg-white border-t border-gray-200"
            id="loan-details"
          >
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold text-loan-darkBlue mb-8">Loan Details</h2>
              <LoanDetails loan={selectedLoan} />
              <div className="mt-6 text-center">
                <Button 
                  onClick={() => setSelectedLoan(null)} 
                  variant="outline"
                  className="text-gray-500"
                >
                  Back to all loans
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LoanTypes;
