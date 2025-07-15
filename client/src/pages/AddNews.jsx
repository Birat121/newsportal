import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

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

const AddNews = () => {
  const [newsItems, setNewsItems] = useState([
    {
      title: "",
      content: "",
      category: "",
      imageFile: null,
      previewUrl: null,
      trending: false,
    },
  ]);
  const navigate = useNavigate();

  const handleInputChange = (index, field, value) => {
    const updated = [...newsItems];
    updated[index][field] = value;
    setNewsItems(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...newsItems];
    updated[index].imageFile = file;
    updated[index].previewUrl = file ? URL.createObjectURL(file) : null;
    setNewsItems(updated);
  };

  const addNewsBlock = () => {
    setNewsItems([
      ...newsItems,
      {
        title: "",
        content: "",
        category: "",
        imageFile: null,
        previewUrl: null,
        trending: false,
      },
    ]);
  };

  const removeNewsBlock = (index) => {
    if (newsItems.length === 1) return;
    const updated = [...newsItems];
    updated.splice(index, 1);
    setNewsItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Step 1: Build the JSON data for news content
    const newsPayload = [];

    for (let i = 0; i < newsItems.length; i++) {
      const item = newsItems[i];

      if (!item.title || !item.content || !item.category || !item.imageFile) {
        toast.error(`Please fill all fields for news #${i + 1}`);
        return;
      }

      // Push all non-file fields into a plain JS object
      newsPayload.push({
        title: item.title,
        content: item.content,
        category: item.category,
        trending: item.trending,
      });

      // Append file separately as part of `images[]`
      formData.append("images", item.imageFile);
    }

    // Step 2: Attach the JSON string of news data
    formData.append("newsData", JSON.stringify(newsPayload));

    // Step 3: Submit the form
    try {
      await api.post("/api/news/multiple", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("✅ News articles added successfully");
      navigate("/admin/news-list");
    } catch (err) {
      toast.error("❌ Failed to add news");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Add News Articles</h2>

        <form onSubmit={handleSubmit} className="space-y-12">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="border p-6 rounded-lg shadow bg-white space-y-4 relative"
            >
              <h3 className="text-xl font-semibold">News #{idx + 1}</h3>

              <button
                type="button"
                className="absolute top-3 right-3 text-red-500 font-bold"
                onClick={() => removeNewsBlock(idx)}
              >
                ✕
              </button>

              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleInputChange(idx, "title", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter news title"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  value={item.category}
                  onChange={(e) =>
                    handleInputChange(idx, "category", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded"
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
                <ReactQuill
                  theme="snow"
                  value={item.content}
                  onChange={(value) => handleInputChange(idx, "content", value)}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(idx, e.target.files[0])}
                  required
                />
                {item.previewUrl && (
                  <img
                    src={item.previewUrl}
                    alt="Preview"
                    className="h-40 mt-3 object-contain rounded shadow"
                  />
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`trending-${idx}`}
                  checked={item.trending}
                  onChange={(e) =>
                    handleInputChange(idx, "trending", e.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor={`trending-${idx}`} className="font-medium">
                  Mark as Trending
                </label>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewsBlock}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            + Add Another News
          </button>

          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 mt-6 rounded hover:bg-blue-700 transition"
            >
              Submit News Articles
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNews;
