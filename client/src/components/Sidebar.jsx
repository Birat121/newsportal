import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Add News", path: "/admin/add-news" },
    { name: "News List", path: "/admin/news-list" },
    { name: "Add Ad", path: "/admin/ad-add" }
  ];

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
    </div>
  );
};

export default Sidebar;
