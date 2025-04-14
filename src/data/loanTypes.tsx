
import React from 'react';
import { Home, Briefcase, User, GraduationCap, Car } from 'lucide-react';
import { LoanType } from '@/types/loan';

export const loanTypes: LoanType[] = [
  {
    id: 'personal',
    name: 'Personal Loan',
    icon: <User className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Age: 18 - 60 years, Min Salary ₹30,000',
    interestRate: '10.5% p.a.',
    amountRange: '₹50,000 – ₹5,00,000',
    shortDescription: 'Quick funds for any personal expenses',
    description: 'Our Personal Loan is designed to meet your immediate financial needs with minimal documentation. Ideal for salaried or self-employed individuals needing quick, unsecured funds for medical emergencies, travel, wedding expenses, or home renovation.',
    eligibilityCriteria: [
      'Age: 18 - 60 years',
      'Minimum monthly income of ₹30,000',
      'Salaried individuals with at least 6 months of employment',
      'Self-employed professionals with at least 1 year in business',
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
      'Loan tenure: 6 months to 5 years',
      'Flexible EMI options',
      'No prepayment charges after 6 months',
      'Processing fee: 1.5% of loan amount'
    ],
    processingTime: 'Approval within 24 hours, disbursal within 2 working days',
    keyFeatures: [
      'No collateral required',
      'Instant approval and disbursement',
      'EMI repayment through the app'
    ],
    idealFor: 'Salaried or self-employed individuals needing quick, unsecured funds.'
  },
  {
    id: 'home',
    name: 'Home Loan',
    icon: <Home className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Age: 21 - 65 years, Min Salary ₹40,000',
    interestRate: '8.5% p.a.',
    amountRange: '₹1,00,000 – ₹25,00,000',
    shortDescription: 'Realize your dream of owning a home',
    description: 'Our Home Loan offers competitive interest rates with flexible repayment options to help you purchase your dream home. Ideal for individuals planning to buy or build a home with long tenure options and lower EMIs.',
    eligibilityCriteria: [
      'Age: 21 - 65 years at loan maturity',
      'Minimum monthly income of ₹40,000',
      'Salaried individuals with at least 2 years of employment',
      'Credit score above 750'
    ],
    requiredDocuments: [
      'Aadhar Card',
      'PAN Card',
      'Latest 3 months salary slips',
      'Form 16 for the last 2 years',
      'Bank statements for the last 6 months',
      'Basic property details',
      'Passport size photographs'
    ],
    repaymentTerms: [
      'Loan tenure: 5 to 20 years',
      'Up to 85% financing of property value',
      'Flexible EMI options with step-up and step-down facility',
      'Processing fee: 0.5% of loan amount',
      'No prepayment charges'
    ],
    processingTime: 'Approval within 3-5 working days, disbursal within 7 working days',
    keyFeatures: [
      'Long tenure with lower EMIs',
      'No prepayment charges',
      'Property verification not required'
    ],
    idealFor: 'Individuals planning to buy or build a home.'
  },
  {
    id: 'business',
    name: 'Business Loan',
    icon: <Briefcase className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Age: 21 - 60 years, Business age 1+ year',
    interestRate: '12% p.a.',
    amountRange: '₹1,00,000 – ₹15,00,000',
    shortDescription: 'Funds to start or expand your business',
    description: 'Our Business Loan provides the financial support you need to start a new business or expand your existing one. Ideal for self-employed professionals, small business owners, and freelancers looking to manage operational costs or purchase equipment.',
    eligibilityCriteria: [
      'Age: 21 - 60 years',
      'Business age of at least 1 year',
      'Minimum monthly income of ₹40,000',
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
    processingTime: 'Approval within 3 working days, disbursal within 5 working days',
    keyFeatures: [
      'No collateral needed',
      'Fast processing and flexible EMI options',
      'Helps build business credit profile'
    ],
    idealFor: 'Self-employed professionals, small business owners, freelancers.'
  },
  {
    id: 'education',
    name: 'Education Loan',
    icon: <GraduationCap className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Age: 18+, Admission in recognized institute',
    interestRate: '9% p.a.',
    amountRange: '₹50,000 – ₹10,00,000',
    shortDescription: 'Finance your higher education in India or abroad',
    description: 'Our Education Loan helps students pursue higher education in India or abroad without financial constraints. Ideal for students and working professionals seeking to upgrade skills with options to defer EMI until course completion.',
    eligibilityCriteria: [
      'Age: 18 years or above',
      'Admission in a recognized educational institution',
      'Co-borrower (parent/guardian) required for students with no income',
      'Co-borrower should have stable income source',
      'Course should lead to a degree/diploma'
    ],
    requiredDocuments: [
      'Admission letter from the institute',
      'Mark sheets of last qualifying examination',
      'Aadhar Card and PAN Card of student and co-borrower',
      'Income proof of co-borrower or student (if working)',
      'Passport (for studying abroad)',
      'Fee structure of the course'
    ],
    repaymentTerms: [
      'Loan tenure: Up to 10 years',
      'Option to defer EMI until course completion',
      'Processing fee: 1% of loan amount',
      'Collateral required for loans above ₹7.5 lakhs',
      'Tax benefits under Section 80E of Income Tax Act'
    ],
    processingTime: 'Approval within 7 working days, disbursal directly to the institution',
    keyFeatures: [
      'Option to defer EMI until course completion',
      'Covers tuition, books, and living expenses',
      'Instant digital approval (no offline paperwork)'
    ],
    idealFor: 'Students and working professionals seeking to upgrade skills.'
  },
  {
    id: 'vehicle',
    name: 'Vehicle Loan',
    icon: <Car className="h-6 w-6 text-loan-blue" />,
    minEligibility: 'Age: 18 - 60 years, Min Salary ₹25,000',
    interestRate: '9.5% p.a.',
    amountRange: '₹50,000 – ₹10,00,000',
    shortDescription: 'Drive home your dream car or bike',
    description: 'Our Vehicle Loan offers competitive rates to help you purchase a new or used car, SUV, or two-wheeler. Ideal for individuals looking for vehicle financing without long approval delays and minimal paperwork.',
    eligibilityCriteria: [
      'Age: 18 - 60 years at loan maturity',
      'Minimum monthly income of ₹25,000',
      'Valid driving license',
      'Salaried individuals with at least 1 year of employment',
      'Credit score above 700'
    ],
    requiredDocuments: [
      'Aadhar Card',
      'PAN Card',
      'Driving license',
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
    processingTime: 'Approval within 24 hours, disbursal within 3 working days',
    keyFeatures: [
      'No collateral or hypothecation paperwork',
      'Quick eligibility check using PAN, Aadhar, and salary slip',
      'Repayment tracking in-app'
    ],
    idealFor: 'Individuals looking for vehicle financing without long approval delays.'
  },
];
