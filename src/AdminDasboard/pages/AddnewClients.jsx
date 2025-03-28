import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import Header from "../../AdminDasboard/components/Header";
import Sidebar from "../../AdminDasboard/components/SideNav";
import { Trash2, Upload } from "lucide-react";
import addnew from "../../SalesDashboard/assets/icons/adduser.png";
import addclients from "../../SalesDashboard/assets/icons/addclients.png";
import addestimate from "../../SalesDashboard/assets/icons/addestimate.png";
import dropdown from "../../SalesDashboard/assets/icons/dropdown.png";
import { addNewclient } from "../../api/admin/client/addClient";
import { getClient } from "../../api/admin/client/getClient";
import { getAllProjectType } from "../../api/sales/project/project";
import { getAllCategories } from "../../api/sales/project/project";
import { toast } from "react-toastify";
import { fetchAllProjectType } from "../../api/admin/product/getAllCategories";
import { getFilteredProducts } from "../../api/admin/product/updateProduct";
import { getSitevisitor } from "../../api/admin/employee/sitevistor";

const AddnewClients = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const navigate = useNavigate();

  //  const [areas, setAreas] = useState([{ id: 1, name: "Area 1" }]);
  const [showMeasurements, setShowMeasurements] = useState(false);

  const [materials, setMaterials] = useState([{ material: "", quantity: "" }]);

  const addNewMaterial = () => {
    setMaterials([...materials, { material: "", quantity: "" }]);
  };
  // Function to add a new area
  // const addNewArea = () => {
  //   const newArea = { id: Date.now(), name: `Area ${areas.length + 1}` };
  //   setAreas([...areas, newArea]);
  // };
  // Function to remove an area

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!name || !phoneNo || !place || !district) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const formData = { name, phoneNo, place, district, comments };

    try {
      const response = await addNewclient(formData); // Ensure AddNewclient is imported and defined
      if (response?.data) {
        // Reset all fields after successful submission
        setName("");
        setPhoneNo("");
        setPlace("");
        setDistrict("");
        setComments("");
        toast.success("client added successfully!");
      }
    } catch (error) {
      toast.error("Failed to add client. Please try again.");
      console.error("Error adding client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [clientList, setClientList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClient();
        console.log("API Data:", response); // Debugging

        if (Array.isArray(response?.data)) {
          setClientList(response.data);
        } else if (
          response?.data?.clients &&
          Array.isArray(response.data.clients)
        ) {
          setClientList(response.data.clients);
        } else {
          console.error("Invalid API response:", response);
          setClientList([]); // Fallback to avoid errors
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClientList([]);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredClients([]); // If search is empty, reset suggestions
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

  // -------------------------------------------------------

  const [siteVisitors, setSiteVisitors] = useState([]);

  const fetchSiteVisitors = async () => {
    try {
      const response = await getSitevisitor();
      console.log("Site Visitors:", response);
      setSiteVisitors(response.data);
    } catch (error) {
      console.error("Error fetching site visitors:", error);
    }
  };

  useEffect(() => {
    fetchSiteVisitors();
  }, []);

  const [projectTypes, setProjectTypes] = useState([]);

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await getAllProjectType(); // Check API response
        console.log(response); // Debug API response
        setProjectTypes(response.projectTypes || []); // Ensure response contains projectTypes array
      } catch (error) {
        console.error("Error fetching project types:", error);
      }
    };

    fetchProjectTypes();
  }, []);

  // ---------------------------------------------------------------------

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(); // Fetch categories from API
        console.log(response); // Debug API response
        setCategories(response.categories || []); // Ensure response contains categories array
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // const handleEstimate = (itemForm)=>{

  //   try {
  // const response =

  //   } catch (error) {

  //   }

  // }

  const OngoingProject = [
    {
      id: 1,
      name: "Kevin",
      phone: "+91 9867 5433 33",
      location: "Kochi",
      roof: "Car Porch",
      status: "site visit",
    },
    {
      id: 2,
      name: "Marley",
      phone: "+91 8990 3444 89",
      location: "Kollam",
      roof: "Warehouse",
      status: "pending",
    },
    {
      id: 3,
      name: "Gustavo",
      phone: "+91 9867 5433 33",
      location: "Thrissur",
      roof: "Car Porch",
      status: "in-progress",
    },
    {
      id: 4,
      name: "Chance",
      phone: "+91 8843 8943 32",
      location: "Palakkad",
      roof: "Car Porch",
      status: "discussion",
    },
    {
      id: 5,
      name: "Marley",
      phone: "+91 9867 5433 33",
      location: "Aluva",
      roof: "Auditorium",
      status: "inprogress",
    },
    {
      id: 6,
      name: "Miracle",
      phone: "+91 7887 6464 55",
      location: "Kochi",
      roof: "Auditorium",
      status: "pending",
    },

    {
      id: 7,
      name: "Ashlynn",
      phone: "+91 9876 6789 23",
      location: "Kochi",
      roof: "Car Porch",
      status: "sitevisit",
    },
    {
      id: 8,
      name: "James",
      phone: "+91 9867 5433 33",
      location: "Kochi",
      roof: "Auditorium",
      status: "declined",
    },
    {
      id: 9,
      name: "george",
      phone: "+91 9867 5433 33",
      location: "Kochi",
      roof: "Auditorium",
      status: "discussion",
    },
    {
      id: 10,
      name: "xavi",
      phone: "+91 9867 5433 33",
      location: "Kochi",
      roof: "Auditorium",
      status: "progress ",
    },
    {
      id: 11,
      name: "pedri",
      phone: "+91 9867 5433 33",
      location: "Kochi",
      roof: "Auditorium",
      status: "declined",
    },
    {
      id: 12,
      name: "rodrigo",
      phone: "+91 9867 5433 33",
      location: "Kochi",
      roof: "Auditorium",
      status: "progress",
    },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [data, setData] = useState(OngoingProject);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemsPerPage = 8;

  const removeArea = (id) => {
    setAreas(areas.filter((area) => area.id !== id));
  };

  const handleSearch = (event) => setSearch(event.target.value);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleCheckboxChange = (id) =>
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  // const handleDelete = (id) => setData(data.filter((item) => item.id !== id));

  const handleStatusChange = (id, newStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(/\s+/g, "")) {
      case "sitevisit":
      case "site visit":
        return "bg-[#CF7933] text-white";
      case "discussion":
        return "bg-[#3C3EC3] text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "inprogress":
      case "in-progress":
      case "progress":
        return "bg-green-500 text-white";
      case "declined":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id); // Toggle dropdown visibility
  };

  const [areas, setAreas] = useState([
    {
      id: 1,
      name: "Area 1",
      itemForm: { roofType: "", roofModel: "", roofPreference: "" },
    },
  ]);

  const [showDropdown, setShowDropdown] = useState(null);
  const [projectTypeData, setProjectTypeData] = useState([]);
  const [roofModelData, setRoofModelData] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ roofModel: "" });
  const [productData, setProductData] = useState(null);
  const [areaProductData, setAreaProductData] = useState({});
  const [totalSqFt, setTotalSqFt] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  console.log(projectTypeData);

  const calculateTotals = () => {
    let totalSqFtSum = 0;
    let totalCostSum = 0;

    Object.values(areaProductData).forEach((area) => {
      const areaSqFt = parseFloat(area.totalArea) || 0;
      const sheetRate = parseFloat(area.sheetRate) || 0;

      totalSqFtSum += areaSqFt;
      totalCostSum += sheetRate; // Sum of all sheetRate values
    });

    setTotalSqFt(totalSqFtSum.toFixed(2)); // Round to 2 decimal places
    setTotalCost(totalCostSum.toFixed(2)); // Sum of all sheetRate values
  };

  useEffect(() => {
    calculateTotals();
  }, [areaProductData]);

  // Function to add a new area
  const addNewArea = () => {
    const newArea = {
      id: areas.length + 1,
      name: `Area ${areas.length + 1}`,
      itemForm: { roofType: "", roofModel: "", roofPreference: "" },
    };
    setAreas([...areas, newArea]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    setMaterials(updatedMaterials);
  };

  const handleAreaChange = async (id, field, value) => {
    const updatedAreas = areas.map((area) =>
      area.id === id
        ? {
            ...area,
            itemForm: { ...area.itemForm, [field]: value },
          }
        : area
    );
    setAreas(updatedAreas);

    // Fetch product data only if all fields are filled
    const selectedArea = updatedAreas.find((area) => area.id === id);
    const filters = {
      roofType: selectedArea.itemForm.roofType,
      roofModel: selectedArea.itemForm.roofModel,
      roofPreference: selectedArea.itemForm.roofPreference,
    };

    if (
      filters.roofType !== "" &&
      filters.roofModel !== "" &&
      filters.roofPreference !== ""
    ) {
      await fetchProducts(id, filters); // Pass area ID to fetch data
    }
  };

  const [itemForm, setItemForm] = useState({
    roofType: "",
    roofModel: "",
    roofPreference: "",
    uploadImage: null,
    materials: [],
    span: "",
    length: "",
    height: "",
    typeOfPanel: "",
    sheetThickness: "",
    numberOfPanels: "",
    newLength: "",
    centerHeight: "",
    finalCuttingLength: "",
    totalArea: "",
    sheetRate: "",
  });

  useEffect(() => {
    const fetchAllProjectTypes = async () => {
      try {
        const categoriesData = await fetchAllProjectType();
        console.log("Fetched project types:", categoriesData);
        setProjectTypeData(categoriesData.projectTypes || []);
      } catch (error) {
        console.error("Error fetching project types:", error);
      }
    };

    fetchAllProjectTypes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setRoofModelData(response.categories || []);
        console.log("Fetched categories:", response.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFilter = async () => {
    if (
      filters.roofModel !== "" &&
      filters.roofType !== "" &&
      filters.roofPreference !== ""
    )
      console.log("hiiiiiiiiiiiiii");
    fetchProducts();
  };
  const fetchProducts = async (areaId, filters) => {
    try {
      const response = await getFilteredProducts(filters);
      console.log("Fetched Products:", response);

      if (response?.products?.length > 0) {
        setAreaProductData((prevData) => ({
          ...prevData,
          [areaId]: response.products[0], // Store product data by area ID
        }));
      }
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const filters = {
    roofType: itemForm.roofType,
    roofModel: itemForm.roofModel,
    roofPreference: itemForm.roofPreference,
  };

  console.log(filters);

  const editProduct = async () => {
    try {
      const updatedProduct = { ...productData };
      console.log("Updating Product with data:", updatedProduct);

      const response = await updateProduct(updatedProduct._id, updatedProduct);
      console.log(response);

      alert("Product updated successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 w-full">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <Header toggleSidebar={toggleSidebar} />

        <div className="space-y-8 bg-gray-100 py-5 px-5 w-full max-w-full">
          <h1 className="text-3xl font-bold text-[#4c48a5]">Dashboard</h1>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 w-full">
            <div className="p-4 bg-white rounded-2xl shadow-md flex items-center space-x-4 py-5 w-full">
              <img src={addnew} alt="Add New Clients" className="w-12 h-12" />
              <div
                onClick={() => navigate("/salesaddnewclient")}
                className="cursor-pointer"
              >
                <h2 className="text-lg font-normal">Add New Clients</h2>
                <p className="text-gray-600">To register new clients</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-md flex items-center space-x-4 py-5 w-full">
              <img
                src={addclients}
                alt="Existing Clients"
                className="w-12 h-12"
              />
              <div>
                <h2 className="text-lg font-normal">Existing Clients</h2>
                <p className="text-gray-600">View existing clients</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-md flex items-center space-x-4 py-5 w-full">
              <img
                src={addestimate}
                alt="Create an Estimate"
                className="w-12 h-12"
              />
              <div>
                <h2 className="text-lg font-normal">Create an Estimate</h2>
                <p className="text-gray-600">Generate client estimates</p>
              </div>
            </div>
          </div>

          {/* Customer Records Table */}
          <div className="space-y-8 w-full">
            {/* Add New Client Section */}
            <div className="p-6 bg-white shadow-md rounded-lg w-full">
              <h2 className="text-lg font-semibold text-indigo-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Add New Client
                  {/* <input type="checkbox" className="w-4 h-4" /> */}
                  {/* <span className="text-gray-600">ABC 123</span> */}
                </span>
             
              </h2>{" "}
              <br />
              {/* First Row - Three Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 
                    className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 w-24">Phone:</label>
<input
  type="number"
  value={phoneNo}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNo(value);
    }
  }}
 
  className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none"
/>

                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">Place:</label>
                  <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  
                    className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
                  />
                </div>
              </div>
              {/* Second Row - Two Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">
                    District:
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    
                    className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">
                    Comments:
                  </label>
                  <input
                    type="text"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add comments"
                    className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-center py-6 gap-5">
                <button
                  className="bg-red-600 text-white px-6 py-3 text-lg rounded-lg shadow-md hover:bg-red-700 transition"
                  onClick={() => {
                    setName("");
                    setPhoneNo("");
                    setPlace("");
                    setDistrict("");
                    setComments("");
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg shadow-md hover:bg-blue-700 transition ml-4"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
              <div className="pt-5">
                <div className="p-6 ">
                  <h2 className="text-lg font-semibold text-indigo-900 mb-6"></h2>

                  <div className="flex items-center gap-2 justify-end"></div>

                  <br />
                </div>
              </div>
              <div>
                <div className="space-y-8 p-4">
                  <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddnewClients;
