import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const EditAdPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get(`/api/ads/getAd/${id}`);
        setDescription(res.data.description || "");
        setPreviewUrl(res.data.imageUrl || null); // existing image preview
      } catch (err) {
        toast.error("Failed to fetch ad data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/gif" || selectedFile.type.startsWith("image/"))
    ) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Please select an image or GIF file.");
      setFile(null);
      // keep old previewUrl if any, because image is required
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: image is required (either existing preview or new file)
    if (!previewUrl && !file) {
      toast.error("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description); // optional
    if (file) {
      formData.append("adFile", file);
    }

    try {
      await axios.put(`/api/ads/updateAd/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Ad updated successfully");
      
    } catch (err) {
      toast.error("Failed to update ad");
      console.error(err);
    }
  };

  if (loading) return <p className="p-8">Loading ad details...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Advertisement</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="font-medium">Description (optional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              rows={4}
              placeholder="Enter ad description"
            />
          </label>

          <label className="block">
            <span className="font-medium">Change Image (required)</span>
            <input
              type="file"
              accept="image/gif,image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
          </label>

          {previewUrl && (
            <div className="mt-4">
              <p className="font-medium mb-2">Image Preview:</p>
              <img
                src={previewUrl}
                alt="Ad Preview"
                className="max-w-full max-h-48 rounded shadow"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Ad
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditAdPage;
