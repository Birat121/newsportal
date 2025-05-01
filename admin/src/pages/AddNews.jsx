import { useState, useEffect } from "react";

export default function AddNews() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [image, setImage] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    // Replace with API call
    const mockTags = ["Breaking", "World", "Health", "Local", "Finance"];
    setAvailableTags(mockTags);

    const mockCategories = [
      { _id: "1", name: "Politics" },
      { _id: "2", name: "Technology" },
    ];
    setCategories(mockCategories);
  }, []);

  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("isFeatured", isFeatured);
    formData.append("tags", JSON.stringify(tags)); // send as JSON string

    alert("News Submitted:\n" + JSON.stringify({
      title, author, content, category, tags, isFeatured
    }, null, 2));

    setTitle("");
    setAuthor("");
    setContent("");
    setCategory("");
    setTags([]);
    setImage(null);
    setIsFeatured(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10"
    >
      <h2 className="text-3xl font-bold text-gray-800">Add News Article</h2>

      <div>
        <label className="block mb-1">Title</label>
        <input
          className="w-full p-3 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter news title"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Author</label>
        <input
          className="w-full p-3 border rounded-md"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Content</label>
        <textarea
          className="w-full p-3 border rounded-md h-48"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="News content..."
          required
        />
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <select
          className="w-full p-3 border rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Tags</label>
        <select
          multiple
          value={tags}
          onChange={(e) =>
            setTags(Array.from(e.target.selectedOptions, (option) => option.value))
          }
          className="w-full p-3 border rounded-md"
        >
          {availableTags.map((tag, idx) => (
            <option key={idx} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <small className="text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple</small>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
        />
        <label>Mark as Featured News</label>
      </div>

      <div>
        <label className="block mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md"
      >
        Submit News
      </button>
    </form>
  );
}
