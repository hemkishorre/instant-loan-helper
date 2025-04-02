
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  CheckCircle2, 
  ArrowRight, 
  Percent, 
  Calendar, 
  CreditCard, 
  Shield, 
  Badge as BadgeIcon,
  AlertTriangle,
  XCircle
} from 'lucide-react';

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

const EligibilityResults = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-6">
              {eligibilityScore !== null && eligibilityScore >= 40 ? (
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-loan-darkBlue mb-4">
              {eligibilityScore !== null && eligibilityScore >= 40
                ? "Congratulations! You're Pre-Approved"
                : "Thank You for Your Application"}
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {eligibilityScore !== null && eligibilityScore >= 40
                ? "Based on your submitted documents, you're eligible for the following loan offers. Choose the one that best suits your needs."
                : "Based on your submitted documents, we've assessed your current eligibility. See below for available options."}
            </p>
            
            {eligibilityScore !== null && (
              <div className="mt-6">
                <div className="inline-block">
                  <h3 className="text-xl font-bold mb-2">Your Eligibility Score</h3>
                  <div className="bg-white rounded-full h-8 w-64 border overflow-hidden">
                    <div 
                      className={`h-full ${
                        eligibilityScore >= 70 ? 'bg-green-500' : 
                        eligibilityScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${eligibilityScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>0</span>
                    <span className="font-medium">{eligibilityScore}/100</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
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
          
          <h2 className="text-2xl font-bold text-loan-darkBlue mb-6">
            {eligibilityScore !== null && eligibilityScore >= 40
              ? "Your Pre-Approved Loan Offers"
              : "Available Loan Options"}
          </h2>
          
          <div className="space-y-6">
            {loanOffers.map((offer, index) => (
              <Card key={offer.id} className="overflow-hidden card-hover-effect animate-slideUp" style={{ animationDelay: `${0.1 * index}s` }}>
                <CardHeader className="bg-loan-blue text-white py-4">
                  <CardTitle className="flex items-center justify-between">
                    <span>{offer.type}</span>
                    <Badge className="bg-white text-loan-blue hover:bg-gray-100">
                      {eligibilityScore !== null && eligibilityScore >= 40 ? "Pre-Approved" : "Available"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-loan-darkBlue mb-1">{offer.amount}</h3>
                      <p className="text-gray-600 text-sm">Loan Amount</p>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <Percent className="h-4 w-4 text-loan-blue mr-2" />
                          <span className="text-gray-600 text-sm">Interest Rate: <span className="font-medium">{offer.interestRate}</span></span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-loan-blue mr-2" />
                          <span className="text-gray-600 text-sm">Tenure: <span className="font-medium">{offer.tenure}</span></span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-loan-darkBlue mb-1">{offer.emi}</h3>
                      <p className="text-gray-600 text-sm">EMI Amount</p>
                      
                      <div className="mt-4">
                        <p className="text-gray-600 text-sm">Processing Fee: <span className="font-medium">{offer.processingFee}</span></p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-loan-darkBlue mb-2">Features</h3>
                      <ul className="space-y-1">
                        {offer.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 p-4 flex justify-end">
                  <Button 
                    className="bg-loan-blue hover:bg-loan-darkBlue"
                    onClick={() => handleApplyNow(offer.id)}
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
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
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EligibilityResults;
