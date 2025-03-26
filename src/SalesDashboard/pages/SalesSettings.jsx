// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { message } from "antd";
// import Header from "../../SalesDashboard/components/Header";
// import Sidebar from "../../SalesDashboard/components/Sidebar";
// import { getUserById, editUserById } from "../../api/admin/employee/getEmployee";
// import { selectUserId, setUserInfo } from "../../redux/slices/authSlice"

// function SalesSettings() {
//   const dispatch = useDispatch();
//   const userId = useSelector(selectUserId);
//   console.log("userId", userId);
     
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [user, setUser] = useState(null);
 
//   const [formData, setFormData] = useState({
//     fullName: "",
//     userName: "",
//     phoneNumber: "",
//     location: "",
//     address: "",
//     designations: "",
//   });
 
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!userId) {
//         message.error("User ID not found");
//         return;
//       }

//       try {
//         const userData = await getUserById(userId);
//         console.log("User Data:", userData);
//         setUser(userData);
 
//         // Pre-fill form with user data
//         setFormData({
//           fullName: userData?.name || "",
//           userName: userData?.mailId || "",
//           phoneNumber: userData?.mobileNumber || "",
//           location: userData?.location || "",
//           address: userData?.address || "",
//           designations: userData?.designations || "",
//         });
//       } catch (error) {
//         message.error("Error fetching user profile");
//         console.error("Error fetching user:", error);
//       }
//     };
 
//     fetchUser();
//   }, [userId]);
 
//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };
 
//   const toggleModal = () => {
//     setIsModalOpen((prev) => !prev);
//   };
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
    
//     // Validation
//     if (!formData.fullName || !formData.phoneNumber) {
//       message.error("Full Name and Phone Number are required!");
//       return;
//     }
 
//     const updatedData = {
//       name: formData.fullName,          
//       mailId: formData.userName,        
//       mobileNumber: formData.phoneNumber,
//       location: formData.location,
//       address: formData.address,
//       designations: formData.designations,
//     };
 
//     try {
//       const response = await editUserById(user._id, updatedData);
      
//       // Update Redux store with new user info
//       dispatch(setUserInfo({ 
//         userType: response.userType || user.userType, 
//         user: response 
//       }));
 
//       message.success("Profile updated successfully!");
//       toggleModal();
//     } catch (error) {
//       message.error(
//         error.response?.data?.message || "Update failed. Please try again."
//       );
//     }
//   };
 
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
 
//       <div className="flex flex-col flex-1 bg-gray-100">
//         <Header toggleSidebar={toggleSidebar} />
 
//         <div className="p-6 space-y-8 overflow-auto bg-gray-100">
//           <h1 className="text-3xl font-normal text-[#4c48a5]">Profile Settings</h1>
 
//           <div className="p-6 mb-6 bg-white rounded-md shadow-md">
//             <form onSubmit={handleSubmit} className="px-6 space-y-6">
//               {/* Input fields */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-normal text-[#15164A]">Full Name</label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     readOnly={!isModalOpen}
//                     className="p-2 border border-gray-300 rounded-md w-[600px]"
//                   />
//                 </div>
 
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-normal text-[#15164A]">User Name</label>
//                   <input
//                     type="text"
//                     name="userName"
//                     value={formData.userName}
//                     onChange={handleChange}
//                     readOnly={!isModalOpen}
//                     className="p-2 border border-gray-300 rounded-md w-[600px]"
//                   />
//                 </div>
 
//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-normal text-[#15164A]">Phone No</label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     readOnly={!isModalOpen}
//                     className="p-2 border border-gray-300 rounded-md w-[600px]"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-normal text-[#15164A]">Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     readOnly={!isModalOpen}
//                     className="p-2 border border-gray-300 rounded-md w-[600px]"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-normal text-[#15164A]">Address</label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     readOnly={!isModalOpen}
//                     className="p-2 border border-gray-300 rounded-md w-[600px]"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="text-sm font-normal text-[#15164A]">Designations</label>
//                   <input
//                     type="text"
//                     name="designations"
//                     value={formData.designations}
//                     onChange={handleChange}
//                     readOnly={!isModalOpen}
//                     className="p-2 border border-gray-300 rounded-md w-[600px]"
//                   />
//                 </div>
//               </div>
 
//               <div className="flex justify-center gap-5 px-10">
//                 <button
//                   type="button"
//                   onClick={toggleModal}
//                   className="p-2 px-5 text-white bg-blue-600 rounded-md"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
 
//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-md shadow-md w-[800px]">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="flex flex-col">
//                 <label className="text-sm font-normal text-[#15164A]">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-sm font-normal text-[#15164A]">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
//                 />
//               </div>
 
//               <div className="flex flex-col">
//                 <label className="text-sm font-normal text-[#15164A]">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm font-normal text-[#15164A]">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label className="text-sm font-normal text-[#15164A]">Designations</label>
//                 <input
//                   type="text"
//                   name="designations"
//                   value={formData.designations}
//                   onChange={handleChange}
//                   className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
//                 />
//               </div>
 
//               <div className="flex justify-end mt-4 space-x-4">
//                 <button 
//                   type="button"
//                   onClick={toggleModal}
//                   className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="bg-[#3C3EC3] text-white px-4 py-2 rounded-md"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
 
// export default SalesSettings;



import Header from "../../SalesDashboard/components/Header";
import Sidebar from "../../SalesDashboard/components/Sidebar";
import { message } from "antd";
import { getUserById, editUserById } from "../../api/admin/employee/getEmployee";
import { useEffect, useState } from "react";
 
function SalesSettings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [user, setUser] = useState(null);
 
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    phoneNumber: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById();
        console.log("User Data:", userData);
        setUser(userData);
 
        // Pre-fill form with user data
        setFormData({
          fullName: userData?.name || "",
          userName: userData?.mailId || "",
          phoneNumber: userData?.mobileNumber || "",
          oldPassword: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
 
    fetchUser();
  }, []);
 
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
 
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
   
      message.error("New passwords do not match!");
      return;
    }
 
    const updatedData = {
      name: formData.fullName,          
      mailId: formData.userName,        
      mobileNumber: formData.phoneNumber,
      oldPassword: formData.oldPassword,
      password: formData.password,
    };
 
    try {
      await editUserById(user._id, updatedData);
 
         message.success("Profile updated successfully!");
      toggleModal();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
 
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
 
      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        <Header toggleSidebar={toggleSidebar} />
 
        {/* Dashboard Content */}
        <div className="p-6 space-y-8 overflow-auto bg-gray-100">
          <h1 className="text-3xl font-normal text-[#4c48a5]">Profile Settings</h1>
 
          <div className="p-6 mb-6 bg-white rounded-md shadow-md">
            <form className="px-6 space-y-6">
              {/* Full Name */}
              <div className="gap-10 px-5 col md:flex">
                <div className="flex items-center justify-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    readOnly
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                  />
                </div>
              </div>
 
              {/* User Name (Mail ID) */}
              <div className="gap-10 px-5 col md:flex">
                <div className="flex items-center justify-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    readOnly
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                  />
                </div>
              </div>
 
              {/* Password (Hidden Field) */}
              <div className="gap-10 px-5 col md:flex">
                <div className="flex items-center justify-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">Password</label>
                  <input
                    type="password"
                    value="********"
                    className="p-2 border border-gray-300 rounded-md w-[600px] bg-gray-100"
                    disabled
                  />
                </div>
              </div>
 
              {/* Phone Number */}
              <div className="gap-10 px-5 col md:flex">
                <div className="flex items-center justify-center gap-32">
                  <label className="text-sm font-normal text-[#15164A]">Phone No</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    readOnly
                    className="p-2 border border-gray-300 rounded-md w-[600px]"
                  />
                </div>
              </div>
 
              {/* Buttons */}
              <div className="flex justify-center gap-5 px-10">
                <button
                  type="button"
                  onClick={toggleModal} // Open the modal on click
                  className="p-2 px-5 text-white bg-blue-600 rounded-md"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-[800px]">
            <div className="flex flex-col">
              <label className="text-sm font-normal text-[#15164A]">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="p-2 bg-gray-100 border border-gray-300 rounded-md w-72 "
              />
            </div>
            <div className="flex flex-col py-5">
              <label className="text-sm font-normal text-[#15164A]">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="p-2 bg-gray-100 border border-gray-300 rounded-md w-72"
              />
            </div>
 
            <p className="py-2">Password</p>
            <div className="flex flex-col py-1">
              <label className="text-sm font-normal text-[#15164A]">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="p-2 bg-gray-100 border border-gray-300 rounded-md w-72 "
              />
            </div>
 
            <div className="flex gap-8">
              <div className="flex flex-col py-2">
                <label className="text-sm font-normal text-[#15164A]">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 bg-gray-100 border border-gray-300 rounded-md w-72 "
                />
              </div>
              <div className="flex flex-col py-2 md:mt-5">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-2 bg-gray-100 border border-gray-300 rounded-md w-72"
                  placeholder="Confirm new password."
                />
              </div>
            </div>
 
            <button onClick={handleSubmit} className="bg-[#3C3EC3] text-white px-4 py-2 rounded-md md:mt-3">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default SalesSettings;