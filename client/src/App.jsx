import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddNews from "./pages/AddNews";
import NewsList from "./pages/NewsList";
import EditNews from "./pages/EditNews";
import AddAdPage from "./pages/AddAdPage";
import AdListPage from "./pages/AdList";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const hideLayoutPaths = ["/adminLogin"];
  const isAdminRoute =
    location.pathname === "/adminLogin" ||
    location.pathname.startsWith("/admin/");

  const shouldHideLayout =
    isAdminRoute || hideLayoutPaths.includes(location.pathname);

  return (
    <>
    <ToastContainer />
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<CategoryPage />} />

        {/* Admin Routes */}
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-news" element={<AddNews />} />
        <Route path="/admin/news-list" element={<NewsList />} />
        <Route path="/admin/edit-news/:id" element={<EditNews />} />
        <Route path="/admin/ad-add" element={<AddAdPage />} />
        <Route path="/admin/ad-list" element={<AdListPage />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
