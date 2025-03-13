import React, { useState } from "react";
import Sidebar from "../components/SideNav";
import Header from "../components/Header";
import plussquare from "../assets/icons/plussquare.png";

const Projects = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Completed"); // Set default tab to "Completed"
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const CompletedProject = [
    {
      id: 1,
      name: "Kevin",
      date: "22-10-2024",
      location: "Kochi",
      roof: "Car Porch",
      amount: "14500",
      payment: "On-going",
    },
    {
      id: 2,
      name: "Sophia",
      date: "15-11-2024",
      location: "Delhi",
      roof: "Terrace",
      amount: "12500",
      payment: "On-going",
    },
    {
      id: 3,
      name: "Ethan",
      date: "10-09-2024",
      location: "Mumbai",
      roof: "Balcony",
      amount: "18200",
      payment: "On-going",
    },
    {
      id: 4,
      name: "Olivia",
      date: "18-08-2024",
      location: "Chennai",
      roof: "Shed",
      amount: "10200",

      payment: "On-going",
    },
    {
      id: 5,
      name: "Liam",
      date: "02-12-2024",
      location: "Pune",
      roof: "Car Porch",
      amount: "20200",
      payment: "On-going",
    },
    {
      id: 6,
      name: "Emma",
      date: "26-10-2024",
      location: "Bangalore",
      roof: "Terrace",
      amount: "19200",
      payment: "On-going",
    },
    {
      id: 7,
      name: "James",
      date: "14-09-2024",
      location: "Hyderabad",
      roof: "Balcony",
      amount: "30000",
      payment: "On-going",
    },
    {
      id: 8,
      name: "Isabella",
      date: "22-07-2024",
      location: "Kolkata",
      roof: "Shed",
      amount: "13200",
      payment: "On-going",
    },
    {
      id: 9,
      name: "Mason",
      date: "05-06-2024",
      location: "Jaipur",
      roof: "Car Porch",
      amount: "17200",
      payment: "On-going",
    },
    {
      id: 10,
      name: "Ava",
      date: "12-05-2024",
      location: "Lucknow",
      roof: "Terrace",
      amount: "12330",
      payment: "On-going",
    },
    {
      id: 11,
      name: "Alexander",
      date: "19-04-2024",
      location: "Surat",
      roof: "Balcony",
      amount: "12200",
      payment: "On-going",
    },
    {
      id: 12,
      name: "Mia",
      date: "08-03-2024",
      location: "Kanpur",
      roof: "Shed",
      amount: "11200",
      payment: "On-going",
    },
    {
      id: 13,
      name: "Noah",
      date: "17-02-2024",
      location: "Nagpur",
      roof: "Car Porch",
      amount: "18200",
      payment: "On-going",
    },
    {
      id: 14,
      name: "Ella",
      date: "24-01-2024",
      location: "Patna",
      roof: "Terrace",
      amount: "432232",
      payment: "On-going",
    },
  ];

  const OngoingProject = [
    {
      id: 1,
      name: "Mia",
      phone: "+91 8876 5433 21",
      location: "Thrissur",
      roof: "Auditorium",
      assignto: "Manu",
      status: "ongoing",
    },
    {
      id: 2,
      name: "Sophia",
      phone: "+91 9876 5432 10",
      location: "Kochi",
      roof: "Library",
      assignto: "Amit",
      status: "pending",
    },
    {
      id: 3,
      name: "Liam",
      phone: "+91 9123 4567 89",
      location: "Kottayam",
      roof: "Terrace",
      assignto: "Arun",
      status: "ongoing",
    },
    {
      id: 4,
      name: "James",
      phone: "+91 9845 3210 67",
      location: "Calicut",
      roof: "Conference Room",
      assignto: "Ravi",
      status: "pending",
    },
    {
      id: 5,
      name: "Emma",
      phone: "+91 9998 7654 32",
      location: "Trivandrum",
      roof: "Car Porch",
      assignto: "Naveen",
      status: "ongoing",
    },
    {
      id: 6,
      name: "Isabella",
      phone: "+91 9556 8776 45",
      location: "Malappuram",
      roof: "Shed",
      assignto: "Suresh",
      status: "pending",
    },
    {
      id: 7,
      name: "Ethan",
      phone: "+91 9056 4321 23",
      location: "Ernakulam",
      roof: "Balcony",
      assignto: "Vijay",
      status: "ongoing",
    },
    {
      id: 8,
      name: "Ava",
      phone: "+91 8732 6789 12",
      location: "Alappuzha",
      roof: "Gym",
      assignto: "Shyam",
      status: "pending",
    },
    {
      id: 9,
      name: "Noah",
      phone: "+91 8345 2345 56",
      location: "Palakkad",
      roof: "Storage Room",
      assignto: "Manoj",
      status: "ongoing",
    },
    {
      id: 10,
      name: "Olivia",
      phone: "+91 8657 3421 78",
      location: "Wayanad",
      roof: "Workshop",
      assignto: "Hari",
      status: "pending",
    },
    {
      id: 11,
      name: "Mason",
      phone: "+91 8432 9876 90",
      location: "Idukki",
      roof: "Classroom",
      assignto: "Sanjay",
      status: "ongoing",
    },
    {
      id: 12,
      name: "Alexander",
      phone: "+91 9123 8765 43",
      location: "Kollam",
      roof: "Office",
      assignto: "Pradeep",
      status: "pending",
    },
    {
      id: 13,
      name: "Amelia",
      phone: "+91 9678 2345 56",
      location: "Pathanamthitta",
      roof: "Warehouse",
      assignto: "Rajesh",
      status: "ongoing",
    },
    {
      id: 14,
      name: "Harper",
      phone: "+91 9876 3456 78",
      location: "Kozhikode",
      roof: "Reception",
      assignto: "Biju",
      status: "pending",
    },
  ];

  const data = activeTab === "Completed" ? CompletedProject : OngoingProject;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // -------------pop up--------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleSeeDetails = (item) => {
    setModalData(item); // Set the data for the modal
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setModalData(null); // Clear the modal data
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="p-6 space-y-8 bg-gray-100 overflow-auto">
          <h1 className="text-3xl font-bold text-[#4c48a5]">Projects</h1>

          <div className="flex gap-4 mb-4">
            <button
              className={`text-lg font-semibold ${
                activeTab === "Completed"
                  ? "text-[#4c48a5] border-b-2 border-[#4c48a5]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Completed")}
            >
              Completed Projects
            </button>
            <button
              className={`text-lg font-semibold ${
                activeTab === "Ongoing"
                  ? "text-[#4c48a5] border-b-2 border-[#4c48a5]"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Ongoing")}
            >
              Ongoing Projects
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="mb-4">
              <div className="">
                <div className="flex justify-between">
                  <div>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={handleSearch}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded mr-2"
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
              </div>
            </div>

            <table className="w-full border-collapse border-t border-b border-gray-300 text-left">
              <thead>
                <tr>
                  <th className="p-2 border-b border-gray-300">SL No</th>
                  <th className="p-2 border-b border-gray-300">Client Name</th>
                  {activeTab === "Completed" ? (
                    <>
                      <th className="p-2 border-b border-gray-300">Date</th>
                      <th className="p-2 border-b border-gray-300">Location</th>
                      <th className="p-2 border-b border-gray-300">
                        Work Type
                      </th>
                      <th className="p-2 border-b border-gray-300">Amount</th>
                      <th className="p-2 border-b border-gray-300">Payment</th>
                    </>
                  ) : (
                    <>
                      <th className="p-2 border-b border-gray-300">Phone</th>
                      <th className="p-2 border-b border-gray-300">Location</th>
                      <th className="p-2 border-b border-gray-300">
                        Work Type
                      </th>
                      <th className="p-2 border-b border-gray-300">
                        Assign To
                      </th>
                      <th className="p-2 border-b border-gray-300">Status</th>
                    </>
                  )}
                  <th className="p-2 border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="p-2">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="p-2">{item.name}</td>
                    {activeTab === "Completed" ? (
                      <>
                        <td className="p-2">{item.date}</td>
                        <td className="p-2">{item.location}</td>
                        <td className="p-2">{item.roof}</td>
                        <td className="p-2">{item.amount}</td>
                        <td className="p-2">{item.payment}</td>
                      </>
                    ) : (
                      <>
                        <td className="p-2">{item.phone}</td>
                        <td className="p-2">{item.location}</td>
                        <td className="p-2">{item.roof}</td>
                        <td className="p-2">{item.assignto}</td>
                        <td
                          className={`p-2 ${
                            item.status === "ongoing"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.status}
                        </td>
                      </>
                    )}
                    <td className="p-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => handleSeeDetails(item)}
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div>
                Page {currentPage} of {totalPages}
              </div>
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
          <div className=" w-full max-w-6xl p-6 rounded-lg relative  ">
            <div className="bg-white p-6 rounded-md shadow-md mb-6 md:mt-32 md:ml-32 max-h-screen overflow-y-auto md:w-full">
              <h2 className="text-xl font-medium mb-4 text-[#15164A]">
                Client details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Row 1 */}
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    Name
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Name"
                  />
                </div>
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    Phone No
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Phone No"
                  />
                </div>
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    Place
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Place"
                  />
                </div>

                {/* Row 2 */}
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    District
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="District"
                  />
                </div>

                <div className="flex  justify-center items-center">
                  <label className="w-1/4 text-sm font-medium text-[#15164A]">
                    Comments
                  </label>
                  <textarea
                    type="text"
                    className="flex-1 p-2 md:w-96 border border-gray-300 rounded-md"
                    placeholder="Comments"
                  />
                </div>

                {/* Row 3 */}
              </form>

              {/* Area Details */}
              <div className=" md:py-6 ">
                <h2 className="text-xl font-medium mb-4">Area 1</h2>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5">
                  <div className="flex justify-center items-center gap-5">
                    <label className="block text-sm font-medium text-[#15164A]">
                      Work Type
                    </label>
                    <select className="mt-1 block w-52 p-2 border border-gray-300 rounded-md">
                      <option>Select Type</option>
                    </select>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <label className="block text-sm font-medium text-[#15164A]">
                      Work Model
                    </label>
                    <select className="mt-1 block w-52 p-2 border border-gray-300 rounded-md">
                      <option>Select Model</option>
                    </select>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <label className="block text-sm font-medium text-[#15164A]">
                      Height
                    </label>
                    <select className="mt-1 block w-52 p-2 border border-gray-300 rounded-md">
                      <option>Select Preference</option>
                    </select>
                  </div>
                </form>
                <div className="space-y-2">
                  {/* Material Dropdown */}
                  <div>
                    <select className=" p-2 border border-gray-300 rounded-md md:mt-4">
                      <option>Material</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5 ">
                    <div className="flex justify-center items-center gap-4">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Span
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-5">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Length
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Height
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                  </div>
                  {/* Material2 Dropdown */}
                </div>
                <div className="space-y-2">
                  {/* Material Dropdown */}
                  <div>
                    <select className=" p-2 border border-gray-300 rounded-md md:mt-4">
                      <option>Materials</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5 ">
                    <div className="flex justify-center items-center gap-3">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Span
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-5">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Length
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Height
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                  </div>
                  {/* Material2 Dropdown */}
                </div>
                <div className="space-y-2">
                  {/* Material Dropdown */}
                  <div>
                    <select className=" p-2 border border-gray-300 rounded-md md:mt-4">
                      <option>Material</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5 ">
                    <div className="flex justify-center items-center gap-3">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Span
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-5">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Length
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <label className="block text-sm font-medium text-[#15164A]">
                        Height
                      </label>
                      <input
                        className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                        placeholder="meter"
                      />
                    </div>
                  </div>
                  {/* ----------------------------- */}
                  <div className="flex md:py-3 items-center justify-between  gap-5">
                    <label className="block text-sm font-medium text-[#15164A]">
                      Comments
                    </label>
                    <textarea
                      name=""
                      id=""
                      className="border border-gray-300 rounded-md w-full md:w-[90%]"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between w-full md:px-10">
                    {/* Upload Field */}
                    <div className="flex items-center">
                      <label className="flex flex-col items-center max-w-sm p-2 bg-gray-100 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 mb-1 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 16l4-4m0 0l4 4m-4-4v12m12 0h-4m4 0a4 4 0 01-4-4m0-4l-4 4m0 0l4-4m0 0v12"
                          />
                        </svg>
                        <span className="text-sm text-gray-500">
                          Choose File
                        </span>
                        <input type="file" className="hidden" />
                      </label>
                      <span className="ml-4 text-sm text-gray-500">
                        No file chosen
                      </span>
                    </div>

                    {/* H1 Element */}
                    <div className="flex items-center gap-1">
                      <h1 className="text-lg font-semibold underline">
                        Add New Area
                      </h1>
                      <img src={plussquare} alt="" />
                    </div>
                  </div>

                  {/* --------------------------------- */}

                  {/* Material2 Dropdown */}
                </div>
                {/* ---------------------------------------- */}
              </div>
              <h2 className="text-xl font-medium mb-4"> Estimate</h2>

              <form className="col md:flex gap-6">
                <div className="flex justify-center items-center gap-5">
                  <label className="block text-sm font-medium text-[#15164A]">
                    Total sq. ft
                  </label>
                  <input
                    className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                    placeholder="1023.54"
                  />
                </div>
                <div className="flex justify-center items-center gap-5">
                  <label className="block text-sm font-medium text-[#15164A]">
                    Total Cost
                  </label>
                  <input
                    className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                    placeholder="₹57800/-"
                  />
                </div>
                <div className="flex justify-center items-center gap-5">
                  <label className="block text-sm font-medium text-[#15164A]">
                    Sq.ft Rate
                  </label>
                  <input
                    className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
                    placeholder="₹57800/-"
                  />
                </div>
              </form>

              <div className="flex md:pt-6 gap-12">
                <div className="flex  justify-center items-center">
                  <label className="w-1/4 text-sm font-medium text-[#15164A]">
                    Comments
                  </label>
                  <textarea
                    type="text"
                    className="flex-1 p-2 md:w-96 border border-gray-300 rounded-md w-96 "
                    placeholder="Comments"
                  />
                </div>
                <div className="flex  justify-center items-center gap-2">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    Status
                  </label>
                  <select className=" p-2 border border-gray-300 rounded-md ">
                    <option className="text-[#15164A]">Site Visit</option>
                  </select>
                </div>
              </div>

              <h2 className="text-xl font-medium mb-4 md:mt-6">
                Schedule Site Visit
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Row 1 */}
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    Name
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Name"
                  />
                </div>
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    Phone No
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Phone No"
                  />
                </div>
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    Place
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Place"
                  />
                </div>

                {/* Row 2 */}
                <div className="flex  justify-center items-center">
                  <label className="w-1/3 text-sm font-medium text-[#15164A]">
                    District
                  </label>
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="District"
                  />
                </div>

                <div className="flex  justify-center items-center">
                  <label className="w-1/4 text-sm font-medium text-[#15164A]">
                    Comments
                  </label>
                  <textarea
                    type="text"
                    className="flex-1 p-2 md:w-96 border border-gray-300 rounded-md"
                    placeholder="Comments"
                  />
                </div>

                {/* Row 3 */}
              </form>
            </div>
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
