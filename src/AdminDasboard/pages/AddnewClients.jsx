
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import Header from "../../AdminDasboard/components/Header";
import Sidebar from "../../AdminDasboard/components/SideNav";
import { Trash2, Upload } from "lucide-react";
import addnew from "../../SalesDashboard/assets/icons/adduser.png";
import addclients from "../../SalesDashboard/assets/icons/addclients.png";
import addestimate from "../../SalesDashboard/assets/icons/addestimate.png";
import dropdown from "../../SalesDashboard/assets/icons/dropdown.png";
import {addNewclient} from "../../api/admin/client/addClient";
import { getClient } from "../../api/admin/client/getClient";
import { getAllProjectType } from "../../api/sales/project/project";
import {getAllCategories} from "../../api/sales/project/project"
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

 

const [name,setName] = useState ("")
const  [phoneNo,setPhoneNo] = useState("")
const [place,setPlace] =useState("")
const [district,setDistrict] =useState("")
const [comments,setComments] = useState("")
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
      } else if (response?.data?.clients && Array.isArray(response.data.clients)) {
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
    setSiteVisitors(response.data)
   
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
 
  const handleDelete = (id) => setData(data.filter((item) => item.id !== id));
 
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
    { id: 1, name: "Area 1", itemForm: { roofType: "", roofModel: "", roofPreference: "" } }
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
        if (filters.roofModel !== "" && filters.roofType !== "" && filters.roofPreference !== "")
         
          console.log("hiiiiiiiiiiiiii");
           fetchProducts()
       
        }
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
        roofPreference: itemForm.roofPreference
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
              <div onClick={() => navigate("/salesaddnewclient")} className="cursor-pointer">
                <h2 className="text-lg font-normal">Add New Clients</h2>
                <p className="text-gray-600">To register new clients</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-md flex items-center space-x-4 py-5 w-full">
              <img src={addclients} alt="Existing Clients" className="w-12 h-12" />
              <div>
                <h2 className="text-lg font-normal">Existing Clients</h2>
                <p className="text-gray-600">View existing clients</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-md flex items-center space-x-4 py-5 w-full">
              <img src={addestimate} alt="Create an Estimate" className="w-12 h-12" />
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
  <button className="flex items-center text-gray-600 hover:text-red-500">
    <Trash2 className="w-4 h-4 mr-1" />
    Delete
  </button>
