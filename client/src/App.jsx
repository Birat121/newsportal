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

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const location = useLocation();
  const hideLayoutPaths = ["/adminLogin"];
  const isAdminRoute = location.pathname.startsWith("/admin/");
  const shouldHideLayout = isAdminRoute || hideLayoutPaths.includes(location.pathname);

  return (
    <>
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
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;

