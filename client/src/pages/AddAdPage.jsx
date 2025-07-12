import React, { useState } from "react";

const AddAdPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [adTitle, setAdTitle] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/gif" || selectedFile.type.startsWith("image/"))
    ) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      alert("Please select an image or GIF file.");
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image or GIF to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("adFile", file);
    formData.append("title", adTitle);

    alert("Ad submitted! (Connect this with backend to save.)");

    setFile(null);
    setPreviewUrl(null);
    setAdTitle("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="max-w-md w-full p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Advertisement</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium" htmlFor="adTitle">
            Ad Title (optional)
          </label>
          <input
            type="text"
            id="adTitle"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="Enter ad title or description"
          />

          <label className="block mb-2 font-medium" htmlFor="adFile">
            Upload Image or GIF
          </label>
          <input
            type="file"
            id="adFile"
            accept="image/gif,image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          {previewUrl && (
            <div className="mb-4">
              <p className="mb-1 font-medium">Preview:</p>
              <img
                src={previewUrl}
                alt="Ad Preview"
                className="max-w-full max-h-48 rounded shadow"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Ad
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdPage;

