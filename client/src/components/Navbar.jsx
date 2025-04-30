// components/NewsNavbar.jsx
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import news from "../assets/news.avif";

const categories = [
  "Home",
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Health",
];

const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function NewsNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Header */}
      <header className="bg-white border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-10 flex items-center justify-between relative">
          {/* Social Icons */}
          <div className="hidden md:flex gap-4 text-blue-700 text-xl absolute left-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-blue-900" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-blue-900" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="hover:text-blue-900" />
            </a>
          </div>

          {/* Logo + Title */}
          <div className="flex items-center justify-center w-full">
            <img src={news} alt="Logo" className="h-14 w-14 rounded-full mr-3" />
            <div>
              <h1 className="text-4xl font-extrabold text-blue-500 text-center">
                NewsSphere
              </h1>
              <span className="text-base text-gray-500 block text-center">
                Your Window to the World
              </span>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden absolute right-4" onClick={() => setOpen(true)}>
            <Menu className="h-7 w-7 text-gray-800" />
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="bg-[#0B1E3C] text-white hidden md:flex justify-between items-center px-6 py-4">
          <div className="flex flex-wrap gap-6 text-base font-medium">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/${slugify(cat === "Home" ? "" : cat)}`}
                className="hover:text-blue-50 transition duration-150"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="px-4 py-2 rounded-full text-sm text-black bg-white pr-10 w-48"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm font-semibold rounded text-white transition duration-150">
              Trending
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-6">
          <button className="absolute top-6 right-6" onClick={() => setOpen(false)}>
            <X className="h-7 w-7 text-gray-800" />
          </button>

          <nav className="flex flex-col gap-6 text-2xl font-semibold text-gray-900">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/${slugify(cat === "Home" ? "" : cat)}`}
                onClick={() => setOpen(false)}
                className="hover:text-red-600 transition"
              >
                {cat}
              </Link>
            ))}
          </nav>

          <div className="mt-8 w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 rounded-full border text-sm"
            />
            <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full text-sm font-semibold">
              Trending
            </button>
          </div>
        </div>
      )}
    </>
  );
}
