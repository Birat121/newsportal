// layout/MainLayout.jsx
import React from "react";
import AdSidebar from "../components/AdSidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 ">
      <main className="flex-1">{children}</main>
      <AdSidebar />
    </div>
  );
};

export default MainLayout;
