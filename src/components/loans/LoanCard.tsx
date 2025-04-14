
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoanType } from '@/types/loan';
import { CheckCircle2, ArrowRight, Tag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface LoanCardProps {
  loan: LoanType;
  onSelect: (loan: LoanType) => void;
  isSelected?: boolean;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onSelect, isSelected = false }) => {
  // Determine loan tags based on loan type and properties
  const getLoanTags = (loan: LoanType) => {
    const tags = [];
    
    if (loan.interestRate.includes('8.5%') || loan.interestRate.includes('9%')) {
      tags.push({ text: 'Low Interest', color: 'bg-green-100 text-green-800' });
    }
    
    if (loan.processingTime.includes('24 hours')) {
      tags.push({ text: 'Quick Approval', color: 'bg-blue-100 text-blue-800' });
    }
    
    if (loan.repaymentTerms.some(term => term.includes('No prepayment charges'))) {
      tags.push({ text: 'No Prepayment Charges', color: 'bg-purple-100 text-purple-800' });
    }
    
    if (loan.id === 'personal' || loan.id === 'business') {
      tags.push({ text: 'No Collateral', color: 'bg-amber-100 text-amber-800' });
    }
    
    return tags;
  };

  const loanTags = getLoanTags(loan);

  return (
    <Card className={`h-full transition-all hover:shadow-md ${isSelected ? 'border-loan-blue ring-2 ring-loan-blue/20' : 'hover:border-loan-blue'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-loan-lightGray">
            {loan.icon}
          </div>
          <CardTitle className="text-xl text-loan-darkBlue">{loan.name}</CardTitle>
        </div>
        
        {loanTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {loanTags.map((tag, index) => (
              <Badge key={index} variant="outline" className={`text-xs font-medium ${tag.color}`}>
                {tag.text}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-gray-600 text-sm mb-3">{loan.shortDescription}</p>
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
          className={`w-full ${isSelected ? 'bg-loan-darkBlue' : 'bg-loan-blue hover:bg-loan-darkBlue'}`}
        >
          {isSelected ? (
            <span className="flex items-center">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          ) : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;
