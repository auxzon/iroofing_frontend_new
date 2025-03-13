// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/images/logo.png";
// import { verifyotp } from "../api/admin/auth/auth";
// import { setUserInfo } from "../redux/slices/auth"; 
// const Otp = () => {
//   const [otp, setOtp] = useState("");
//   const [sentOtp, setSentOtp] = useState("123456"); // Mock OTP sent via email
//   const [resendMessage, setResendMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
 
//   const handleOtpSubmit = (e) => {
//     e.preventDefault();
 
//     // Verify OTP
//     if (otp === sentOtp) {
//       console.log("OTP Verified!");
//       navigate("/reset-password"); // Redirect to reset password page
//     } else {
//       setErrorMessage("Invalid OTP. Please try again.");
//     }
//   };
 
//   const handleResendOtp = () => {
//     // Logic to resend OTP (mock example)
//     console.log("Resend OTP triggered");
//     setSentOtp("123456"); // In real implementation, regenerate and send OTP via API
//     setResendMessage("A new OTP has been sent to your email.");
//     setErrorMessage(""); // Clear previous errors
//   };
 
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#2a2291]">
//       <img src={logo} alt="" />
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-2xl font-semibold text-blue-900">Enter The OTP</h1>
//         <p className="text-gray-600 mt-2">
//           An OTP has been sent to your email.
//         </p>
//         <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
//           <div>
//             <label htmlFor="otp" className="block text-gray-700 font-medium">
//               Enter OTP
//             </label>
//             <input
//               id="otp"
//               type="text"
//               placeholder="Enter your OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
//           >
//             Continue
//           </button>
//         </form>
//         {errorMessage && (
//           <p className="mt-2 text-red-500 text-sm text-center">
//             {errorMessage}
//           </p>
//         )}
//         <div className="mt-4 text-center flex justify-center items-center">
//           <p>Do not receive the OTP?</p>
//           <button
//             onClick={handleResendOtp}
//             className="text-blue-500 hover:underline px-2"
//           >
//             Resend OTP
//           </button>
//         </div>
//         {resendMessage && (
//           <p className="mt-2 text-green-500 text-sm text-center">
//             {resendMessage}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default Otp;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { verifyotp } from "../api/admin/auth/auth";
import { setUserInfo } from "../redux/slices/auth"; 
const Otp = () => {
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("123456"); // Mock OTP sent via email
  const [resendMessage, setResendMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
 
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    const storedEmail = sessionStorage.getItem("userEmail"); // Get email from session storage
  
    if (!storedEmail) {
      setErrorMessage("Session expired. Please request a new OTP.");
      return;
    }
  
    try {
      const response = await verifyotp({ email: storedEmail, otp }); // Send OTP & email to backend
      console.log(response);
  
      if (response.status === 200 && response.data?.token) {
        console.log("OTP Verified!");
  
        // Store the reset token in session storage
        sessionStorage.setItem("token", response.data.token);
  
        // Redirect to reset password page
        navigate("/reset-password");
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(error);
    }
  };
  
  

  const handleResendOtp = async () => {
    try {
      const response = await sendOtp(); // Call API to resend OTP
      if (response.status==200) {
        setResendMessage("A new OTP has been sent to your email.");
      } else {
        setResendMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setResendMessage("Error resending OTP.");
    }
  }
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2a2291]">
      <img src={logo} alt="" />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-blue-900">Enter The OTP</h1>
        <p className="text-gray-600 mt-2">
          An OTP has been sent to your email.
        </p>
        <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-medium">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Continue
          </button>
        </form>
        {errorMessage && (
          <p className="mt-2 text-red-500 text-sm text-center">
            {errorMessage}
          </p>
        )}
        <div className="mt-4 text-center flex justify-center items-center">
          <p>Do not receive the OTP?</p>
          <button
            onClick={handleResendOtp}
            className="text-blue-500 hover:underline px-2"
          >
            Resend OTP
          </button>
        </div>
        {resendMessage && (
          <p className="mt-2 text-green-500 text-sm text-center">
            {resendMessage}
          </p>
        )}
      </div>
    </div>
  );
};
 
export default Otp;