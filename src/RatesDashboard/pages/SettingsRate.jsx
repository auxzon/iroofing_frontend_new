


import React, { useState, useEffect } from "react";
import Header from "../../RatesDashboard/components/Header";
import Sidebar from "../../RatesDashboard/components/Sidebar";
import { showprofile, editprofile } from "../../api/rates/profile"; // API imports

function SettingsRate() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "",
    userName: "",
    password: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
 const userId="67a0865b69b3f16af7aef320"
 
  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await showprofile(userId); 
        console.log(response);
        // API call
        setProfileData({
          fullName: response.name || "",
          userName: response.mailId || "",
          password: "", // Do not prefill the password for security reasons
          phone: response.mobileNumber || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle password input changes separately
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleEditProfile = async () => {
    try {
     const result= await editprofile({
      name: profileData.fullName,
      mobileNumber: profileData.phone,
      },userId);
console.log(result);

      alert("Profile updated successfully!");
      toggleModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  
    
  };

  // Handle password update separately
  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      
      return;
    }


    try {
      await editprofile({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      alert("Password updated successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

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
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header toggleSidebar={toggleSidebar} />

        {/* Dashboard Content */}
        <div className="p-6 space-y-8 bg-gray-100">
          <h1 className="text-3xl font-normal text-[#4c48a5] mb-6">
            Profile Settings
          </h1>

          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <form className="space-y-6 px-6">
              <div className="md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder=""
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">User Name</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder="admin@gmail.com"
                    value={profileData.userName}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <div className="md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">Password</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder="************"
                    value={profileData.password}
                    disabled
                    readOnly
                  />
                </div>
              </div>


              <div className="md:flex gap-10 px-5">
                <div className="flex justify-center items-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">Phone No</label>
                  <input
                    type="string"
                    name="phone"
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                    placeholder=""
                    value={profileData.phone}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-center gap-5 px-10">
                <button type="button" onClick={toggleModal} className="bg-blue-600 p-2 rounded-md text-white px-5">
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
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <label className="text-sm font-normal text-[#15164A]">Full Name</label>
            <input type="text" name="fullName" className="p-2 border border-gray-300 rounded-md w-full bg-gray-100"
              value={profileData.fullName} onChange={handleInputChange} />

            <label className="text-sm font-normal text-[#15164A] mt-4">Phone Number</label>
            <input type="string" name="phone" className="p-2 border border-gray-300 rounded-md w-full bg-gray-100"
              value={profileData.phone} onChange={handleInputChange} />

            <button className="bg-[#3C3EC3] text-white px-4 py-2 rounded-md mt-4"
              onClick={handleEditProfile}>
              Save Changes
            </button>

            <h2 className="text-xl font-bold mt-6">Change Password</h2>
            <label className="text-sm font-normal text-[#15164A]" >old Password</label>
            <input type="password" name="oldPassword" placeholder="Old Password" className="p-2 border w-full rounded-md"
              onChange={handlePasswordChange}  />
              <div className=" flex gap-5">
                <div className="col">
                <label className="text-sm font-normal text-[#15164A]" >New password</label>
              <input type="password" name="newPassword" placeholder="New Password" className="p-2 border w-full rounded-md mt-2"
              onChange={handlePasswordChange} />
                </div>
              
             
              <input type="password" name="confirmPassword" placeholder="confirm Password" className="p-2 border w-full rounded-md mt-2"
              onChange={handlePasswordChange} />
         
              </div>
      <button className="bg-[#3C3EC3] text-white px-4 py-2 rounded-md mt-4"
              onClick={handleChangePassword}>
              Save Changes
            </button>

            <button onClick={toggleModal} className="bg-gray-300 px-4 py-2 rounded-md mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsRate;
