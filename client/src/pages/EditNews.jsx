import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/news/getNews/${id}`)
      .then((res) => {
        const { title, category, content, imageUrl } = res.data;
        setNewsData({ title, category, content, imageUrl });
        setPreviewUrl(imageUrl);
      })
      .catch(() => {
        toast.error("Failed to load news data");
      });
  }, [id]);

  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : newsData.imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, content } = newsData;

    if (!title || !category || !content) {
      toast.error("Title, category, and content are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("newsData", JSON.stringify({ title, category, content }));

      if (imageFile) formData.append("image", imageFile);

      await axios.put(`/api/news/updateNews/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("News updated successfully!");
      navigate("/admin/news-list");
    } catch (err) {
      toast.error("Failed to update news");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Edit News</h2>

        <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
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

          <div>
            <label className="block mb-1 font-medium">Content</label>
            <textarea
              name="content"
              className="w-full border px-3 py-2 rounded h-32"
              value={newsData.content}
              onChange={handleChange}
              required
            />
          </div>

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
