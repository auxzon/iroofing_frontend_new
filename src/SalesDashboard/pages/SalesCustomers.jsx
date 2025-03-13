import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../SalesDashboard/components/Header";
import Sidebar from "../../SalesDashboard/components/Sidebar";

import addnew from "../../SalesDashboard/assets/icons/adduser.png";
import addclients from "../../SalesDashboard/assets/icons/addclients.png";
import addestimate from "../../SalesDashboard/assets/icons/addestimate.png";
import dropdown from "../../SalesDashboard/assets/icons/dropdown.png";

const SalesCustomers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      status: "discussion",
    },
    {
      id: 3,
      name: "Gustavo",
      phone: "+91 9867 5433 33",
      location: "Thrissur",
      roof: "Car Porch",
      status: "pending",
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
      status: "discussion",
    },

    {
      id: 7,
      name: "Ashlynn",
      phone: "+91 9876 6789 23",
      location: "Kochi",
      roof: "Car Porch",
      status: "pending",
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

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  //   const handleSearch = (event) => setSearch(event.target.value);
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const sortedAndFilteredData = OngoingProject.filter((item) =>
      item.name.toLowerCase().includes(value)
    ).sort((a, b) => a.name.localeCompare(b.name));

    setData(sortedAndFilteredData);
  };

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

  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(/\s+/g, "")) {
      case "sitevisit":
      case "site visit":
        return "bg-[#CF7933] text-white";
      case "discussion":
        return "bg-[#3C3EC3] text-white";
      case "inprogress":
      case "in-progress":
      case "progress":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <div className=" space-y-8 bg-gray-100  p-5 ">
          <h1 className="text-3xl font-bold text-[#4c48a5]">Dashboard</h1>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-2xl shadow-md flex items-center space-x-4 py-5">
              <img src={addnew} alt="Add New Clients" className="w-12 h-12" />
              <div
                onClick={() => navigate("/salesaddnewclient")}
                className="cursor-pointer"
              >
                <h2 className="text-lg font-normal">Add New Clients</h2>
                <p className="text-gray-600">To register new clients</p>
              </div>
            </div>
          </div>

          {/* Customer Records Table */}
          <div className="space-y-8">
            {/*-----------------------Ongoing Projects----------------------- */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-[#4c48a5]">
                  Customer Records
                </h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    className="border border-gray-300 rounded px-2 py-1"
                  />
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
                {/* ---//---//---//---//---//---//---//---//---//---//---//---//---//---//---//---//---//---//------------------ */}
              </div>
              <table className="w-full border-collapse border-t border-b border-gray-300 text-left">
                <thead>
                  <tr>
                    <th className="p-2 border-b border-gray-300"></th>
                    <th className="p-2 border-b border-gray-300">SL No</th>
                    <th className="p-2 border-b border-gray-300">
                      Client Name
                    </th>
                    <th className="p-2 border-b border-gray-300">
                      Phone Number
                    </th>
                    <th className="p-2 border-b border-gray-300">Location</th>
                    <th className="p-2 border-b border-gray-300">Work Type</th>
                    <th className="p-2 border-b border-gray-300">Status</th>
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
                      <td className="p-2">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.phone}</td>
                      <td className="p-2">{item.location}</td>
                      <td className="p-2">{item.roof}</td>
                      {/* <td className="p-2">
                        <button
                          className={`px-3 py-1 rounded-full ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status} ⬇︎
                        </button>
                      </td> */}
                      <td className="p-2">
                        <button
                          className={`px-3  py-1 rounded-full ${getStatusColor(
                            item.status
                          )}`}
                          onClick={() => toggleDropdown(item.id)}
                          style={{
                            width: "150px", // Fixed width
                            height: "40px", // Fixed height
                          }} // Toggle dropdown visibility
                        >
                          <div className="flex justify-center items-center gap-2">
                            <div>{item.status}</div>
                            <div>
                              {" "}
                              <img src={dropdown} alt="" />
                            </div>
                          </div>
                        </button>
                        {dropdownOpen === item.id && (
                          <div className="absolute bg-white shadow-md rounded-md mt-2 w-48">
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "site visit")
                              }
                              className="w-full text-left p-2 hover:bg-gray-100"
                            >
                              Site Visit
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "discussion")
                              }
                              className="w-full text-left p-2 hover:bg-gray-100"
                            >
                              Discussion
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "in-progress")
                              }
                              className="w-full text-left p-2 hover:bg-gray-100"
                            >
                              In Progress
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "pending")
                              }
                              className="w-full text-left p-2 hover:bg-gray-100"
                            >
                              Pending
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(item.id, "declined")
                              }
                              className="w-full text-left p-2 hover:bg-gray-100"
                            >
                              Declined
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
      </div>
    </div>
  );
};

export default SalesCustomers;
