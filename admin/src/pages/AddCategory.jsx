import { useState } from "react";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError("Category name is required.");
      return;
    }

    // Simulate API submission
    console.log({ category, status });
    setSuccess("Category added successfully!");
    setCategory("");
    setStatus("Active");
    setError("");
  };

  return (
    <div className="h-[90vh] flex items-center justify-center ">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Category</h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Category Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Politics, Sports"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
