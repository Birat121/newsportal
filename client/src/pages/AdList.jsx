// src/pages/AdListPage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const AdListPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fake data or replace with actual API call
  useEffect(() => {
    const fetchAds = async () => {
      try {
        // Replace with actual API call like:
        // const res = await axios.get('/api/ads');
        const res = {
          data: [
            {
              _id: 1,
              title: "Header Banner Ad",
              image: "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
            },
            {
              _id: 2,
              title: "Sidebar Ad",
              image: "https://via.placeholder.com/300x250.png?text=Ad+2",
            },
          ],
        };
        setAds(res.data);
      } catch (err) {
        console.error("Error fetching ads", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this ad?");
    if (!confirm) return;

    try {
      // await axios.delete(`/api/ads/${id}`);
      setAds((prev) => prev.filter((ad) => ad._id !== id));
      alert("Ad deleted (mocked)");
    } catch (err) {
      alert("Failed to delete ad");
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
                    src={ad.image}
                    alt={ad.title}
                    className="h-24 w-40 object-contain rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{ad.title}</h3>
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


