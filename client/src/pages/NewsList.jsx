import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      // Mock data for testing without backend
      const mockData = [
        { _id: "1", title: "Breaking News 1", category: "sports" },
        { _id: "2", title: "Politics Today", category: "राजनीति" },
        { _id: "3", title: "Tech Trends", category: "technology" },
      ];

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setNewsList(mockData);
    } catch {
      setError("Failed to fetch news");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    // Since no backend, simulate delete locally
    setNewsList(newsList.filter((news) => news._id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">News List</h2>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        {Array.isArray(newsList) && newsList.length > 0 ? (
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

