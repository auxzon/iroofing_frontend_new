













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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../SalesDashboard/components/Header";
import Sidebar from "../../SalesDashboard/components/Sidebar";
import { fetchAllProjectType, getAllCategories,  } from "../../api/admin/product/getAllCategories";
import { getFilteredProducts, updateProduct } from "../../api/admin/product/updateProduct";
 
 
const QuickEstimate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [areas, setAreas] = useState([
    { id: 1, name: "Area 1", itemForm: { roofType: "", roofModel: "", roofPreference: "" } }
  ]);
 
 
  const [projectTypeData, setProjectTypeData] = useState([]);
  const [roofModelData, setRoofModelData] = useState([]);
  const [productData, setProductData] = useState(null);
  const [areaProductData, setAreaProductData] = useState({});
  const [totalSqFt, setTotalSqFt] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
 
  const calculateTotals = () => {
    let totalSqFtSum = 0;
    let totalCostSum = 0;
 
    Object.values(areaProductData).forEach((area) => {
      const areaSqFt = parseFloat(area.totalArea) || 0;
      const sheetRate = parseFloat(area.sheetRate) || 0;
 
      totalSqFtSum += areaSqFt;
      totalCostSum += sheetRate;
    });
 
    setTotalSqFt(totalSqFtSum.toFixed(2));
    setTotalCost(totalCostSum.toFixed(2));
  };
 
  useEffect(() => {
    calculateTotals();
  }, [areaProductData]);
 
 
  const addNewArea = () => {
    const newArea = {
      id: areas.length + 1,
      name: `Area ${areas.length + 1}`,
      itemForm: { roofType: "", roofModel: "", roofPreference: "" },
    };
    setAreas([...areas, newArea]);
  };
 
 
  const removeArea = (id) => {
    const updatedAreas = areas.filter((area) => area.id !== id);
    setAreas(updatedAreas);
  };
 
  const handleSubmit = () => {
    alert("Form submitted!");
  };
 
   const [materials, setMaterials] = useState([{ material: "", quantity: "" }]);
    const addNewMaterial = () => {
    setMaterials([...materials, { material: "", quantity: "" }]);
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
        await fetchProducts(id, filters);
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
 
 
      {/* Button to Add More Rows */}
      {/* <div className="flex flex-col items-end gap-2 mt-5">
        <h1
          className="text-lg font-medium underline cursor-pointer text-black-600"
          onClick={addNewMaterial}
        >
          Add New Material
        </h1>
      </div> */}
 
   
 
 
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
      <button onClick={() => removeArea(area.id)} className="bg-red-500 text-white py-2 px-4 rounded-md ml-4">Remove Area</button>
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