</h2> <br />
 
 {/* First Row - Three Input Fields */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-24">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Amal"
            className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-24">Phone:</label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="676876872"
            className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-24">Place:</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Kochi"
            className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
          />
        </div>
      </div>

      {/* Second Row - Two Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-24">District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District"
            className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-24">Comments:</label>
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
  
    <div  className="p-6 ">
      <h2 className="text-lg font-semibold text-indigo-900 mb-6"></h2>
      
    <div className="flex items-center gap-2 justify-end">
    {/* Export Button */}
    {/* <button className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition">
      <Upload size={16} />
      Export
    </button> */}
 
    {/* Delete Button */}
    {/* <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition">
      <Trash2 size={18} />
      Delete
    </button> */}
  </div>
              <div className="flex items-center justify-between gap-2 py-5">
              <div className="relative flex gap-2 justify-center items-center">
  <label className="text-sm text-gray-600">Client Name:</label>
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search Client"
    className="w-100 border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
  />

  {/* Show dropdown only if there are matching results */}
  {filteredClients.length > 0 && (
    <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
      {filteredClients.map((client) => (
        <li
          key={client.id}
          onClick={() => {
            setSearchTerm(client.name); // Set input value when clicked
            setFilteredClients([]); // Hide dropdown after selection
          }}
          className="p-2 cursor-pointer hover:bg-gray-200"
        >
          {client.name}
        </li>
      ))}
    </ul>
  )}
</div>

               
      {/* Measurement Button */}
      <h1
      className="text-decoration underline cursor-pointer text-lg"
      onClick={() => navigate("/admin/custommeasurement")}
    >
      Custom Measurements
    </h1>
 
</div>
 <br />
 
 


 <div className="bg-white shadow-lg">
 
 {areas.map((area) => (
<div key={area.id} className="px-6 ">
<h2 className="text-lg font-semibold text-indigo-900 mb-6">{area.name}</h2>
 
<div className="flex items-center gap-2 justify-end">
{/* Export Button */}
{/* <button className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition">
<Upload size={16} />
Export
</button> */}

{/* Delete Button */}
{/* <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition">
<Trash2 size={18} />
Delete
</button> */}
</div> <br /><br />

<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
{/* Roof Type */}
<div className="flex flex-col gap-2">
<label className="text-sm font-medium text-[#15164A]">Project Type</label>
<select
className="p-2 border border-gray-300 rounded-md"
onChange={(e) => handleAreaChange(area.id, "roofType", e.target.value)}
value={area.itemForm.roofType}
>
<option value="">Select</option>
{projectTypeData?.map((category) => (
<option key={category._id} value={category._id}>
{category.projectType}
</option>
))}
</select>
</div>

{/* Roof Model */}
<div className="flex flex-col gap-2">
<label className="text-sm font-medium text-[#15164A]">Roof Model</label>
<select
className="p-2 border border-gray-300 rounded-md"
onChange={(e) => handleAreaChange(area.id, "roofModel", e.target.value)}
value={area.itemForm.roofModel}
>
<option value="">Select Category</option>
{roofModelData.map((roofModel) => (
<option key={roofModel._id} value={roofModel._id}>
{roofModel.roofModel}
</option>
))}
</select>
</div>

{/* Roof Preference */}
<div className="flex flex-col gap-2">
<label className="text-sm font-medium text-[#15164A]">Roof Preference</label>
<select
className="p-2 border border-gray-300 rounded-md"
onChange={(e) => handleAreaChange(area.id, "roofPreference", e.target.value)}
value={area.itemForm.roofPreference}
>
<option value="">Select</option>
<option value="Single Car Parking">Single Car Parking</option>
<option value="Double Car Parking">Double Car Parking</option>
</select>
</div>
</div>


   
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 md:py-5">
{/* Roof Type */}
<div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#15164A]">
          Span
        </label>
        <input
type="text"
className="p-2 border border-gray-300 rounded-md"
placeholder="200m"
value={areaProductData[area.id]?.span || ""}
onChange={(e) => {
const updatedData = { ...areaProductData[area.id], span: e.target.value };
setAreaProductData((prevData) => ({ ...prevData, [area.id]: updatedData }));
}}
/>



      </div>

{/* Roof Model */}
<div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#15164A]">
          Length
        </label>
        <input
type="text"
className="p-2 border border-gray-300 rounded-md"
placeholder="200m"
value={areaProductData[area.id]?.length || ""}
onChange={(e) => {
const updatedData = { ...areaProductData[area.id], length: e.target.value };
setAreaProductData((prevData) => ({ ...prevData, [area.id]: updatedData }));
}}
/>
      </div>

{/* Custom Field */}
<div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#15164A]">
          Height
        </label>
        <input
type="text"
className="p-2 border border-gray-300 rounded-md"
placeholder="200m"
value={areaProductData[area.id]?.height || ""}
onChange={(e) => {
const updatedData = { ...areaProductData[area.id], height: e.target.value };
setAreaProductData((prevData) => ({ ...prevData, [area.id]: updatedData }));
}}
/>
      </div>



</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{areaProductData[area.id]?.materials?.map((item, index) => (
<div key={index} className="grid grid-cols-2 gap-4 col-span-2">
<div className="flex flex-col gap-2">
<label className="text-sm font-medium text-[#15164A]">Material</label>
<input
type="text"
className="p-2 border border-gray-300 rounded-md"
placeholder="Material"
value={item.itemId?.item || ""}
readOnly
/>
</div>
<div className="flex flex-col gap-2">
<label className="text-sm font-medium text-[#15164A]">Quantity</label>
<input
type="text"
className="p-2 border border-gray-300 rounded-md"
placeholder="Quantity"
value={item.unit || ""}
onChange={(e) => {
const updatedMaterials = [...areaProductData[area.id].materials];
updatedMaterials[index].unit = e.target.value;
setAreaProductData((prevData) => ({
  ...prevData,
  [area.id]: { ...prevData[area.id], materials: updatedMaterials },
}));
}}
/>
</div>
</div>
))}
{/* <div className="flex flex-col items-end gap-2 mt-5">
<h1
className="text-lg font-medium underline cursor-pointer text-black-600"
onClick={addNewMaterial}
>
Add New Material
</h1>
</div> */}
</div>







    <div className="mt-4">
      <input type="file" className="border p-2 rounded-md w-full" />
    </div>

    <div className="mt-4 text-right">
    <div className="mt-4 text-right">
              <button
        onClick={addNewArea}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Add New Area +
      </button>
      <button onClick={() => removeArea(area.id)} className="bg-red-500 text-white py-2 px-4 rounded-md ml-4">Remove Area</button>
              </div>
    </div>
 



    <div className="flex justify-start items-center gap-4">
{/* Comments */}
<div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#15164A]">
        Area Sq. Ft
        </label>
        <input
type="text"
className="p-2 border border-gray-300 rounded-md"
placeholder="200m"
value={areaProductData[area.id]?.totalArea || ""}
onChange={(e) => {
const updatedData = {
...areaProductData[area.id],
totalArea: e.target.value,
};
setAreaProductData((prevData) => ({
...prevData,
[area.id]: updatedData,
}));
}}
/></div>

{/* Status Dropdown */}
<div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#15164A]  ">
          Sheet Rate
        </label>
        <input
type="text"
className="p-2 border border-gray-300 rounded-md"
placeholder="200m"
value={areaProductData[area.id]?.sheetRate || ""}
onChange={(e) => {
const updatedData = {
...areaProductData[area.id],
sheetRate: e.target.value,
};
setAreaProductData((prevData) => ({
...prevData,
[area.id]: updatedData,
}));
}}
/></div>
</div> <br /><br />






</div>
))}
  </div>


  <div className="p-6 bg-white shadow-lg  ">
<h2 className="text-lg font-semibold text-indigo-900 mb-4">Estimate</h2>

{/* First Row - Two Fields (Total sq. ft & Total Cost) */}
{/* First Row - Two Fields (Total sq. ft & Total Cost) */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
{/* Total Square Feet */}
<div className="flex items-center gap-2">
<label className="text-sm text-gray-600 w-28">Total sq. ft:</label>
<input
type="text"
value={totalSqFt}
readOnly
className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md text-center"
/>
</div>

{/* Total Cost */}
<div className="flex items-center gap-2">
<label className="text-sm text-gray-600 w-28">Total Cost:</label>
<input
type="text"
value={`₹${totalCost}/-`}
readOnly
className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md text-center"
/>
</div>
</div>


{/* Second Row - Three Fields (Comments, Status, Other Info) */}

</div>


 
            
              

 
 

 
 
</div>
            </div>
 
 
            <div>
            {/* New Layout Based on the Image */}
            <div className="p-6">
  <h2 className="text-lg font-semibold text-indigo-900 mb-4">Schedule Site Visit</h2>
 
  {/* First Row - Select Date, Time, Status */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    {/* Select Date */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Select Date:</label>
      <div className="relative flex-1">
        <input
          type="date"
          className="w-full border border-gray-300 p-2 pl-10 rounded-md focus:outline-indigo-500"
        />
        <Calendar className="absolute left-3 top-3 text-gray-500" size={16} />
      </div>
    </div>
 
    {/* Time Selection */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Time:</label>
      <div className="relative flex-1">
        <input
          type="time"
          className="w-full border border-gray-300 p-2 pl-10 rounded-md focus:outline-indigo-500"
        />
        <Clock className="absolute left-3 top-3 text-gray-500" size={16} />
      </div>
    </div>
 
    {/* Status Dropdown */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Status:</label>
      <select className="w-full border border-gray-300 p-2 rounded-md bg-white">
        <option>Site Visit</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>
    </div>
  </div>
 
  {/* Second Row - Comments & Assign To */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {/* Comments */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Assign To:</label>
      <select className="w-full border border-gray-300 p-2 rounded-md bg-white">
        <option>Select Name</option>
        {siteVisitors.map((visitor) => (
          <option key={visitor._id} value={visitor._id}>
            {visitor.name}
          </option>
        ))}
      </select>
    </div>
 
    {/* Assign To */}
   
  </div>
<br />
  {/* Buttons - Cancel & Add */}
  <div className="flex justify-center gap-4">
    <button className="bg-red-600 text-white px-6 py-2 rounded-md text-lg font-semibold">
      Cancel
    </button>
    <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-semibold">
      Add
    </button>
  </div>
 
  </div>
  <div className="space-y-8 p-4">
  {/*-----------------------Ongoing Projects----------------------- */}
  <div className="bg-white rounded-xl shadow-md p-4 overflow-x-auto">
    <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
      <h2 className="text-xl font-medium text-[#4c48a5] mb-2 md:mb-0">
        Customer Records
      </h2>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded px-2 py-1 w-full sm:w-auto"
        />
        <button
          onClick={() => handleDelete(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
          Filter
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
          Export
        </button>
      </div>
    </div>
 
    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-t border-b border-gray-300 text-left min-w-max">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-300"></th>
            <th className="p-2 border-b border-gray-300">SL No</th>
            <th className="p-2 border-b border-gray-300">Client Name</th>
            <th className="p-2 border-b border-gray-300">Phone Number</th>
            <th className="p-2 border-b border-gray-300">Location</th>
            <th className="p-2 border-b border-gray-300">Work Type</th>
            <th className="p-2 border-b border-gray-300">Status</th>
            <th className="p-2 border-b border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-300">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              <td className="p-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.phone}</td>
              <td className="p-2">{item.location}</td>
              <td className="p-2">{item.roof}</td>
              <td className="p-2 relative">
                <button
                  className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}
                  onClick={() => toggleDropdown(item.id)}
                  style={{ width: "150px", height: "40px" }}
                >
                  <div className="flex justify-center items-center gap-2">
                    <div>{item.status}</div>
                    <div>
                      <img src={dropdown} alt="" />
                    </div>
                  </div>
                </button>
                {dropdownOpen === item.id && (
                  <div className="absolute bg-white shadow-md rounded-md mt-2 w-48 z-10">
                    <button
                      onClick={() => handleStatusChange(item.id, "site visit")}
                      className="w-full text-left p-2 hover:bg-gray-100"
                    >
                      Site Visit
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, "discussion")}
                      className="w-full text-left p-2 hover:bg-gray-100"
                    >
                      Discussion
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, "in-progress")}
                      className="w-full text-left p-2 hover:bg-gray-100"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, "declined")}
                      className="w-full text-left p-2 hover:bg-gray-100"
                    >
                      Declined
                    </button>
                    <button
                      onClick={() => handleStatusChange(item.id, "pending")}
                      className="w-full text-left p-2 hover:bg-gray-100"
                    >
                      Pending
                    </button>
                  </div>
                )}
              </td>
              <td className="p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full">
                  See Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 
    {/* Pagination */}
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0">
      <div>Page {currentPage} of {totalPages}</div>
      <div className="flex space-x-2">
        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === pageIndex + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {pageIndex + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
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