import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { resetpassword } from "../api/admin/auth/auth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 


const handleReset = async (e) => {
    e.preventDefault();
    setError(null);

    // Retrieve token from sessionStorage
    const token = sessionStorage.getItem("resetToken"); // Ensure the correct key

    if (!token) {
        setError("Invalid or missing token!");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
    }

    try {
        setLoading(true);

        // Debugging: Check the request payload
        console.log("Reset Request Data:", { token, newPassword: password });

        const response = await resetpassword({ token, newPassword: password });

        if (response?.data?.success) {
            alert("Password reset successfully!");
            sessionStorage.removeItem("resetToken");
            sessionStorage.removeItem("userEmail");
            navigate("/login");
        } else {
            throw new Error(response?.data?.message || "Password reset failed!");
        }
    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong!");
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2a2291]">
      <img src={logo} alt="Logo" className="mb-6" />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-blue-900">Reset Password</h1>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;