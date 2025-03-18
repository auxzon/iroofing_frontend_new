import Header from "../components/Header";
import Sidebar from "../components/SideNav";
import { useEffect, useState } from "react";
import plussquare from "../assets/icons/plussquare.png";
import { addProduct, fetchAllProjectType, getAllCategories,  } from "../../api/admin/product/getAllCategories";
import { getFilteredProducts, updateProduct } from "../../api/admin/product/updateProduct";
// import addnew from "../assets/images";
 
 
 
function FindProductView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [productData, setProductData] = useState(null);
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
  const [projectTypeData, setProjectTypeData] = useState([]);
  const [roofModelData, setRoofModelData] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ roofModel: "" });
 
 
   
    const [itemForm, setItemForm] = useState({
      roofType: "",
      roofModel: "",
      roofPreference: "",
      image: null,
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
  const fetchProducts = async () => {
    try {
      const response = await getFilteredProducts(filters);
      console.log("Fetched Products:", response);
 
      if (response?.products?.length > 0) {
        setProductData(response.products[0]);
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
    const updatedProduct = { ...productData }; // Clone the current state
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
              Product Editing
            </h2>
            <form className="space-y-6">
              {/* Row 1 - 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-[#15164A]">Project Type</label>
    <select
      className="p-2 border border-gray-300 rounded-md"
      onChange={(e) => {
        setItemForm((prev) => ({ ...prev, roofType: e.target.value }));
        handleFilter();
      }}
    >
      <option value="">Select</option>
      {projectTypeData?.map((category) => (
        <option key={category._id} value={category._id}>
          {category.projectType}
        </option>
      ))}
    </select>
  </div>
 
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-[#15164A]">Roof Model</label>
    <select
      className="p-2 border border-gray-300 rounded-md"
      onChange={(e) => {
        setItemForm((prev) => ({ ...prev, roofModel: e.target.value }));
        handleFilter();
      }}
    >
      <option value="">Select Category</option>
      {roofModelData.map((roofModel) => (
        <option key={roofModel._id} value={roofModel._id}>
          {roofModel.roofModel}
        </option>
      ))}
    </select>
  </div>
 
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-[#15164A]">Roof Preference</label>
    <select
      className="p-2 border border-gray-300 rounded-md"
      name="roofPreference"
      value={itemForm.roofPreference}
      onChange={(e) => {
        setItemForm((prev) => ({ ...prev, roofPreference: e.target.value }));
        handleFilter();
      }}
    >
      <option value="">Select</option>
      <option value="Single Car Parking">Single Car Parking</option>
      <option value="Double Car Parking">Double Car Parking</option>
    </select>
  </div>
</div>
 
 
              {/* Row 2 - 2 Columns */}
           
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {productData?.materials?.map((item, index) => (
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
          const updatedMaterials = [...productData.materials];
          updatedMaterials[index].unit = e.target.value;
          setProductData((prev) => ({ ...prev, materials: updatedMaterials }));
        }}
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
  value={productData?.span || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, span: e.target.value }))
  }
  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Length
                  </label>
                  <input
  type="text"
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.length || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, length: e.target.value }))
  }
  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                    Height
                  </label>
                  <input
  type="text"
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.height || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, height: e.target.value }))
  }
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
  placeholder="200m"
  value={productData?.typeOfPanel || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, typeOfPanel: e.target.value }))
  }
  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   Sheet Thickness
                  </label>
                  <input
  type="text"
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.sheetThickness || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, sheetThickness: e.target.value }))
  }
  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   No of Panel
                  </label>
                  <input
  type="text"
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.numberOfPanels || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, numberOfPanels: e.target.value }))
  }
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
  placeholder="200m"
  value={productData?.newLength || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, newLength: e.target.value }))
  }
  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                Center Height
                  </label>
                  <input
  type="text"
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.centerHeight || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, centerHeight: e.target.value }))
  }
  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]">
                   Final Cutting Length
                  </label>
                  <input
  type="text"
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.finalCuttingLength || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, finalCuttingLength: e.target.value }))
  }
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
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.totalArea || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, totalArea: e.target.value }))
  }
  /></div>
 
                  <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#15164A]  ">
                    Sheet Rate
                  </label>
                  <input
  type="text"
  className="p-2 border border-gray-300 rounded-md"
  placeholder="200m"
  value={productData?.sheetRate || ""}
  onChange={(e) =>
    setProductData((prev) => ({ ...prev, sheetRate: e.target.value }))
  }
  /></div>
                  </div>
 
 
              <div className="flex justify-center gap-5 px-10 md:py-20">
              <button className="bg-red-600 p-2 rounded-md text-white">
                  {" "}
                  Cancel
                </button>
                <button className="bg-blue-600 p-2 rounded-md text-white px-5"  onClick={editProduct}>
                 Edit
                </button>
               
              </div>
 
           
            </form>
          </div>
 
          {/* Tables */}
        </div>
      </div>
    </div>
  );
}
 
export default FindProductView;

