
import React from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LoanType } from '@/types/loan';
import { FileText, Clock, CheckSquare, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface LoanDetailsProps {
  loan: LoanType;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({ loan }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/eligibility', { state: { loanType: loan.id } });
  };

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-loan-lightGray">
            {loan.icon}
          </div>
          <div>
            <CardTitle className="text-2xl text-loan-darkBlue">{loan.name}</CardTitle>
            <CardDescription className="mt-1">{loan.shortDescription}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-loan-darkBlue">Overview</h3>
          <p className="text-gray-700">{loan.description}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="eligibility">
            <AccordionTrigger className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-loan-blue" />
              <span>Eligibility Criteria</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-1">
                {loan.eligibilityCriteria.map((criteria, index) => (
                  <li key={index} className="text-gray-700">{criteria}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="documents">
            <AccordionTrigger className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-loan-blue" />
              <span>Required Documents</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-1">
                {loan.requiredDocuments.map((doc, index) => (
                  <li key={index} className="text-gray-700">{doc}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="repayment">
            <AccordionTrigger className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-loan-blue" />
              <span>Repayment Terms</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-1">
                {loan.repaymentTerms.map((term, index) => (
                  <li key={index} className="text-gray-700">{term}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="processing">
            <AccordionTrigger className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-loan-blue" />
              <span>Processing Time</span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">{loan.processingTime}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleApply} 
          size="lg" 
          className="w-full bg-loan-blue hover:bg-loan-darkBlue"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoanDetails;
