import { useState, useEffect } from "react";
import Sidebar from "../components/SideNav";
import Header from "../components/Header";
import addnew from "../assets/icons/adduser.png";
import { Link, useNavigate } from "react-router-dom";
import { getClient } from "../../api/admin/client/getClient";

const Customers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      setLoading(true);
      const response = await getClient();
      console.log(response);
      setData(response.data.clients);
      setError(null);
    } catch (err) {
      setError("Failed to fetch client data");
      console.error("Error fetching client data:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleCheckboxChange = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async (ids) => {
    try {
      setData(prev => prev.filter(item => !ids.includes(item._id)));
      setSelectedItems([]);
    } catch (err) {
      console.error("Error deleting clients:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase().replace(/\s+/g, "")) {
      case "sitevisit":
      case "site visit":
        return "bg-orange-500 text-white"; // Orange for site visit
      case "estimatecreated":
        return "bg-blue-500 text-white"; // Blue for estimate created
      case "completed":
        return "bg-green-600 text-white"; // Dark green for completed
      case "pending":
        return "bg-yellow-500 text-white"; // Yellow for pending
      case "in-progress":
        return "bg-indigo-500 text-white"; // Indigo for in-progress
      default:
        return "bg-gray-500 text-white"; // Gray for unknown status
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Not Set";
    
    // Convert to title case and handle special cases
    return status.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(" ");
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <div className="p-6 space-y-8 bg-gray-100 overflow-auto">
          <h1 className="text-3xl font-bold text-[#4c48a5]">Projects</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-2xl shadow-md flex items-center space-x-4 py-5">
              <div className="text-blue-500 text-3xl">
                <img src={addnew} alt="Add new client" />
              </div>
              <div
                onClick={() => navigate("/admin/addnewclient")}
                className="cursor-pointer"
              >
                <h2 className="text-lg font-normal">Add New Clients</h2>
                <p className="text-gray-600">To register new clients</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#4c48a5]">
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
                  {selectedItems.length > 0 && (
                    <button
                      onClick={() => handleDelete(selectedItems)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete Selected
                    </button>
                  )}
                  {/* <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
                    Filter
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
                    Export
                  </button> */}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-t border-b border-gray-300 text-left">
                  <thead>
                    <tr>
                      <th className="p-2 border-b border-gray-300"></th>
                      <th className="p-2 border-b border-gray-300">SL No</th>
                      {/* <th className="p-2 border-b border-gray-300">Client ID</th> */}
                      <th className="p-2 border-b border-gray-300">Client Name</th>
                      <th className="p-2 border-b border-gray-300">Phone Number</th>
                      <th className="p-2 border-b border-gray-300">Location</th>
                      <th className="p-2 border-b border-gray-300">Status</th>
                      <th className="p-2 border-b border-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={item._id} className="border-b border-gray-300">
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item._id)}
                            onChange={() => handleCheckboxChange(item._id)}
                          />
                        </td>
                        <td className="p-2">
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </td>
                        {/* <td className="p-2">{item.clientId}</td> */}
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.phoneNo}</td>
                        <td className="p-2">{item.place}</td>
                        <td className="p-2">
                          <div
                            className={`px-3 py-1 rounded-full ${getStatusColor(
                              item.estimate?.status
                            )} flex justify-center items-center`}
                            style={{
                              width: "150px",
                              height: "40px",
                            }}
                          >
                            {formatStatus(item.estimate?.status)}
                          </div>
                        </td>
                        <td className="p-2">
  <Link to={"customerDetailPage"}>
    <button>
      See Details
    </button>
  </Link>
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
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

export default Customers;