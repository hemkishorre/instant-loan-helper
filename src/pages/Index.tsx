
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FileText, 
  CreditCard, 
  Clock, 
  Check, 
  Shield, 
  BarChart 
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Easy Document Upload',
      description: 'Simply upload your Aadhar, PAN, and salary slip for instant eligibility check.'
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Instant Pre-Approved Offers',
      description: 'Get immediate loan offers tailored to your financial profile.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Quick Disbursement',
      description: 'Receive funds directly into your bank account within 24 hours.'
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: 'Minimal Documentation',
      description: 'Say goodbye to excessive paperwork with our streamlined process.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure & Confidential',
      description: 'Your documents and data are encrypted and automatically deleted after processing.'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: 'Track Your Loan',
      description: 'Monitor your application status and EMI payments through our dashboard.'
    }
  ];

  const loanTypes = [
    {
      title: 'Personal Loan',
      description: 'Finance your personal needs with flexible repayment options.',
      interest: '10.99% - 16.99%',
      amount: '₹50,000 - ₹5,00,000',
      tenure: '12 - 60 months'
    },
    {
      title: 'Home Loan',
      description: 'Make your dream home a reality with our affordable home loans.',
      interest: '7.99% - 9.99%',
      amount: '₹5,00,000 - ₹50,00,000',
      tenure: '5 - 20 years'
    },
    {
      title: 'Business Loan',
      description: 'Fuel your business growth with quick and hassle-free funding.',
      interest: '11.99% - 18.99%',
      amount: '₹1,00,000 - ₹10,00,000',
      tenure: '12 - 48 months'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold text-loan-darkBlue mb-6">
                Instant Loan Approval in Just a Few Clicks
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Upload your documents, check eligibility, and get pre-approved loan offers instantly. No paperwork, no waiting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/eligibility">
                  <Button className="bg-loan-blue hover:bg-loan-darkBlue text-white text-lg py-6 px-8 rounded-md">
                    Check Eligibility
                  </Button>
                </Link>
                <Link to="/loan-types">
                  <Button variant="outline" className="border-loan-blue text-loan-blue hover:bg-loan-blue hover:text-white text-lg py-6 px-8 rounded-md">
                    View Loan Types
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                      U{i}
                    </div>
                  ))}
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">4,000+</span> users got their loans approved this week
                </p>
              </div>
            </div>
            <div className="md:w-1/2 animate-slideUp">
              <img 
                src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Happy customer with loan approval" 
                className="rounded-xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-loan-darkBlue mb-4">How It Works</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Get your loan approved in three simple steps, without the hassle of traditional banking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="loan-feature-icon mx-auto mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-loan-darkBlue mb-3">1. Upload Documents</h3>
              <p className="text-gray-700">
                Upload your Aadhar, PAN, and salary slip through our secure platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="loan-feature-icon mx-auto mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-loan-darkBlue mb-3">2. Get Pre-Approved</h3>
              <p className="text-gray-700">
                Our system instantly analyzes your eligibility and provides loan offers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="loan-feature-icon mx-auto mb-6">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-loan-darkBlue mb-3">3. Receive Funds</h3>
              <p className="text-gray-700">
                Accept an offer, provide your bank details, and receive funds within 24 hours.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/eligibility">
              <Button className="bg-loan-blue hover:bg-loan-darkBlue text-white">
                Start Your Application
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-loan-darkBlue mb-4">Why Choose FastLoan</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We've simplified the loan application process to save you time and effort.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover-effect border-none shadow-md">
                <CardContent className="p-6">
                  <div className="loan-feature-icon mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-loan-darkBlue mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Loan Types Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-loan-darkBlue mb-4">Available Loan Types</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our range of loan options to find the one that best suits your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loanTypes.map((loan, index) => (
              <Card key={index} className="card-hover-effect border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-loan-darkBlue mb-4">{loan.title}</h3>
                  <p className="text-gray-700 mb-6">{loan.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-loan-gray">Interest Rate</span>
                      <span className="font-medium">{loan.interest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-loan-gray">Loan Amount</span>
                      <span className="font-medium">{loan.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-loan-gray">Tenure</span>
                      <span className="font-medium">{loan.tenure}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/loan-types">
              <Button className="bg-loan-blue hover:bg-loan-darkBlue text-white">
                View All Loan Types
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-loan-blue text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Check your eligibility now and receive instant pre-approved loan offers tailored to your profile.
          </p>
          <Link to="/signup">
            <Button className="bg-white text-loan-blue hover:bg-gray-100 text-lg py-6 px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
