// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Fake News Generator for mock data
const generateFakeNews = (count, category) => {
  const sampleImages = [
    "https://source.unsplash.com/random/400x300?sig=",
    "https://source.unsplash.com/collection/190727/400x300?sig=",
  ];

  return Array.from({ length: count }, (_, i) => ({
    _id: i,
    title: `${category} News Title ${i + 1}`,
    description: `This is the description for ${category} news number ${i + 1}.`,
    image: `${sampleImages[i % sampleImages.length]}${i}`,
    category,
  }));
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // ✅ Show 5 items per page (1 column × 5 rows)

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1); // ✅ Reset to page 1 when category changes

    setTimeout(() => {
      const fakeNews = generateFakeNews(50, slug); // 50 fake items
      setNewsList(fakeNews);
      setLoading(false);
    }, 500);
  }, [slug]);

  const totalPages = Math.ceil(newsList.length / pageSize);
  const paginatedNews = newsList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">
        {slug.replace(/-/g, " ")}
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : paginatedNews.length === 0 ? (
        <p className="text-center">No news found in this category.</p>
      ) : (
        <>
          <div className="space-y-6">
            {paginatedNews.map((news) => (
              <div key={news._id} className="bg-white rounded shadow-md p-4">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-60 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                <p className="text-gray-700 text-sm">{news.description}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
