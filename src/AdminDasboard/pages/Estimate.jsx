import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../AdminDasboard/components/Header";
import Sidebar from "../../AdminDasboard/components/SideNav";
import { getSitevisitor } from "../../api/admin/employee/sitevistor";
import {
  fetchAllProjectType,
  getAllCategories,
} from "../../api/admin/product/getAllCategories";
import { getFilteredProducts } from "../../api/admin/product/updateProduct";
import { getClient } from "../../api/admin/client/getClient";
import { finalEstimate } from "../../api/admin/estimate/createEstimate";

const Estimate = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Form data state
  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",
    siteVisitorId: "",
    areas: [
      {
        id: 1,
        name: "Area 1",
        projectType: "",
        roofModel: "",
        roofPreference: "",
        span: "",
        length: "",
        height: "",
        typeOfPanel: 0.305,
        offset: 0,
        sheetThickness: 0.6,
        noOfBay: 1,
        noOfWorkingDays: 5,
        extraPanel: 2,
        materialItems: [],
        totalArea: "",
        sheetRate: "",
      },
    ],
    totalSqFt: 0,
    totalCost: 0,
  });

  // Reference data
  const [projectTypes, setProjectTypes] = useState([]);
  const [roofModels, setRoofModels] = useState([]);
  const [siteVisitors, setSiteVisitors] = useState([]);
  const [, setAreaProductData] = useState({});

  // Client search
  const [clientList, setClientList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  // Fetch initial data
  useEffect(() => {
    fetchProjectTypes();
    fetchRoofModels();
    fetchSiteVisitors();
    fetchClients();
  }, []);

  // Calculate totals whenever area data changes
  useEffect(() => {
    calculateTotals();
  }, [formData.areas]);

  // Update filtered clients when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setFilteredClients([]);
      return;
    }

    if (Array.isArray(clientList)) {
      const filtered = clientList.filter((client) =>
        client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients([]);
    }
  }, [searchTerm, clientList]);

  // API fetch functions
  const fetchProjectTypes = async () => {
    try {
      const response = await fetchAllProjectType();
      setProjectTypes(response.projectTypes || []);
    } catch (error) {
      console.error("Error fetching project types:", error);
    }
  };

  const fetchRoofModels = async () => {
    try {
      const response = await getAllCategories();
      setRoofModels(response.categories || []);
    } catch (error) {
      console.error("Error fetching roof models:", error);
    }
  };

  const fetchSiteVisitors = async () => {
    try {
      const response = await getSitevisitor();
      setSiteVisitors(response.data || []);
    } catch (error) {
      console.error("Error fetching site visitors:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await getClient();
      if (Array.isArray(response?.data)) {
        setClientList(response.data);
      } else if (
        response?.data?.clients &&
        Array.isArray(response.data.clients)
      ) {
        setClientList(response.data.clients);
      } else {
        setClientList([]);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClientList([]);
    }
  };

  const fetchProductForArea = async (areaId, filters) => {
    try {
      const response = await getFilteredProducts(filters);

      if (response?.products?.length > 0) {
        const productData = response.products[0];

        // Update the specific area with product data
        updateAreaWithProductData(areaId, productData);

        // Store in separate state for reference
        setAreaProductData((prevData) => ({
          ...prevData,
          [areaId]: productData,
        }));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Form manipulation functions
  const updateAreaWithProductData = (areaId, productData) => {
    setFormData((prevData) => {
      const updatedAreas = prevData.areas.map((area) => {
        if (area.id === areaId) {
          return {
            ...area,
            span: productData.span || area.span,
            length: productData.length || area.length,
            height: productData.height || area.height,
            materials: productData.materials || area.materials,
            totalArea: productData.totalArea || area.totalArea,
            sheetRate: productData.sheetRate || area.sheetRate,
          };
        }
        return area;
      });

      return {
        ...prevData,
        areas: updatedAreas,
      };
    });
  };

  // Modify addNewArea to match the new structure
  const addNewArea = () => {
    const newAreaId = formData.areas.length + 1;
    const newArea = {
      id: newAreaId,
      name: `Area ${newAreaId}`,
      projectType: "",
      roofModel: "",
      roofPreference: "",
      span: "",
      length: "",
      height: "",
      typeOfPanel: 0.305,
      offset: 0,
      sheetThickness: 0.6,
      noOfBay: 1,
      noOfWorkingDays: 5,
      extraPanel: 2,
      materialItems: [],
      totalArea: "",
      sheetRate: "",
    };

    setFormData((prevData) => ({
      ...prevData,
      areas: [...prevData.areas, newArea],
    }));
  };

  const removeArea = (areaId) => {
    if (formData.areas.length <= 1) {
      alert("You must have at least one area.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      areas: prevData.areas.filter((area) => area.id !== areaId),
    }));

    // Also remove from areaProductData
    setAreaProductData((prevData) => {
      const newData = { ...prevData };
      delete newData[areaId];
      return newData;
    });
  };

  // Modify the existing handleAreaChange to update projectType
  const handleAreaChange = async (areaId, field, value) => {
    // Update form data
    setFormData((prevData) => {
      const updatedAreas = prevData.areas.map((area) =>
        area.id === areaId ? { ...area, [field]: value } : area
      );

      return {
        ...prevData,
        areas: updatedAreas,
      };
    });

    // Check if we need to fetch product data
    const area = formData.areas.find((a) => a.id === areaId);

    // Create updated area with new field value
    const updatedArea = { ...area, [field]: value };

    if (
      (field === "projectType" ||
        field === "roofModel" ||
        field === "roofPreference") &&
      updatedArea.projectType &&
      updatedArea.roofModel &&
      updatedArea.roofPreference
    ) {
      const filters = {
        roofType: updatedArea.projectType,
        roofModel: updatedArea.roofModel,
        roofPreference: updatedArea.roofPreference,
      };

      await fetchProductForArea(areaId, filters);
    }
  };

  const handleMaterialChange = (areaId, materialIndex, value) => {
    setFormData((prevData) => {
      const updatedAreas = prevData.areas.map((area) => {
        if (area.id === areaId) {
          const updatedMaterials = [...area.materials];
          updatedMaterials[materialIndex].unit = value;

          return {
            ...area,
            materials: updatedMaterials,
          };
        }
        return area;
      });

      return {
        ...prevData,
        areas: updatedAreas,
      };
    });
  };

  const handleClientSelect = (client) => {
    setSearchTerm(client.name);
    setFilteredClients([]);

    setFormData((prevData) => ({
      ...prevData,
      clientId: client._id,
      clientName: client.name,
    }));
  };

  const handleSiteVisitorChange = (visitorId) => {
    setFormData((prevData) => ({
      ...prevData,
      siteVisitorId: visitorId,
    }));
  };

  const calculateTotals = () => {
    let totalSqFtSum = 0;
    let totalCostSum = 0;

    formData.areas.forEach((area) => {
      const areaSqFt = parseFloat(area.totalArea) || 0;
      const areaRate = parseFloat(area.sheetRate) || 0;

      totalSqFtSum += areaSqFt;
      totalCostSum += areaRate;
    });

    setFormData((prevData) => ({
      ...prevData,
      totalSqFt: totalSqFtSum.toFixed(2),
      totalCost: totalCostSum.toFixed(2),
    }));
  };

  const handleAreaInputChange = (areaId, field, value) => {
    setFormData((prevData) => {
      const updatedAreas = prevData.areas.map((area) =>
        area.id === areaId ? { ...area, [field]: value } : area
      );

      return {
        ...prevData,
        areas: updatedAreas,
      };
    });
  };

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.clientId) {
      alert("Please select a client");
      return;
    }
  
    if (!formData.siteVisitorId) {
      alert("Please select a site visitor");
      return;
    }
  
    // Prepare data for submission
    const submitData = {
      clientId: formData.clientId,
      siteVisitorId: formData.siteVisitorId,
      areas: formData.areas.map((area) => ({
        span: parseFloat(area.span) || 0,
        length: parseFloat(area.length) || 0,
        height: parseFloat(area.height) || 0,
        projectType: area.projectType,
        roofModel: area.roofModel,
        roofPreference: area.roofPreference,
        typeOfPanel: area.typeOfPanel,
        offset: area.offset,
        sheetThickness: area.sheetThickness,
        noOfBay: area.noOfBay,
        noOfWorkingDays: area.noOfWorkingDays,
        extraPanel: area.extraPanel,
        materialItems: [
          ...(area.materials ? 
            area.materials.map((material) => ({
              itemId: material.itemId?._id || material.itemId,
              unit: parseFloat(material.unit) || 0,
            })) : 
            []),
          ...(area.materialItems || [])
        ],
      })),
    };
  
    try {
      const response = await finalEstimate(submitData);
      console.log("API Response:", response);
  
      if (response.data && response.data.success) {
        alert("Estimate created successfully!");
        navigate("/estimates");
      } else {
        const errorMsg =
          response.data?.message ||
          "Failed to create estimate. Please try again.";
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Error creating estimate:", error);
      const errorMessage =
        error.message ||
        (typeof error === "object" ? JSON.stringify(error) : error) ||
        "Unknown error";
      alert(`Failed to create estimate: ${errorMessage}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-6">
          <div className="overflow-hidden bg-white rounded-lg shadow-lg">
            {/* Client Selection Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                  Create Estimate
                </h1>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate("/admin/custommeasurement")}
                >
                  Custom Measurements
                </p>
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Client Name
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for client"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                {filteredClients.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
                    {filteredClients.map((client) => (
                      <li
                        key={client._id}
                        onClick={() => handleClientSelect(client)}
                        className="p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-100 last:border-b-0"
                      >
                        {client.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {formData.clientId && (
                <div className="mt-2 text-sm text-green-600">
                  Client selected: {formData.clientName}
                </div>
              )}
            </div>

            {/* Areas Section */}
            {formData.areas.map((area) => (
              <div key={area.id} className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-indigo-900">
                    {area.name}
                  </h2>
                  <div>
                    {formData.areas.length > 1 && (
                      <button
                        onClick={() => removeArea(area.id)}
                        className="px-4 py-2 text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Remove Area
                      </button>
                    )}
                  </div>
                </div>

                {/* Roof Selection Row */}
                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Project Type
                    </label>
                    <select
                      value={area.projectType}
                      onChange={(e) =>
                        handleAreaChange(area.id, "projectType", e.target.value)
                      }
                    >
                      <option value="">Select Project Type</option>
                      {projectTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.projectType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Roof Model
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      value={area.roofModel}
                      onChange={(e) =>
                        handleAreaChange(area.id, "roofModel", e.target.value)
                      }
                    >
                      <option value="">Select Roof Model</option>
                      {roofModels.map((model) => (
                        <option key={model._id} value={model._id}>
                          {model.roofModel}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Roof Preference
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      value={area.roofPreference}
                      onChange={(e) =>
                        handleAreaChange(
                          area.id,
                          "roofPreference",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Preference</option>
                      <option value="Single Car Parking">
                        Single Car Parking
                      </option>
                      <option value="Double Car Parking">
                        Double Car Parking
                      </option>
                    </select>
                  </div>
                </div>

                {/* Measurements Row */}
                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Span
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter span"
                      value={area.span}
                      onChange={(e) =>
                        handleAreaInputChange(area.id, "span", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Length
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter length"
                      value={area.length}
                      onChange={(e) =>
                        handleAreaInputChange(area.id, "length", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Height
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter height"
                      value={area.height}
                      onChange={(e) =>
                        handleAreaInputChange(area.id, "height", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Materials Section */}
                {area.materials && area.materials.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 text-lg font-medium text-gray-800">
                      Materials
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {area.materials.map((material, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                              Material
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
                              value={material.itemId?.item || ""}
                              readOnly
                            />
                          </div>

                          <div className="flex-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                              Quantity
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                              placeholder="Enter quantity"
                              value={material.unit || ""}
                              onChange={(e) =>
                                handleMaterialChange(
                                  area.id,
                                  index,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Area Calculations */}
                <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Area Sq. Ft
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Total area"
                      value={area.totalArea}
                      onChange={(e) =>
                        handleAreaInputChange(
                          area.id,
                          "totalArea",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Sheet Rate
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Rate per sq ft"
                      value={area.sheetRate}
                      onChange={(e) =>
                        handleAreaInputChange(
                          area.id,
                          "sheetRate",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Area Button */}
            <div className="p-6 border-b border-gray-200">
              <button
                onClick={addNewArea}
                className="px-6 py-2 text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Add New Area +
              </button>
            </div>

            {/* Site Visitor Assignment */}
            <div className="p-6 border-b border-gray-200">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Assign To Site Visitor
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                value={formData.siteVisitorId}
                onChange={(e) => handleSiteVisitorChange(e.target.value)}
              >
                <option value="">Select Site Visitor</option>
                {siteVisitors.map((visitor) => (
                  <option key={visitor._id} value={visitor._id}>
                    {visitor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Totals and Submit Section */}
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Total Square Feet
                  </label>
                  <input
                    type="text"
                    value={formData.totalSqFt}
                    readOnly
                    className="w-full p-3 font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Total Cost
                  </label>
                  <input
                    type="text"
                    value={`₹${formData.totalCost}/-`}
                    readOnly
                    className="w-full p-3 font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 text-lg font-semibold text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
                  disabled={!formData.clientId || !formData.siteVisitorId}
                >
                  Create Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimate;
