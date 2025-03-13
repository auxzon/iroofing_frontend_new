import { useState } from "react";
import Header from "../../RatesDashboard/components/Header";
import Sidebar from "../../RatesDashboard/components/Sidebar";
import { useNavigate } from "react-router-dom";
 
const Materials = () => {
  const [activeTab, setActiveTab] = useState("Materials");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
 
 
  const navigate = useNavigate();
  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const handlePopupToggle2 = () => {
    setIsPopupVisible2(!isPopupVisible2);
  };
 
  return (
    <>
      <div className="flex min-h-screen  bg-gray-100">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
 
        {/* Main Content */}
        <div className="flex-1 flex flex-col   bg-gray-100">
          {/* Header */}
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="px-5 mt-3">
           
          </div>
 
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md p-4 md:m-5 m-4">
            {/* Tab Content */}
            <div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Materials</h2>
                <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                     Material Name
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="abcd"
                    />
                  </div>
 
                <form className="grid grid-cols-1 md:grid-cols-3  md:pt-10 gap-3 ">
                  {/* Row 1 */}
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                      Rate Per Meter
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex flex-col gap-3 ">
                    <label className="text-sm font-medium text-[#15164A]">
                      Including Tax
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex flex-col gap-3 ">
                    <label className="text-sm font-medium text-[#15164A]">
                      Last Updated Date
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
 
                  {/* Row 2 */}
                </form>
                <div className="flex justify-left items-center  md:pt-5 gap-28 ">
                  <div className="flex flex-col ">
                    <label className="text-sm font-medium text-[#15164A]">
                      Bending Cost For C Channel Per Meter
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-[480px] mt-3 "
                      placeholder="District"
                    />
                  </div>
 
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#15164A]">
                      Bending Cost For Gutter Per Meter
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2  border border-gray-300 rounded-md w-[480px]"
                      placeholder="District"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 md:pt-10">
                  <button className="bg-blue-600 px-5  text-white py-2 rounded-md">
                    Add
                  </button>
                  <button className="bg-red-600 px-5 text-white py-2 rounded-md">
                    Cancel
                  </button>
                </div>
                <div
                onClick={() => navigate("/rates/existingmaterial")}
                className="cursor-pointer"
              >
                  <h5 className="text-right">Finding existing materials</h5>
               
                </div>
                <hr className="border-t border-gray-300 my-4" />
                {/* Items List */}
                {/* <div className="mt-6 grid sm:grid-cols-2 grid-cols-1 gap-2">
                  <div className="border p-4 rounded-lg">
                    <label className="block mb-2">
                      <input type="radio" name="item" className="mr-2" />
                      ISA 25*25*6mm
                    </label>
                  </div>
                </div> */}
  <h2 className="text-2xl font-bold mb-4">Item</h2>
 <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
 
                  {/* First Column */}
                  <div className="col-span-1 space-y-3">
                  <div className="flex flex-col gap-3  ">
                  <label className="text-sm font-medium text-gray-700">
                        Material Name
                      </label>
                      <select
                 
                  className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                >
                  <option value="">Select</option>
                  <option>a</option>
                  <option>b</option>
                  <option>c</option>
                </select>
                  </div>
 
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                      Rate Per Meter
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                     Surface Area Per Meter
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  </div>
 
                  {/* Second Column */}
                  <div className="col-span-1 space-y-3">
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                     Std.Kg
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                    Painting cost/Zink dipping cost
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  </div>
 
                  {/* Third Column */}
                  <div className="col-span-1 md:space-y-3 ">
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                     Quantity
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                    Kg/Meter
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex flex-col gap-3  ">
                    <label className="text-sm font-medium text-[#15164A]">
                     Final Meter
                    </label>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md w-80"
                      placeholder="1"
                    />
                  </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-4 md:pt-10">
                  <button className="bg-blue-600 px-5  text-white py-2 rounded-md">
                    Add
                  </button>
                  <button className="bg-red-600 px-5 text-white py-2 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Materials;
 