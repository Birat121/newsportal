import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../utils/api";
import { toast } from "react-toastify";

const AddAdPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [adTitle, setAdTitle] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/gif" ||
        selectedFile.type.startsWith("image/"))
    ) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      toast.error("Please select an image or GIF file.");
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image or GIF file.");
      return;
    }

    const formData = new FormData();
    formData.append("adFile", file);
    formData.append("title", adTitle);

    try {
      const res = await api.post("/api/ads/uploadAd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Ad uploaded successfully.");
      console.log(res.data);
      setFile(null);
      setPreviewUrl(null);
      setAdTitle("");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);

      toast.error("❌ Failed to upload ad.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 min-h-screen">
        <div className="max-w-md w-full p-6 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Add New Advertisement
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium">
              Ad Title (optional)
            </label>
            <input
              type="text"
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded"
              placeholder="Enter ad title"
            />

            <label className="block mb-2 font-medium">
              Upload Image or GIF
            </label>
            <input
              type="file"
              accept="image/gif,image/*"
              onChange={handleFileChange}
              className="mb-4"
            />

            {previewUrl && (
              <div className="mb-4">
                <p className="mb-1 font-medium">Preview:</p>
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
              Submit Ad
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddAdPage;
