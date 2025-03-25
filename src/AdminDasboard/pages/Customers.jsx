import { useState, useEffect } from "react";
import Sidebar from "../components/SideNav";
import Header from "../components/Header";
import addnew from "../assets/icons/adduser.png";
import { Link, useNavigate } from "react-router-dom";
import { getClient } from "../../api/admin/client/getClient";
import { deleteClient } from "../../api/admin/employee/getEmployee";

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

 

  

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedItems.length === 0) {
      alert("No clients selected.");
      return;
    }


    try {
          const response =  await deleteClient({ clientIds: selectedItems })
         
            console.log(response)
   

      alert(response.message);
      fetchClientData()
      setSelectedItems([]);
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting clients.");
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
          <h1 className="text-3xl font-bold text-[#4c48a5]">Customer</h1>

       

          <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#4c48a5]">Customer Records</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="border border-gray-300 rounded px-2 py-1"
            />
            {selectedItems.length > 0 && (
              <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete Selected
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-t border-b border-gray-300 text-left">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-300"></th>
                <th className="p-2 border-b border-gray-300">SL No</th>
                <th className="p-2 border-b border-gray-300">Client Name</th>
                <th className="p-2 border-b border-gray-300">Phone Number</th>
                <th className="p-2 border-b border-gray-300">Location</th>
                <th className="p-2 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={item._id} className="border-b border-gray-300">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </td>
                    <td className="p-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.phoneNo}</td>
                    <td className="p-2">{item.place}</td>
                    <td className="p-2">
                      <Link to={"customerDetailPage"}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded">
                          See Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>Page {currentPage} of {totalPages}</div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
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