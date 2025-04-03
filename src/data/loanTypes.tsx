
import React from 'react';
import { Home, Briefcase, User, GraduationCap, Car } from 'lucide-react';
import { LoanType } from '@/types/loan';

export const loanTypes: LoanType[] = [
  {
    id: 'personal',
    name: 'Personal Loan',
    icon: <User className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Min Salary ₹30,000, Age 18+',
    interestRate: '10.5% p.a.',
    amountRange: '₹50,000 – ₹5,00,000',
    shortDescription: 'Quick funds for any personal expenses',
    description: 'Our Personal Loan is designed to meet your immediate financial needs with minimal documentation. Whether it\'s a wedding, vacation, medical emergency, or home renovation, our personal loan offers flexibility, competitive interest rates, and quick disbursals.',
    eligibilityCriteria: [
      'Minimum age of 18 years',
      'Minimum monthly income of ₹30,000',
      'Salaried individuals with at least 6 months of employment',
      'Credit score above 700'
    ],
    requiredDocuments: [
      'Aadhar Card',
      'PAN Card',
      'Latest 3 months salary slips',
      'Bank statements for the last 6 months',
      'Passport size photographs'
    ],
    repaymentTerms: [
      'Loan tenure: 1 to 5 years',
      'Flexible EMI options',
      'No prepayment charges after 6 months',
      'Processing fee: 1.5% of loan amount'
    ],
    processingTime: 'Approval within 24 hours, disbursal within 2 working days'
  },
  {
    id: 'home',
    name: 'Home Loan',
    icon: <Home className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Min Salary ₹50,000, Age 25+',
    interestRate: '8.5% p.a.',
    amountRange: '₹10,00,000 – ₹1,00,00,000',
    shortDescription: 'Realize your dream of owning a home',
    description: 'Our Home Loan offers competitive interest rates with flexible repayment options to help you purchase your dream home. With loan amounts up to ₹1 crore and tenure up to 30 years, we make homeownership accessible and affordable.',
    eligibilityCriteria: [
      'Minimum age of 25 years, maximum 65 years at loan maturity',
      'Minimum monthly income of ₹50,000',
      'Salaried individuals with at least 2 years of employment',
      'Credit score above 750'
    ],
    requiredDocuments: [
      'Aadhar Card',
      'PAN Card',
      'Latest 3 months salary slips',
      'Form 16 for the last 2 years',
      'Bank statements for the last 6 months',
      'Property documents',
      'Passport size photographs'
    ],
    repaymentTerms: [
      'Loan tenure: 5 to 30 years',
      'Up to 85% financing of property value',
      'Flexible EMI options with step-up and step-down facility',
      'Processing fee: 0.5% of loan amount',
      'Part-payment and foreclosure allowed after 6 months'
    ],
    processingTime: 'Approval within 3-5 working days, disbursal within 7 working days after property verification'
  },
  {
    id: 'business',
    name: 'Business Loan',
    icon: <Briefcase className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Business age 2+ years, Min Turnover ₹20 Lakh',
    interestRate: '12% p.a.',
    amountRange: '₹5,00,000 – ₹50,00,000',
    shortDescription: 'Funds to start or expand your business',
    description: 'Our Business Loan provides the financial support you need to start a new business or expand your existing one. With minimal documentation and quick approval, we ensure that your business plans don\'t get delayed due to lack of funds.',
    eligibilityCriteria: [
      'Business age of at least 2 years',
      'Minimum annual turnover of ₹20 lakh',
      'Profitable business for at least 1 year',
      'Credit score above 720'
    ],
    requiredDocuments: [
      'Business registration certificate',
      'GST registration (if applicable)',
      'PAN Card of business and proprietor',
      'Aadhar Card',
      'ITR for the last 2 years',
      'Bank statements for the last 12 months',
      'Proof of business existence'
    ],
    repaymentTerms: [
      'Loan tenure: 1 to 7 years',
      'Flexible EMI options',
      'Processing fee: 2% of loan amount',
      'No prepayment charges after 12 months'
    ],
    processingTime: 'Approval within 3 working days, disbursal within 5 working days'
  },
  {
    id: 'education',
    name: 'Education Loan',
    icon: <GraduationCap className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Admission in recognized institute, Co-applicant',
    interestRate: '9% p.a.',
    amountRange: '₹1,00,000 – ₹50,00,000',
    shortDescription: 'Finance your higher education in India or abroad',
    description: 'Our Education Loan helps students pursue higher education in India or abroad without financial constraints. With special interest rates and repayment starting after the course completion, we ensure students can focus on their studies.',
    eligibilityCriteria: [
      'Admission in a recognized educational institution',
      'Co-applicant (parent/guardian) required',
      'Co-applicant should have stable income source',
      'Course should lead to a degree/diploma'
    ],
    requiredDocuments: [
      'Admission letter from the institute',
      'Mark sheets of last qualifying examination',
      'Aadhar Card and PAN Card of student and co-applicant',
      'Income proof of co-applicant',
      'Passport (for studying abroad)',
      'Fee structure of the course'
    ],
    repaymentTerms: [
      'Loan tenure: Up to 15 years',
      'Moratorium period: Course duration + 6 months',
      'Processing fee: 1% of loan amount',
      'Collateral required for loans above ₹7.5 lakhs',
      'Tax benefits under Section 80E of Income Tax Act'
    ],
    processingTime: 'Approval within 7 working days, disbursal directly to the institution'
  },
  {
    id: 'vehicle',
    name: 'Vehicle Loan',
    icon: <Car className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Min Salary ₹25,000, Age 21+',
    interestRate: '9.5% p.a.',
    amountRange: '₹1,00,000 – ₹20,00,000',
    shortDescription: 'Drive home your dream car or bike',
    description: 'Our Vehicle Loan offers competitive rates to help you purchase a new or used car, SUV, or two-wheeler. With quick approval and minimal documentation, we make your dream of owning a vehicle a reality.',
    eligibilityCriteria: [
      'Minimum age of 21 years, maximum 65 years at loan maturity',
      'Minimum monthly income of ₹25,000',
      'Salaried individuals with at least 1 year of employment',
      'Credit score above 700'
    ],
    requiredDocuments: [
      'Aadhar Card',
      'PAN Card',
      'Latest 3 months salary slips',
      'Bank statements for the last 3 months',
      'Quotation from dealer (for new vehicle)',
      'RC copy and insurance (for used vehicle)',
      'Passport size photographs'
    ],
    repaymentTerms: [
      'Loan tenure: 1 to 7 years',
      'Up to 90% financing for new vehicles, 75% for used vehicles',
      'Processing fee: 1% of loan amount',
      'Foreclosure allowed after 6 months with minimal charges'
    ],
    processingTime: 'Approval within 24 hours, disbursal within 3 working days'
  },
];
