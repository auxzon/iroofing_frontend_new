













// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Header from "../../SalesDashboard/components/Header";
// import Sidebar from "../../SalesDashboard/components/Sidebar";

// import addnew from "../../SalesDashboard/assets/icons/adduser.png";
// import addclients from "../../SalesDashboard/assets/icons/addclients.png";
// import addestimate from "../../SalesDashboard/assets/icons/addestimate.png";

// const QuickEstimate = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);

//   const [areas, setAreas] = useState([{ id: 1, name: "Area 1" }]);

//   // Function to add a new area
//   const addNewArea = () => {
//     const newArea = {
//       id: areas.length + 1,
//       name: `Area ${areas.length + 1}`,
//     };
//     setAreas([...areas, newArea]);
//   };

//   // Function to remove an area
//   const removeArea = (id) => {
//     const updatedAreas = areas.filter((area) => area.id !== id);
//     setAreas(updatedAreas);
//   };

//   const handleSubmit = () => {
//     alert("Form submitted!"); // Replace this with your actual submission logic
//   };


//   return (
//     <div className="min-h-screen flex bg-gray-100 w-full ">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col w-full">
//         <Header toggleSidebar={toggleSidebar} />


//           {/* Action Cards */}
          

//           {/* Customer Records Table */}
//           <div className=" w-full">
//             {/* Add New Client Section */}
//             <div className="px-6 bg-white shadow-md rounded-lg w-full">
              
//               {/* First Row - Three Input Fields */}
             

//               {/* Second Row - Two Input Fields */}
              
            

//            <div className="bg-white shadow-lg">

//            {areas.map((area) => (
//   <div key={area.id} className="px-6 ">
//     <h2 className="text-lg font-semibold text-indigo-900 mb-6">{area.name}</h2>
            


// <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
//                 <div className="flex items-center ">
//                   <label className="text-sm text-gray-600 w-24">Roof Type:</label>
//                   <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
//     <option value="" >
//       Select a type
//     </option>
//     <option value="car porch">car porch</option>
//     <option value="auditorium">auditorium</option>

//   </select>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <label className="text-sm text-gray-600 w-24">Roof Model:</label>
//                   <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
//     <option value="" >
//       Select a type
//     </option>
//     <option value="car porch">car porch</option>
//     <option value="auditorium">auditorium</option>

//   </select>
//                 </div>
//                 <div className="flex items-center gap-2 md:pl-10">
                
//                 <select className="w-100 border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white ">
//     <option value="" >
//     double car parking
//     </option>
//     <option value="car porch">car porch</option>
//     <option value="auditorium">auditorium</option>

//   </select>
//                 </div>
//               </div>

              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 md:py-5">
//   {/* Roof Type */}
//   <div className="flex items-center">
//     <label className="text-sm text-gray-600 w-24">Span:</label>
//     <input
//       type="text"
//       placeholder="Enter roof type"
//       className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
//     />
//   </div>

//   {/* Roof Model */}
//   <div className="flex items-center gap-2">
//     <label className="text-sm text-gray-600 w-24">Length:</label>
//     <input
//       type="text"
//       placeholder="Enter roof model"
//       className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
//     />
//   </div>

//   {/* Custom Field */}
//   <div className="flex items-center gap-2 md:pl-10">
//     <label className="text-sm text-gray-600 w-24">Height:</label>
//     <input
//       type="text"
//       placeholder="Enter details"
//       className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
//     />
//   </div>


  
// </div>


// <div className="grid grid-cols-4 gap-4 mt-4 md:pb-6">
//                 <select className="border p-2 rounded-md w-full">
//                   <option>Materials</option>
//                 </select>
//                 <select className="border p-2 rounded-md w-full">
//                   <option>Materials</option>
//                 </select>
//                 <select className="border p-2 rounded-md w-full">
//                   <option>Materials</option>
//                 </select>
//                 <select className="border p-2 rounded-md w-full">
//                   <option>Materials</option>
//                 </select>
//               </div> 
    

// <div className="flex items-center gap-2  w-full">
//   <label className="text-sm text-gray-600 w-1/6">Comments:</label>
//   <input
//     type="text"
//     placeholder="Enter comment"
//     className="w-5/6 border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
//   />
// </div>


