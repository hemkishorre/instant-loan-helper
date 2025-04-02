
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Percent, Calendar } from 'lucide-react';
import { LoanOffer } from '@/hooks/useEligibilityResults';

interface LoanOfferCardProps {
  offer: LoanOffer;
  eligibilityScore: number | null;
  index: number;
  onApply: (offerId: number) => void;
}

const LoanOfferCard: React.FC<LoanOfferCardProps> = ({ 
  offer, 
  eligibilityScore, 
  index, 
  onApply 
}) => {
  return (
    <Card className="overflow-hidden card-hover-effect animate-slideUp" style={{ animationDelay: `${0.1 * index}s` }}>
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
          onClick={() => onApply(offer.id)}
        >
          Apply Now
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoanOfferCard;
