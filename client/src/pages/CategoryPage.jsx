import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../utils/api";

const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const formatCategoryName = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const CategoryPage = () => {
  const { slug } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const formattedCategory = formatCategoryName(slug);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/news/category/${slug}?page=${currentPage}&limit=${pageSize}`
        );
        setNewsList(res.data.news);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug, currentPage]);

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 🔍 SEO Meta Tags */}
      <Helmet>
        <title>{formattedCategory} News - Nepali News Portal</title>
        <meta
          name="description"
          content={`Read the latest ${formattedCategory} news in Nepali. Find trending updates and in-depth stories related to ${formattedCategory}.`}
        />
        <link rel="canonical" href={`https://meronazar.netlify.app/category/${slug}`} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">{formattedCategory}</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : newsList.length === 0 ? (
        <p className="text-center">No news found in this category.</p>
      ) : (
        <>
          <section className="space-y-6" aria-label={`${formattedCategory} news list`}>
            {newsList.map((news) => (
              <Link
                to={`/news/${news._id}`}
                key={news._id}
                className="block bg-white rounded shadow-md p-4 hover:bg-gray-50 transition"
              >
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-60 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{news.title}</h2>
                <p className="text-gray-700 text-sm">
                  {stripHtml(news.content).substring(0, 100)}...
                </p>
              </Link>
            ))}
          </section>

          <nav className="mt-8 flex justify-center items-center gap-4" aria-label="pagination">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-disabled={currentPage === 1}
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
              aria-disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
