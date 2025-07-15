import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";
import api from "../utils/api";  // Use centralized axios instance

const AdminLogout = () => {
  const navigate = useNavigate();
  const { logout, admin } = useAuth();

  useEffect(() => {
    const logoutAdmin = async () => {
      try {
        await api.post("/api/admin/logout"); // no need to pass null explicitly

        logout(); // Clears localStorage and state
        toast.success("Logged out successfully");
      } catch (err) {
        toast.error("Logout failed");
        console.error(err);
      }
    };

    logoutAdmin();
  }, [logout]);

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
