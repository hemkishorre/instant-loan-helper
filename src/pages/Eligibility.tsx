
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocumentUploader from '@/components/eligibility/DocumentUploader';
import ProcessingStatus from '@/components/eligibility/ProcessingStatus';
import SecurityNotice from '@/components/eligibility/SecurityNotice';
import { useDocumentProcessing } from '@/hooks/useDocumentProcessing';

const Eligibility = () => {
  const {
    documents,
    documentLabels,
    processing,
    processingProgress,
    allDocumentsUploaded,
    handleFileChange,
    handleDeleteDocument,
    processDocuments,
  } = useDocumentProcessing();
  
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
              const type = key as 'aadhar' | 'pan' | 'salarySlip';
              
              return (
                <DocumentUploader
                  key={type}
                  type={type}
                  label={documentLabels[type]}
                  document={document}
                  onFileChange={handleFileChange}
                  onDeleteDocument={handleDeleteDocument}
                />
              );
            })}
          </div>
          
          {processing ? (
            <ProcessingStatus progress={processingProgress} />
          ) : (
            <div className="flex justify-center">
              <Button
                className="bg-loan-blue hover:bg-loan-darkBlue px-8 py-6 text-lg"
                disabled={!allDocumentsUploaded}
                onClick={processDocuments}
              >
                Check Eligibility
              </Button>
            </div>
          )}
          
          <SecurityNotice />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Eligibility;
