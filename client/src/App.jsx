import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/Footer';
import Samachar from './pages/Samachar';
import Samaj from './pages/Samaj';
import Rajniti from './pages/Rajniti';
import Isthaniyetaha from './pages/Isthaniyetaha';
import Entertainment from './pages/Entertainment';
import Sahitya from './pages/Sahitya';
import Antarbarta from './pages/Antarbarta';
import Sports from './pages/Sports';
import Pardesh from './pages/Pardesh';


function App() {


  return (
    <>
      <Navbar />
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




       
      </Routes>
      <Footer />
    </>
  )
}

export default App
