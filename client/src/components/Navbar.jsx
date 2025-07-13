import { useState } from "react";
import { Home, Menu, X, Search } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import news from "../assets/seven.jpg";

const categories = [
  { name: "गृहपृष्ठ", slug: "", isHome: true },
  { name: "समाचार", slug: "category/समाचार" },
  { name: "समाज", slug: "category/समाज" },
  { name: "राजनीति", slug: "category/राजनीति" },
  { name: "स्थानीय तह", slug: "category/स्थानीय-तह" },
  { name: "मनोरंजन", slug: "category/मनोरंजन" },
  { name: "साहित्य", slug: "category/साहित्य" },
  { name: "अन्तरबार्ता", slug: "category/अन्तरबार्ता" },
  { name: "खेलकुद", slug: "category/खेलकुद" },
  { name: "प्रदेश", slug: "category/प्रदेश" },
];

export default function NewsNavbar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setOpen(false); // close mobile menu if open
    }
  };

  return (
    <>
      <header className="bg-white border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-10 flex items-center relative justify-between md:justify-center">
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

          <Link to="/" className="block w-full">
            <div className="flex items-center justify-center w-full cursor-pointer">
              <img
                src={news}
                alt="Logo"
                className="h-16 w-auto object-contain mr-3"
              />
              <div>
                <h1 className="text-4xl font-extrabold text-blue-500 text-center">
                  Seven Lake News
                </h1>
                <span className="text-base text-gray-500 block text-center">
                  विश्वतर्फको तपाईंको झ्याल
                </span>
              </div>
            </div>
          </Link>

          <button
            className="md:hidden absolute right-4 z-10"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-7 w-7 text-gray-800" />
          </button>
        </div>

        <nav className="bg-[#0B1E3C] text-white hidden md:flex justify-between items-center px-6 py-4">
          <div className="flex flex-wrap gap-6 text-xl font-medium items-center">
            {categories.map(({ name, slug, isHome }) => (
              <Link
                key={slug}
                to={`/${slug}`}
                className="hover:text-blue-50 transition duration-150 flex items-center gap-1"
              >
                {isHome ? <Home className="h-5 w-5" /> : name}
              </Link>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-full text-sm text-black bg-white pr-10 w-48"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </form>
        </nav>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-6">
          <button
            className="absolute top-6 right-6"
            onClick={() => setOpen(false)}
          >
            <X className="h-7 w-7 text-gray-800" />
          </button>

          <nav className="flex flex-col gap-6 text-2xl font-semibold text-gray-900">
            {categories.map(({ name, slug, isHome }) => (
              <Link
                key={slug}
                to={`/${slug}`}
                onClick={() => setOpen(false)}
                className="hover:text-red-600 transition flex items-center gap-2"
              >
                {isHome ? <Home className="h-6 w-6" /> : name}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="mt-8 w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-full border text-sm"
            />
          </form>
        </div>
      )}
    </>
  );
}
