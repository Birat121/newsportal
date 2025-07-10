// components/AdSidebar.jsx
import React from "react";

const AdSidebar = () => {
  return (
    <aside className="w-full md:w-80 p-2 sticky top-4 hidden md:block">
      

      <div className="mb-6">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=320&q=80"
          alt="Ad 1"
          className="w-full rounded-lg"
          style={{ height: "320px", objectFit: "cover" }}
        />
      </div>

      <div>
        <img
          src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=320&q=80"
          alt="Ad 2"
          className="w-full rounded-lg"
          style={{ height: "320px", objectFit: "cover" }}
        />
      </div>
    </aside>
  );
};

export default AdSidebar;

