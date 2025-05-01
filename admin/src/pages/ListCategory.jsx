import { useState } from "react";

export default function CategoryList() {
  const [categories, setCategories] = useState([
    { _id: "1", name: "Politics", status: "Active" },
    { _id: "2", name: "Technology", status: "Active" },
    { _id: "3", name: "Sports", status: "Inactive" },
  ]);
  
  const [editMode, setEditMode] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleEdit = (category) => {
    setCategoryToEdit(category);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category._id !== id));
  };

  const handleCancel = () => {
    setEditMode(false);
    setCategoryToEdit(null);
  };

  const handleSave = (updatedCategory) => {
    setCategories(categories.map((category) => 
      category._id === updatedCategory._id ? updatedCategory : category
    ));
    setEditMode(false);
    setCategoryToEdit(null);
  };

  return (
    <div className="h-[90vh] flex items-center justify-center p-10">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Category List</h2>
        
        {editMode ? (
          <EditCategoryForm category={categoryToEdit} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          <div>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="p-3 bg-gray-200 text-sm font-semibold">Category Name</th>
                  <th className="p-3 bg-gray-200 text-sm font-semibold">Status</th>
                  <th className="p-3 bg-gray-200 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{category.name}</td>
                    <td className="p-3">{category.status}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function EditCategoryForm({ category, onSave, onCancel }) {
  const [name, setName] = useState(category.name);
  const [status, setStatus] = useState(category.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...category, name, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium text-gray-700 mb-1">Category Name</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      <div className="flex justify-between">
        <button
          type="submit"
          className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
