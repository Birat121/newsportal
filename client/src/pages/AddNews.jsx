import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

    newsItems.forEach((item, idx) => {
      if (!item.title || !item.content || !item.category || !item.imageFile) {
        toast.error(`Please fill all fields for news #${idx + 1}`);
        return;
      }

      formData.append(`news[${idx}][title]`, item.title);
      formData.append(`news[${idx}][content]`, item.content);
      formData.append(`news[${idx}][category]`, item.category);
      formData.append(`news[${idx}][trending]`, item.trending);
      formData.append(`news[${idx}][imageFile]`, item.imageFile);
    });

    try {
      await axios.post("/api/news/multiple", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
                <textarea
                  value={item.content}
                  onChange={(e) =>
                    handleInputChange(idx, "content", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded h-32"
                  placeholder="Enter news content"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block mb-1 font-medium">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(idx, e.target.files[0])
                  }
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



