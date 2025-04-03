
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoanType } from '@/types/loan';
import { CheckCircle2 } from 'lucide-react';

interface LoanCardProps {
  loan: LoanType;
  onSelect: (loan: LoanType) => void;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onSelect }) => {
  return (
    <Card className="h-full transition-all hover:shadow-md hover:border-loan-blue">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-loan-lightGray">
            {loan.icon}
          </div>
          <CardTitle className="text-xl text-loan-darkBlue">{loan.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-loan-green" />
            <span><strong>Eligibility:</strong> {loan.minEligibility}</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-loan-green" />
            <span><strong>Interest Rate:</strong> {loan.interestRate}</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-loan-green" />
            <span><strong>Loan Amount:</strong> {loan.amountRange}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(loan)} 
          className="w-full bg-loan-blue hover:bg-loan-darkBlue"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;
