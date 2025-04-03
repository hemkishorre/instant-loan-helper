
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Calendar, AlertCircle, Info, CheckCircle2, Clock, Banknote } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ApprovedLoanDetailsProps {
  loan: {
    id: string;
    type: string;
    amount: string;
    date: string;
    interestRate: string;
    tenure: string;
    emiAmount: string;
    bankDetails: string;
    expectedDisbursementDate: string;
    status: string;
    pendingActions?: string[];
  };
  onClose: () => void;
}

const ApprovedLoanDetails: React.FC<ApprovedLoanDetailsProps> = ({ loan, onClose }) => {
  const { toast } = useToast();

  const handleCancelLoan = () => {
    toast({
      title: "Loan cancellation requested",
      description: "Your request to cancel this loan has been submitted. We'll process it within 24 hours.",
    });
    onClose();
  };

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-loan-darkBlue">{loan.type}</CardTitle>
            <CardDescription className="mt-1">Applied on {loan.date}</CardDescription>
          </div>
          <Badge className="bg-loan-green text-white">Approved</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Loan Summary */}
        <div>
          <h3 className="text-lg font-semibold text-loan-darkBlue mb-4">Loan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Approved Amount</p>
              <p className="text-xl font-semibold text-loan-darkBlue">{loan.amount}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="text-xl font-semibold text-loan-darkBlue">{loan.interestRate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Loan Tenure</p>
              <p className="text-xl font-semibold text-loan-darkBlue">{loan.tenure}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">EMI Amount</p>
              <p className="text-xl font-semibold text-loan-darkBlue">{loan.emiAmount}/month</p>
            </div>
          </div>
        </div>

        {/* Loan Disbursement Status */}
        <div>
          <h3 className="text-lg font-semibold text-loan-darkBlue mb-4">Loan Disbursement Status</h3>
          <div className="bg-loan-lightBlue/10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-loan-blue" />
              <p className="font-medium">Current Status: <span className="text-loan-blue">{loan.status}</span></p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-loan-darkBlue mt-0.5" />
                <div>
                  <p className="font-medium">Expected Disbursement Date</p>
                  <p className="text-gray-600">{loan.expectedDisbursementDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Banknote className="h-5 w-5 text-loan-darkBlue mt-0.5" />
                <div>
                  <p className="font-medium">Bank Account</p>
                  <p className="text-gray-600">{loan.bankDetails}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h3 className="text-lg font-semibold text-loan-darkBlue mb-4">Terms & Conditions</h3>
          <Accordion type="single" collapsible className="border rounded-md">
            <AccordionItem value="prepayment">
              <AccordionTrigger className="px-4">Prepayment Charges</AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="text-gray-600">
                  Prepayment charges of 2% will be applicable if loan is repaid before completion of 12 EMIs.
                  No charges applicable after 12 EMIs.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="processing">
              <AccordionTrigger className="px-4">Processing Fees</AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="text-gray-600">
                  Processing fee of 1% of the loan amount has been deducted from the approved loan amount.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancellation">
              <AccordionTrigger className="px-4">Loan Cancellation Policy</AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="text-gray-600">
                  You can cancel the loan before disbursement without any penalty.
                  After disbursement, foreclosure charges as per prepayment policy will apply.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Next Steps */}
        {loan.pendingActions && loan.pendingActions.length > 0 && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <AlertTitle className="text-amber-800">Action Required</AlertTitle>
            <AlertDescription className="text-amber-700">
              <ul className="list-disc pl-5 mt-2">
                {loan.pendingActions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {!loan.pendingActions && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-800">Ready for Disbursement</AlertTitle>
            <AlertDescription className="text-green-700">
              Your loan has been approved and is being processed for disbursement.
              The amount will be credited to your account shortly.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="border-t pt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline" onClick={onClose}>
          Back
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleCancelLoan}
          className="bg-loan-red hover:bg-red-600"
        >
          Cancel Loan Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApprovedLoanDetails;
