import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      const res = await axios.get("/api/news/getNews");
      setNewsList(res.data); // Make sure backend returns an array
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this news?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/news/deleteNews/${id}`);
      setNewsList(newsList.filter((news) => news._id !== id));
      toast.success("✅ News deleted");
    } catch (err) {
      toast.error("❌ Failed to delete");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">News List</h2>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : newsList.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Title</th>
                <th className="border border-gray-300 p-2 text-left">Category</th>
                <th className="border border-gray-300 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map(({ _id, title, category }) => (
                <tr key={_id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{title}</td>
                  <td className="border border-gray-300 p-2">{category}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => navigate(`/admin/edit-news/${_id}`)}
                      className="mr-3 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No news found.</p>
        )}
      </main>
    </div>
  );
};

export default NewsList;
