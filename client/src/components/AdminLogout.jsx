
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useAuth } from "../components/AuthContext";
import api from "../utils/api";

const AdminLogout = () => {
  const navigate = useNavigate();
  const { logout, admin } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Prevent multiple logout attempts
    if (isLoggingOut) return;
    
    const logoutAdmin = async () => {
      setIsLoggingOut(true);
      
      try {
        await api.post("/api/admin/logout");
        toast.success("Logged out successfully");
      } catch (err) {
        toast.error("Logout failed");
        console.error(err);
      } finally {
        // Always clear auth state and navigate
        logout();
        
        // Use setTimeout to ensure state update completes
        setTimeout(() => {
          navigate("/adminLogin", { replace: true });
        }, 100);
      }
    };

    logoutAdmin();
  }, [logout, navigate, isLoggingOut]);

  // Fallback: if admin becomes null, navigate
  useEffect(() => {
    if (!admin && !isLoggingOut) {
      navigate("/adminLogin", { replace: true });
    }
  }, [admin, navigate, isLoggingOut]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Logging out...</p>
    </div>
  );
};

export default AdminLogout;