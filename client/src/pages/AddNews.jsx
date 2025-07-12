import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // store File object here
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = [
    "news",
    "business",
    "world",
    "technology",
    "sports",
    "entertainment",
    "opinion",
  ];

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !category || !content || !imageFile) {
      setError("All fields are required");
      return;
    }

    try {
      // Prepare form data for file upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("content", content);
      formData.append("image", imageFile);

      await axios.post("/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/news-list");
    } catch (err) {
      setError("Failed to add news");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Add News</h2>

        {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter news title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              className="w-full border px-3 py-2 rounded h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter news content"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add News
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddNews;

