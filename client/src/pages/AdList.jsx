import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal"; // 🆕

const AdListPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // 🆕
  const [deleteId, setDeleteId] = useState(null);     // 🆕

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await api.get("/api/ads/getAd");
        if (Array.isArray(res.data)) setAds(res.data);
        else setAds([]);
      } catch (err) {
        console.error("Error fetching ads", err);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  // 🆕 Open modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // 🆕 Delete handler
  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/api/ads/delete/${deleteId}`);
      setAds((prev) => prev.filter((ad) => ad._id !== deleteId));
      toast.success("✅ Ad deleted successfully");
    } catch (err) {
      toast.error("❌ Failed to delete ad");
      console.error(err);
    } finally {
      setModalOpen(false);
      setDeleteId(null);
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
                    src={ad.imageUrl}
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
                    onClick={() => confirmDelete(ad._id)} // 🆕 trigger modal
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🆕 ConfirmModal */}
        <ConfirmModal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleDeleteConfirmed}
          message="Are you sure you want to delete this ad?"
        />
      </main>
    </div>
  );
};

export default AdListPage;

