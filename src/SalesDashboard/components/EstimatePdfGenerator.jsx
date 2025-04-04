/* eslint-disable react/prop-types */
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

const EstimatePdfGenerator = ({ client, onClose }) => {
  const pdfRef = React.useRef(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  // Transform client data to match the existing estimateData structure
  const estimateData = React.useMemo(() => {
    if (!client) return null;
    
    return {
      clientId: client.clientId,
      status: "Quotation Provided",
      sheetingPrice: client.sheetingPrice,
      totalAreaSqFt: client.totalAreaSqFt,
      totalSheetingCost: client.totalSheetingCost,
      totalmaterialCharge: client.totalmaterialCharge,
      transportations: client.transportations,
      labourCharge: client.labourCharge,
      marginAmount: client.marginAmount,
      totalProjectExpense: client.totalProjectExpense,
      marginPercentage: client.marginPercentage,
      newProjectValue: client.newProjectValue,
      taxPercentage: client.taxPercentage,
      taxAmount: client.taxAmount,
      totalBudget: client.totalBudget,
      finalRate: client.finalRate,
      ratePerSqFt: client.ratePerSqFt
    };
  }, [client]);
  
  const generatePDF = async () => {
    if (!estimateData) return;
    
    setIsGenerating(true);
    
    try {
      const content = pdfRef.current;
      const canvas = await html2canvas(content, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // A4 dimensions
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if content overflows
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Generate filename with client name and date
      const clientName = estimateData?.clientId?.name || 'Client';
      const sanitizedClientName = clientName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const date = format(new Date(), 'yyyy-MM-dd');
      const filename = `${sanitizedClientName}_estimate_${date}.pdf`;
      
      pdf.save(filename);
      
      // Optional: Return to parent component
      if (onClose) onClose(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (!estimateData) {
    return <div>No estimate data available</div>;
  }
  
  // Format currency
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount || 0).toFixed(2)}`;
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-2xl">
        {/* Controls */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-lg font-bold">Estimate Preview</h2>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              onClick={generatePDF}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span>Generating...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* PDF Content */}
        <div ref={pdfRef} className="relative p-8 bg-white">
          {/* IROOF Watermark */}
          <div 
            className="absolute z-0 font-extrabold text-gray-400 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none top-96 left-56 opacity-10 text-9xl"
            style={{ transform: 'rotate(-45deg)' }}
          >
            IROOF
          </div>

          {/* Company Header */}
          <div className="relative z-10 mb-8 text-center">
            <h1 className="mb-1 text-2xl font-bold">Project Estimate</h1>
            <p className="text-gray-600">Generated on: {format(new Date(), 'MMMM dd, yyyy')}</p>
          </div>
          
          {/* Client Information */}
          <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="pb-2 mb-3 text-xl font-semibold border-b">Client Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><span className="font-medium">Name:</span> {estimateData.clientId?.name}</p>
                <p className="mb-2"><span className="font-medium">Phone:</span> {estimateData.clientId?.phoneNo}</p>
                <p><span className="font-medium">Place:</span> {estimateData.clientId?.place}</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-medium">District:</span> {estimateData.clientId?.district}</p>
                <p className="mb-2"><span className="font-medium">Comments:</span> {estimateData.clientId?.comments}</p>
                <p><span className="font-medium">Status:</span> {estimateData.status}</p>
              </div>
            </div>
          </div>
          
          {/* Project Details */}
          <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="pb-2 mb-3 text-xl font-semibold border-b">Project Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><span className="font-medium">Project Type:</span> {estimateData.sheetingPrice?.[0]?.projectType?.projectType}</p>
                <p className="mb-2"><span className="font-medium">Roof Model:</span> {estimateData.sheetingPrice?.[0]?.roofModel?.roofModel}</p>
                <p><span className="font-medium">Roof Preference:</span> {estimateData.sheetingPrice?.[0]?.roofPreference}</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-medium">Total Area:</span> {estimateData.totalAreaSqFt} sq ft</p>
                <p className="mb-2"><span className="font-medium">Sheet Thickness:</span> {estimateData.sheetingPrice?.[0]?.sheetThickness} mm</p>
                <p><span className="font-medium">Rate per sq ft:</span> {formatCurrency(estimateData.ratePerSqFt)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p><span className="font-medium">Span:</span> {estimateData.sheetingPrice?.[0]?.span} m</p>
              </div>
              <div>
                <p><span className="font-medium">Length:</span> {estimateData.sheetingPrice?.[0]?.length} m</p>
              </div>
              <div>
                <p><span className="font-medium">Height:</span> {estimateData.sheetingPrice?.[0]?.height} m</p>
              </div>
            </div>
          </div>
          
          {/* Expenses */}
          <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="pb-2 mb-3 text-xl font-semibold border-b">Expenses</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><span className="font-medium">Sheet Material Expense:</span> {formatCurrency(estimateData.totalSheetingCost)}</p>
                <p className="mb-2"><span className="font-medium">Transportation Cost:</span> {formatCurrency(estimateData.transportations?.[0]?.price)}</p>
                <p><span className="font-medium">Labour Charge:</span> {formatCurrency(estimateData.labourCharge?.totalLabourCharge)}</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-medium">Material Charge:</span> {formatCurrency(estimateData.totalmaterialCharge)}</p>
                <p className="mb-2"><span className="font-medium">Additional Expenses:</span> {formatCurrency((estimateData.transportations?.[0]?.cranePrice || 0) + (estimateData.transportations?.[0]?.otherExpenses || 0))}</p>
                <p><span className="font-medium">Margin Amount:</span> {formatCurrency(estimateData.marginAmount)}</p>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="p-4 mb-6 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="pb-2 mb-3 text-xl font-semibold border-b">Estimate Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><span className="font-medium">Total Project Expense:</span> {formatCurrency(estimateData.totalProjectExpense)}</p>
                <p className="mb-2"><span className="font-medium">Margin Percentage:</span> {estimateData.marginPercentage}%</p>
                <p><span className="font-medium">Project Value:</span> {formatCurrency(estimateData.newProjectValue)}</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-medium">Tax Percentage:</span> {estimateData.taxPercentage}%</p>
                <p className="mb-2"><span className="font-medium">Tax Amount:</span> {formatCurrency(estimateData.taxAmount)}</p>
                <p><span className="font-medium">Margin Amount:</span> {formatCurrency(estimateData.marginAmount)}</p>
              </div>
            </div>
            
            <div className="p-4 mt-4 border border-blue-100 rounded-md bg-blue-50">
              <p className="text-lg font-medium text-blue-800">
                Total Budget: 
                <span className="float-right font-bold">{formatCurrency(estimateData.totalBudget)}</span>
              </p>
            </div>
            
            <div className="p-4 mt-4 border border-green-100 rounded-md bg-green-50">
              <p className="text-lg font-medium text-green-800">
                Final Rate: 
                <span className="float-right font-bold">{formatCurrency(estimateData.finalRate)}</span>
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="pt-6 mt-12 text-sm text-center text-gray-600 border-t">
            <p>This is a computer-generated estimate and does not require signature.</p>
            <p>For any queries, please contact our office.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatePdfGenerator;