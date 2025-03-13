// import React from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/SideNav";
// import { useState } from "react";
// import addnew from "../assets/icons/adduser.png";
// import plussquare from "../assets/icons/plussquare.png";

// import { FaWindowClose } from "react-icons/fa";

// function Estimate() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const [areas, setAreas] = useState([{ id: 1 }]);

//   // Function to add new area
//   const addNewArea = () => {
//     setAreas([...areas, { id: areas.length + 1 }]);
//   };

//   // Function to remove an area by ID
//   const removeArea = (id) => {
//     setAreas(areas.filter((area) => area.id !== id));
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   const createCustomer = () => {
//     setIsModalOpen(true); // Open the modal
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };
//   // ---//---//---//---//---//---//---//---//---//---//---//---//-

//   return (
//     <div className="h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <Header toggleSidebar={toggleSidebar} />

//         {/* Dashboard Content */}
//         <div className="p-6 space-y-8 bg-gray-100 overflow-auto">
//           {/* Dashboard Header */}
//           <h1 className="text-3xl font-medium text-[#2A2493]">
//             Create Estimate
//           </h1>

//           {/* Action Cards */}

//           {/* Area Details */}
//           <div className="  ">
//             <h2 className="text-xl font-medium mb-4 text-[#2A2493]">Area 1</h2>
           
            
            
            
//             <div className="space-y-2">
//               {/* Material Dropdown */}
              
              
//               {/* ----------------------------- */}
              

//               <div className="p-6 space-y-8 bg-gray-100 overflow-auto">
//           <h1 className="text-3xl font-medium text-[#2A2493]">Create Estimate</h1>

//           {areas.map((area, index) => (
//             <div key={area.id} className="bg-white p-6 rounded-md shadow relative">
//               {/* Header with Delete Button */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-medium text-[#2A2493]">Area {index + 1}</h2>
//                 <button onClick={() => removeArea(area.id)} className="text-red-500 hover:text-red-700">
//                   <FaWindowClose size={24} />
//                 </button>
//               </div>

//               <form className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5">
//                 <div className="flex justify-center items-center gap-5">
//                   <label className="block text-sm font-medium text-[#15164A]">
//                     Work Type
//                   </label>
//                   <select className="mt-1 block w-52 p-2 border border-gray-300 rounded-md">
//                     <option>Select Type</option>
//                     <option>Car Porch</option>
//                     <option>Auditorium</option>
//                   </select>
//                 </div>
//                 <div className="flex justify-center items-center gap-5">
//                   <label className="block text-sm font-medium text-[#15164A]">
//                     Work Model
//                   </label>
//                   <select className="mt-1 block w-52 p-2 border border-gray-300 rounded-md">
//                     <option>Select Model</option>
//                     <option>Normal Cantilever without column</option>
//                     <option>Normal Cantilever with column</option>
//                   </select>
//                 </div>
//                 <div className="flex justify-center items-center gap-4">
//                   <input
//                     type="file"
//                     className="mt-1 block w-52 p-2 border border-gray-300 rounded-md"
//                   />
//                 </div>
//               </form>

//               {/* Roof Preference */}
//               <div className="p-10">
//                 <label className="block text-sm font-medium text-[#15164A]">
//                   Roof Preference
//                 </label>
//                 <select className="mt-1 block w-52 p-2 border border-gray-300 rounded-md">
//                   <option>Select Preference</option>
//                   <option>Single Car Parking</option>
//                   <option>Double Car Parking</option>
//                   <option>Custom Measurements</option>
//                 </select>
//               </div>

//               {/* Dimensions & Materials */}
//               <div className="space-y-4">
//                 <select className="p-2 border border-gray-300 rounded-md md:mt-4">
//                   <option>Material</option>
//                 </select>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5">
//                   <div className="flex justify-center items-center gap-4">
//                     <label className="block text-sm font-medium text-[#15164A]">
//                       Span
//                     </label>
//                     <input
//                       className="mt-1 block w-52 p-2 border border-gray-300 rounded-md"
//                       placeholder="meter"
//                     />
//                   </div>
//                   <div className="flex justify-center items-center gap-5">
//                     <label className="block text-sm font-medium text-[#15164A]">
//                       Length
//                     </label>
//                     <input
//                       className="mt-1 block w-52 p-2 border border-gray-300 rounded-md"
//                       placeholder="meter"
//                     />
//                   </div>
//                   <div className="flex justify-center items-center gap-4">
//                     <label className="block text-sm font-medium text-[#15164A]">
//                       Height
//                     </label>
//                     <input
//                       className="mt-1 block w-52 p-2 border border-gray-300 rounded-md"
//                       placeholder="meter"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Comments */}
//               <div className="flex md:py-3 items-center justify-between gap-5">
//                 <label className="block text-sm font-medium text-[#15164A]">
//                   Comments
//                 </label>
//                 <textarea className="border border-gray-300 rounded-md w-full md:w-[90%]"></textarea>
//               </div>
//             </div>
//           ))}

//           {/* Add New Area Button */}
//           <div className="flex items-center justify-between w-full md:px-10 cursor-pointer" onClick={addNewArea}>
//             <h1 className="text-lg font-semibold underline">Add New Area</h1>
//             <img src={plussquare} alt="Add" />
//           </div>
//         </div>

//               {/* --------------------------------- */}

//               {/* Material2 Dropdown */}
//             </div>
//             {/* ---------------------------------------- */}
//           </div>
//           <h2 className="text-xl font-medium mb-4 text-[#2C2393]"> Estimate</h2>

//           <form className="col md:flex gap-6">
//             <div className="flex justify-center items-center gap-5">
//               <label className="block text-sm font-medium text-[#15164A]">
//                 Total sq. ft
//               </label>
//               <input
//                 className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
//                 placeholder="1023.54"
//               />
//             </div>
//             <div className="flex justify-center items-center gap-5">
//               <label className="block text-sm font-medium text-[#15164A]">
//                 Total Cost
//               </label>
//               <input
//                 className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
//                 placeholder="₹57800/-"
//               />
//             </div>
//             <div className="flex justify-center items-center gap-5">
//               <label className="block text-sm font-medium text-[#15164A]">
//                 Sq.ft Rate
//               </label>
//               <input
//                 className="mt-1 block w-52 p-2 border border-gray-300 rounded-md "
//                 placeholder="₹57800/-"
//               />
//             </div>
//           </form>

//           <div className="flex md:pt-6 gap-12">
//             <div className="flex  justify-center items-center">
//               <label className="w-1/4 text-sm font-medium text-[#15164A]">
//                 Comments
//               </label>
//               <textarea
//                 type="text"
//                 className="flex-1 p-2 md:w-96 border border-gray-300 rounded-md w-96 "
//                 placeholder="Comments"
//               />
//             </div>
//           </div>
//           <hr className="border-t border-gray-300 my-4" />

//           <div>
//             <h2 className="text-xl font-medium mb-4"> Add Customer ?</h2>
//             <div className="flex gap-5 px-10">
//               <button
//                 className="bg-blue-600 p-2 rounded-md text-white"
//                 onClick={createCustomer}
//               >
//                 Create
//               </button>
//               <button className="bg-red-600 p-2 rounded-md text-white">
//                 {" "}
//                 Cancel
//               </button>
//             </div>
//           </div>

//           {/* Tables */}
//         </div>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-6xl p-6 rounded-lg relative bg-white shadow-md max-h-screen overflow-y-auto md:mt-24 md:ml-64 md:py-10">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-black"
//             >
//               ✖
//             </button>
//             <div className="bg-white p-6 rounded-md shadow-md mb-6">
//               <h2 className="text-xl font-medium mb-4 text-[#2A2493]">
//                 Add New Client
//               </h2>
//               <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Row 1 */}
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="Name"
//                   />
//                 </div>
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Phone No
//                   </label>
//                   <input
//                     type="text"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="Phone No"
//                   />
//                 </div>
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Place
//                   </label>
//                   <input
//                     type="text"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="Place"
//                   />
//                 </div>

//                 {/* Row 2 */}
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     District
//                   </label>
//                   <input
//                     type="text"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="District"
//                   />
//                 </div>

//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/4 text-sm font-medium text-[#15164A]">
//                     Comments
//                   </label>
//                   <textarea
//                     type="text"
//                     className="flex-1 p-2 md:w-96 border border-[#1D1E66] rounded-md"
//                     placeholder="Comments"
//                   />
//                 </div>

//                 {/* Row 2 */}
//               </form>
//               {/*  */}{" "}
//               <h2 className="text-xl font-medium mb-4 text-[#2A2493] md:py-3">
//                 Schedule Site Visit
//               </h2>
//               <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Row 1 */}
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Select Date
//                   </label>
//                   <input
//                     type="date"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="date"
//                   />
//                 </div>
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Time
//                   </label>
//                   <input
//                     type="time"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="Time"
//                   />
//                 </div>
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Status
//                   </label>
//                   <select
//                     type="select"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="status"
//                   />
//                 </div>

//                 {/* Row 2 */}

//                 <div className="flex  justify-center items-center ">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Comments
//                   </label>
//                   <input
//                     type="text"
//                     className="flex-1 p-2 border border-[#1D1E66] rounded-md"
//                     placeholder="District"
//                   />
//                 </div>

//                 <div className="flex  justify-center items-center ">
//                   <label className="w-1/4 text-sm font-medium text-[#15164A]">
//                     Assign To
//                   </label>
//                   <select
//                     type="text"
//                     className="flex-1 p-2 md:w-96 border border-[#1D1E66] rounded-md"
//                     placeholder="Comments"
//                   />
//                 </div>

//                 {/* Row 3 */}
//               </form>
//               <div className="flex justify-center items-center gap-4 md:pt-10">
//                 <button className="bg-blue-600 px-5  text-white py-2 rounded-md">
//                   Add
//                 </button>
//                 <button className="bg-red-600 px-5 text-white py-2 rounded-md">
//                   Cancel
//                 </button>
//               </div>
//               {/* Area Details */}
//               <div className=" md:py-6 ">
//                 <h2 className="text-xl font-medium mb-4 text-[#2A2493] md:py-3">
//                   Estimate
//                 </h2>
//                 <h2 className="text-xl font-medium mb-4">Area 1</h2>
//                 <form className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5">
//                   <div className="flex justify-center items-center gap-5">
//                     <label className="block text-sm font-medium text-[#15164A]">
//                       Work Type
//                     </label>
//                     <select className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md">
//                       <option>Select Type</option>
//                     </select>
//                   </div>
//                   <div className="flex justify-center items-center gap-5">
//                     <label className="block text-sm font-medium text-[#15164A]">
//                       Work Model
//                     </label>
//                     <select className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md">
//                       <option>Select Model</option>
//                     </select>
//                   </div>
//                   <div className="flex justify-center items-center gap-4">
//                     <label className="block text-sm font-medium text-[#15164A]">
//                       Height
//                     </label>
//                     <select className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md">
//                       <option>Select Preference</option>
//                     </select>
//                   </div>
//                 </form>
//                 <div className="space-y-2">
//                   {/* Material Dropdown */}
//                   <div>
//                     <select className=" p-2 border border-[#1D1E66] rounded-md md:mt-4">
//                       <option>Material</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5 ">
//                     <div className="flex justify-center items-center gap-4">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Span
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                     <div className="flex justify-center items-center gap-5">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Length
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                     <div className="flex justify-center items-center gap-4">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Height
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                   </div>
//                   {/* Material2 Dropdown */}
//                 </div>
//                 <div className="space-y-2">
//                   {/* Material Dropdown */}
//                   <div>
//                     <select className=" p-2 border border-[#1D1E66] rounded-md md:mt-4">
//                       <option>Materials</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5 ">
//                     <div className="flex justify-center items-center gap-3">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Span
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                     <div className="flex justify-center items-center gap-5">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Length
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                     <div className="flex justify-center items-center gap-4">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Height
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                   </div>
//                   {/* Material2 Dropdown */}
//                 </div>
//                 <div className="space-y-2">
//                   {/* Material Dropdown */}
//                   <div>
//                     <select className=" p-2 border border-[#1D1E66] rounded-md md:mt-4">
//                       <option>Material</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:px-5 ">
//                     <div className="flex justify-center items-center gap-3">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Span
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                     <div className="flex justify-center items-center gap-5">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Length
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                     <div className="flex justify-center items-center gap-4">
//                       <label className="block text-sm font-medium text-[#15164A]">
//                         Height
//                       </label>
//                       <input
//                         className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                         placeholder="meter"
//                       />
//                     </div>
//                   </div>
//                   {/* ----------------------------- */}
//                   <div className="flex md:py-3 items-center justify-between  gap-5">
//                     <label className="block text-sm font-medium text-[#15164A]">
//                       Comments
//                     </label>
//                     <textarea
//                       name=""
//                       id=""
//                       className="border border-[#1D1E66] rounded-md w-full md:w-[90%]"
//                     ></textarea>
//                   </div>

//                   <div className="flex items-center justify-between w-full md:px-10">
//                     {/* Upload Field */}
//                     <div className="flex items-center">
//                       <label className="flex flex-col items-center max-w-sm p-2 bg-gray-100 border-2 border-[#1D1E66] border-dashed rounded-md cursor-pointer hover:bg-gray-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-6 h-6 mb-1 text-gray-600"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M3 16l4-4m0 0l4 4m-4-4v12m12 0h-4m4 0a4 4 0 01-4-4m0-4l-4 4m0 0l4-4m0 0v12"
//                           />
//                         </svg>
//                         <span className="text-sm text-gray-500">
//                           Choose File
//                         </span>
//                         <input type="file" className="hidden" />
//                       </label>
//                       <span className="ml-4 text-sm text-gray-500">
//                         No file chosen
//                       </span>
//                     </div>

//                     {/* H1 Element */}
//                     <div className="flex items-center gap-1">
//                       <h1 className="text-lg font-semibold underline">
//                         Add New Area
//                       </h1>
//                       <img src={plussquare} alt="" />
//                     </div>
//                   </div>

//                   {/* --------------------------------- */}

//                   {/* Material2 Dropdown */}
//                 </div>
//                 {/* ---------------------------------------- */}
//               </div>
//               <h2 className="text-xl font-medium mb-4 text-[#2C2393]">
//                 {" "}
//                 Estimate
//               </h2>
//               <form className="col md:flex gap-6">
//                 <div className="flex justify-center items-center gap-5">
//                   <label className="block text-sm font-medium text-[#15164A]">
//                     Total sq. ft
//                   </label>
//                   <input
//                     className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                     placeholder="1023.54"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-5">
//                   <label className="block text-sm font-medium text-[#15164A]">
//                     Total Cost
//                   </label>
//                   <input
//                     className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                     placeholder="₹57800/-"
//                   />
//                 </div>
//                 <div className="flex justify-center items-center gap-5">
//                   <label className="block text-sm font-medium text-[#15164A]">
//                     Sq.ft Rate
//                   </label>
//                   <input
//                     className="mt-1 block w-52 p-2 border border-[#1D1E66] rounded-md "
//                     placeholder="₹57800/-"
//                   />
//                 </div>
//               </form>
//               <div className="flex md:pt-6 gap-12">
//                 <div className="flex  justify-center items-center">
//                   <label className="w-1/4 text-sm font-medium text-[#15164A]">
//                     Comments
//                   </label>
//                   <textarea
//                     type="text"
//                     className="flex-1 p-2 md:w-96 border border-[#1D1E66] rounded-md w-96 "
//                     placeholder="Comments"
//                   />
//                 </div>
//                 <div className="flex  justify-center items-center gap-2">
//                   <label className="w-1/3 text-sm font-medium text-[#15164A]">
//                     Status
//                   </label>
//                   <select className=" p-2 border border-[#1D1E66] rounded-md ">
//                     <option className="text-[#15164A]">Site Visit</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex justify-center items-center gap-4 md:pt-10">
//                 <button className="bg-blue-600 px-5  text-white py-2 rounded-md">
//                   Add
//                 </button>
//                 <button className="bg-red-600 px-5 text-white py-2 rounded-md">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Estimate;




import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../AdminDasboard/components/Header";
import Sidebar from "../../AdminDasboard/components/SideNav";



const Estimate = () => {
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
      placeholder="Enter roof type"
      className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
    />
  </div>

  {/* Roof Model */}
  <div className="flex items-center gap-2">
    <label className="text-sm text-gray-600 w-24">Length:</label>
    <input
      type="text"
      placeholder="Enter roof model"
      className="w-[200px] border border-gray-300 p-2 rounded-md focus:outline-indigo-500 bg-white"
    />
  </div>

  {/* Custom Field */}
  <div className="flex items-center gap-2 md:pl-10">
    <label className="text-sm text-gray-600 w-24">Height:</label>
    <input
      type="text"
      placeholder="Enter details"
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
</div>












          
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
          <h2 className="text-lg font-semibold text-[#15164A] mb-4">Add Customer.?</h2>
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
              Close
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

export default Estimate;



