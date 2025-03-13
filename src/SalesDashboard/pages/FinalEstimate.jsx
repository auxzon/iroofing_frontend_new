 
 
import React, { useState } from "react";
import Header from "../../SalesDashboard/components/Header";
import Sidebar from "../../SalesDashboard/components/Sidebar";
import { Link } from "react-router-dom";
import { Edit, Trash2, Upload } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
 
 
function FinalEstimate() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
 
  const [showEstimate, setShowEstimate] = useState(false);
 
     const [materials, setMaterials] = useState([]);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
 
  const addNewMaterial = () => {
    setMaterials([...materials, { material: "", quantity: "" }]);
  };
 
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      if (clientName.trim() !== "" && clientId.trim() !== "") {
        setIsFormVisible(true);
      }
    }
  };
 
 
  const [vehicles, setVehicles] = useState([
    { id: 1, totalKM: "", unitPrice: "", noOfTrip: "" },
  ]);
 
  const addVehicle = () => {
    setVehicles([...vehicles, { id: vehicles.length + 1, totalKM: "", unitPrice: "", noOfTrip: "" }]);
  };
 
 
 
  const [areas, setAreas] = useState([{ id: 1, name: "Area 1" }]);
 
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
 
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
 
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
 
        {/* Dashboard Content */}
        <div className="p-6 space-y-2 bg-gray-100">
          {/* Action Cards */}
          <div className="bg-white p-4 rounded-md shadow-md mb-6">
            <h1 className="text-[24px] font-medium mb-4 text-[#2A2493]">
              Create Final Estimate
            </h1>
            <h2 className="text-xl font-medium mb-4 text-[#2A2493] pt-4">
              Select Client
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              {/* Row 1 */}
              <div className="flex flex-col px-10">
                <label className="text-sm font-medium text-[#15164A]">
                  Client Name
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md w-full md:w-96 md:mt-2"
                  placeholder="Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#15164A]">
                  Client ID
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md w-full md:w-96 md:mt-2"
                  placeholder="Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </div>
 
          {/* Show form only if client details are entered */}
          {isFormVisible && (
           <div className="space-y-8 w-full">
            {/* Add New Client Section */}
            <div className="p-6 bg-white shadow-md rounded-lg w-full">
              <h2 className="text-lg font-semibold text-indigo-900 mb-6 text-left">
               Client Details
              </h2>
 
              {/* First Row - Three Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">Name:</label>
                  <input
                    type="text"
                    placeholder="Amal"
                    className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">Phone:</label>
                  <input
                    type="text"
                    placeholder="676876872"
                    className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">Place:</label>
                  <input
                    type="text"
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
                    placeholder="District"
                    className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">Comments:</label>
                  <input
                    type="text"
                    placeholder="Add comments"
                    className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
                  />
                </div>
              </div>
              {/* <div className="flex justify-center py-6 gap-5">
                <button className="bg-red-600 text-white px-3">cancel</button>
                <button className="bg-violet-600 text-white px-3">save</button>
              </div> */}
 
 <div className="pt-5">
  {areas.map((area) => (
    <div key={area.id} className="p-6 border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-indigo-900">{area.name}</h2>
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition">
            <Edit size={16} />
          </button>
          <button className="text-gray-600 hover:text-red-600 transition">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        <div className="flex items-center">
          <label className="text-sm text-gray-600 w-24">Roof Type:</label>
          <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
            <option value="">Select a type</option>
            <option value="car porch">Car Porch</option>
            <option value="auditorium">Auditorium</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="text-sm text-gray-600 w-24">Roof Model:</label>
          <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
            <option value="">Select a model</option>
            <option value="normal cantilever">Normal Cantilever</option>
            <option value="double car parking">Double Car Parking</option>
          </select>
        </div>
 
        <div className="flex items-center">
       
          <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
            <option value="">Double car parking</option>
            <option value="normal cantilever">Normal Cantilever</option>
            <option value="double car parking">Double Car Parking</option>
          </select>
        </div>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
        <div className="flex items-center">
          <label className="text-sm text-gray-600 w-24">Span:</label>
          <input type="text" placeholder="200m" className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white" />
        </div>
        <div className="flex items-center">
          <label className="text-sm text-gray-600 w-24">Length:</label>
          <input type="text" placeholder="250m" className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white" />
        </div>
        <div className="flex items-center">
          <label className="text-sm text-gray-600 w-24">Height:</label>
          <input type="text" placeholder="300m" className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white" />
        </div>
      </div><br /> <br />
 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </div><br />
             
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {materials.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 col-span-2">
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
     <div> <br />
     <h1
          className="text-lg font-medium underline cursor-pointer text-black-600 "
          onClick={addNewMaterial}
        >
          Add New Material
        </h1>
        </div>
   
    </div> <br /> <br />
 
      {/* <div className="mt-4 grid grid-cols-3 gap-4">
        {[1, 2, 3].map((row) => (
          <div key={row} className="grid grid-cols-2 gap-4">
            <select className="border border-gray-300 p-2 rounded-md w-full">
              <option>Materials Name</option>
            </select>
            <input type="text" placeholder="Meter" className="border border-gray-300 p-2 rounded-md w-full" />
          </div>
        ))}
      </div> */}
     
      <div className="grid grid-cols-3 gap-4 mt-4">
        <input type="text" placeholder="Type of Panel" className="border border-gray-300 p-2 rounded-md w-full" />
        <input type="text" placeholder="Offset" className="border border-gray-300 p-2 rounded-md w-full" />
        <input type="text" placeholder="Sheet Thickness" className="border border-gray-300 p-2 rounded-md w-full" />
      </div>
 
      <div className="grid grid-cols-3 gap-4 mt-4">
        <input type="text" placeholder="Center Height" className="border border-gray-300 p-2 rounded-md w-full" />
        <input type="text" placeholder="Extra Panel" className="border border-gray-300 p-2 rounded-md w-full" />
        <input type="text" placeholder="No of Bay" className="border border-gray-300 p-2 rounded-md w-full" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
       
        <input type="text" placeholder="Final Cutting" className="border border-gray-300 p-2 rounded-md w-full" />
      </div>
<br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Total Area
                   
          <button className=" px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition ">
            <Edit size={16} />
          </button>
         
       
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md bg-[#EEEEEE]"
                    placeholder="00"
                  /></div>
 
                  <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]  ">
                    Sheet Rate
                    <button className=" px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition ">
            <Edit size={16} />
          </button>
         
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md bg-[#EEEEEE]"
                    placeholder="00"
                  /></div>
                  </div>
 
      <div className="mt-4 text-right">
        <button onClick={addNewArea} className="bg-blue-500 text-white py-2 px-4 rounded-md">Add New Area +</button>
        <button onClick={() => removeArea(area.id)} className="bg-red-500 text-white py-2 px-4 rounded-md ml-4">Remove Area</button>
      </div>
    </div>
  ))}
</div>
 
 
 
<div className="labour-cost-container p-6">
  <h2 className="text-lg font-semibold text-indigo-900 mb-4">Labour Cost</h2>
 
  {/* Local Work Section */}
  <div className="section mb-6">
    <h3 className="text-lg font-semibold text-gray-800">Local Work</h3>
    {/* <p className="text-sm text-gray-600">⚫ Enter Labour Count</p> */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Sheeting</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Welding</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Total Cost</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
    </div>
  </div>
 
  {/* Site Work Section */}
  <div className="section">
    <h3 className="text-md font-semibold text-gray-800">Site Work</h3>
    {/* <p className="text-sm text-gray-600">⚫ Enter Labour Count</p> */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Sheeting</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Welding</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Total Cost</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Transportation</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Enquirer Expenses</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
    </div>
  </div>
</div>
 
 
 
{/* transportation */}
 
<div className="labour-cost-container p-6">
  <h2 className="text-lg font-semibold text-indigo-900 mb-4">Transportation Cost</h2>
 
  <div className="flex justify-between items-center gap-2 w-full">
  <select className="border border-gray-300 p-1 rounded-md bg-white text-sm w-32">
    <option>Select</option>
    <option>Option A</option>
    <option>Option B</option>
  </select>
 
  <div className="flex gap-2">
    <button className="px-2 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition">
      <Edit size={16} />
    </button>
    <button className="text-gray-600 hover:text-red-600 transition">
      <Trash2 size={18} />
    </button>
  </div>
</div>
 
  <br /> <br />
  {/* Local Work Section */}
  <div className="section mb-6">
   
   
   
 
 
    {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800">Total KM Travel <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="00"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800">Unit Price</label>
            <input
              type="text"
              placeholder="00"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800">No of Trip <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="00"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
            />
          </div>
 
          {/* Remove Button */}
         
        </div>
      ))}
 
      {/* Add More Vehicle Button */}
      <button onClick={addVehicle} className="text-blue-600 hover:underline mt-4">
        Add More Vehicle
      </button>
   
 
      <div  className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800">Crane<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="00"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-800">Other Expense</label>
            <input
              type="text"
              placeholder="00"
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
            />
          </div>
         
 
          {/* Remove Button */}
         
        </div>
  </div>
 
 
  <div className="labour-cost-container pt-5">
  <h2 className="text-lg font-semibold text-indigo-900 mb-4">Expense</h2>
    {/* <p className="text-sm text-gray-600">⚫ Enter Labour Count</p> */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Total Project Expense</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Margin %</label>
        <input
        type="text"
        placeholder="00%"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Margin Amount</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Total Area</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Total Sheeting Rate</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
    </div>
 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">New Project Value</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Rate Per Sq ft</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Selling Rate</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Tax Percentage</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Tax Amount</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
       <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Total Budget</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div> <br /> <br />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
       <div className="flex flex-col">
        <label className="text-sm font-semibold text-gray-800">Final Rate</label>
        <input
        type="text"
        placeholder="00"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />      </div>
    </div>
  </div>
</div>
 
 
 
         
         
         
         
         
         
         
         
         
         
         
            {/* New Layout Based on the Image */}
         
         
         
         
         
         
         
            <div className="bg-gray-100 min-h-screen p-6 flex flex-col items-center">
      {/* Button to Show Estimate */}
      <button
        onClick={() => setShowEstimate(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        Create Final Estimate
      </button>
 
      {/* Estimate Form (Appears Directly Below Button) */}
      {showEstimate && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mt-4">
          {/* Header */}
          <h2 className="text-lg font-semibold text-indigo-900 mb-4">Final Estimate</h2>
 
          {/* Radio Buttons */}
          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="w-4 h-4 rounded-full border bg-indigo-600"></span>
              Quotation
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="w-4 h-4 rounded-full border border-gray-400"></span>
              Estimate
            </label>
          </div>
 
          {/* Form Grid (Matches the Image Exactly) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "To", value: "Amal" },
              { label: "Client Address", value: "Demo house, Ko.." },
              { label: "Phone No", value: "9876543211" },
              { label: "Project Name", value: "Demo" },
              { label: "Quotation number/ Financial year", value: "1234" },
              { label: "Thickness", value: "0.6" },
              { label: "Sheet Profile", value: "305mm" },
              { label: "Color", value: "off-white" },
              { label: "Add Notes", value: "Demo", isFullWidth: true },
              { label: "Total Span", value: "00m" },
              { label: "Total Length", value: "00m" },
              { label: "Total Height", value: "00m" },
              { label: "Total Area", value: "00" },
              { label: "Total Sheeting", value: "00" },
            ].map(({ label, value, isFullWidth }, idx) => (
              <div key={idx} className={`flex flex-col ${isFullWidth ? "col-span-3" : ""}`}>
                <label className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  {label} <FaRegEdit className="text-gray-500 text-xs cursor-pointer" />
                </label>
                <input
                  type="text"
                  value={value}
                  readOnly
                  className="bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300 focus:outline-none w-full"
                />
              </div>
            ))}
 
            {/* Total Cost */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">Total Cost</label>
              <input
                type="text"
                value="₹57800/-"
                readOnly
                className="bg-gray-100 text-indigo-600 font-bold p-2 rounded-md border border-gray-300 focus:outline-none w-full"
              />
            </div>
          </div>
 
          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
              <BsEye size={16} />
              View Quotation
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
              <FiDownload size={16} />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default FinalEstimate;
 