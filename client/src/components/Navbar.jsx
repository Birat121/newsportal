import { useState } from "react";
import { Home, Menu, X, Search } from "lucide-react";
import { FaFacebookF, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";
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
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile fixed top header */}
      <header className="bg-white border-b shadow-md fixed top-0 left-0 w-full z-50 md:relative md:z-0">
        <div className="max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-10 flex items-center relative justify-between md:justify-center">
          {/* Desktop Social Icons */}
          <div className="hidden md:flex gap-4 text-blue-700 text-xl absolute left-4">
            <a
              href="https://www.facebook.com/share/1MF8EMTpHm/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="hover:text-blue-900" />
            </a>

            <a
              href="https://www.tiktok.com/@meropodcast?_t=ZS-8yD3e4kZcuN&_r=1"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok className="hover:text-black" />
            </a>
            <a
              href="https://youtube.com/@meropodcast-7?si=nogbfcMY0AVxvElW"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="hover:text-red-600" />
            </a>
            <a
              href="https://youtube.com/@kishanthapa448?si=u6MBd4BuKo7-TOmF"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="hover:text-red-600" />
            </a>
          </div>

          {/* Logo */}
          <Link to="/" className="block flex-1 md:w-full">
            <div className="flex items-center justify-center w-full cursor-pointer">
              <img
                src={news}
                alt="Logo"
                className="h-10 w-auto object-contain mr-2 md:h-16 md:mr-3"
              />
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-blue-500 text-center">
                  Seven Lake News
                </h1>
                <span className="text-sm md:text-base text-gray-500 block text-center">
                  विश्वतर्फको तपाईंको झ्याल
                </span>
              </div>
            </div>
          </Link>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden flex-shrink-0 ml-2"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Sticky category nav bar (desktop only) */}
      <nav className="bg-[#0B1E3C] text-white hidden md:flex justify-between items-center px-6 py-4 sticky top-0 z-40 shadow-md">
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

      {/* Spacer for mobile fixed header */}
      <div className="h-[76px] md:hidden" />

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col px-4 py-6 overflow-y-auto">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-lg font-semibold text-gray-900 mb-8">
            {categories.map(({ name, slug, isHome }) => (
              <Link
                key={slug}
                to={`/${slug}`}
                onClick={() => setOpen(false)}
                className="hover:text-red-600 transition flex items-center gap-3 py-3 px-2 hover:bg-gray-50 rounded-lg"
              >
                {isHome ? <Home className="h-5 w-5" /> : name}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Mobile Social Icons */}
          <div className="flex justify-center gap-6 text-blue-700 text-2xl mt-8">
            <a href="https://www.facebook.com/share/1MF8EMTpHm/" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:text-blue-900" />
            </a>
            
            <a
              href="https://www.tiktok.com/@meropodcast?_t=ZS-8yD3e4kZcuN&_r=1"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok className="hover:text-black" />
            </a>
            <a
              href="https://youtube.com/@meropodcast-7?si=nogbfcMY0AVxvElW"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="hover:text-red-600" />
            </a>
            <a
              href="https://youtube.com/@kishanthapa448?si=u6MBd4BuKo7-TOmF"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="hover:text-red-600" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
