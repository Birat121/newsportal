import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Add News", path: "/admin/add-news" },
    { name: "News List", path: "/admin/news-list" },
    { name: "Ad Add", path: "/admin/ad-add" },
    { name: "Ad List", path: "/admin/ad-list" },
  ];

  const handleLogout = async () => {
    try {
      // 🔐 If you're using cookies for token:
      await axios.post("/api/admin/logout", null, { withCredentials: true });

      // 🗑️ Clear token from localStorage if used
      localStorage.removeItem("adminToken");

      toast.success("Logged out successfully");
      navigate("/adminLogin");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-60 bg-gray-800 min-h-screen text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`mb-3 px-3 py-2 rounded hover:bg-gray-700 transition ${
            location.pathname === link.path ? "bg-gray-700" : ""
          }`}
        >
          {link.name}
        </Link>
      ))}

      {/* 🚪 Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
