
import { ReactNode } from 'react';

export interface LoanType {
  id: string;
  name: string;
  icon: ReactNode;
  minEligibility: string;
  interestRate: string;
  amountRange: string;
  shortDescription: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  repaymentTerms: string[];
  processingTime: string;
  keyFeatures?: string[];
  idealFor?: string;
}