//               <div className="mt-4">
//                 <input type="file" className="border p-2 rounded-md w-full" />
//               </div>

//               <div className="mt-4 text-right">
//               <button
//         onClick={addNewArea}
//         className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
//       >
//         Add New Area +
//       </button>
//       <button
//       onClick={() => removeArea(area.id)}
//       className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
//     >
//       Remove Area
//     </button>
//               </div>
            



//               <div className="flex justify-start items-center gap-4"> 
//   {/* Comments */}
//   <div className="flex items-center gap-2">
//     <label className="text-sm text-gray-600 w-28">Area sq.ft:</label>
//     <input
//       type="number"
//       placeholder="2300"
//       className="border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
//     />
//   </div>

//   {/* Status Dropdown */}
//   <div className="flex items-center gap-2">
//     <label className="text-sm text-gray-600 w-28">Total Cost:</label>
//     <input
//       type="number"
//       placeholder="57000"
//       className="border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
//     />
//   </div>
// </div>












          
//             <div className="p-6 bg-white shadow-lg  ">
//   <h2 className="text-lg font-semibold text-indigo-900 mb-4">Estimate</h2>

//   {/* First Row - Two Fields (Total sq. ft & Total Cost) */}
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//     {/* Total Square Feet */}
//     <div className="flex items-center gap-2">
//       <label className="text-sm text-gray-600 w-28">Total sq. ft:</label>
//       <input
//         type="text"
//         value="1023.54"
//         readOnly
//         className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md text-center"
//       />
//     </div>

//     {/* Total Cost */}
//     <div className="flex items-center gap-2">
//       <label className="text-sm text-gray-600 w-28">Total Cost:</label>
//       <input
//         type="text"
//         value="₹57800/-"
//         readOnly
//         className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md text-center"
//       />
//     </div>
//   </div>

//   {/* Second Row - Three Fields (Comments, Status, Other Info) */}
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//     {/* Comments */}
//     <div className="flex items-center gap-2">
//       <label className="text-sm text-gray-600 w-28">Comments:</label>
//       <input
//         type="text"
//         placeholder="Enter comments"
//         className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
//       />
//     </div>

//     {/* Status Dropdown */}
//     <div className="flex items-center gap-2">
//       <label className="text-sm text-gray-600 w-28">Status:</label>
//       <select className="flex-1 border border-gray-300 p-2 rounded-md bg-white">
//         <option>Site Visit</option>
//         <option>Approved</option>
//         <option>Rejected</option>
//       </select>
//     </div>

//     {/* Additional Field (if needed) */}
  
//   </div>
// </div>



// </div>))}
//             </div>
//             {/* New Layout Based on the Image */}
//             <div className="p-6">
//       {!showForm ? (
//         <>
//           <h2 className="text-lg font-semibold text-[#15164A] mb-4">Add Customer.?</h2>
//           <div className="flex gap-4">
//             <button
//               className="text-white bg-[#3C3EC3] px-6 py-2 rounded-md"
//               onClick={() => setShowForm(true)}
//             >
//               Add
//             </button>
//             <button className="text-white bg-[#C33C4C] px-6 py-2 rounded-md">
//               Cancel
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md relative w-full">
//           {/* Title with Close Button */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold text-[#15164A]">Add New Client</h2>
//             <button
//               className="text-white bg-[#C33C4C] px-3 py-1 rounded-md"
//               onClick={() => setShowForm(false)}
//             >
//               Close
//             </button>
//           </div>

//           {/* Form Fields */}
//           <div className="w-full flex flex-col gap-4">
//             {/* First Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-1">
//                 <label className="text-[#15164A]">Name</label>
//                 <input className="border p-2 rounded-md w-full" defaultValue="Amal" />
//               </div>
//               <div className="flex flex-col flex-1">
//                 <label className="text-[#15164A]">Phone No</label>
//                 <input className="border p-2 rounded-md w-full" defaultValue="98765543322" />
//               </div>
//               <div className="flex flex-col flex-1">
//                 <label className="text-[#15164A]">Place</label>
//                 <input className="border p-2 rounded-md w-full" defaultValue="Kochi" />
//               </div>
//             </div>

//             {/* Second Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-1">
//                 <label className="text-[#15164A]">District</label>
//                 <input className="border p-2 rounded-md w-full" defaultValue="Ernakulam" />
//               </div>
//               <div className="flex flex-col flex-[2]">
//                 <label className="text-[#15164A]">Comments</label>
//                 <input className="border p-2 rounded-md w-full" defaultValue="Home near Mg road" />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center mt-4 gap-4">
//             <button
//               className="text-white bg-[#3C3EC3] px-6 py-2 rounded-md"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//             <button
//               className="text-white  bg-[#C33C4C] px-6 py-2 rounded-md"
//               onClick={() => setShowForm(false)}
//             >
//               close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>

//             </div>
//           </div>
      
//       </div>
//     </div>
//   );
// };

// export default QuickEstimate;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Upload } from "lucide-react";
import Header from "../../SalesDashboard/components/Header";
import Sidebar from "../../SalesDashboard/components/Sidebar";
 
import addnew from "../../SalesDashboard/assets/icons/adduser.png";
import addclients from "../../SalesDashboard/assets/icons/addclients.png";
import addestimate from "../../SalesDashboard/assets/icons/addestimate.png";
 
const QuickEstimate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
 
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
 
  const handleSubmit = () => {
    alert("Form submitted!"); // Replace this with your actual submission logic
  };
 
 
  return (
    <div className="min-h-screen flex bg-gray-100 w-full ">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
 
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <Header toggleSidebar={toggleSidebar} />
 
 
          {/* Action Cards */}
         
 
          {/* Customer Records Table */}
          <div className=" w-full">
            {/* Add New Client Section */}
            <div className="px-6 bg-white shadow-md rounded-lg w-full">
             
              {/* First Row - Three Input Fields */}
             
 
              {/* Second Row - Two Input Fields */}
             
           
 
           <div className="bg-white shadow-lg">
 
           {areas.map((area) => (
  <div key={area.id} className="px-6 ">
    <h2 className="text-lg font-semibold text-indigo-900 mb-6">{area.name}</h2>
           
    <div className="flex items-center gap-2 justify-end">
    {/* Export Button */}
    <button className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition">
      <Upload size={16} />
      Export
    </button>
 
    {/* Delete Button */}
    <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition">
      <Trash2 size={18} />
      Delete
    </button>
  </div> <br /><br />
 
<div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                <div className="flex items-center ">
                  <label className="text-sm text-gray-600 w-24">Roof Type:</label>
                  <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
    <option value="" >
      Select a type
    </option>
    <option value="car porch">car porch</option>
    <option value="auditorium">auditorium</option>
 
  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 w-24">Roof Model:</label>
                  <select className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white">
    <option value="" >
      Select a type
    </option>
    <option value="car porch">car porch</option>
    <option value="auditorium">auditorium</option>
 
  </select>
                </div>
                <div className="flex items-center gap-2 md:pl-10">
               
                <select className="w-100 border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white ">
    <option value="" >
    double car parking
    </option>
    <option value="car porch">car porch</option>
    <option value="auditorium">auditorium</option>
 
  </select>
                </div>
              </div>
 
             
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 md:py-5">
  {/* Roof Type */}
  <div className="flex items-center">
    <label className="text-sm text-gray-600 w-24">Span:</label>
    <input
      type="text"
      placeholder="250m"
      className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
    />
  </div>
 
  {/* Roof Model */}
  <div className="flex items-center gap-2">
    <label className="text-sm text-gray-600 w-24">Length:</label>
    <input
      type="text"
      placeholder="200m"
      className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
    />
  </div>
 
  {/* Custom Field */}
  <div className="flex items-center gap-2 md:pl-10">
    <label className="text-sm text-gray-600 w-24">Height:</label>
    <input
      type="text"
      placeholder="200m"
      className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
    />
  </div>
 
 
 
</div>
 
 
<div className="grid grid-cols-4 gap-4 mt-4 md:pb-6">
                <select className="border p-2 rounded-md w-full">
                  <option>Materials</option>
                </select>
                <select className="border p-2 rounded-md w-full">
                  <option>Materials</option>
                </select>
                <select className="border p-2 rounded-md w-full">
                  <option>Materials</option>
                </select>
                <select className="border p-2 rounded-md w-full">
                  <option>Materials</option>
                </select>
              </div>
   
 
<div className="flex items-center gap-2  w-full">
  <label className="text-sm text-gray-600 w-1/6">Comments:</label>
  <input
    type="text"
    placeholder="Enter comment"
    className="w-5/6 border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
  />
</div>
 
 
              <div className="mt-4">
                <input type="file" className="border p-2 rounded-md w-full" />
              </div>
 
              <div className="mt-4 text-right">
              <button
        onClick={addNewArea}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Add New Area +
      </button>
      <button
      onClick={() => removeArea(area.id)}
      className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
    >
      Remove Area
    </button>
              </div>
           
 
 
 
              <div className="flex justify-start items-center gap-4">
  {/* Comments */}
  <div className="flex items-center gap-2">
    <label className="text-sm text-gray-600 w-28">Area sq.ft:</label>
    <input
      type="number"
      placeholder="2300"
      className="border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
    />
  </div>
 
  {/* Status Dropdown */}
  <div className="flex items-center gap-2">
    <label className="text-sm text-gray-600 w-28">Total Cost:</label>
    <input
      type="number"
      placeholder="57000"
      className="border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
    />
  </div>
</div> <br /><br />
 
 
 
 
 
 
 
 
 
 
 
 
         
            <div className="p-6 bg-white shadow-lg  ">
  <h2 className="text-lg font-semibold text-indigo-900 mb-4">Estimate</h2>
 
  {/* First Row - Two Fields (Total sq. ft & Total Cost) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {/* Total Square Feet */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Total sq. ft:</label>
      <input
        type="text"
        value="1023.54"
        readOnly
        className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md text-center"
      />
    </div>
 
    {/* Total Cost */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Total Cost:</label>
      <input
        type="text"
        value="₹57800/-"
        readOnly
        className="flex-1 bg-gray-200 text-gray-800 p-2 rounded-md text-center"
      />
    </div>
  </div>
 
  {/* Second Row - Three Fields (Comments, Status, Other Info) */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Comments */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Comments:</label>
      <input
        type="text"
        placeholder="Enter comments"
        className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-indigo-500"
      />
    </div>
 
    {/* Status Dropdown */}
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 w-28">Status:</label>
      <select className="flex-1 border border-gray-300 p-2 rounded-md bg-white">
        <option>Site Visit</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>
    </div>
 
    {/* Additional Field (if needed) */}
 
  </div>
</div>
 
 
 
</div>))}
 
            </div>
            {/* New Layout Based on the Image */}
            <div className="p-6">
      {!showForm ? (
        <>
          <h2 className="text-lg font-semibold text-[#15164A] mb-4">Add New Client</h2>
          <div className="flex gap-4">
            <button
              className="text-white bg-[#3C3EC3] px-6 py-2 rounded-md"
              onClick={() => setShowForm(true)}
            >
              Add
            </button>
            <button className="text-white bg-[#C33C4C] px-6 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md relative w-full">
          {/* Title with Close Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#15164A]">Add New Client</h2>
            <button
              className="text-white bg-[#C33C4C] px-3 py-1 rounded-md"
              onClick={() => setShowForm(false)}
            >
             Delete
            </button>
          </div>
 
          {/* Form Fields */}
          <div className="w-full flex flex-col gap-4">
            {/* First Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-1">
                <label className="text-[#15164A]">Name</label>
                <input className="border p-2 rounded-md w-full" defaultValue="Amal" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[#15164A]">Phone No</label>
                <input className="border p-2 rounded-md w-full" defaultValue="98765543322" />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-[#15164A]">Place</label>
                <input className="border p-2 rounded-md w-full" defaultValue="Kochi" />
              </div>
            </div>
 
            {/* Second Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-1">
                <label className="text-[#15164A]">District</label>
                <input className="border p-2 rounded-md w-full" defaultValue="Ernakulam" />
              </div>
              <div className="flex flex-col flex-[2]">
                <label className="text-[#15164A]">Comments</label>
                <input className="border p-2 rounded-md w-full" defaultValue="Home near Mg road" />
              </div>
            </div>
          </div>
 
          {/* Submit Button */}
          <div className="flex justify-center mt-4 gap-4">
            <button
              className="text-white bg-[#3C3EC3] px-6 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="text-white  bg-[#C33C4C] px-6 py-2 rounded-md"
              onClick={() => setShowForm(false)}
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
 
            </div>
          </div>
     
      </div>
    </div>
  );
};
 
export default QuickEstimate;
 