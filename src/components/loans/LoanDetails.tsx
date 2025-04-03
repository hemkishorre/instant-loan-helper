
import React from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanType } from '@/types/loan';
import { Banknote, Calendar, CheckCircle2, Clock, FileText, CreditCard, Info, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
        {/* Loan Amount & Interest Rate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="bg-loan-lightBlue rounded-full p-2 mb-2">
              <Banknote className="h-5 w-5 text-loan-blue" />
            </div>
            <h3 className="text-sm font-medium text-gray-500">Loan Amount</h3>
            <p className="text-lg font-semibold text-loan-darkBlue">{loan.amountRange}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="bg-loan-lightBlue rounded-full p-2 mb-2">
              <Percent className="h-5 w-5 text-loan-blue" />
            </div>
            <h3 className="text-sm font-medium text-gray-500">Interest Rate</h3>
            <p className="text-lg font-semibold text-loan-darkBlue">{loan.interestRate}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center text-center">
            <div className="bg-loan-lightBlue rounded-full p-2 mb-2">
              <Calendar className="h-5 w-5 text-loan-blue" />
            </div>
            <h3 className="text-sm font-medium text-gray-500">Processing Time</h3>
            <p className="text-sm font-semibold text-loan-darkBlue">{loan.processingTime.split(',')[0]}</p>
          </div>
        </div>

        {/* Loan Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-loan-darkBlue flex items-center gap-2">
            <Info className="h-5 w-5 text-loan-blue" />
            <span>Overview</span>
          </h3>
          <p className="text-gray-700">{loan.description}</p>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="eligibility" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="repayment">Repayment</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="eligibility" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-loan-blue" />
              <span>Eligibility Criteria</span>
            </h3>
            <ul className="space-y-2">
              {loan.eligibilityCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-loan-green mt-1" />
                  <span className="text-gray-700">{criteria}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="documents" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <FileText className="h-5 w-5 text-loan-blue" />
              <span>Required Documents</span>
            </h3>
            <ul className="space-y-2">
              {loan.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-loan-blue mt-1" />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="repayment" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-loan-blue" />
              <span>Repayment Terms</span>
            </h3>
            <ul className="space-y-2">
              {loan.repaymentTerms.map((term, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-loan-blue mt-1" />
                  <span className="text-gray-700">{term}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="processing" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <Clock className="h-5 w-5 text-loan-blue" />
              <span>Processing Time</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700">{loan.processingTime}</p>
            </div>
          </TabsContent>
        </Tabs>
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
