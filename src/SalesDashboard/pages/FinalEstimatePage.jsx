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
  const [projectDetails, setProjectDetails] = useState({
    projectNumber: '',
    place: '',
    district: '',
    projectName: '',
    quotationNumber: '',
    sheetThickness: '',
    sheetProfile: '',
    color: '',
    notes: ''
  });
  
  // Cost and details state
  const [laborCosts, setLaborCosts] = useState({
    sheetingLabour: {
      localWorkers: 0,
      siteWorkers: 0,
      totalCost: 0
    },
    weldingLabour: {
      localWorkers: 0,
      siteWorkers: 0,
      totalCost: 0,
      consumables: 0
    },
    transportationLabour: 0,
    enquiryExpense: 0,
    foodAndAccommodation: 0
  });
  
  const [transportationDetails, setTransportationDetails] = useState({
    vehicleType: '',
    totalKilometer: 0,
    numberOfTrips: 0,
    price: 0,
    cranePrice: 0,
    otherExpenses: 0
  });
  
  const [marginOverhead, setMarginOverhead] = useState(0);
  
  // PDF preview state
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectDetailsChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleLaborCostChange = (category, field, value) => {
    setLaborCosts(prev => {
      // Create a deep copy to avoid modifying nested objects directly
      const updatedCosts = JSON.parse(JSON.stringify(prev));
      
      if (field) {
        // For nested fields (e.g., weldingLabour.localWorkers)
        updatedCosts[category][field] = parseFloat(value) || 0;
        
        // Calculate totals for worker costs
        if (category === 'weldingLabour' && (field === 'localWorkers' || field === 'siteWorkers')) {
          updatedCosts.weldingLabour.totalCost = 
            (updatedCosts.weldingLabour.localWorkers * 1000) + 
            (updatedCosts.weldingLabour.siteWorkers * 1200);
        } else if (category === 'sheetingLabour' && (field === 'localWorkers' || field === 'siteWorkers')) {
          updatedCosts.sheetingLabour.totalCost = 
            (updatedCosts.sheetingLabour.localWorkers * 800) + 
            (updatedCosts.sheetingLabour.siteWorkers * 1000);
        }
      } else {
        // For direct properties
        updatedCosts[category] = parseFloat(value) || 0;
      }
      
      return updatedCosts;
    });
  };

  const handleTransportationChange = (field, value) => {
    setTransportationDetails(prev => ({
      ...prev,
      [field]: field === 'vehicleType' ? value : parseFloat(value) || 0
    }));
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
    // Clear previous client data completely
    resetForm();
    
    // Set new client data
    setSelectedClient(client);

    // Populate project details from client data
    setProjectDetails({
      projectNumber: client.clientId?._id?.slice(-10) || '',
      place: client.clientId?.place || '',
      district: client.clientId?.district || '',
      projectName: client.sheetingPrice?.[0]?.projectType?.projectType || '',
      quotationNumber: '',
      sheetThickness: client.sheetingPrice?.[0]?.sheetThickness || '',
      sheetProfile: client.sheetingPrice?.[0]?.finalNewlength ? `${client.sheetingPrice[0].finalNewlength}mm` : '',
      color: '',
      notes: client.clientId?.comments || ''
    });

    // Populate labor costs if available
    if (client.labourCharge) {
      setLaborCosts({
        sheetingLabour: {
          localWorkers: client.labourCharge.sheetingLabour?.localWork || 0,
          siteWorkers: client.labourCharge.sheetingLabour?.siteWork || 0,
          totalCost: client.labourCharge.sheetingLabour?.totalCost || 0
        },
        weldingLabour: {
          localWorkers: client.labourCharge.weldingLabour?.localWork || 0,
          siteWorkers: client.labourCharge.weldingLabour?.siteWork || 0,
          totalCost: client.labourCharge.weldingLabour?.totalCost || 0,
          consumables: client.labourCharge.weldingLabour?.consumables || 0
        },
        transportationLabour: client.labourCharge.transportationLabour || 0,
        enquiryExpense: client.labourCharge.enquiryExpense || 0,
        foodAndAccommodation: client.labourCharge.foodAndAccommodation || 0
      });
    }

    // Populate transportation details if available
    if (client.transportations && client.transportations.length > 0) {
      setTransportationDetails({
        vehicleType: client.transportations[0].vehicleType || '',
        totalKilometer: client.transportations[0].totalKilometer || 0,
        numberOfTrips: client.transportations[0].numberOfTrips || 0,
        price: client.transportations[0].price || 0,
        cranePrice: client.transportations[0].cranePrice || 0,
        otherExpenses: client.transportations[0].otherExpenses || 0
      });
    }

    // Set margin overhead if available
    setMarginOverhead(client.marginAmount || 0);

    // Clear search results
    setClients([]);
  };

  // Reset form to clear previous client data
  const resetForm = () => {
    setSelectedClient(null);
    setProjectDetails({
      projectNumber: '',
      place: '',
      district: '',
      projectName: '',
      quotationNumber: '',
      sheetThickness: '',
      sheetProfile: '',
      color: '',
      notes: ''
    });
    setLaborCosts({
      sheetingLabour: { localWorkers: 0, siteWorkers: 0, totalCost: 0 },
      weldingLabour: { localWorkers: 0, siteWorkers: 0, totalCost: 0, consumables: 0 },
      transportationLabour: 0,
      enquiryExpense: 0,
      foodAndAccommodation: 0
    });
    setTransportationDetails({
      vehicleType: '',
      totalKilometer: 0,
      numberOfTrips: 0,
      price: 0,
      cranePrice: 0,
      otherExpenses: 0
    });
    setMarginOverhead(0);
  };

  // Calculate totals
  const calculateTotalLabor = () => {
    if (!selectedClient) return 0;
    
    const weldingLabor = laborCosts.weldingLabour.totalCost || 0;
    const sheetingLabor = laborCosts.sheetingLabour.totalCost || 0;
    const transportationLabor = laborCosts.transportationLabour || 0;
    const enquiryExpense = laborCosts.enquiryExpense || 0;
    const foodAndAccommodation = laborCosts.foodAndAccommodation || 0;

    return weldingLabor + sheetingLabor + transportationLabor + enquiryExpense + foodAndAccommodation;
  };

  const calculateTotalTransportation = () => {
    return (
      transportationDetails.price + 
      transportationDetails.cranePrice + 
      transportationDetails.otherExpenses
    );
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

  // For viewing quotation - implement as needed
  const handleViewQuotation = () => {
    console.log("View quotation clicked");
    // Implement quotation view functionality
  };

  // Submit final estimate
  const handleSubmitEstimate = async () => {
    if (!selectedClient) {
      alert("Please select a client first.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Prepare data for submission
      const finalEstimateData = {
        clientId: selectedClient.clientId._id,
        projectDetails: projectDetails,
        laborCosts: {
          sheetingLabour: {
            localWork: laborCosts.sheetingLabour.localWorkers,
            siteWork: laborCosts.sheetingLabour.siteWorkers,
            totalCost: laborCosts.sheetingLabour.totalCost
          },
          weldingLabour: {
            localWork: laborCosts.weldingLabour.localWorkers,
            siteWork: laborCosts.weldingLabour.siteWorkers,
            totalCost: laborCosts.weldingLabour.totalCost,
            consumables: laborCosts.weldingLabour.consumables
          },
          transportationLabour: laborCosts.transportationLabour,
          enquiryExpense: laborCosts.enquiryExpense,
          foodAndAccommodation: laborCosts.foodAndAccommodation,
          totalLabourCharge: calculateTotalLabor()
        },
        transportationDetails: transportationDetails,
        marginOverhead: marginOverhead,
        totalEstimate: selectedClient.totalEstimate || 0,
      };

      // Call the API to submit final estimate
      const response = await submitFinalEstimate(finalEstimateData);
      console.log("Estimate submitted successfully", response);
      alert("Final estimate submitted successfully!");
    } catch (error) {
      console.error("Error submitting estimate:", error);
      alert("Error submitting estimate. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                {selectedClient && (
                  <button
                    className="px-4 py-2 ml-2 text-white transition duration-200 bg-gray-500 rounded hover:bg-gray-600"
                    onClick={resetForm}
                  >
                    Clear Selection
                  </button>
                )}
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
              {/* Project Details */}
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

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm">Project Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      name="projectName"
                      value={projectDetails.projectName}
                      onChange={handleProjectDetailsChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Quotation Number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      name="quotationNumber"
                      value={projectDetails.quotationNumber}
                      onChange={handleProjectDetailsChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm">Thickness</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      name="sheetThickness"
                      value={projectDetails.sheetThickness}
                      onChange={handleProjectDetailsChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Sheet Profile</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      name="sheetProfile"
                      value={projectDetails.sheetProfile}
                      onChange={handleProjectDetailsChange}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Color</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      name="color"
                      value={projectDetails.color}
                      onChange={handleProjectDetailsChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm">Notes</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    name="notes"
                    value={projectDetails.notes}
                    onChange={handleProjectDetailsChange}
                  ></textarea>
                </div>
              </div>

              {/* Areas Section */}
              {selectedClient?.sheetingPrice && selectedClient.sheetingPrice.length > 0 && (
                <div className="p-4 mb-6 bg-white rounded shadow-sm">
                  <h3 className="mb-4 font-medium">Areas</h3>

                  {selectedClient.sheetingPrice.map((area, index) => (
                    <div key={index} className="p-3 mb-4 border rounded bg-gray-50">
                      <h4 className="mb-2 font-medium">Area {index + 1}</h4>
                      <div className="grid grid-cols-3 gap-4 mb-2">
                        <div>
                          <label className="block mb-1 text-sm">Span</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.span ? `${area.span}m` : "0m"}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Length</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.length ? `${area.length}m` : "0m"}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Height</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.height ? `${area.height}m` : "0m"}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block mb-1 text-sm">Roof Type</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.roofModel?.roofModel || ""}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Project Type</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.projectType?.projectType || ""}
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm">Sheet Thickness</label>
                          <input
                            type="text"
                            className="w-full p-2 bg-gray-100 border rounded"
                            value={area.sheetThickness || "0"}
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
                        value={selectedClient?.totalSheetingCost ? `₹${selectedClient.totalSheetingCost.toFixed(2)}` : "₹0.00"}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Material Cost</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-white border rounded"
                        value={selectedClient?.totalmaterialCharge ? `₹${selectedClient.totalmaterialCharge.toFixed(2)}` : "₹0.00"}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Labour Cost Section */}
              <div className="p-4 mb-6 bg-white rounded shadow-sm">
                <h3 className="mb-4 font-medium">Labour Cost</h3>

                {/* Welding Labour */}
                <div className="p-3 mb-4 border rounded bg-gray-50">
                  <h4 className="mb-2 text-sm font-medium">Welding Labour</h4>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block mb-1 text-sm">Local Workers</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0"
                        value={laborCosts.weldingLabour.localWorkers}
                        onChange={(e) => handleLaborCostChange('weldingLabour', 'localWorkers', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">Site Workers</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0"
                        value={laborCosts.weldingLabour.siteWorkers}
                        onChange={(e) => handleLaborCostChange('weldingLabour', 'siteWorkers', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 text-sm">Consumables</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0"
                        value={laborCosts.weldingLabour.consumables}
                        onChange={(e) => handleLaborCostChange('weldingLabour', 'consumables', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-1 text-sm">Total Welding Cost</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-100 border rounded"
                        value={`₹${laborCosts.weldingLabour.totalCost.toFixed(2)}`}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Sheeting Labour */}
                <div className="p-3 mb-4 border rounded bg-gray-50">
                  <h4 className="mb-2 text-sm font-medium">Sheeting Labour</h4>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block mb-1 text-sm">Local Workers</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0"
                        value={laborCosts.sheetingLabour.localWorkers}
                        onChange={(e) => handleLaborCostChange('sheetingLabour', 'localWorkers', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">Site Workers</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="0"
                        value={laborCosts.sheetingLabour.siteWorkers}
                        onChange={(e) => handleLaborCostChange('sheetingLabour', 'siteWorkers', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm">Total Sheeting Cost</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-100 border rounded"
                      value={`₹${laborCosts.sheetingLabour.totalCost.toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>

                {/* Other Labour Costs */}
                <div className="p-3 mb-4 border rounded bg-gray-50">
                  <h4 className="mb-2 text-sm font-medium">Other Labour Costs</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 text-sm">Transportation Labour</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="₹0.00"
                        value={laborCosts.transportationLabour}
                        onChange={(e) => handleLaborCostChange('transportationLabour', null, e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">Food & Accommodation</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="₹0.00"
                        value={laborCosts.foodAndAccommodation}
                        onChange={(e) => handleLaborCostChange('foodAndAccommodation', null, e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">Enquiry Expense</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        placeholder="₹0.00"
                        value={laborCosts.enquiryExpense}
                        onChange={(e) => handleLaborCostChange('enquiryExpense', null, e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Total Labour Cost */}
                <div className="p-3 border border-blue-200 rounded bg-blue-50">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-blue-800">Total Labour Cost</label>
                    <span className="text-lg font-bold text-blue-800">₹{calculateTotalLabor().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Transportation Section */}
              <div className="p-4 mb-6 bg-white rounded shadow-sm">
                <h3 className="mb-4 font-medium">Transportation Details</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm">Vehicle Type</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={transportationDetails.vehicleType}
                      onChange={(e) => handleTransportationChange('vehicleType', e.target.value)}
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="Small Truck">Small Truck</option>
                      <option value="Medium Truck">Medium Truck</option>
                      <option value="Large Truck">Large Truck</option>
                      <option value="Tempo">Tempo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Total Kilometer</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      placeholder="0"
                      value={transportationDetails.totalKilometer}
                      onChange={(e) => handleTransportationChange('totalKilometer', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Number of Trips</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      placeholder="0"
                      value={transportationDetails.numberOfTrips}
                      onChange={(e) => handleTransportationChange('numberOfTrips', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm">Transportation Price</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      placeholder="₹0.00"
                      value={transportationDetails.price}
                      onChange={(e) => handleTransportationChange('price', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Crane Price</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      placeholder="₹0.00"
                      value={transportationDetails.cranePrice}
                      onChange={(e) => handleTransportationChange('cranePrice', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Other Expenses</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded"
                      placeholder="₹0.00"
                      value={transportationDetails.otherExpenses}
                      onChange={(e) => handleTransportationChange('otherExpenses', e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-3 border border-green-200 rounded bg-green-50">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-green-800">Total Transportation Cost</label>
                    <span className="text-lg font-bold text-green-800">₹{calculateTotalTransportation().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Profit Margin & Overhead */}
              <div className="p-4 mb-6 bg-white rounded shadow-sm">
                <h3 className="mb-4 font-medium">Profit Margin & Overhead</h3>
                <div className="mb-4">
                  <label className="block mb-1 text-sm">Margin Amount</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    placeholder="₹0.00"
                    value={marginOverhead}
                    onChange={(e) => setMarginOverhead(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="p-3 border border-purple-200 rounded bg-purple-50">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-purple-800">Margin & Overhead</label>
                    <span className="text-lg font-bold text-purple-800">₹{marginOverhead.toFixed(2)}</span>
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
                      <label className="text-sm">Labour Cost</label>
                      <span className="font-medium">₹{calculateTotalLabor().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Transportation Cost</label>
                      <span className="font-medium">₹{calculateTotalTransportation().toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Margin & Overhead</label>
                      <span className="font-medium">₹{marginOverhead.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 mt-4 border border-yellow-300 rounded bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-yellow-800">Total Estimate</h3>
                    <span className="text-xl font-bold text-yellow-800">
                      ₹{((selectedClient?.totalmaterialCharge || 0) + calculateTotalLabor() + calculateTotalTransportation() + marginOverhead).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mb-6">
                <button
                  className="px-5 py-2 text-white transition duration-200 bg-gray-600 rounded hover:bg-gray-700"
                  onClick={handleViewQuotation}
                >
                  View Quotation
                </button>
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
          projectDetails={projectDetails}
          laborCosts={{
            ...laborCosts,
            totalLaborCost: calculateTotalLabor()
          }}
          transportationDetails={{
            ...transportationDetails,
            totalTransportationCost: calculateTotalTransportation()
          }}
          marginOverhead={marginOverhead}
          totalEstimate={(selectedClient?.totalmaterialCharge || 0) + calculateTotalLabor() + calculateTotalTransportation() + marginOverhead}
          onClose={handleClosePdfPreview}
        />
      )}
    </div>
  );
};

export default FinalEstimatePage;