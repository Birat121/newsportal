import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";

const AdminLogout = () => {
  const navigate = useNavigate();
  const { logout, admin } = useAuth();

  useEffect(() => {
    const logoutAdmin = async () => {
      try {
        await axios.post("/api/admin/logout", null, {
          withCredentials: true,
        });

        logout(); // Clears localStorage and state
        toast.success("Logged out successfully");
      } catch (err) {
        toast.error("Logout failed");
        console.error(err);
      }
    };

    logoutAdmin();
  }, [logout]);

  // 🚀 Redirect only after admin is null
  useEffect(() => {
    if (!admin) {
      navigate("/adminLogin");
    }
  }, [admin, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Logging out...</p>
    </div>
  );
};

export default AdminLogout;
