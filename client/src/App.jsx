import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./components/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import SearchResultsPage from "./components/SearchPage";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddNews from "./pages/AddNews";
import NewsList from "./pages/NewsList";
import EditNews from "./pages/EditNews";
import AddAdPage from "./pages/AddAdPage";
import AdListPage from "./pages/AdList";
import EditAdPage from "./pages/EditAdPage";
import AdminLogout from "./components/AdminLogout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const { admin } = useAuth();

  const isAdminRoute =
    location.pathname === "/adminLogin" ||
    location.pathname.startsWith("/admin/");
  const shouldHideLayout = isAdminRoute;

  const PrivateRoute = ({ children }) => {
    return admin ? children : <Navigate to="/adminLogin" />;
  };

  const PublicRoute = ({ children }) => {
    return admin ? <Navigate to="/admin/dashboard" /> : children;
  };

  return (
    <>
      <ToastContainer />
      {!shouldHideLayout && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />

        {/* Admin Auth Routes */}
        <Route
          path="/adminLogin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-news"
          element={
            <PrivateRoute>
              <AddNews />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/news-list"
          element={
            <PrivateRoute>
              <NewsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-news/:id"
          element={
            <PrivateRoute>
              <EditNews />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/ad-add"
          element={
            <PrivateRoute>
              <AddAdPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/ad-list"
          element={
            <PrivateRoute>
              <AdListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-ad/:id"
          element={
            <PrivateRoute>
              <EditAdPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/logout"
          element={
            <PrivateRoute>
              <AdminLogout />
            </PrivateRoute>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <h2 className="text-center text-red-600 text-2xl mt-20">
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
