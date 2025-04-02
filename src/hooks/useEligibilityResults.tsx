
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface LoanOffer {
  id: number;
  type: string;
  amount: string;
  interestRate: string;
  tenure: string;
  emi: string;
  processingFee: string;
  features: string[];
}

// Map eligibility score to offers
function getOffersBasedOnScore(score: number | null): LoanOffer[] {
  // Default offers for low or null scores
  if (score === null || score < 40) {
    return [
      {
        id: 1,
        type: 'Personal Loan',
        amount: '₹50,000',
        interestRate: '18.99%',
        tenure: '12 months',
        emi: '₹4,620/month',
        processingFee: '2.5%',
        features: ['Quick disbursal', 'Minimal documentation', 'No collateral required']
      }
    ];
  }
  
  // High score (70+)
  if (score >= 70) {
    return [
      {
        id: 1,
        type: 'Premium Personal Loan',
        amount: '₹5,00,000',
        interestRate: '10.99%',
        tenure: '60 months',
        emi: '₹10,850/month',
        processingFee: '1%',
        features: ['Exclusive rate', 'Flexible repayment options', 'Pre-approved top-ups', 'Insurance benefits']
      },
      {
        id: 2,
        type: 'Home Loan',
        amount: '₹30,00,000',
        interestRate: '7.5%',
        tenure: '20 years',
        emi: '₹24,110/month',
        processingFee: '0.5%',
        features: ['Lowest interest rates', 'Up to 85% financing', 'Property insurance included', '25-year tenure option']
      },
      {
        id: 3,
        type: 'Business Loan',
        amount: '₹10,00,000',
        interestRate: '11.5%',
        tenure: '48 months',
        emi: '₹26,020/month',
        processingFee: '1.5%',
        features: ['Minimal business documentation', 'GST benefits', 'Tax advantages', 'Flexible usage']
      }
    ];
  }
  
  // Medium score (40-70)
  return [
    {
      id: 1,
      type: 'Personal Loan',
      amount: '₹2,00,000',
      interestRate: '12.99%',
      tenure: '36 months',
      emi: '₹6,720/month',
      processingFee: '1.5%',
      features: ['No collateral required', 'Flexible repayment options', 'Low documentation']
    },
    {
      id: 2,
      type: 'Personal Loan',
      amount: '₹3,50,000',
      interestRate: '14.5%',
      tenure: '48 months',
      emi: '₹9,630/month',
      processingFee: '2%',
      features: ['Higher loan amount', 'Longer repayment period', 'Option to top-up after 12 months']
    }
  ];
}

export function useEligibilityResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get eligibility score from location state
  const [eligibilityScore, setEligibilityScore] = useState<number | null>(
    location.state?.eligibilityScore || null
  );
  
  // Get document data from location state
  const [documents] = useState(location.state?.documents || {});
  
  // Generate loan offers based on eligibility score
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>(
    getOffersBasedOnScore(eligibilityScore)
  );
  
  useEffect(() => {
    // If we don't have an eligibility score, the user may have refreshed the page
    // In a real app, we'd fetch this from an API or redirect them back to the eligibility page
    if (eligibilityScore === null && !location.state) {
      toast({
        title: "Session expired",
        description: "Your eligibility session has expired. Please complete the eligibility check again.",
        variant: "destructive",
      });
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate('/eligibility');
      }, 2000);
    }
  }, [eligibilityScore, location.state, navigate, toast]);

  const handleApplyNow = (offerId: number) => {
    // Simulate selecting a loan offer and proceeding to application
    toast({
      title: "Loan offer selected",
      description: "You will now be redirected to the application form.",
      variant: "default",
    });
    
    // Navigate to login if needed before application
    navigate('/login');
  };

  return {
    eligibilityScore,
    documents,
    loanOffers,
    handleApplyNow
  };
}

export type { LoanOffer };
