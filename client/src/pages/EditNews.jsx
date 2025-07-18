import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../utils/api";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const categories = [
  { label: "News", value: "समाचार" },
  { label: "Society", value: "समाज" },
  { label: "Politics", value: "राजनीति" },
  { label: "Local Government", value: "स्थानीय तह" },
  { label: "Entertainment", value: "मनोरंजन" },
  { label: "Literature", value: "साहित्य" },
  { label: "Interview", value: "अन्तरबार्ता" },
  { label: "Sports", value: "खेलकुद" },
  { label: "Province", value: "प्रदेश" },
];

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newsData, setNewsData] = useState({
    title: "",
    category: "",
    content: "",
    imageUrl: "",
    trending: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`/api/news/getNews/${id}`);
        const { title, category, content, imageUrl, trending } = res.data;

        setNewsData({
          title,
          category,
          content,
          imageUrl,
          trending: !!trending,
        });
        setPreviewUrl(imageUrl);
      } catch (err) {
        toast.error("❌ Failed to load news data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, category, content, trending } = newsData;

    if (!title || !category || !content) {
      toast.error("❌ Title, category, and content are required");
      return;
    }

    const formData = new FormData();
    formData.append(
      "newsData",
      JSON.stringify({ title, category, content, trending })
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await api.put(`/api/news/updateNews/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ News updated successfully");
      navigate("/admin/news-list");
    } catch (err) {
      toast.error("❌ Failed to update news");
      console.error(err);
    }
  };

  if (loading) return <p className="p-8">Loading news...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Edit News</h2>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          {/* Title */}
          <div>
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

          {/* Category */}
          <div>
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
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 font-medium">Content</label>
            <ReactQuill
              theme="snow"
              value={newsData.content}
              onChange={(val) =>
                setNewsData((prev) => ({ ...prev, content: val }))
              }
              className="bg-white"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-3 h-40 object-contain rounded shadow"
              />
            )}
          </div>

          {/* Trending Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="trending"
              id="trending"
              checked={newsData.trending}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="trending" className="font-medium">
              Mark as Trending
            </label>
          </div>

          {/* Submit Button */}
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

