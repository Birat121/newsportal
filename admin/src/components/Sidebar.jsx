import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Newspaper,
  ListOrdered,
  Folder,
  PlusCircle,
  LayoutList,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [openCategory, setOpenCategory] = useState(false);
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-md font-medium text-base hover:bg-gray-700 transition-all duration-200 ease-in-out ${
      location.pathname === path ? "bg-gray-700" : ""
    }`;

  return (
    <>
      {/* Top Bar for Mobile */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4 fixed w-full z-40">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 z-40 transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:z-auto`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6 hidden md:block">
          <Link to="/" className={linkClasses("/")}>Admin Panel</Link>
        </h2>

        <nav className="space-y-2">
          <Link to="/add-news" className={linkClasses("/add-news")}>
            <Newspaper size={20} />
            Add News
          </Link>

          <Link to="/list-news" className={linkClasses("/list-news")}>
            <ListOrdered size={20} />
            List News
          </Link>

          <div>
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="flex items-center w-full gap-3 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-all duration-200 ease-in-out"
            >
              <Folder size={20} />
              <span className="flex-1 text-left">Category</span>
              {openCategory ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            <div
              className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                openCategory ? "max-h-40" : "max-h-0"
              }`}
            >
              <Link to="/add-category" className={linkClasses("/add-category")}>
                <PlusCircle size={18} />
                Add Category
              </Link>
              <Link to="/list-category" className={linkClasses("/list-category")}>
                <LayoutList size={18} />
                List Category
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Padding for top bar on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
