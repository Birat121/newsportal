import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext"; // ✅ Import useAuth

const AdminLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Get logout function from context

  useEffect(() => {
    const logoutAdmin = async () => {
      try {
        await axios.post("/api/admin/logout", null, {
          withCredentials: true,
        });

        // ✅ Clear context and localStorage
        logout();

        toast.success("Logged out successfully");
        navigate("/adminLogin");
      } catch (err) {
        toast.error("Logout failed");
        console.error(err);
      }
    };

    logoutAdmin();
  }, [navigate, logout]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Logging out...</p>
    </div>
  );
};

export default AdminLogout;
