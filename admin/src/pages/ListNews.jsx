import { useState, useEffect } from "react";

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    const mockNews = [
      { id: 1, title: "Tech Breakthrough", category: "Technology", status: "Published" },
      { id: 2, title: "Elections Coming", category: "Politics", status: "Draft" },
      { id: 3, title: "World Cup News", category: "Sports", status: "Published" },
      { id: 4, title: "AI in Healthcare", category: "Technology", status: "Draft" },
      { id: 5, title: "Local Elections", category: "Politics", status: "Published" },
      { id: 6, title: "Cricket League", category: "Sports", status: "Draft" },
    ];
    setNewsList(mockNews);
    setFilteredNews(mockNews);
  }, []);

  useEffect(() => {
    let filtered = newsList;

    if (filterCategory) {
      filtered = filtered.filter((n) => n.category === filterCategory);
    }

    if (filterStatus) {
      filtered = filtered.filter((n) => n.status === filterStatus);
    }

    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [filterCategory, filterStatus, newsList]);

  const handleEdit = (news) => {
    setEditingId(news.id);
    setEditFormData({
      title: news.title,
      category: news.category,
      status: news.status,
    });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      const updatedList = newsList.filter((n) => n.id !== id);
      setNewsList(updatedList);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedList = newsList.map((n) =>
      n.id === editingId ? { ...n, ...editFormData } : n
    );
    setNewsList(updatedList);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="max-w-7xl w-full p-8 bg-white shadow-xl rounded-xl mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">News List</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="p-2 border rounded"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Politics">Politics</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
          </select>

          <select
            className="p-2 border rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedNews.length > 0 ? (
                paginatedNews.map((news) =>
                  editingId === news.id ? (
                    <tr key={news.id} className="bg-yellow-50">
                      <td className="p-2 border">
                        <input
                          name="title"
                          value={editFormData.title}
                          onChange={handleEditChange}
                          className="w-full border p-1"
                        />
                      </td>
                      <td className="p-2 border">
                        <select
                          name="category"
                          value={editFormData.category}
                          onChange={handleEditChange}
                          className="w-full border p-1"
                        >
                          <option value="Politics">Politics</option>
                          <option value="Technology">Technology</option>
                          <option value="Sports">Sports</option>
                        </select>
                      </td>
                      <td className="p-2 border">
                        <select
                          name="status"
                          value={editFormData.status}
                          onChange={handleEditChange}
                          className="w-full border p-1"
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </td>
                      <td className="p-2 border space-x-2">
                        <button
                          onClick={handleEditSubmit}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={news.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{news.title}</td>
                      <td className="p-3 border">{news.category}</td>
                      <td className="p-3 border">
                        <span
                          className={`px-2 py-1 text-sm rounded ${
                            news.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {news.status}
                        </span>
                      </td>
                      <td className="p-3 border space-x-2">
                        <button
                          onClick={() => handleEdit(news)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(news.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No news available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

