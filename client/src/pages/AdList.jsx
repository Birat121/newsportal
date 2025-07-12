import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdListPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch ads from backend
  useEffect(() => {
  const fetchAds = async () => {
    try {
      const res = await axios.get("/api/ads/getAd");

      console.log("Fetched ads:", res.data); // 👈 inspect shape

      // ✅ Ensure it's an array before setting
      if (Array.isArray(res.data)) {
        setAds(res.data);
      } else {
        console.warn("Ads response was not an array:", res.data);
        setAds([]);
      }
    } catch (err) {
      console.error("Error fetching ads", err);
      setAds([]); // fallback to empty list to avoid map error
    } finally {
      setLoading(false);
    }
  };

  fetchAds();
}, []);


  // ✅ Delete ad
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this ad?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/ads/${id}`); // ← real DELETE call
      setAds((prev) => prev.filter((ad) => ad._id !== id));
      toast.success("✅ Ad deleted successfully");
    } catch (err) {
      toast.error("❌ Failed to delete ad");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">All Advertisements</h2>

        {loading ? (
          <p>Loading ads...</p>
        ) : ads.length === 0 ? (
          <p>No ads available.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {ads.map((ad) => (
              <div
                key={ad._id}
                className="bg-white border rounded p-4 flex items-center justify-between shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={ad.imageUrl} // ← from backend
                    alt={ad.description || "Ad image"}
                    className="h-24 w-40 object-contain rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {ad.description || "Untitled Ad"}
                    </h3>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/admin/edit-ad/${ad._id}`}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdListPage;
