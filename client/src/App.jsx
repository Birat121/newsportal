import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Samachar from './pages/Samachar';
import Samaj from './pages/Samaj';
import Rajniti from './pages/Rajniti';
import Isthaniyetaha from './pages/Isthaniyetaha';
import Entertainment from './pages/Entertainment';
import Sahitya from './pages/Sahitya';
import Antarbarta from './pages/Antarbarta';
import Sports from './pages/Sports';
import Pardesh from './pages/Pardesh';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddNews from './pages/AddNews';
import NewsList from './pages/NewsList';
import EditNews from './pages/EditNews';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const location = useLocation();

  // Paths where Navbar/Footer should be hidden
  const hideLayoutPaths = ['/adminLogin'];
  const isAdminRoute = location.pathname.startsWith('/admin/');
  const shouldHideLayout = isAdminRoute || hideLayoutPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/समाचार" element={<Samachar />} />
        <Route path="/समाज" element={<Samaj />} />
        <Route path="/राजनीति" element={<Rajniti />} />
        <Route path="/स्थानीय-तह" element={<Isthaniyetaha />} />
        <Route path="/मनोरंजन" element={<Entertainment />} />
        <Route path="/साहित्य" element={<Sahitya />} />
        <Route path="/अन्तरबार्ता" element={<Antarbarta />} />
        <Route path="/खेलकुद" element={<Sports />} />
        <Route path="/प्रदेश" element={<Pardesh />} />

        {/* Admin routes */}
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
