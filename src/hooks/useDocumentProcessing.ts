
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { analyzeDocument } from '@/services/documentService';
import { Document } from '@/components/eligibility/DocumentUploader';

type DocumentType = 'aadhar' | 'pan' | 'salarySlip';

export function useDocumentProcessing() {
  const navigate = useNavigate();
  
  const [documents, setDocuments] = useState<Record<DocumentType, Document>>({
    aadhar: {
      type: 'aadhar',
      file: null,
      preview: null,
      uploaded: false,
      processing: false,
      processed: false,
      error: null
    },
    pan: {
      type: 'pan',
      file: null,
      preview: null,
      uploaded: false,
      processing: false,
      processed: false,
      error: null
    },
    salarySlip: {
      type: 'salarySlip',
      file: null,
      preview: null,
      uploaded: false,
      processing: false,
      processed: false,
      error: null
    }
  });
  
  const [processing, setProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [overallEligibilityScore, setOverallEligibilityScore] = useState<number | null>(null);
  
  const documentLabels: Record<DocumentType, string> = {
    aadhar: 'Aadhar Card',
    pan: 'PAN Card',
    salarySlip: 'Salary Slip'
  };
  
  const allDocumentsUploaded = Object.values(documents).every(doc => doc.uploaded);
  
  const handleFileChange = async (type: DocumentType, file: File | null) => {
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
      });
      return;
    }
    
    // Create file preview
    const preview = URL.createObjectURL(file);
    
    setDocuments(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        file,
        preview,
        uploaded: true,
        processing: false,
        processed: false,
        error: null,
        analysisResult: undefined,
        eligibilityScore: undefined,
        eligibilityFeedback: undefined
      }
    }));
    
    toast.success(`${documentLabels[type]} has been uploaded successfully.`);
  };
  
  const handleDeleteDocument = (type: DocumentType) => {
    setDocuments(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        file: null,
        preview: null,
        uploaded: false,
        processing: false,
        processed: false,
        error: null,
        analysisResult: undefined,
        eligibilityScore: undefined,
        eligibilityFeedback: undefined
      }
    }));
    
    toast.info(`${documentLabels[type]} has been removed.`);
  };
  
  const processDocuments = async () => {
    setProcessing(true);
    setProcessingProgress(0);
    
    // Process each document sequentially
    const documentTypes: DocumentType[] = ['aadhar', 'pan', 'salarySlip'];
    let currentDocIndex = 0;
    let totalEligibilityScore = 0;
    let documentsWithScore = 0;
    
    const processNextDocument = async () => {
      if (currentDocIndex >= documentTypes.length) {
        // All documents processed, calculate overall eligibility
        const finalScore = documentsWithScore > 0 
          ? Math.round(totalEligibilityScore / documentsWithScore) 
          : null;
        
        setOverallEligibilityScore(finalScore);
        
        // Navigate to results with a small delay
        setTimeout(() => {
          navigate('/eligibility-results', { 
            state: { 
              eligibilityScore: finalScore,
              documents: documents 
            } 
          });
        }, 1000);
        return;
      }
      
      const currentType = documentTypes[currentDocIndex];
      const currentDoc = documents[currentType];
      
      if (!currentDoc.file || !currentDoc.uploaded) {
        // Skip if no file uploaded
        currentDocIndex++;
        setProcessingProgress(Math.round((currentDocIndex / documentTypes.length) * 100));
        processNextDocument();
        return;
      }
      
      // Mark document as processing
      setDocuments(prev => ({
        ...prev,
        [currentType]: {
          ...prev[currentType],
          processing: true,
          processed: false,
          error: null
        }
      }));
      
      try {
        // Call our document analysis service
        const result = await analyzeDocument(currentType, currentDoc.file);
        
        if (result.error) {
          // Handle error
          setDocuments(prev => ({
            ...prev,
            [currentType]: {
              ...prev[currentType],
              processing: false,
              processed: false,
              error: result.error
            }
          }));
          
          toast.error(`Error processing ${documentLabels[currentType]}: ${result.error}`);
        } else {
          // Update document with analysis results
          setDocuments(prev => ({
            ...prev,
            [currentType]: {
              ...prev[currentType],
              processing: false,
              processed: true,
              error: null,
              analysisResult: result.analysisResult,
              eligibilityScore: result.eligibilityScore,
              eligibilityFeedback: result.eligibilityFeedback
            }
          }));
          
          // Add to total score if available
          if (result.eligibilityScore !== null) {
            totalEligibilityScore += result.eligibilityScore;
            documentsWithScore++;
          }
          
          toast.success(`${documentLabels[currentType]} processed successfully.`);
        }
      } catch (error) {
        // Handle unexpected error
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        setDocuments(prev => ({
          ...prev,
          [currentType]: {
            ...prev[currentType],
            processing: false,
            processed: false,
            error: errorMessage
          }
        }));
        
        toast.error(`Error processing ${documentLabels[currentType]}: ${errorMessage}`);
      }
      
      // Move to next document
      currentDocIndex++;
      setProcessingProgress(Math.round((currentDocIndex / documentTypes.length) * 100));
      
      // Process next document
      processNextDocument();
    };
    
    // Start processing documents
    processNextDocument();
  };

  return {
    documents,
    documentLabels,
    processing,
    processingProgress,
    allDocumentsUploaded,
    handleFileChange,
    handleDeleteDocument,
    processDocuments,
  };
}
