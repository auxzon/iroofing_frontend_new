import React, { useState } from "react";
import Header from "../../SalesDashboard/components/Header";
import Sidebar from "../../SalesDashboard/components/Sidebar";

function SalesSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col  bg-gray-100">
        <Header toggleSidebar={toggleSidebar} />

        {/* Dashboard Content */}
        <div className="p-6 space-y-8 bg-gray-100">
          {/* Dashboard Header */}
          <h1 className="text-3xl font-normal text-[#4c48a5]">
            Profile Settings
          </h1>
          {/* Action Cards */}
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <form className="space-y-6 px-6">
              {/* Row 1 - Full Name */}
              <div className="col md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder="Kevin K thomas"
                  />
                </div>
              </div>

              {/* Row 2 - User Name */}
              <div className="col md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder="admin@gmail.com"
                  />
                </div>
              </div>

              {/* Row 3 - Password */}
              <div className="col md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">
                    Password
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder="********"
                  />
                </div>
              </div>

              {/* Row 4 - Phone No */}
              <div className="col md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">
                    Phone No
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder="+91 98 6565 8787"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-5 px-10">
                <button
                  type="button"
                  onClick={toggleModal} // Open the modal on click
                  className="bg-blue-600 p-2 rounded-md text-white px-5"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md w-[800px]">
            <div className="flex flex-col">
              <label className="text-sm font-normal text-[#15164A]">
                Full Name
              </label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md w-72 bg-gray-100 "
                placeholder="Kevin K thomas"
              />
            </div>
            <div className="flex flex-col py-5">
              <label className="text-sm font-normal text-[#15164A]">
                Phone Number
              </label>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded-md w-72 bg-gray-100"
                placeholder=" +91 969 123 456"
              />
            </div>
            <button className="bg-[#3C3EC3] text-white px-4 py-2 rounded-md">
              {" "}
              Save Changes
            </button>
            <p className="py-2">Password</p>
            <div className="flex flex-col py-1">
              <label className="text-sm font-normal text-[#15164A]">
                Old Password
              </label>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded-md w-72 bg-gray-100 "
                placeholder="Put your password..."
              />
            </div>

            <div className="flex  gap-8">
              <div className="flex flex-col py-2">
                <label className="text-sm font-normal text-[#15164A]">
                  New Password
                </label>
                <input
                  type="number"
                  className="p-2 border border-gray-300 rounded-md w-72 bg-gray-100 "
                  placeholder="Put your new password..."
                />
              </div>
              <div className="flex flex-col py-2 md:mt-5">
                <input
                  type="number"
                  className="p-2 border border-gray-300 rounded-md w-72 bg-gray-100"
                  placeholder="Confirm new password."
                />
              </div>
            </div>

            <button className="bg-[#3C3EC3] text-white px-4 py-2 rounded-md md:mt-3">
              {" "}
              Save Changes
            </button>

            <div className="flex justify-end gap-4 ">
              <button
                onClick={toggleModal} // Close the modal
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesSettings;
