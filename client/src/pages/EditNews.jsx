import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newsData, setNewsData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [error, setError] = useState("");

  const categories = [
    "news",
    "business",
    "world",
    "technology",
    "sports",
    "entertainment",
    "opinion",
  ];

  useEffect(() => {
    axios
      .get(`/api/news/${id}`)
      .then((res) => setNewsData(res.data))
      .catch(() => setError("Failed to load news data"));
  }, [id]);

  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { title, category, content, image } = newsData;

    if (!title || !category || !content || !image) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.put(`/api/news/${id}`, newsData);
      navigate("/admin/news-list");
    } catch {
      setError("Failed to update news");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Edit News</h2>

        {error && (
          <p className="mb-4 text-red-600 font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border px-3 py-2 rounded"
              value={newsData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              className="w-full border px-3 py-2 rounded"
              value={newsData.category}
              onChange={handleChange}
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
              name="content"
              className="w-full border px-3 py-2 rounded h-32"
              value={newsData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              className="w-full border px-3 py-2 rounded"
              value={newsData.image}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update News
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditNews;
