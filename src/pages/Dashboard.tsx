
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  CreditCard, 
  Calendar, 
  BarChart3, 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BellRing 
} from 'lucide-react';

// Mock data
interface LoanApplication {
  id: string;
  type: string;
  amount: string;
  date: string;
  status: 'pending' | 'approved' | 'disbursed' | 'rejected';
  progress: number;
}

interface LoanAccount {
  id: string;
  type: string;
  amount: string;
  disbursedDate: string;
  remainingAmount: string;
  nextEmiDate: string;
  nextEmiAmount: string;
  totalEmis: number;
  paidEmis: number;
}

interface Notification {
  id: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning';
}

const Dashboard = () => {
  // Mock data for the dashboard
  const [loanApplications] = useState<LoanApplication[]>([
    {
      id: 'LA-001',
      type: 'Personal Loan',
      amount: '₹2,00,000',
      date: '12 Jun 2023',
      status: 'approved',
      progress: 75
    },
    {
      id: 'LA-002',
      type: 'Business Loan',
      amount: '₹5,00,000',
      date: '25 May 2023',
      status: 'pending',
      progress: 40
    }
  ]);
  
  const [loanAccounts] = useState<LoanAccount[]>([
    {
      id: 'LN-001',
      type: 'Personal Loan',
      amount: '₹1,50,000',
      disbursedDate: '10 Apr 2023',
      remainingAmount: '₹1,20,000',
      nextEmiDate: '10 Jul 2023',
      nextEmiAmount: '₹5,625',
      totalEmis: 36,
      paidEmis: 3
    }
  ]);
  
  const [notifications] = useState<Notification[]>([
    {
      id: 'N-001',
      message: 'Your Personal Loan application has been approved!',
      date: '2 days ago',
      isRead: false,
      type: 'success'
    },
    {
      id: 'N-002',
      message: 'Your next EMI payment of ₹5,625 is due in 5 days.',
      date: '1 day ago',
      isRead: false,
      type: 'warning'
    },
    {
      id: 'N-003',
      message: 'Your document verification is complete for Business Loan.',
      date: '3 days ago',
      isRead: true,
      type: 'info'
    }
  ]);
  
  const getStatusBadge = (status: LoanApplication['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-loan-yellow text-black hover:bg-amber-500">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-loan-green text-white hover:bg-green-600">Approved</Badge>;
      case 'disbursed':
        return <Badge className="bg-loan-blue text-white hover:bg-blue-600">Disbursed</Badge>;
      case 'rejected':
        return <Badge className="bg-loan-red text-white hover:bg-red-600">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-loan-green" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-loan-yellow" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-loan-blue" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-loan-darkBlue">My Dashboard</h1>
            <Link to="/eligibility">
              <Button className="bg-loan-blue hover:bg-loan-darkBlue">
                Apply for New Loan
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-loan-blue to-loan-darkBlue text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-medium">Total Loan Amount</h3>
                  <CreditCard className="h-6 w-6" />
                </div>
                <p className="text-3xl font-bold mb-6">₹1,50,000</p>
                <div className="flex justify-between items-center text-sm">
                  <span>1 Active Loan</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-medium text-loan-darkBlue">Next EMI Due</h3>
                  <Calendar className="h-6 w-6 text-loan-blue" />
                </div>
                <p className="text-3xl font-bold text-loan-darkBlue mb-6">₹5,625</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Due on 10 Jul 2023</span>
                  <ArrowUpRight className="h-4 w-4 text-loan-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-medium text-loan-darkBlue">Application Status</h3>
                  <BarChart3 className="h-6 w-6 text-loan-blue" />
                </div>
                <p className="text-3xl font-bold text-loan-darkBlue mb-6">2</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>1 Approved, 1 Pending</span>
                  <ArrowUpRight className="h-4 w-4 text-loan-blue" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="applications" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="applications">Loan Applications</TabsTrigger>
              <TabsTrigger value="accounts">Loan Accounts</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <h2 className="text-2xl font-bold text-loan-darkBlue mb-4">My Loan Applications</h2>
              
              {loanApplications.length > 0 ? (
                <div className="space-y-6">
                  {loanApplications.map((application) => (
                    <Card key={application.id} className="animate-fadeIn">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-xl font-semibold text-loan-darkBlue mr-3">
                                {application.type}
                              </h3>
                              {getStatusBadge(application.status)}
                            </div>
                            <p className="text-gray-600">{application.id} • Applied on {application.date}</p>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <p className="text-2xl font-bold text-loan-darkBlue">{application.amount}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Application Progress</span>
                            <span className="font-medium">{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button variant="outline" className="border-loan-blue text-loan-blue hover:bg-loan-blue hover:text-white">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <CardContent>
                    <h3 className="text-xl font-semibold text-loan-darkBlue mb-2">No Applications Yet</h3>
                    <p className="text-gray-600 mb-6">You haven't applied for any loans yet.</p>
                    <Link to="/eligibility">
                      <Button className="bg-loan-blue hover:bg-loan-darkBlue">Apply for a Loan</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="accounts">
              <h2 className="text-2xl font-bold text-loan-darkBlue mb-4">My Loan Accounts</h2>
              
              {loanAccounts.length > 0 ? (
                <div className="space-y-6">
                  {loanAccounts.map((account) => (
                    <Card key={account.id} className="animate-fadeIn">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-semibold text-loan-darkBlue mb-1">
                              {account.type}
                            </h3>
                            <p className="text-gray-600">
                              {account.id} • Disbursed on {account.disbursedDate}
                            </p>
                          </div>
                          <div className="mt-4 md:mt-0 text-right">
                            <p className="text-sm text-gray-600">Total Loan Amount</p>
                            <p className="text-2xl font-bold text-loan-darkBlue">{account.amount}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Remaining Amount</p>
                            <p className="text-xl font-semibold text-loan-darkBlue">
                              {account.remainingAmount}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Next EMI Date</p>
                            <p className="text-xl font-semibold text-loan-darkBlue">
                              {account.nextEmiDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Next EMI Amount</p>
                            <p className="text-xl font-semibold text-loan-darkBlue">
                              {account.nextEmiAmount}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Repayment Progress</span>
                            <span className="font-medium">{account.paidEmis} of {account.totalEmis} EMIs paid</span>
                          </div>
                          <Progress value={(account.paidEmis / account.totalEmis) * 100} className="h-2" />
                        </div>
                        
                        <div className="mt-6 flex justify-end space-x-3">
                          <Button variant="outline" className="border-loan-blue text-loan-blue hover:bg-loan-blue hover:text-white">
                            View Details
                          </Button>
                          <Button className="bg-loan-green hover:bg-green-600">
                            Pay EMI
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center p-8">
                  <CardContent>
                    <h3 className="text-xl font-semibold text-loan-darkBlue mb-2">No Active Loans</h3>
                    <p className="text-gray-600 mb-6">You don't have any active loan accounts yet.</p>
                    <Link to="/eligibility">
                      <Button className="bg-loan-blue hover:bg-loan-darkBlue">Apply for a Loan</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-loan-darkBlue">Notifications</h2>
                <div className="flex items-center">
                  <BellRing className="h-5 w-5 text-loan-blue mr-2" />
                  <span className="text-sm font-medium bg-loan-blue text-white rounded-full px-2 py-0.5">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                </div>
              </div>
              
              {notifications.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {notifications.map((notification) => (
                        <li 
                          key={notification.id} 
                          className={`p-4 hover:bg-gray-50 animate-fadeIn ${!notification.isRead ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <p className={`text-gray-800 ${!notification.isRead ? 'font-medium' : ''}`}>
                                {notification.message}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : (
                <Card className="text-center p-8">
                  <CardContent>
                    <h3 className="text-xl font-semibold text-loan-darkBlue mb-2">No Notifications</h3>
                    <p className="text-gray-600">You don't have any notifications yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
