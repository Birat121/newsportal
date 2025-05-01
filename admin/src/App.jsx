import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AddNews from "./pages/AddNews";
import ListNews from "./pages/ListNews";
import AddCategory from "./pages/AddCategory";
import ListCategory from "./pages/ListCategory";
import Dashboard from "./components/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-news" element={<AddNews />} />
        <Route path="list-news" element={<ListNews />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="list-category" element={<ListCategory />} />
      </Route>
    </Routes>
  );
}

export default App;




