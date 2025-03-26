import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import Header from "../../SalesDashboard/components/Header";
import Sidebar from "../../SalesDashboard/components/Sidebar";
import { Trash2, Upload } from "lucide-react";
import addnew from "../../SalesDashboard/assets/icons/adduser.png";
import addclients from "../../SalesDashboard/assets/icons/addclients.png";
import addestimate from "../../SalesDashboard/assets/icons/addestimate.png";
import dropdown from "../../SalesDashboard/assets/icons/dropdown.png";
import { addNewclient } from "../../api/admin/client/addClient";
import { getClient } from "../../api/admin/client/getClient";
import { getAllProjectType } from "../../api/sales/project/project";
import { getAllCategories } from "../../api/sales/project/project"
import { toast } from "react-toastify";

const SalesDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const navigate = useNavigate();


  const [areas, setAreas] = useState([{ id: 1, name: "Area 1" }]);
  const [showMeasurements, setShowMeasurements] = useState(false);

  const [materials, setMaterials] = useState([{ material: "", quantity: "" }]);

  const addNewMaterial = () => {
    setMaterials([...materials, { material: "", quantity: "" }]);
  };
  // Function to add a new area
  const addNewArea = () => {
    const newArea = {
      id: areas.length + 1,
      name: `Area ${areas.length + 1}`,
    };
    setAreas([...areas, newArea]);
  };

  // Function to remove an area
  const removeArea = (id) => {
    const updatedAreas = areas.filter((area) => area.id !== id);
    setAreas(updatedAreas);
  };


  const [name, setName] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [place, setPlace] = useState("")
  const [district, setDistrict] = useState("")
  const [comments, setComments] = useState("")
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

  // useEffect(() => {
  //   if (Array.isArray(clientList)) {
  //     setFilteredClients(
  //       clientList.filter(client =>
  //         client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //   } else {
  //     console.error("clientList is not an array:", clientList);
  //     setFilteredClients([]);
  //   }
  // }, [searchTerm, clientList]);

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Header toggleSidebar={toggleSidebar} />

        <div className="w-full max-w-full px-5 py-5 space-y-8 bg-gray-100">
          <h1 className="text-3xl font-bold text-[#4c48a5]">Dashboard</h1>

          {/* Action Cards */}
          <div className="grid w-full grid-cols-1 gap-6 px-5 md:grid-cols-3">
            <div className="flex items-center w-full p-4 py-5 space-x-4 bg-white shadow-md rounded-2xl">
              <img src={addnew} alt="Add New Clients" className="w-12 h-12" />
              <div onClick={() => navigate("/salesaddnewclient")} className="cursor-pointer">
                <h2 className="text-lg font-normal">Add New Clients</h2>
                <p className="text-gray-600">To register new clients</p>
              </div>
            </div>
            <div className="flex items-center w-full p-4 py-5 space-x-4 bg-white shadow-md rounded-2xl">
              <img src={addclients} alt="Existing Clients" className="w-12 h-12" />
              <div>
                <h2 className="text-lg font-normal">Existing Clients</h2>
                <p className="text-gray-600">View existing clients</p>
              </div>
            </div>
            <div className="flex items-center w-full p-4 py-5 space-x-4 bg-white shadow-md rounded-2xl">
              <img src={addestimate} alt="Create an Estimate" className="w-12 h-12" />
              <div>
                <h2 className="text-lg font-normal">Create an Estimate</h2>
                <p className="text-gray-600">Generate client estimates</p>
              </div>
            </div>
          </div>

          {/* Customer Records Table */}
          <div className="w-full space-y-8">
            {/* Add New Client Section */}
            <div className="w-full p-6 bg-white rounded-lg shadow-md">


              <h2 className="flex items-center justify-between text-lg font-semibold text-indigo-900">
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
              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-sm text-gray-600">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amal"
                    className="flex-1 p-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-sm text-gray-600">Phone:</label>
                  <input
                    type="text"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="676876872"
                    className="flex-1 p-2 text-gray-800 bg-gray-200 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-sm text-gray-600">Place:</label>
                  <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Kochi"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-indigo-500"
                  />
                </div>
              </div>

              {/* Second Row - Two Input Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <label className="w-24 text-sm text-gray-600">District:</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="District"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-sm text-gray-600">Comments:</label>
                  <input
                    type="text"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add comments"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-indigo-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-5 py-6">
                <button
                  className="px-6 py-3 text-lg text-white transition bg-red-600 rounded-lg shadow-md hover:bg-red-700"
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
                  className="px-6 py-3 ml-4 text-lg text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>

              <div className="pt-5">

                {areas.map((area) => (
                  <div key={area.id} className="p-6 ">
                    <h2 className="mb-6 text-lg font-semibold text-indigo-900">{area.name}</h2>
                    <div className="flex items-center justify-end gap-2">
                      {/* Export Button */}
                      <button className="flex items-center gap-1 px-3 py-1 text-gray-700 transition border border-gray-300 rounded-md hover:bg-gray-100">
                        <Upload size={16} />
                        Export
                      </button>

                      {/* Delete Button */}
                      <button className="flex items-center gap-1 text-gray-600 transition hover:text-red-600">
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2 py-5">
                      <div className="relative flex items-center justify-center gap-2">
                        <label className="text-sm text-gray-600">Client Name:</label>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search Client"
                          className="p-2 bg-white border border-gray-300 rounded-md w-100 focus:outline-indigo-500"
                        />

                        {/* Show dropdown only if there are matching results */}
                        {filteredClients.length > 0 && (
                          <ul className="absolute left-0 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-full max-h-48">
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
                        className="text-lg underline cursor-pointer text-decoration"
                        onClick={() => setShowMeasurements(!showMeasurements)}
                      >
                        Custom Measurements
                      </h1>


                    </div>
                    <br />


                    <div className="grid grid-cols-1 gap-2 mb-4 md:grid-cols-3">
                      <div className="flex items-center">
                        <label className="w-24 text-sm text-gray-600">Project Type:</label>
                        <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
                          <option value="">Select a type</option>
                          {projectTypes.map((type, index) => (
                            <option key={type._id} value={type.projectType}>
                              {type.projectType}
                            </option>
                          ))}
                        </select>

                      </div>
                      <div className="flex items-center gap-2">
                        <label className="w-24 text-sm text-gray-600">Roof Model:</label>
                        <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white text-black">
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.roofModel}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 md:pl-10">

                        <select className="p-2 bg-white border border-gray-300 rounded-md w-100 focus:outline-indigo-500 ">
                          <option value="" >
                            double car parking
                          </option>
                          <option value="car porch">car porch</option>
                          <option value="auditorium">auditorium</option>

                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <select className="w-full p-2 border rounded-md">
                        <option>Materials</option>
                      </select>
                      <select className="w-full p-2 border rounded-md">
                        <option>Materials</option>
                      </select>
                      <select className="w-full p-2 border rounded-md">
                        <option>Materials</option>
                      </select>
                      <select className="w-full p-2 border rounded-md">
                        <option>Materials</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-4 md:grid-cols-3 md:py-5">
                      {/* Roof Type */}
                      <div className="flex items-center">
                        <label className="w-24 text-sm text-gray-600">Span:</label>
                        <input
                          type="text"
                          placeholder="250m"
                          className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
                        />
                      </div>

                      {/* Roof Model */}
                      <div className="flex items-center gap-2">
                        <label className="w-24 text-sm text-gray-600">Length:</label>
                        <input
                          type="text"
                          placeholder="200m"
                          className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
                        />
                      </div>

                      {/* Custom Field */}
                      <div className="flex items-center gap-2 md:pl-10">
                        <label className="w-24 text-sm text-gray-600">Height:</label>
                        <input
                          type="text"
                          placeholder="250m"
                          className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
                        />
                      </div>
                    </div>

                    {showMeasurements && (
                      <div className="mt-4">


                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#15164A]">
                              Material
                            </label>
                            <input
                              type="text"
                              className="p-2 border border-gray-300 rounded-md"
                              placeholder="ISMb 150/ISM"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#15164A]">
                              Quantity
                            </label>
                            <input
                              type="text"
                              className="p-2 border border-gray-300 rounded-md"
                              placeholder="Meter"
                            />
                          </div>
                        </div> <br />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          {materials.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 col-span-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#15164A]">Material</label>
                                <input
                                  type="text"
                                  className="p-2 border border-gray-300 rounded-md"
                                  placeholder="ISMb 150/ISM"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#15164A]">Quantity</label>
                                <input
                                  type="text"
                                  className="p-2 border border-gray-300 rounded-md"
                                  placeholder="Meter"
                                />
                              </div>
                            </div>
                          ))}
                          <div className="flex flex-col items-end gap-2 mt-5">
                            <h1
                              className="text-lg font-medium underline cursor-pointer text-black-600"
                              onClick={addNewMaterial}
                            >
                              Add New Material
                            </h1>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="text-sm text-gray-600">Type of Panel:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Off Set:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Sheet Thickness:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="text-sm text-gray-600">Center Height:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Extra Panel:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">No of Bay:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <label className="text-sm text-gray-600">Cutting Length:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Final Cutting:</label>
                            <input type="text" placeholder="00" className="w-full p-2 border rounded-md" />
                          </div>
                        </div>
                      </div>
                    )}


                    <div className="flex items-center w-full gap-2">
                      <label className="text-sm text-gray-600 w-medium">Comments:</label>
                      <input
                        type="text"
                        placeholder="Enter comment"
                        className="w-5/6 p-2 bg-white border border-gray-300 rounded-md focus:outline-indigo-500"
                      />
                    </div>


                    <div className="mt-4">
                      <input type="file" className="p-2 border rounded-md w-small" />
                    </div>

                    <div className="mt-4 text-right">
                      <button
                        onClick={addNewArea}
                        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md"
                      >
                        Add New Area +
                      </button>
                      <button
                        onClick={() => removeArea(area.id)}
                        className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
                      >
                        Remove Area
                      </button>
                    </div>


                  </div>))}
              </div>


              <div className="p-6 ">
                <h2 className="mb-4 text-lg font-semibold text-indigo-900">Estimate</h2>

                {/* First Row - Two Fields (Total sq. ft & Total Cost) */}
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  {/* Total Square Feet */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Total sq. ft:</label>
                    <input
                      type="text"
                      value="1023.54"
                      readOnly
                      className="flex-1 p-2 text-center text-gray-800 bg-gray-200 rounded-md"
                    />
                  </div>

                  {/* Total Cost */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Total Cost:</label>
                    <input
                      type="text"
                      value="₹57800/-"
                      readOnly
                      className="flex-1 p-2 text-center text-gray-800 bg-gray-200 rounded-md"
                    />
                  </div>
                </div>

                {/* Second Row - Three Fields (Comments, Status, Other Info) */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Comments */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Comments:</label>
                    <input
                      type="text"
                      placeholder="Enter comments"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-indigo-500"
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Status:</label>
                    <select className="flex-1 p-2 bg-white border border-gray-300 rounded-md">
                      <option>Site Visit</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                  </div>

                  {/* Additional Field (if needed) */}

                </div>
              </div>
              {/* New Layout Based on the Image */}
              <div className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-indigo-900">Schedule Site Visit</h2>

                {/* First Row - Select Date, Time, Status */}
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                  {/* Select Date */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Select Date:</label>
                    <div className="relative flex-1">
                      <input
                        type="date"
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-indigo-500"
                      />
                      <Calendar className="absolute text-gray-500 left-3 top-3" size={16} />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Time:</label>
                    <div className="relative flex-1">
                      <input
                        type="time"
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-indigo-500"
                      />
                      <Clock className="absolute text-gray-500 left-3 top-3" size={16} />
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Status:</label>
                    <select className="w-full p-2 bg-white border border-gray-300 rounded-md">
                      <option>Site Visit</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Second Row - Comments & Assign To */}
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                  {/* Comments */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Comments:</label>
                    <input
                      type="text"
                      placeholder="Enter comments"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-indigo-500"
                    />
                  </div>

                  {/* Assign To */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-28">Assign To:</label>
                    <select className="w-full p-2 bg-white border border-gray-300 rounded-md">
                      <option>Select Name</option>
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                    </select>
                  </div>
                </div>
                <br />
                {/* Buttons - Cancel & Add */}
                <div className="flex justify-center gap-4">
                  <button className="px-6 py-2 text-lg font-semibold text-white bg-red-600 rounded-md">
                    Cancel
                  </button>
                  <button className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md">
                    Add
                  </button>
                </div>


                <div className="p-4 space-y-8">
                  {/*-----------------------Ongoing Projects----------------------- */}
                  <div className="p-4 overflow-x-auto bg-white shadow-md rounded-xl">
                    <div className="flex flex-col items-center mb-4 md:flex-row md:justify-between">
                      <h2 className="text-xl font-medium text-[#4c48a5] mb-2 md:mb-0">
                        Customer Records
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={search}
                          onChange={handleSearch}
                          className="w-full px-2 py-1 border border-gray-300 rounded sm:w-auto"
                        />
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 text-white bg-red-500 rounded"
                        >
                          Delete
                        </button>
                        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded">
                          Filter
                        </button>
                        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded">
                          Export
                        </button>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-t border-b border-collapse border-gray-300 min-w-max">
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
                              <td className="relative p-2">
                                <button
                                  className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}
                                  onClick={() => toggleDropdown(item.id)}
                                  style={{ width: "150px", height: "40px" }}
                                >
                                  <div className="flex items-center justify-center gap-2">
                                    <div>{item.status}</div>
                                    <div>
                                      <img src={dropdown} alt="" />
                                    </div>
                                  </div>
                                </button>
                                {dropdownOpen === item.id && (
                                  <div className="absolute z-10 w-48 mt-2 bg-white rounded-md shadow-md">
                                    <button
                                      onClick={() => handleStatusChange(item.id, "site visit")}
                                      className="w-full p-2 text-left hover:bg-gray-100"
                                    >
                                      Site Visit
                                    </button>
                                    <button
                                      onClick={() => handleStatusChange(item.id, "discussion")}
                                      className="w-full p-2 text-left hover:bg-gray-100"
                                    >
                                      Discussion
                                    </button>
                                    <button
                                      onClick={() => handleStatusChange(item.id, "in-progress")}
                                      className="w-full p-2 text-left hover:bg-gray-100"
                                    >
                                      In Progress
                                    </button>
                                    <button
                                      onClick={() => handleStatusChange(item.id, "declined")}
                                      className="w-full p-2 text-left hover:bg-gray-100"
                                    >
                                      Declined
                                    </button>
                                    <button
                                      onClick={() => handleStatusChange(item.id, "pending")}
                                      className="w-full p-2 text-left hover:bg-gray-100"
                                    >
                                      Pending
                                    </button>
                                  </div>
                                )}
                              </td>
                              <td className="p-2">
                                <button className="px-3 py-1 text-white bg-blue-500 rounded-full">
                                  See Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col items-center justify-between mt-4 space-y-2 sm:flex-row sm:space-y-0">
                      <div>Page {currentPage} of {totalPages}</div>
                      <div className="flex space-x-2">
                        {[...Array(totalPages)].map((_, pageIndex) => (
                          <button
                            key={pageIndex}
                            onClick={() => handlePageChange(pageIndex + 1)}
                            className={`px-3 py-1 rounded ${currentPage === pageIndex + 1
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

export default SalesDashboard;
