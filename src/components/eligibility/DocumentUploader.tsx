
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FilePlus2, FileText, X, Check, AlertTriangle, Loader2 } from 'lucide-react';

export interface Document {
  type: string;
  file: File | null;
  preview: string | null;
  uploaded: boolean;
  processing: boolean;
  processed: boolean;
  error: string | null;
  analysisResult?: any;
  eligibilityScore?: number;
  eligibilityFeedback?: string;
}

interface DocumentUploaderProps {
  type: 'aadhar' | 'pan' | 'salarySlip';
  label: string;
  document: Document;
  onFileChange: (type: string, file: File | null) => void;
  onDeleteDocument: (type: string) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  type,
  label,
  document,
  onFileChange,
  onDeleteDocument
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(type, file);
    
    // Reset the file input so the same file can be selected again if needed
    if (e.target.value) {
      e.target.value = '';
    }
  };

  const handleDropAreaClick = () => {
    // Instead of using document.getElementById, use the fileInputRef directly
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="mb-2 flex justify-between items-center">
          <h3 className="text-sm font-medium text-loan-darkBlue">{label}</h3>
          
          {document.uploaded && (
            <button 
              onClick={() => onDeleteDocument(type)} 
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label={`Delete ${label}`}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {!document.uploaded ? (
          <>
            <div 
              onClick={handleDropAreaClick}
              className="border-2 border-dashed border-gray-200 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <FilePlus2 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Click to upload your {label}</p>
              <p className="text-xs text-gray-400">PDF, JPG or PNG (max 5MB)</p>
            </div>
            
            <input 
              id={`file-${type}`}
              ref={fileInputRef}
              type="file" 
              accept=".pdf,.jpg,.jpeg,.png" 
              onChange={handleFileChange}
              className="hidden"
            />
            
            <Button 
              onClick={handleUploadClick} 
              variant="outline" 
              className="w-full mt-2 text-loan-blue border-loan-blue hover:bg-loan-blue hover:text-white"
            >
              Upload {label}
            </Button>
          </>
        ) : (
          <div className="mt-2">
            {document.preview && (
              <div className="relative mb-2 rounded-md overflow-hidden">
                {document.file?.type.includes('image') ? (
                  <img 
                    src={document.preview} 
                    alt={label} 
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <div className="w-full h-24 bg-gray-100 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-loan-blue" />
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {document.processing && (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 text-loan-blue animate-spin" />
                    <span className="text-xs text-loan-blue">Processing...</span>
                  </>
                )}
                
                {document.processed && !document.error && (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-xs text-green-600">Verified</span>
                  </>
                )}
                
                {document.error && (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-xs text-red-500">Error: {document.error}</span>
                  </>
                )}
              </div>
              
              <span className="text-xs text-gray-500">
                {document.file?.name.length && document.file.name.length > 20 
                  ? document.file.name.substring(0, 20) + '...' 
                  : document.file?.name}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
