// layout/MainLayout.jsx
import React from "react";
import AdSidebar from "../components/AdSidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Show ads after the navbar */}
      <AdSidebar />

      {/* Main page content */}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
