
import { supabase } from "@/integrations/supabase/client";

export interface DocumentAnalysisResult {
  documentType: string;
  analysisResult: string;
  eligibilityScore: number | null;
  eligibilityFeedback: string | null;
  error?: string;
}

export async function analyzeDocument(
  documentType: 'aadhar' | 'pan' | 'salarySlip',
  file: File
): Promise<DocumentAnalysisResult> {
  try {
    // Convert file to base64
    const base64 = await fileToBase64(file);
    
    // Remove the data URL prefix
    const base64Data = base64.split(',')[1];
    
    // Call the Supabase Edge Function to analyze the document
    const { data, error } = await supabase.functions.invoke('analyze-documents', {
      body: {
        documentType,
        imageBase64: base64Data,
      },
    });
    
    if (error) {
      console.error('Error calling analyze-documents function:', error);
      return {
        documentType,
        analysisResult: '',
        eligibilityScore: null,
        eligibilityFeedback: null,
        error: error.message
      };
    }
    
    return data as DocumentAnalysisResult;
  } catch (error) {
    console.error('Error in analyzeDocument:', error);
    return {
      documentType,
      analysisResult: '',
      eligibilityScore: null,
      eligibilityFeedback: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Helper function to convert File to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
