import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react"; // ⏰ Clock icon
import api from "../utils/api";

const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

// Utility to format "x hours ago"
const timeAgo = (dateString) => {
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now - created;

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const CategoryNewsSection = () => {
  const [categoryNews, setCategoryNews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupedNews = async () => {
      try {
        const res = await api.get("/api/news/category-section");
        setCategoryNews(res.data);
      } catch (err) {
        console.error("Error fetching category news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupedNews();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10" role="status" aria-live="polite">
        Loading...
      </p>
    );

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16"
      aria-label="News by Category"
    >
      {Object.entries(categoryNews).map(([category, articles]) => (
        <div
          key={category}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6"
          role="region"
          aria-labelledby={`category-heading-${category}`}
        >
          <h2
            id={`category-heading-${category}`}
            className="inline-block bg-red-600 text-white px-6 py-2 rounded text-xl font-semibold shadow"
          >
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
            {articles.slice(0, 6).map((article) => (
              <Link
                to={`/news/${article._id}`}
                key={article._id}
                role="listitem"
                className="bg-gray-50 rounded-lg shadow hover:shadow-md transition w-full"
                aria-label={`Read more about ${article.title}`}
              >
                <article role="article">
                  <img
                    src={article.imageUrl || "/fallback-image.jpg"}
                    alt={article.title}
                    className="w-full h-44 object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex flex-col justify-between h-full">
                    <h3 className="text-md font-semibold text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {stripHtmlTags(article.content).substring(0, 80)}...
                    </p>
                    {/* Read more + time */}
                    <div className="flex justify-between items-center mt-2 text-sm text-blue-600 hover:underline">
                      <span>Read more →</span>
                      <span className="flex items-center text-blue-500 font-semibold">
                        <Clock className="h-4 w-4 mr-1" />
                        {timeAgo(article.createdAt)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoryNewsSection;
