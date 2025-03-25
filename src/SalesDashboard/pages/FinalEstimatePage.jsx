import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { getClientByPhone } from '../../api/sales/client/getClientByPhone';
import { submitFinalEstimate } from '../../api/sales/client/submitFinalEstimate';
import EstimatePdfGenerator from '../components/EstimatePdfGenerator';

const FinalEstimatePage = () => {
  // State for search functionality
  const [searchParams, setSearchParams] = useState({
    clientName: '',
    clientPhone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  
  // Client and project data state
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Estimate data state
  const [estimateData, setEstimateData] = useState({
    areas: [],
    transportations: [],
    labourData: {
      sheetingLabour: { localWorkers: 0, siteWorkers: 0 },
      weldingLabour: { localWorkers: 0, siteWorkers: 0 },
      transportationLabour: 0,
      enquiryExpense: 0,
      foodAndAccommodation: 0
    },
    cranePrice: 0,
    otherExpenses: 0,
    sellingRate: 0
  });
  
  // PDF preview state
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  // Search and client selection
  const searchClients = async () => {
    setIsLoading(true);
    try {
      const response = await getClientByPhone(searchParams.clientName, searchParams.clientPhone);
      setClients(response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectClient = (client) => {
    // Set selected client
    setSelectedClient(client);

    // Populate estimate data from client
    setEstimateData({
      clientId: client.clientId._id,
      siteVisitorId: client.siteVisitorId._id,
      status: "Quotation Provided",
      areas: client.sheetingPrice.map(area => ({
        span: area.span,
        length: area.length,
        height: area.height,
        projectType: area.projectType._id,
        roofModel: area.roofModel._id,
        roofPreference: area.roofPreference,
        typeOfPanel: area.typeOfPanel,
        offset: area.offset,
        sheetThickness: area.sheetThickness,
        noOfBay: area.noOfBay,
        noOfWorkingDays: area.NoofWorkingDays || 0,
        extraPanel: area.extraPanel || 0,
        materialItems: area.materialCharge?.materials?.map(material => ({
          itemId: material.itemId,
          unit: material.unit
        })) || []
      })),
      transportations: client.transportations[0]?.transportationslist?.map(transport => ({
        vehicleType: transport.vehicleType,
        totalKilometer: transport.totalKilometer,
        numberOfTrips: transport.numberOfTrips
      })) || [],
      labourData: {
        sheetingLabour: {
          localWorkers: client.labourCharge?.sheetingLabour?.localWork || 0,
          siteWorkers: client.labourCharge?.sheetingLabour?.siteWork || 0
        },
        weldingLabour: {
          localWorkers: client.labourCharge?.weldingLabour?.localWork || 0,
          siteWorkers: client.labourCharge?.weldingLabour?.siteWork || 0
        },
        transportationLabour: client.labourCharge?.transportationLabour || 0,
        enquiryExpense: client.labourCharge?.enquiryExpense || 0,
        foodAndAccommodation: client.labourCharge?.foodAndAccommodation || 0
      },
      cranePrice: client.transportations[0]?.cranePrice || 0,
      otherExpenses: client.transportations[0]?.otherExpenses || 0,
      sellingRate: client.sellingRate || 0
    });

    // Clear search results
    setClients([]);
  };

  // Submit final estimate
  const handleSubmitEstimate = async () => {
    if (!selectedClient) {
      alert("Please select a client first.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await submitFinalEstimate(estimateData);
      console.log("Estimate submitted successfully", response);
      alert("Final estimate submitted successfully!");
    } catch (error) {
      console.error("Error submitting estimate:", error);
      alert("Error submitting estimate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // PDF preview handlers
  const handleShowPdfPreview = () => {
    setShowPdfPreview(true);
  };

  const handleClosePdfPreview = (wasDownloaded = false) => {
    setShowPdfPreview(false);
    if (wasDownloaded) {
      console.log('PDF was downloaded successfully');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          {/* Client Search Section */}
          <div className="p-4 mb-6 bg-white rounded shadow-sm">
            <h3 className="mb-4 font-medium">Find Client</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-sm">Client Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter client name"
                  name="clientName"
                  value={searchParams.clientName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Client Phone</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="+91 *********"
                  name="clientPhone"
                  value={searchParams.clientPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="px-4 py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
                  onClick={searchClients}
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Find Client"}
                </button>
              </div>
            </div>

            {/* Selected Client Info */}
            {selectedClient && (
              <div className="p-3 mt-4 border border-blue-200 rounded bg-blue-50">
                <h4 className="font-medium text-blue-700">Selected Client</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{selectedClient.clientId?.name}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium">{selectedClient.clientId?.phoneNo}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Client Search Results */}
            {clients.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Search Results</h4>
                <div className="overflow-y-auto bg-white border rounded max-h-60">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Project</th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clients.map((client, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{client.clientId?.name || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{client.clientId?.phoneNo || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {client.sheetingPrice?.[0]?.projectType?.projectType || '-'}
                          </td>
                          <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap">
                            <button
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => selectClient(client)}
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Form Content - Only show when client is selected */}
          {selectedClient && (
            <>
              {/* Project Details Section */}
              <div className="p-4 mb-6 bg-white rounded shadow-sm">
                <h2 className="mb-4 text-lg font-medium">Project Details</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm">Client Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={selectedClient?.clientId?.name || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Client Address</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={selectedClient ? `${selectedClient.clientId?.place || ""}, ${selectedClient.clientId?.district || ""}` : ""}
                      readOnly
                    />
                  </div>
                </div>

                {/* Areas Section */}
                <div className="p-4 mt-4 rounded bg-gray-50">
                  <h3 className="mb-4 font-medium">Project Areas</h3>
                  {selectedClient.sheetingPrice.map((area, index) => (
                    <div key={index} className="p-3 mb-3 bg-white border rounded">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block mb-1 text-sm">Span</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={`${area.span || 0} m`}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Length</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={`${area.length || 0} m`}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Height</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={`${area.height || 0} m`}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <label className="block mb-1 text-sm">Project Type</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.projectType?.projectType || "-"}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Roof Model</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.roofModel?.roofModel || "-"}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Sheet Thickness</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={`${area.sheetThickness || 0} mm`}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="grid grid-cols-3 gap-4 p-3 mt-3 bg-gray-200 rounded">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Total Area (sqft)</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-white border rounded"
                        value={selectedClient?.totalAreaSqFt || "0"}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Sheeting Cost</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-white border rounded"
                        value={`₹${(selectedClient?.totalSheetingCost || 0).toFixed(2)}`}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Material Cost</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-white border rounded"
                        value={`₹${(selectedClient?.totalmaterialCharge || 0).toFixed(2)}`}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Details */}
              <div className="p-4 mb-6 bg-white rounded shadow-sm">
                <h3 className="mb-4 font-medium">Transportation Details</h3>
                {selectedClient.transportations[0]?.transportationslist?.map((transport, index) => (
                  <div key={index} className="p-3 mb-3 border rounded bg-gray-50">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-1 text-sm">Vehicle Type</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-100 border rounded"
                          value={transport.vehicleType || "-"}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Total Kilometer</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-100 border rounded"
                          value={`${transport.totalKilometer || 0} km`}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Number of Trips</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-100 border rounded"
                          value={transport.numberOfTrips || 0}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="grid grid-cols-3 gap-4 p-3 rounded bg-green-50">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Crane Price</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-white border rounded"
                      value={`₹${(selectedClient.transportations[0]?.cranePrice || 0).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Other Expenses</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-white border rounded"
                      value={`₹${(selectedClient.transportations[0]?.otherExpenses || 0).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Total Transportation</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-white border rounded"
                      value={`₹${(selectedClient.transportations[0]?.totalTransporation || 0).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Labour Details */}
              <div className="p-4 mb-6 bg-white rounded shadow-sm">
                <h3 className="mb-4 font-medium">Labour Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-gray-50">
                    <h4 className="mb-3 text-sm font-medium">Sheeting Labour</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 text-sm">Local Workers</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-100 border rounded"
                          value={selectedClient.labourCharge?.sheetingLabour?.localWork || 0}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Site Workers</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-100 border rounded"
                          value={selectedClient.labourCharge?.sheetingLabour?.siteWork || 0}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded bg-gray-50">
                    <h4 className="mb-3 text-sm font-medium">Welding Labour</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 text-sm">Local Workers</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-100 border rounded"
                          value={selectedClient.labourCharge?.weldingLabour?.localWork || 0}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Site Workers</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-gray-100 border rounded"
                          value={selectedClient.labourCharge?.weldingLabour?.siteWork || 0}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 p-3 mt-4 rounded bg-green-50">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Transportation Labour</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-white border rounded"
                      value={`₹${(selectedClient.labourCharge?.transportationLabour || 0).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Enquiry Expense</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-white border rounded"
                      value={`₹${(selectedClient.labourCharge?.enquiryExpense || 0).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Food & Accommodation</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-white border rounded"
                      value={`₹${(selectedClient.labourCharge?.foodAndAccommodation || 0).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Final Summary */}
              <div className="p-4 mb-6 bg-white rounded shadow-sm">
                <h3 className="mb-4 font-medium">Final Summary</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Material Cost</label>
                      <span className="font-medium">₹{(selectedClient?.totalmaterialCharge || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Total Labour Charge</label>
                      <span className="font-medium">₹{(selectedClient.labourCharge?.totalLabourCharge || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Transportation Cost</label>
                      <span className="font-medium">₹{(selectedClient.transportations[0]?.totalTransporation || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Margin Amount</label>
                      <span className="font-medium">₹{(selectedClient?.marginAmount || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 mt-4 border border-yellow-300 rounded bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-yellow-800">Total Estimate</h3>
                    <span className="text-xl font-bold text-yellow-800">
                      ₹{(selectedClient?.totalBudget || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mb-6">
                <button
                  className="px-5 py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
                  onClick={handleShowPdfPreview}
                >
                  Generate PDF
                </button>
                <button
                  className="px-5 py-2 text-white transition duration-200 bg-green-600 rounded hover:bg-green-700"
                  onClick={handleSubmitEstimate}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Final Estimate"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPdfPreview && selectedClient && (
        <EstimatePdfGenerator
          client={selectedClient}
          onClose={handleClosePdfPreview}
        />
      )}
    </div>
  );
};

export default FinalEstimatePage;