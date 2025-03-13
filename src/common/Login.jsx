import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo.png";
import { message } from "antd";
import { setUserInfo } from "../redux/slices/auth";
import { login } from "../api/admin/auth/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    mailId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit logic for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData);
      console.log(response);

      if (response?.data) {
        dispatch(setUserInfo(response.data));
        message.success("Logged in successfully");
        if(data.userType=="admin"){
          navigate("/admin");
        }
        else if(data.userType=="sales"){
          navigate("/Sales");
        }
        else if(data.userType=="rates"){
          navigate("/rates/materials");
        }
        else if(data.userType=="Site Visitor"){
          navigate("/");
        }
     
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2a2291]">
      <div className="mb-8">
        <img src={logo} alt="Logo" className="max-w-[200px]" />
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-left">
          <h1 className="text-2xl font-semibold text-blue-900">Login</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="mailId" className="block text-gray-700 font-medium">
              Email Id
            </label>
            <input
              id="mailId"
              name="mailId"
              type="email"
              placeholder="Enter your email"
              value={formData.mailId}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center flex justify-center items-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline space-x-2 pr-3">
            Forgot Password?
          </Link>
          <span className="text-gray-400">|</span>
          <Link to="/reset-password" className="text-blue-500 hover:underline pl-3">
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
