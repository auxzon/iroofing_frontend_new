import Header from "../components/Header";
import Sidebar from "../components/SideNav";
import { useEffect, useState } from "react";
import plussquare from "../assets/icons/plussquare.png";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../api/admin/product/addCategory";
import { getAllCategories } from "../../api/admin/product/getAllCategories";
import { getAllProjectTypes } from "../../api/admin/product/getAllCategories";

 
// import addnew from "../assets/images";
 
function ProductsAdding() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
 
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const [materials, setMaterials] = useState([{ material: "", quantity: "" }]);
 
  const addNewMaterial = () => {
    setMaterials([...materials, { material: "", quantity: "" }]);
  };
  const [isOpen, setIsOpen] = useState(false);
 
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  
  const [roofModel,setRoofModel]= useState ("")
  const [roofType, setRooftype] = useState(""); // Input state
    const [selectedType, setSelectedType] = useState(""); // Dropdown state
    const [categories, setCategories] = useState([]); // Category state
 
    // ✅ Fetch categories on component load
    useEffect(() => {
        fetchCategories();
        fetchAllProjectTypes();
    }, []);
 
    const fetchCategories = async () => {
        const data = await getAllCategories();
        // setCategories(data);
        console.log(data);
        
    };
 
    const fetchAllProjectTypes = async () => {
      const data = await getAllProjectTypes();
     console.log(data);
     
  };
    // ✅ Fixed handleSubmit function
    const handleSubmit = async () => {
        if (!roofModel || !selectedType) {
            alert("Please enter Roof Model and select a type.");
            return;
        }
 
        try {
            const response = await addCategory({ roofModel, roofType });
 
            if (response) {
                alert("Category added successfully!");
                setRoofModel("");
                setSelectedType("");
                fetchCategories(); // ✅ Refresh the category list after adding
            }
        } catch (error) {
            alert("Failed to add category. Please try again.");
            console.error("Error adding category:", error);
        }
    };
 
 
 
 
 
 
 
  const navigate = useNavigate();
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
 
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
 
        {/* Dashboard Content */}
        <div className="p-6 space-y-8 bg-gray-100 overflow-auto">
          {/* Dashboard Header */}
 
          {/* Action Cards */}
          <div className="bg-white p-6 rounded-md shadow-md mb-6 ">
          <h2 className="text-2xl font-medium mb-4 text-[#2A2493]">
             Add Category
            </h2>
           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
<label className="text-sm font-medium text-[#15164A]">
                   Project Type
                  </label>
      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select</option>
                        <option value="Car Parch">Car Parch</option>
                        <option value="Auditorium">Auditorium</option>
                    </select>
      </div>
            <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                  Roof Model
                  </label>
                  <input
                        type="text"
                        value={roofType}
                        onChange={(e) => setRooftype(e.target.value)}
                        placeholder="Enter Roof Model"
                        className="p-2 border border-gray-300 rounded-md"
                    />
      </div>
</div>
 
               
             <br />
               
                <div className="flex justify-center gap-6">
              <button
                className=" px-5 py-3 bg-red-500 text-white rounded-md"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button className=" px-5 py-3 bg-blue-600 text-white rounded-md cursor-pointer"
             onClick={handleSubmit}
             >
               Add
              </button>
            </div><br />
 
            <h2 className="text-2xl font-medium mb-4 text-[#2A2493]">
              Product Adding
            </h2>
            <form className="space-y-6">
              {/* Row 1 - 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   Project Type
                  </label>
                  <select className="p-2 border border-gray-300 rounded-md" onChange={(e) => setItemForm({ ...itemForm, materialName: e.target.value })}>
                        <option>Select</option>
                        {categories.map((category) => (
                            <option key={category._id}>{category.type}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Roof Model
                  </label>
                 
                  <select className="p-2 border border-gray-300 rounded-md">
                        <option>Select</option>
                        {categories.map((category) => (
                            <option key={category._id}>{category.roofModel}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Roof Preference
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="Double car Parking"
                  />
                </div>
              </div>
 
              {/* Row 2 - 2 Columns */}
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
              </div>
             
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
      <div className="flex flex-col items-end gap-2 mt-5">
        <h1
          className="text-lg font-medium underline cursor-pointer text-black-600"
          onClick={addNewMaterial}
        >
          Add New Material
        </h1>
      </div>
    </div>
 
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#15164A] ">Upload Image</label>
      <input
        type="file"
        className="border border-gray-300  rounded-md p-2 w-[300px] cursor-pointer"
      />
    </div>        
             
           
             
 
              {/* Row 3 - 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Span
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="200m"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Length
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="250m"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Height
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="300m"
                  />
                </div>
              </div>
             
 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Type of Panel
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="00"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   Sheet Thickness
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="00"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   No of Panel
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="00"
                  />
                </div>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   New Length
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="00"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                Center Height
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="00"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   Final Cutting Length
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md"
                    placeholder="300m"
                  />
                </div>
              </div>
 
 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Total Area
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md bg-[#EEEEEE]"
                    placeholder="00"
                  /></div>
 
                  <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]  ">
                    Sheet Rate
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md bg-[#EEEEEE]"
                    placeholder="00"
                  /></div>
                  </div>
 
 
              <div className="flex justify-center gap-5 px-10 md:py-20">
                <button className="bg-blue-600 p-2 rounded-md text-white px-5">
                  Add
                </button>
                <button className="bg-red-600 p-2 rounded-md text-white">
                  {" "}
                  Cancel
                </button>
              </div>
 
              <div className="flex flex-col items-end gap-2 mt-5">
        <h1
          className="text-lg font-medium underline cursor-pointer text-black-600"
          onClick={toggleModal}
        >
         Find Existing Material
        </h1>
      </div>
            </form>
          </div>
 
          {/* Tables */}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[600px]">
            <h2 className="text-lg font-semibold text-indigo-800 mb-4">
              Select Product
            </h2>
 
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-[#15164A]-600 text-sm font-medium mb-1">
                  Roof Type
                </label>
                <select className="w-full border rounded-md p-3 text-gray-700">
                  <option>Car Parch</option>
                </select>
              </div>
 
              <div>
                <label className="block text-[#15164A]-600 text-sm font-medium mb-1">
                  Roof Model
                </label>
                <select className="w-full border rounded-md p-3 text-gray-700">
                  <option>Normal Cantilevel</option>
                </select>
              </div>
 
              <div>
                <label className="block text-[#15164A]-600 text-sm font-medium mb-1">
                  Roof Preference
                </label>
                <select className="w-full border rounded-md p-3 text-gray-700">
                  <option>Double Car Parking</option>
                </select>
              </div>
            </div>
 
            <div className="flex justify-center gap-6">
              <button
                className="w-32 px-5 py-3 bg-red-500 text-white rounded-md"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button className="w-32 px-5 py-3 bg-blue-600 text-white rounded-md cursor-pointer"
              onClick={() => navigate("/admin/findproductview")}
             >
                Find
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default ProductsAdding;