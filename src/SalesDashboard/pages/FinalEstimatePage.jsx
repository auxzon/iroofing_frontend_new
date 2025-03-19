import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { getClientByPhone } from '../../api/sales/client/getClientByPhone';
import { submitFinalEstimate } from '../../api/sales/client/submitFinalEstimate';
import EstimatePdfGenerator from '../components/EstimatePdfGenerator';

const FinalEstimatePage = () => {
  const [clients, setClients] = useState([]);
  const [searchParams, setSearchParams] = useState({
    clientName: '',
    clientPhone: ''
  });
  const [selectedClient, setSelectedClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // Handle PDF preview
  const handleShowPdfPreview = () => {
    setShowPdfPreview(true);
  };
  
  const handleClosePdfPreview = (wasDownloaded = false) => {
    setShowPdfPreview(false);
    if (wasDownloaded) {
      // Optional: Track download event or show success message
      console.log('PDF was downloaded successfully');
    }
  };

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

  // State for editable labor costs
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

  // State for editable transportation details
  const [transportationDetails, setTransportationDetails] = useState({
    vehicleType: '',
    totalKilometer: 0,
    numberOfTrips: 0,
    price: 0,
    cranePrice: 0,
    otherExpenses: 0
  });

  // State for margin/overhead
  const [marginOverhead, setMarginOverhead] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectDetailsChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLaborCostChange = (category, field, value) => {
    setLaborCosts(prev => {
      if (field) {
        // For nested objects like weldingLabour
        const updatedCategory = { ...prev[category] };
        updatedCategory[field] = parseFloat(value) || 0;

        // Only update totalCost if it's weldingLabour and we're changing workers
        if (category === 'weldingLabour' && (field === 'localWorkers' || field === 'siteWorkers')) {
          updatedCategory.totalCost = (updatedCategory.localWorkers * 1000) + (updatedCategory.siteWorkers * 1200);
        }

        return {
          ...prev,
          [category]: updatedCategory
        };
      } else {
        // For direct properties like transportationLabour
        return {
          ...prev,
          [category]: parseFloat(value) || 0
        };
      }
    });
  };

  const handleTransportationChange = (field, value) => {
    setTransportationDetails(prev => ({
      ...prev,
      [field]: field === 'vehicleType' ? value : parseFloat(value) || 0
    }));
  };

  const searchClients = async () => {
    setIsLoading(true);
    try {
      const response = await getClientByPhone(searchParams.clientName, searchParams.clientPhone);
      console.log("clients", response);
      setClients(response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectClient = (client) => {
    setSelectedClient(client);

    // Populate project details from client data
    setProjectDetails({
      projectNumber: client.clientId?._id?.slice(-10) || '',
      place: client.clientId?.place || '',
      district: client.clientId?.district || '',
      projectName: client.sheetingPrice?.[0]?.projectType?.projectType || '',
      quotationNumber: '', // Add if available in client data
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
    } else {
      // Reset labor costs if not available
      setLaborCosts({
        sheetingLabour: { localWorkers: 0, siteWorkers: 0, totalCost: 0 },
        weldingLabour: { localWorkers: 0, siteWorkers: 0, totalCost: 0, consumables: 0 },
        transportationLabour: 0,
        enquiryExpense: 0,
        foodAndAccommodation: 0
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
    } else {
      // Reset transportation details if not available
      setTransportationDetails({
        vehicleType: '',
        totalKilometer: 0,
        numberOfTrips: 0,
        price: 0,
        cranePrice: 0,
        otherExpenses: 0
      });
    }

    // Set margin overhead if available
    setMarginOverhead(client.marginAmount || 0);

    // Clear search results
    setClients([]);
  };

  // Calculate total labor cost - using data from state not recalculating
  const calculateTotalLabor = () => {
    if (!selectedClient) return 0;

    // If the client has total labour charge, use that
    if (selectedClient.labourCharge?.totalLabourCharge) {
      return selectedClient.labourCharge.totalLabourCharge;
    }

    // Otherwise calculate from components
    const weldingLabor = laborCosts.weldingLabour.totalCost || 0;
    const sheetingLabor = laborCosts.sheetingLabour.totalCost || 0;
    const transportationLabor = laborCosts.transportationLabour || 0;
    const enquiryExpense = laborCosts.enquiryExpense || 0;
    const foodAndAccommodation = laborCosts.foodAndAccommodation || 0;

    return weldingLabor + sheetingLabor + transportationLabor + enquiryExpense + foodAndAccommodation;
  };

  const handleSubmitEstimate = async () => {
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

      setTimeout(() => {
        setIsSubmitting(false);
        alert("Final estimate submitted successfully!");
      }, 1000);
    } catch (error) {
      console.error("Error submitting estimate:", error);
      setIsSubmitting(false);
      alert("Error submitting estimate. Please try again.");
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
          {/* Client Selection with Search */}
          <div className="mb-6">
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

            {/* Client Results */}
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
                            {client.sheetingPrice && client.sheetingPrice.length > 0
                              ? client.sheetingPrice[0].projectType?.projectType || '-'
                              : '-'}
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

          {/* Final Estimate Form */}
          <div className="p-4 mt-6 rounded shadow-sm bg-gray-50">
            <h2 className="mb-4 text-lg font-medium">Final Estimate</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">To</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Client Name"
                  name="clientName"
                  value={selectedClient?.clientId?.name || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Client Address</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Address"
                    name="clientAddress"
                    value={selectedClient ? `${selectedClient.clientId?.place || ""}, ${selectedClient.clientId?.district || ""}` : ""}
                    readOnly
                  />
                  <div className="ml-2 text-blue-500">ℹ️</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">Project Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Project Name"
                  name="projectName"
                  value={projectDetails.projectName}
                  onChange={handleProjectDetailsChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Project Number</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Project Number"
                    name="projectNumber"
                    value={projectDetails.projectNumber}
                    onChange={handleProjectDetailsChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm">Thickness</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="0.5"
                  name="sheetThickness"
                  value={projectDetails.sheetThickness}
                  onChange={handleProjectDetailsChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Sheet Profile</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="3020mm"
                    name="sheetProfile"
                    value={projectDetails.sheetProfile}
                    onChange={handleProjectDetailsChange}
                  />
                  <div className="ml-2 text-blue-500">ℹ️</div>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm">Color</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="off-white"
                    name="color"
                    value={projectDetails.color}
                    onChange={handleProjectDetailsChange}
                  />
                  <div className="ml-2 text-blue-500">ℹ️</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Add Notes</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                name="notes"
                value={projectDetails.notes}
                onChange={handleProjectDetailsChange}
              ></textarea>
            </div>

            {/* Dynamic Areas Section */}
            {selectedClient?.sheetingPrice && selectedClient.sheetingPrice.length > 0 && (
              <div className="mt-6 mb-6">
                <h3 className="mb-4 font-medium">Areas</h3>

                {selectedClient.sheetingPrice.map((area, index) => (
                  <div key={index} className="p-3 mb-4 bg-white border rounded">
                    <h4 className="mb-2 font-medium">Area {index + 1}</h4>
                    <div className="grid grid-cols-3 gap-4 mb-2">
                      <div>
                        <label className="block mb-1 text-sm">Span</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={area.span ? `${area.span}m` : "0m"}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Length</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={area.length ? `${area.length}m` : "0m"}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Height</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
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
                          className="w-full p-2 border rounded"
                          value={area.roofModel?.roofModel || "Box Dutch"}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Project Type</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={area.projectType?.projectType || "Residential"}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Sheet Thickness</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          value={area.sheetThickness || "0"}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-4 p-3 mt-3 bg-gray-200 rounded">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Total Area</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="0"
                      value={selectedClient?.totalAreaSqFt || "0"}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Total Sheeting</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="₹0.00"
                      value={selectedClient?.totalSheetingCost ? `₹${selectedClient.totalSheetingCost.toFixed(2)}` : "₹0.00"}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Total Material Cost</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="₹0.00"
                      value={selectedClient?.totalmaterialCharge ? `₹${selectedClient.totalmaterialCharge.toFixed(2)}` : "₹0.00"}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Labour Cost Section */}
            <div className="mt-6 mb-6">
              <h3 className="mb-4 font-medium">Labour Cost</h3>

              <div className="p-3 mb-4 bg-white border rounded">
                <h4 className="mb-2 text-sm font-medium">Welding Labour</h4>
                <div className="grid grid-cols-3 gap-4">
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
                  <div>
                    <label className="block mb-1 text-sm">Total Welding Cost</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-gray-50"
                      placeholder="₹0.00"
                      value={`₹${laborCosts.weldingLabour.totalCost.toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block mb-1 text-sm">Welding Consumables</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    placeholder="₹0.00"
                    value={laborCosts.weldingLabour.consumables}
                    onChange={(e) => handleLaborCostChange('weldingLabour', 'consumables', e.target.value)}
                  />
                </div>
              </div>

              <div className="p-3 mb-4 bg-white border rounded">
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

              <div className="p-3 mt-3 bg-gray-200 rounded">
                <div className="grid grid-cols-1">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Total Labour Cost</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="₹0.00"
                      value={`₹${calculateTotalLabor().toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation Cost Section */}
            <div className="mt-6 mb-6">
              <h3 className="mb-4 font-medium">Transportation Cost</h3>

              <div className="p-3 bg-white border rounded">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block mb-1 text-sm">Vehicle Type</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={transportationDetails.vehicleType}
                      onChange={(e) => handleTransportationChange('vehicleType', e.target.value)}
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="Trailer">Trailer</option>
                      <option value="Truck">Truck</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Total Distance (km)</label>
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

                <div className="grid grid-cols-3 gap-4">
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
                </div>
              </div>

              <div className="p-3 mt-3 bg-gray-200 rounded">
                <div className="grid grid-cols-1">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Total Transportation Cost</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="₹0.00"
                      value={`₹${(transportationDetails.price + transportationDetails.cranePrice + transportationDetails.otherExpenses).toFixed(2)}`}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="p-4 mt-6 mb-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="mb-3 text-lg font-medium">Expenses</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Sheet Material Expense</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border rounded"
                    placeholder="₹0.00"
                    value={selectedClient?.totalSheetingCost ? `₹${selectedClient.totalSheetingCost.toFixed(2)}` : "₹0.00"}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Transportation Cost</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border rounded"
                    placeholder="₹0.00"
                    value={selectedClient?.transportations?.[0]?.price ? `₹${selectedClient.transportations[0].price.toFixed(2)}` : "₹0.00"}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Labour Charge</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border rounded"
                    placeholder="₹0.00"
                    value={selectedClient?.labourCharge?.totalLabourCharge ? `₹${selectedClient.labourCharge.totalLabourCharge.toFixed(2)}` : "₹0.00"}
                    readOnly
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Material Charge</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border rounded"
                    placeholder="₹0.00"
                    value={selectedClient?.totalmaterialCharge ? `₹${selectedClient.totalmaterialCharge.toFixed(2)}` : "₹0.00"}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Additional Expenses</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border rounded"
                    placeholder="₹0.00"
                    value={`₹${((selectedClient?.transportations?.[0]?.cranePrice || 0) + (selectedClient?.transportations?.[0]?.otherExpenses || 0)).toFixed(2)}`}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Margin Amount</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white border rounded"
                    placeholder="₹0.00"
                    value={selectedClient?.marginAmount ? `₹${selectedClient.marginAmount.toFixed(2)}` : "₹0.00"}
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between p-3 border border-blue-100 rounded-md bg-blue-50">
                  <label className="font-medium text-blue-800">Total Project Expense</label>
                  <input
                    type="text"
                    className="w-48 p-2 font-bold text-right text-blue-800 bg-white border rounded"
                    placeholder="₹0.00"
                    value={selectedClient?.totalProjectExpense ? `₹${selectedClient.totalProjectExpense.toFixed(2)}` : "₹0.00"}
                    readOnly
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between p-3 border border-green-100 rounded-md bg-green-50">
                  <label className="font-medium text-green-800">Final Rate (After Tax)</label>
                  <input
                    type="text"
                    className="w-48 p-2 font-bold text-right text-green-800 bg-white border rounded"
                    placeholder="₹0.00"
                    value={selectedClient?.finalRate ? `₹${selectedClient.finalRate.toFixed(2)}` : "₹0.00"}
                    readOnly
                  />
                </div>
              </div>
            </div>

           {/* Action Buttons */}
           <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <button 
                    className="px-4 py-2 mr-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    onClick={() => handleViewQuotation()}
                  >
                    View Quotation
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    onClick={handleShowPdfPreview}
                    disabled={!selectedClient}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                </div>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={handleSubmitEstimate}
                  disabled={isSubmitting || !selectedClient}
                >
                  {isSubmitting ? "Submitting..." : "Submit Final Estimate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalEstimatePage;