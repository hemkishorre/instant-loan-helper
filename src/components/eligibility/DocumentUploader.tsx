
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileText, Upload, Check, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

type DocumentType = 'aadhar' | 'pan' | 'salarySlip';

export interface Document {
  type: DocumentType;
  file: File | null;
  preview: string | null;
  uploaded: boolean;
  processing: boolean;
  processed: boolean;
  error: string | null;
  analysisResult?: string;
  eligibilityScore?: number | null;
  eligibilityFeedback?: string | null;
}

interface DocumentUploaderProps {
  type: DocumentType;
  label: string;
  document: Document;
  onFileChange: (type: DocumentType, file: File | null) => void;
  onDeleteDocument: (type: DocumentType) => void;
}

const DocumentUploader = ({
  type,
  label,
  document,
  onFileChange,
  onDeleteDocument
}: DocumentUploaderProps) => {
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileChange(type, e.dataTransfer.files[0]);
    }
  };
  
  const triggerFileInput = () => {
    // Use a ref to get the file input element instead of document.getElementById
    const fileInput = document.querySelector(`#file-${type}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  
  return (
    <Card className={`overflow-hidden ${document.uploaded ? 'border-loan-blue border-2' : 'border-dashed'}`}>
      <CardContent className="p-0">
        {!document.uploaded ? (
          <div 
            className="document-upload-area p-6 flex flex-col items-center justify-center h-64 cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e)}
            onClick={triggerFileInput}
          >
            <div className="mb-4 bg-loan-lightGray p-3 rounded-full">
              <Upload className="h-8 w-8 text-loan-blue" />
            </div>
            <h3 className="text-lg font-semibold text-loan-darkBlue mb-2">
              {label}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Drag and drop your {label} here, or click to browse files
            </p>
            <label htmlFor={`file-${type}`} className="cursor-pointer">
              <Button variant="outline" className="border-loan-blue text-loan-blue">
                Browse Files
              </Button>
              <input
                id={`file-${type}`}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,application/pdf"
                onChange={(e) => onFileChange(type, e.target.files?.[0] || null)}
              />
            </label>
          </div>
        ) : (
          <div className="relative h-64">
            {document.preview && (
              <img 
                src={document.preview} 
                alt={label} 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
              <div className="mb-2">
                {document.processing ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-loan-blue border-white"></div>
                ) : document.processed ? (
                  <div className="bg-green-500 rounded-full p-1">
                    <Check className="h-6 w-6" />
                  </div>
                ) : (
                  <FileText className="h-8 w-8" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-1">{label}</h3>
              <p className="text-sm mb-3 text-center">
                {document.processing ? 'Processing...' : document.processed ? 'Processed successfully' : 'Uploaded successfully'}
              </p>
              
              <div className="flex space-x-2">
                {document.processed && document.analysisResult && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white border-0">
                        <Eye className="h-4 w-4 mr-1" />
                        View Analysis
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Document Analysis - {label}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 max-h-[60vh] overflow-y-auto">
                        <div className="whitespace-pre-line bg-gray-50 p-4 rounded-md text-sm">
                          {document.analysisResult}
                        </div>
                        
                        {document.eligibilityScore !== null && document.eligibilityScore !== undefined && (
                          <div className="mt-4 border-t pt-4">
                            <h4 className="font-semibold mb-2">Eligibility Assessment</h4>
                            <div className="flex items-center mb-2">
                              <span className="text-gray-700 mr-2">Score:</span>
                              <span className="font-bold text-loan-blue">{document.eligibilityScore}/100</span>
                            </div>
                            <Progress value={document.eligibilityScore} className="h-2 mb-2" />
                            <p className="text-sm text-gray-600">{document.eligibilityFeedback}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
                {!document.processing && !document.processed && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteDocument(type)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
