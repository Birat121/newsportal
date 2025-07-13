import React, { useState, useEffect } from "react";
import axios from "axios";

const AdSidebar = () => {
  const [ads, setAds] = useState(null); // null = loading
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get("/api/ads/getAd");

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
    <div className="w-full px-4 py-4">
      <div className="max-w-2xl mx-auto relative bg-white border rounded-lg shadow-md overflow-hidden">
        <img
          src={currentAd.imageUrl}
          alt={`Ad ${currentAdIndex + 1}`}
          className="w-full h-72 object-cover object-center transition duration-500 ease-in-out"
        />

        {currentAd.description && (
          <div className="p-4 text-center text-sm text-gray-600">
            {currentAd.description}
          </div>
        )}

        {ads.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentAdIndex(
                  currentAdIndex === 0 ? ads.length - 1 : currentAdIndex - 1
                )
              }
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full px-3 py-1"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setCurrentAdIndex(
                  currentAdIndex === ads.length - 1 ? 0 : currentAdIndex + 1
                )
              }
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
