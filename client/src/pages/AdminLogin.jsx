import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // ✅ Import useAuth
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Get login function from context

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  console.group("AdminLogin attempt");
  console.log("Submitting login with:", { email, password: password ? "***" : "" });

  try {
    const res = await axios.post(
      "/api/admin/login",
      { email, password },
      { withCredentials: true }
    );
    console.log("Response from backend:", res);

    const token = res.data.token;
    if (!token) {
      throw new Error("No token received in response");
    }

    console.log("Received token:", token);
    login(token);

    toast.success("Login successful");
    console.groupEnd();
    navigate("/admin/dashboard");
  } catch (err) {
    console.error("Login error:", err);

    if (err.response) {
      console.error("Error response data:", err.response.data);
      setError(err.response.data.message || "Login failed with server error");
    } else if (err.request) {
      console.error("No response received, request was:", err.request);
      setError("No response from server. Check your network or server.");
    } else {
      console.error("Error setting up request:", err.message);
      setError(err.message);
    }
    console.groupEnd();
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        {error && (
          <p className="mb-4 text-center text-sm text-red-600">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

