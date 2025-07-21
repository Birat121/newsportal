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

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{formattedCategory} News - Nepali News Portal</title>
        <meta
          name="description"
          content={`Read the latest ${formattedCategory} news in Nepali. Find trending updates and in-depth stories related to ${formattedCategory}.`}
        />
        <link rel="canonical" href={`https://meronazar.netlify.app/category/${slug}`} />
      </Helmet>

      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold" aria-label={`Category: ${formattedCategory}`}>
          {formattedCategory}
        </h1>
      </header>

      {loading ? (
        <p className="text-center" role="status">Loading...</p>
      ) : newsList.length === 0 ? (
        <p className="text-center" role="alert">No news found in this category.</p>
      ) : (
        <>
          <section className="space-y-6" aria-label={`${formattedCategory} news list`}>
            {newsList.map((news) => (
              <article key={news._id} className="block bg-white rounded shadow-md p-4 hover:bg-gray-50 transition">
                <Link to={`/news/${news._id}`} aria-label={`Read more: ${news.title}`}>
                  <img
                    src={news.imageUrl}
                    alt={news.title || "News Image"}
                    loading="lazy"
                    className="w-full h-60 object-cover rounded mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                  <p className="text-gray-700 text-sm">
                    {stripHtml(news.content).substring(0, 100)}...
                  </p>
                </Link>
              </article>
            ))}
          </section>

          <nav className="mt-8 flex justify-center items-center gap-4" aria-label="News pagination navigation">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              aria-label="Previous page"
            >
              Previous
            </button>

            <span className="text-sm font-medium" aria-live="polite">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </>
      )}
    </main>
  );
};

export default CategoryPage;
