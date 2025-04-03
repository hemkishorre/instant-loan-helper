
import React from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanType } from '@/types/loan';
import { Banknote, Calendar, CheckCircle2, Clock, FileText, CreditCard, Info, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface LoanDetailsProps {
  loan: LoanType;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({ loan }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/eligibility', { state: { loanType: loan.id } });
  };

  // Sample EMI calculation for different tenures (simplified)
  const emiExamples = [
    { tenure: '12 months', amount: '₹26,450/month' },
    { tenure: '24 months', amount: '₹14,225/month' },
    { tenure: '36 months', amount: '₹10,135/month' },
    { tenure: '48 months', amount: '₹8,110/month' },
    { tenure: '60 months', amount: '₹6,920/month' },
  ];

  // Sample late payment fees and policies
  const latePaymentPolicies = [
    'Late payment fee: 2% per month on the overdue amount',
    'Penalty charges will be applicable after 3 days of due date',
    'Multiple late payments may affect credit score',
  ];

  // Prepayment policies
  const prepaymentPolicies = [
    'Part-prepayment allowed after 6 EMIs',
    'No prepayment charges after 12 months',
    'Minimum prepayment amount: 25% of outstanding principal',
    'Maximum 4 prepayments allowed in a financial year',
  ];

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
        <div className="mt-4 bg-loan-lightBlue/20 p-4 rounded-lg">
          <p className="text-gray-700">{loan.description}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Loan Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <p className="text-lg font-semibold text-loan-darkBlue">{loan.processingTime.split(',')[0]}</p>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="eligibility" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="repayment">Repayment</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
          </TabsList>
          
          {/* Eligibility Tab */}
          <TabsContent value="eligibility" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-loan-blue" />
              <span>Eligibility Criteria</span>
            </h3>
            <ul className="space-y-3">
              {loan.eligibilityCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start gap-2 pb-2 border-b border-gray-100">
                  <CheckCircle2 className="h-4 w-4 text-loan-green mt-1" />
                  <div>
                    <span className="text-gray-700">{criteria}</span>
                    {index === 0 && criteria.includes('Minimum age') && (
                      <Badge variant="outline" className="ml-2 bg-loan-lightBlue text-loan-blue">Age Requirement</Badge>
                    )}
                    {criteria.includes('income') && (
                      <Badge variant="outline" className="ml-2 bg-loan-lightBlue text-loan-blue">Income Requirement</Badge>
                    )}
                    {criteria.includes('Credit score') && (
                      <Badge variant="outline" className="ml-2 bg-loan-lightBlue text-loan-blue">Credit Score</Badge>
                    )}
                    {criteria.includes('employment') && (
                      <Badge variant="outline" className="ml-2 bg-loan-lightBlue text-loan-blue">Employment</Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <FileText className="h-5 w-5 text-loan-blue" />
              <span>Required Documents</span>
            </h3>
            <ul className="space-y-3">
              {loan.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-start gap-2 pb-2 border-b border-gray-100">
                  <FileText className="h-4 w-4 text-loan-blue mt-1" />
                  <div>
                    <span className="text-gray-700">{doc}</span>
                    {doc.includes('Aadhar') && (
                      <p className="text-xs text-gray-500 mt-1">For identity verification</p>
                    )}
                    {doc.includes('PAN') && (
                      <p className="text-xs text-gray-500 mt-1">For financial verification</p>
                    )}
                    {doc.includes('salary') && (
                      <p className="text-xs text-gray-500 mt-1">To verify income eligibility</p>
                    )}
                    {doc.includes('Bank') && (
                      <p className="text-xs text-gray-500 mt-1">For loan disbursement</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          {/* Repayment Tab */}
          <TabsContent value="repayment" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-loan-blue" />
              <span>Repayment Terms</span>
            </h3>
            
            {/* Loan Terms */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-loan-darkBlue mb-2">General Terms</h4>
              <ul className="space-y-2">
                {loan.repaymentTerms.map((term, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CreditCard className="h-4 w-4 text-loan-blue mt-1" />
                    <span className="text-gray-700">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* EMI Examples */}
            <Collapsible className="mb-4 border rounded-md">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-3 font-medium">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-loan-blue" />
                  <span className="text-sm font-medium text-loan-darkBlue">Sample EMI Amounts</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenure</TableHead>
                      <TableHead>EMI Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emiExamples.map((emi, index) => (
                      <TableRow key={index}>
                        <TableCell>{emi.tenure}</TableCell>
                        <TableCell>{emi.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-xs text-gray-500 mt-2">
                  *EMIs calculated for a loan amount of ₹3,00,000 at {loan.interestRate}. Actual EMI may vary.
                </p>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Late Payment Policies */}
            <Collapsible className="mb-4 border rounded-md">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-3 font-medium">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-loan-blue" />
                  <span className="text-sm font-medium text-loan-darkBlue">Late Payment Policies</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <ul className="space-y-2">
                  {latePaymentPolicies.map((policy, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-red-500 mt-1" />
                      <span className="text-gray-700">{policy}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Prepayment Policies */}
            <Collapsible className="border rounded-md">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-3 font-medium">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-loan-blue" />
                  <span className="text-sm font-medium text-loan-darkBlue">Prepayment Options</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <ul className="space-y-2">
                  {prepaymentPolicies.map((policy, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-loan-green mt-1" />
                      <span className="text-gray-700">{policy}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>
          
          {/* Processing Tab */}
          <TabsContent value="processing" className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-3 text-loan-darkBlue flex items-center gap-2">
              <Clock className="h-5 w-5 text-loan-blue" />
              <span>Processing & Disbursement Time</span>
            </h3>
            
            <div className="bg-loan-lightBlue/10 p-4 rounded-md mb-4">
              <h4 className="font-medium text-loan-darkBlue mb-2">Timeline</h4>
              <p className="text-gray-700">{loan.processingTime}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 border-b pb-3">
                <div className="bg-loan-lightBlue rounded-full p-2 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-loan-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-loan-darkBlue">Application & Verification</h4>
                  <p className="text-sm text-gray-600">
                    Submit your application and documents online. Our team will verify your details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 border-b pb-3">
                <div className="bg-loan-lightBlue rounded-full p-2 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-loan-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-loan-darkBlue">Approval</h4>
                  <p className="text-sm text-gray-600">
                    {loan.id === 'personal' ? 'Approval within 24 hours of document verification.' : 
                     loan.id === 'business' ? 'Approval within 3 working days after complete verification.' :
                     'Approval after successful verification of documents and eligibility.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-loan-lightBlue rounded-full p-2 flex-shrink-0">
                  <Banknote className="h-5 w-5 text-loan-blue" />
                </div>
                <div>
                  <h4 className="font-medium text-loan-darkBlue">Disbursement</h4>
                  <p className="text-sm text-gray-600">
                    {loan.id === 'personal' ? 'Loan amount credited to your account within 2 working days of approval.' : 
                     loan.id === 'business' ? 'Funds will be disbursed within 5 working days of approval.' :
                     'Loan disbursed directly to your bank account after approval.'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          onClick={handleApply} 
          size="lg" 
          className="w-full bg-loan-blue hover:bg-loan-darkBlue"
        >
          Apply Now
        </Button>
        <p className="text-xs text-center text-gray-500">
          By clicking "Apply Now", you agree to our Terms & Conditions and authorize us to check your credit score.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoanDetails;
