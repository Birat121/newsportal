import React, { useState, useEffect } from "react";
import ad1 from "../assets/banner 1.jpg";
import ad2 from "../assets/banner2.jpg";
import ad3 from "../assets/banner3.jpg";

const adImages = [ad1, ad2, ad3];

const AdSidebar = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) =>
        prevIndex === adImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handlePrev = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === 0 ? adImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === adImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="max-w-2xl mx-auto relative bg-white border rounded-lg shadow-md overflow-hidden">
        <img
          src={adImages[currentAdIndex]}
          alt={`Ad ${currentAdIndex + 1}`}
          className="w-full h-72 object-cover object-center transition duration-500 ease-in-out"
        />

        {adImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full px-3 py-1"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full px-3 py-1"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdSidebar;
