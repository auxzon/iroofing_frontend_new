import { useState, useEffect } from "react";
import Header from "../components/Header";
import addnew from "../assets/icons/adduser.png";
import addclients from "../assets/icons/addclients.png";
import addestimate from "../assets/icons/addestimate.png";
import SideNav from "../components/SideNav";
import { useNavigate } from "react-router-dom";
import { deleteEstimate, getEmployee } from "../../api/admin/employee/getEmployee";
import { getProjectStatus } from "../../api/admin/projects/projectstatus";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  const [ongoingProjects, setongoingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);

  console.log("ongoingProjects", ongoingProjects);
  console.log("completedProjects", completedProjects);




  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleCheckboxChange = (projectId) => {
    setSelectedProjects((prevSelected) =>
      prevSelected.includes(projectId)
        ? prevSelected.filter((id) => id !== projectId)
        : [...prevSelected, projectId]
    );
  };

  const handleDelete = async () => {
    if (selectedProjects.length === 0) {
      alert("Please select at least one project to delete.");
      return;
    }

    try {
      const response = await deleteEstimate({ ids: selectedProjects });
      console.log(response);


      alert("Deleted successfully!");
      window.location.reload();
      setSelectedProjects([]); // Clear selection after deletion
      // Refresh or fetch updated project list
    } catch (error) {
      console.error("Error deleting projects:", error);
      alert("Failed to delete projects.");
    }
  };

  useEffect(() => {
    fetchProjectStatus();
  }, []);

  useEffect(() => {
    console.log("Updated Ongoing Projects:", ongoingProjects);
  }, [ongoingProjects]);


  const fetchProjectStatus = async () => {
    try {
      setLoading(true);
      const response = await getProjectStatus();
      if (!response || !response.data) throw new Error("Invalid response format");

      console.log("Project Data:", response.data);
      const projects = response.data || [];
      setongoingProjects(projects.filter((p) => p.status !== "Finished"));
      setCompletedProjects(projects.filter((p) => p.status === "Finished"));
      setError(null);
    } catch (err) {
      console.error("Error fetching project data:", err);
      setError(err.response?.data?.message || "Failed to fetch project data");
    } finally {
      setLoading(false);
    }
  };

  // Filtered Projects
  const filteredOngoing = ongoingProjects.filter((p) =>
    p.name?.toLowerCase().includes(searchOngoing.toLowerCase())
  );
  const filteredCompleted = completedProjects.filter((p) =>
    p.name?.toLowerCase().includes(searchCompleted.toLowerCase())
  );

  const [isExpanded, setIsExpanded] = useState(false);
  // Limit displayed projects if not expanded
  const displayedProjects = isExpanded ? filteredOngoing : filteredOngoing.slice(0, 2);


  // ------------------------------------------------------

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployee();
      console.log("API Response:", response);
      if (response && response.data) {
        setData3(response.data);
      } else {
        setError("Invalid data received from API");
      }
    } catch (err) {
      setError("Failed to fetch employees");
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };
  // ----------------------

  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchOngoing, setSearchOngoing] = useState("");

  const [searchEmployee, setSearchEmployee] = useState("");
  // const [search3, setSearch3] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  // --------------------------
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchOngoing.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // -------------------------
  const filteredData2 = data2.filter((item) =>
    item.name.toLowerCase().includes(searchCompleted.toLowerCase())
  );
  const paginatedData2 = filteredData2.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // ----------------------------
  const filteredData3 = data3.filter((item) =>
    item.name.toLowerCase().includes(searchEmployee.toLowerCase())
  );
  const paginatedData3 = filteredData3.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const navigate = useNavigate();



  const handleDelete2 = (id) => {
    setData2(data.filter((item) => item.id !== id));
  };
  const handleDelete3 = () => {
    setData3(data3.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalPages2 = Math.ceil(filteredData2.length / itemsPerPage);
  const totalPages3 = Math.ceil(filteredData3.length / itemsPerPage);

  // const handleCheckboxChange = (id) => {
  //   setSelectedItems((prevSelected) => {
  //     console.log("Current Selected Items:", prevSelected);
  //     console.log("Toggled Item ID:", id);
  //     return prevSelected.includes(id)
  //       ? prevSelected.filter((item) => item !== id)
  //       : [...prevSelected, id];
  //   });
  // };





  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchEmployee = (e) => {
    setSearchEmployee(e.target.value);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleToggleExpand2 = () => {
    setIsExpanded2(!isExpanded2);
  };
  const handleToggleExpand3 = () => {
    setIsExpanded3(!isExpanded3);
  };

  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // Initially, show all projects
    setFilteredProjects(ongoingProjects);
  }, [ongoingProjects]);

  const handleSearchOngoing = (e) => {
    const searchTerm = e.target.value;
    setSearchOngoing(searchTerm);

    const filtered = ongoingProjects.filter((p) =>
      p.clientId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProjects(filtered);
  };


  const [searchCompleted, setSearchCompleted] = useState("");
  const [filteredCompletedProjects, setFilteredCompletedProjects] = useState([]);

  useEffect(() => {
    // Show all projects initially
    setFilteredCompletedProjects(completedProjects);
  }, [completedProjects]);

  const handleSearchCompleted = (e) => {
    const searchTerm = e.target.value;
    setSearchCompleted(searchTerm);

    const filtered = completedProjects.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCompletedProjects(filtered);
  };





  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <SideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 ">
        <Header toggleSidebar={toggleSidebar} />

        {/* Dashboard Content */}
        <div className="p-5 space-y-8 overflow-auto bg-gray-100 ">
          {/* Dashboard Header */}
          <h1 className="text-3xl font-bold text-[#4c48a5]">Dashboard</h1>

          {/* Action Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
            <div className="flex items-center p-4 py-5 space-x-4 bg-white shadow-md rounded-2xl">
              <div className="text-3xl text-blue-500">
                <img src={addnew} alt="" />
              </div>
              <div
                onClick={() => navigate("/admin/addnewclient")}
                className="cursor-pointer"
              >
                <h2 className="text-lg font-normal">Add New Clients</h2>
                <p className="text-gray-600">To register new clients</p>
              </div>
            </div>
            <div className="flex items-center p-4 py-5 space-x-4 bg-white shadow-md rounded-2xl">
              <div className="text-3xl text-green-500">
                <img src={addclients} alt="" />
              </div>
              <div onClick={() => navigate("/admin/customers")}>
                <h2 className="text-lg font-normal">Existing Clients</h2>
                <p className="text-gray-600">View existing clients</p>
              </div>
            </div>
            <div className="flex items-center p-4 py-5 space-x-4 bg-white shadow-md rounded-2xl">
              <div className="text-3xl text-orange-500">
                <img src={addestimate} alt="" />
              </div>
              <div
                onClick={() => navigate("/admin/estimate")}
                className="cursor-pointer"
              >
                <h2 className="text-lg font-normal">Create an Estimate</h2>
                <p className="text-gray-600">Generate client estimates</p>
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="space-y-8">
            {/* Ongoing Projects */}
            <div className="p-4 mb-6 bg-white shadow-md rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#4c48a5]">Ongoing Projects</h2>
                <div className="flex space-x-2">

                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchOngoing}
                    onChange={handleSearchOngoing}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />
                  <button onClick={handleDelete} className="px-3 py-1 text-white bg-red-500 rounded">
                    Delete
                  </button>
                </div>
              </div>

              <table className="w-full text-left border border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border"></th> {/* Checkbox header */}
                    <th className="p-2 border">SL No</th>
                    <th className="p-2 border">Client Name</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Location</th>

                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((p, index) => (
                      <tr key={p._id} className="border hover:bg-gray-50">
                        <td className="p-2 border">
                          <input
                            type="checkbox"
                            checked={selectedProjects.includes(p._id)}
                            onChange={() => handleCheckboxChange(p._id)}
                          />
                        </td>
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{p.clientId?.name || "N/A"}</td>
                        <td className="p-2 border">{p.clientId?.phoneNo || "N/A"}</td>
                        <td className="p-2 border">{p.clientId?.district || "N/A"}</td>

                        <td className={`p-2 border ${p.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                          {p.status || "Pending"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-2 text-center">No projects found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>



            {/* -------------------------------------------------- */}
            {/* Completed Projects */}
            {/* Completed Projects */}
            {/* <div className="p-4 bg-white shadow-md rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#4c48a5]">
                  Completed Projects
                </h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchCompleted}
                    onChange={handleSearchCompleted}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleDelete2(item.id)}
                    className="px-3 py-1 mr-2 text-white bg-red-500 rounded"
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
              <table className="w-full text-left border-t border-b border-collapse border-gray-300">
              
              <thead>
  <tr>
    <th className="p-2 border-b border-gray-300"></th>
    <th className="p-2 border-b border-gray-300">SL No</th>
    <th className="p-2 border-b border-gray-300">Client Name</th>
    <th className="p-2 border-b border-gray-300">Date</th>
    <th className="p-2 border-b border-gray-300">Location</th>
    <th className="p-2 border-b border-gray-300">Work Type</th>
    <th className="p-2 border-b border-gray-300">Amount</th>
    <th className="p-2 border-b border-gray-300">Payment</th>
    <th className="p-2 border-b border-gray-300">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredCompletedProjects.length > 0 ? (
    filteredCompletedProjects.map((p, index) => (
      <tr key={p._id} className="border hover:bg-gray-50">
        <td className="p-2">
          <input
            type="checkbox"
           
          />
        </td>
        <td className="p-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
        <td className="p-2">{p.clientId?.name }</td>
        <td className="p-2">{p.date}</td>
        <td className="p-2">{p.location}</td>
        <td className="p-2">{p.roof}</td>
        <td className="p-2">{p.amount}</td>
        <td className={`p-2 ${p.payment === "paid" ? "text-green-500" : "text-yellow-500"}`}>
          {p.payment}
        </td>
        <td className="p-2">
          <button className="px-3 py-1 text-white bg-blue-500 rounded-full">See Details</button>
          <button
            onClick={() => handleDelete(p._id)}
            className="px-3 py-1 ml-2 text-white bg-red-500 rounded-full"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" className="p-2 text-center">No completed projects found</td>
    </tr>
  )}
</tbody>


              </table>
              <button
                onClick={handleToggleExpand2}
                className="mt-2 text-blue-500 underline"
              >
                {isExpanded2 ? "Show Less" : "Show More"}
              </button>
              <div className="flex items-center justify-between mt-4">
                <div>
                  Page {currentPage} of {totalPages2}
                </div>
                <div className="flex space-x-2">
                  {[...Array(totalPages2)].map((_, pageIndex) => (
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
            </div> */}

            <div className="p-4 mb-6 bg-white shadow-md rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#4c48a5]">Completed Projects</h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchCompleted}
                    onChange={handleSearchCompleted}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />
                  <button onClick={handleDelete} className="px-3 py-1 text-white bg-red-500 rounded">
                    Delete
                  </button>
                </div>
              </div>

              <table className="w-full text-left border border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border"></th> {/* Checkbox header */}
                    <th className="p-2 border">SL No</th>
                    <th className="p-2 border">Client Name</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Location</th>

                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompletedProjects.length > 0 ? (
                    filteredCompletedProjects.map((p, index) => (
                      <tr key={p._id} className="border hover:bg-gray-50">
                        <td className="p-2 border">
                          <input
                            type="checkbox"
                            checked={selectedProjects.includes(p._id)}
                            onChange={() => handleCheckboxChange(p._id)}
                          />
                        </td>
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{p.clientId?.name || "N/A"}</td>
                        <td className="p-2 border">{p.clientId?.phoneNo || "N/A"}</td>
                        <td className="p-2 border">{p.clientId?.district || "N/A"}</td>

                        <td className={`p-2 border ${p.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                          {p.status || "Pending"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-2 text-center">No projects found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
















            {/* ---------------------------Employee Details------------------------------- */}
            <div className="p-4 bg-white shadow-md rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#4c48a5]">Employee Details</h2>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchEmployee}
                    onChange={handleSearchEmployee}
                    className="px-2 py-1 border border-gray-300 rounded"
                  />

                  <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded">
                    Filter
                  </button>
                  <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded">
                    Export
                  </button>
                </div>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <table className="w-full text-left border-t border-b border-collapse border-gray-300">
                    <thead>
                      <tr>
                        <th className="p-2 border-b border-gray-300"></th>
                        <th className="p-2 border-b border-gray-300">SL No</th>
                        <th className="p-2 border-b border-gray-300">Employee ID</th>
                        <th className="p-2 border-b border-gray-300">Name</th>
                        <th className="p-2 border-b border-gray-300">Phone No</th>
                        <th className="p-2 border-b border-gray-300">Role</th>
                        <th className="p-2 border-b border-gray-300">Status</th>
                        <th className="p-2 border-b border-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isExpanded3 ? paginatedData3 : paginatedData3.slice(0, 2)).map((item, index) => (
                        <tr key={item.id || `row-${index}`} className="border-b border-gray-300">

                          <td className="p-2">
                            <input
                              type="checkbox"

                            />
                          </td>

                          <td className="p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td className="p-2">{item.mailId}</td>
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">{item.mobileNumber}</td>
                          <td className="p-2">
                            {Array.isArray(item.designations) ? item.designations.join(", ") : item.designations || "N/A"}
                          </td>
                          <td className={`p-2 ${item.isActive ? "text-green-500" : "text-yellow-500"}`}>
                            {item.isActive ? "Active" : "Inactive"}
                          </td>
                          <td className="p-2">
                            <button className="px-3 py-1 text-white bg-blue-500 rounded-full">See Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>



                  </table>

                  <button
                    onClick={handleToggleExpand3}
                    className="mt-2 text-blue-500 underline"
                  >
                    {isExpanded3 ? "Show Less" : "Show More"}
                  </button>

                  <div className="flex items-center justify-between mt-4">
                    <div>Page {currentPage} of {totalPages3}</div>
                    <div className="flex space-x-2">
                      {[...Array(totalPages3)].map((_, pageIndex) => (
                        <button
                          key={pageIndex}
                          onClick={() => handlePageChange(pageIndex + 1)}
                          className={`px-3 py-1 rounded ${pageIndex + 1 === currentPage
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                            }`}
                        >
                          {pageIndex + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* ---------------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
