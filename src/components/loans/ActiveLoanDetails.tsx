
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, AlertCircle, Info, CheckCircle2, Clock, Banknote, ArrowRight, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface EMIPayment {
  emiNo: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  amount: string;
}

interface ActiveLoanDetailsProps {
  loan: {
    id: string;
    type: string;
    amount: string;
    date: string;
    interestRate: string;
    tenure: string;
    emiAmount: string;
    startDate: string;
    endDate: string;
    totalPaidEMIs: number;
    totalEMIs: number;
    nextEmiDate: string;
    nextEmiAmount: string;
    paymentStatus: 'paid' | 'pending' | 'overdue';
    remainingAmount: string;
    totalInterestPaid: string;
    totalAmountPaid: string;
    emiPayments: EMIPayment[];
  };
  onClose: () => void;
}

const ActiveLoanDetails: React.FC<ActiveLoanDetailsProps> = ({ loan, onClose }) => {
  const { toast } = useToast();
  const [showForeclosureDialog, setShowForeclosureDialog] = useState(false);

  const handlePayEMI = () => {
    toast({
      title: "Payment initiated",
      description: "You've been redirected to our payment gateway to complete your EMI payment.",
    });
  };

  const handleForeclosure = () => {
    toast({
      title: "Foreclosure request submitted",
      description: "Our team will contact you within 24 hours with the final settlement amount.",
    });
    setShowForeclosureDialog(false);
  };

  const getStatusBadge = (status: 'paid' | 'pending' | 'overdue') => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-loan-green text-white">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-loan-yellow text-black">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-loan-red text-white">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-loan-darkBlue">{loan.type}</CardTitle>
            <CardDescription className="mt-1">Disbursed on {loan.date}</CardDescription>
          </div>
          <Badge className="bg-loan-blue text-white">Active</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Loan Summary */}
        <div>
          <h3 className="text-lg font-semibold text-loan-darkBlue mb-4">Loan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Loan Amount</p>
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
              <p className="text-sm text-gray-500">EMI Paid / Total</p>
              <p className="text-xl font-semibold text-loan-darkBlue">{loan.totalPaidEMIs} / {loan.totalEMIs}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Loan Start Date</p>
              <p className="text-xl font-semibold text-loan-darkBlue">{loan.startDate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Expected End Date</p>
              <p className="text-xl font-semibold text-loan-darkBlue">{loan.endDate}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Repayment Progress</span>
              <span className="font-medium">{loan.totalPaidEMIs} of {loan.totalEMIs} EMIs paid</span>
            </div>
            <Progress value={(loan.totalPaidEMIs / loan.totalEMIs) * 100} className="h-2" />
          </div>
        </div>

        {/* EMI Payment Tracker */}
        <div>
          <h3 className="text-lg font-semibold text-loan-darkBlue mb-4">EMI Payment Tracker</h3>
          <div className="bg-loan-lightBlue/10 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-loan-darkBlue mt-0.5" />
                  <div>
                    <p className="font-medium">Next EMI Due Date</p>
                    <p className="text-gray-600">{loan.nextEmiDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Banknote className="h-5 w-5 text-loan-darkBlue mt-0.5" />
                  <div>
                    <p className="font-medium">EMI Amount</p>
                    <p className="text-gray-600">{loan.nextEmiAmount}/month</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">Payment Status: </div>
                  {getStatusBadge(loan.paymentStatus)}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Button 
                  onClick={handlePayEMI} 
                  className="bg-loan-green hover:bg-green-600 text-white"
                  disabled={loan.paymentStatus === 'paid'}
                >
                  Pay EMI Now
                </Button>
                {loan.paymentStatus === 'overdue' && (
                  <p className="text-xs text-loan-red mt-2">
                    Late payment penalty of 2% per month will be applicable
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts based on status */}
        {loan.paymentStatus === 'pending' && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <AlertTitle className="text-amber-800">Payment Reminder</AlertTitle>
            <AlertDescription className="text-amber-700">
              Your next EMI is due on {loan.nextEmiDate}. Please ensure timely payment to avoid late fees.
            </AlertDescription>
          </Alert>
        )}

        {loan.paymentStatus === 'overdue' && (
          <Alert className="border-loan-red bg-red-50">
            <AlertCircle className="h-5 w-5 text-loan-red" />
            <AlertTitle className="text-red-800">Overdue Payment</AlertTitle>
            <AlertDescription className="text-red-700">
              Your EMI payment is overdue. Please pay immediately to avoid further penalties and negative impact on your credit score.
            </AlertDescription>
          </Alert>
        )}

        {/* Loan Details Tabs */}
        <Tabs defaultValue="repayment">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="repayment">Repayment Schedule</TabsTrigger>
            <TabsTrigger value="balance">Loan Balance</TabsTrigger>
          </TabsList>

          {/* Repayment Schedule Tab */}
          <TabsContent value="repayment" className="border rounded-md p-4 mt-4">
            <h4 className="font-medium text-loan-darkBlue mb-3">EMI Payment History</h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>EMI No.</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loan.emiPayments.map((payment) => (
                    <TableRow key={payment.emiNo}>
                      <TableCell>{payment.emiNo}</TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Loan Balance Tab */}
          <TabsContent value="balance" className="border rounded-md p-4 mt-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Remaining Loan Amount</p>
                <p className="text-xl font-semibold text-loan-darkBlue">{loan.remainingAmount}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Interest Paid So Far</p>
                <p className="text-xl font-semibold text-loan-darkBlue">{loan.totalInterestPaid}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Amount Paid</p>
                <p className="text-xl font-semibold text-loan-darkBlue">{loan.totalAmountPaid}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Dialog open={showForeclosureDialog} onOpenChange={setShowForeclosureDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-loan-blue hover:bg-loan-darkBlue">
                    Foreclosure / Prepayment Option
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Loan Foreclosure</DialogTitle>
                    <DialogDescription>
                      You can repay your entire loan early. The following charges may apply:
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-gray-600">
                      <strong>Foreclosure Amount:</strong> {loan.remainingAmount}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Foreclosure Charges:</strong> 2% of the outstanding loan amount
                    </p>
                    <Alert className="bg-amber-50 border-amber-200">
                      <Info className="h-4 w-4 text-amber-500" />
                      <AlertDescription className="text-amber-700">
                        By proceeding with foreclosure, you agree to pay the full outstanding amount along with any applicable charges.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowForeclosureDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleForeclosure}
                      className="bg-loan-blue hover:bg-loan-darkBlue"
                    >
                      Proceed with Foreclosure
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="border-t pt-6">
        <Button variant="outline" onClick={onClose} className="ml-auto">
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActiveLoanDetails;
