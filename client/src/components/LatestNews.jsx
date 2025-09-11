import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react"; // ⏰ Clock icon
import api from "../utils/api";

// Utility to remove HTML tags from content
const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
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
  if (diffMinutes < 60)
    return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await api.get("/api/news/getNews");
        if (!Array.isArray(res.data)) {
          throw new Error(
            "Expected an array, got: " + JSON.stringify(res.data)
          );
        }
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestNews(sorted.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch latest news:", err.message);
        setLatestNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <section
      className="max-w-4xl mx-auto px-4 py-10"
      aria-labelledby="latest-news-heading"
    >
      <h2 id="latest-news-heading" className="sr-only">
        Latest News
      </h2>

      {loading ? (
        <p
          className="text-center text-gray-500"
          role="status"
          aria-live="polite"
        >
          Loading latest news...
        </p>
      ) : latestNews.length === 0 ? (
        <p className="text-center text-gray-500" role="alert">
          No news articles found.
        </p>
      ) : (
        <div className="space-y-6" role="list">
          {latestNews.map((news) => (
            <Link
              key={news._id}
              to={`/news/${news._id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
              role="listitem"
              aria-label={`Read more: ${news.title}`}
            >
              <img
                src={news.imageUrl || "/fallback-image.jpg"}
                alt={news.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {news.title}
                </h3>
                {/* Time with icon */}
                <div className="flex items-center justify-center text-sm font-semibold text-blue-600 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{timeAgo(news.createdAt)}</span>
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  {stripHtmlTags(news.content).length > 150
                    ? stripHtmlTags(news.content).substring(0, 150) + "..."
                    : stripHtmlTags(news.content)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestNews;
