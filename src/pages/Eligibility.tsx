
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  FileText, 
  Upload, 
  Check, 
  AlertCircle, 
  Trash2 
} from 'lucide-react';

type DocumentType = 'aadhar' | 'pan' | 'salarySlip';

interface Document {
  type: DocumentType;
  file: File | null;
  preview: string | null;
  uploaded: boolean;
  processing: boolean;
  processed: boolean;
  error: string | null;
}

const Eligibility = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  
  const documentLabels: Record<DocumentType, string> = {
    aadhar: 'Aadhar Card',
    pan: 'PAN Card',
    salarySlip: 'Salary Slip'
  };
  
  const allDocumentsUploaded = Object.values(documents).every(doc => doc.uploaded);
  
  const handleFileChange = (type: DocumentType, file: File | null) => {
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive",
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
        error: null
      }
    }));
    
    toast({
      title: "Document uploaded",
      description: `${documentLabels[type]} has been uploaded successfully.`,
      variant: "default",
    });
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, type: DocumentType) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(type, e.dataTransfer.files[0]);
    }
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
        error: null
      }
    }));
    
    toast({
      title: "Document removed",
      description: `${documentLabels[type]} has been removed.`,
      variant: "default",
    });
  };
  
  const simulateProcessing = () => {
    setProcessing(true);
    setProcessingProgress(0);
    
    // Simulating documents OCR processing one by one
    const documentTypes: DocumentType[] = ['aadhar', 'pan', 'salarySlip'];
    let currentDocIndex = 0;
    
    const processNextDocument = () => {
      if (currentDocIndex >= documentTypes.length) {
        // All documents processed, navigate to results
        setTimeout(() => {
          navigate('/eligibility-results');
        }, 1000);
        return;
      }
      
      const currentType = documentTypes[currentDocIndex];
      
      // Mark current document as processing
      setDocuments(prev => ({
        ...prev,
        [currentType]: {
          ...prev[currentType],
          processing: true,
          processed: false
        }
      }));
      
      // Simulate OCR processing
      setTimeout(() => {
        // Mark document as processed
        setDocuments(prev => ({
          ...prev,
          [currentType]: {
            ...prev[currentType],
            processing: false,
            processed: true
          }
        }));
        
        currentDocIndex++;
        setProcessingProgress(Math.round((currentDocIndex / documentTypes.length) * 100));
        
        // Process next document
        processNextDocument();
      }, 1500);
    };
    
    // Start processing documents
    processNextDocument();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-3xl font-bold text-loan-darkBlue mb-4">Check Your Loan Eligibility</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Upload your documents below to check your eligibility for our loan products.
              We'll process your information securely and provide instant results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(documents).map(([key, document]) => {
              const type = key as DocumentType;
              
              return (
                <Card 
                  key={type} 
                  className={`overflow-hidden ${document.uploaded ? 'border-loan-blue border-2' : 'border-dashed'}`}
                >
                  <CardContent className="p-0">
                    {!document.uploaded ? (
                      <div 
                        className="document-upload-area p-6 flex flex-col items-center justify-center h-64 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, type)}
                        onClick={() => document.file === null && document.preview === null && document.uploaded === false && document.processed === false && document.processing === false && document.error === null ? 
                          document.file || document.processing ? 
                            undefined : 
                            document.preview ? 
                              document.preview : 
                              document.uploaded === false && document.processed === false && document.processing === false && document.error === null ?
                                document.file || document.processing ?
                                  undefined :
                                  document.preview ?
                                    document.preview :
                                    document.uploaded === false && document.processed === false && document.processing === false && document.error === null ? document.file || document.processing ? undefined : document.preview ? document.preview : document.uploaded === false && document.processed === false && document.processing === false && document.error === null ? undefined : undefined : undefined : undefined : undefined
                        }
                      >
                        <div className="mb-4 bg-loan-lightGray p-3 rounded-full">
                          <Upload className="h-8 w-8 text-loan-blue" />
                        </div>
                        <h3 className="text-lg font-semibold text-loan-darkBlue mb-2">
                          {documentLabels[type]}
                        </h3>
                        <p className="text-sm text-gray-500 text-center mb-4">
                          Drag and drop your {documentLabels[type]} here, or click to browse files
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
                            onChange={(e) => handleFileChange(type, e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="relative h-64">
                        {document.preview && (
                          <img 
                            src={document.preview} 
                            alt={documentLabels[type]} 
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
                          <h3 className="text-lg font-semibold mb-1">{documentLabels[type]}</h3>
                          <p className="text-sm mb-3 text-center">
                            {document.processing ? 'Processing...' : document.processed ? 'Processed successfully' : 'Uploaded successfully'}
                          </p>
                          {!document.processing && !document.processed && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteDocument(type)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {processing ? (
            <div className="bg-white rounded-lg p-6 shadow-md animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-loan-darkBlue">Processing Documents</h3>
                <span className="text-sm font-medium text-loan-blue">{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="h-2 mb-4" />
              <p className="text-sm text-gray-600">
                Please wait while we process your documents and check your eligibility.
                This might take a few moments.
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                className="bg-loan-blue hover:bg-loan-darkBlue px-8 py-6 text-lg"
                disabled={!allDocumentsUploaded}
                onClick={simulateProcessing}
              >
                Check Eligibility
              </Button>
            </div>
          )}
          
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <AlertCircle className="h-5 w-5 text-loan-blue" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-loan-darkBlue mb-1">Document Security</h4>
              <p className="text-sm text-gray-600">
                All uploaded documents are encrypted and will be automatically deleted after processing.
                We do not store any of your personal documents on our servers for security reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Eligibility;
