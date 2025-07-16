import React, { useState, useEffect } from "react";
import api from "../utils/api";

const AdSidebar = () => {
  const [ads, setAds] = useState(null); // null = loading
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await api.get("/api/ads/getAd");
        
        console.log("Fetched ads:", res.data); // Debug
        if (Array.isArray(res.data)) {
          setAds(res.data);
        } else {
          setAds([]);
        }
      } catch (error) {
        console.error("Failed to fetch ads:", error);
        setAds([]);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (!ads || ads.length === 0) return;

    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) =>
        prevIndex === ads.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [ads]);

  // Do not render anything if ads are still loading or empty
  if (!ads || ads.length === 0) {
    return null;
  }

  const currentAd = ads[currentAdIndex];

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <div className="max-w-2xl mx-auto relative bg-white border rounded-lg shadow-md overflow-hidden">
        {/* Image Container with responsive height */}
        <div className="relative">
          <img
            src={currentAd.imageUrl}
            alt={`Ad ${currentAdIndex + 1}`}
            className="w-full h-48 sm:h-64 md:h-72 object-cover object-center transition duration-500 ease-in-out"
          />
          
          {/* Navigation buttons - better mobile positioning */}
          {ads.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentAdIndex(
                    currentAdIndex === 0 ? ads.length - 1 : currentAdIndex - 1
                  )
                }
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold transition-colors"
                aria-label="Previous ad"
              >
                ‹
              </button>
              <button
                onClick={() =>
                  setCurrentAdIndex(
                    currentAdIndex === ads.length - 1 ? 0 : currentAdIndex + 1
                  )
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl font-bold transition-colors"
                aria-label="Next ad"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Description with better mobile spacing */}
        {currentAd.description && (
          <div className="p-3 sm:p-4 text-center text-sm sm:text-base text-gray-600 leading-relaxed">
            {currentAd.description}
          </div>
        )}

        {/* Dots indicator for multiple ads */}
        {ads.length > 1 && (
          <div className="flex justify-center space-x-2 pb-3 sm:pb-4">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentAdIndex 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSidebar;