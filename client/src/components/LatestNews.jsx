import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "../utils/api";

// Utility to remove HTML tags from content
const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
};

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await api.get("/api/news/getNews");

        console.log("Fetched news:", res.data);

        if (!Array.isArray(res.data)) {
          throw new Error("Expected an array, got: " + JSON.stringify(res.data));
        }

        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setLatestNews(sorted.slice(0, 4)); // Show latest 4
      } catch (err) {
        console.error("Failed to fetch latest news:", err.message);
        setLatestNews([]); // fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      {loading ? (
        <p className="text-center text-gray-500">Loading latest news...</p>
      ) : latestNews.length === 0 ? (
        <p className="text-center text-gray-500">No news articles found.</p>
      ) : (
        <div className="space-y-6">
          {latestNews.map((news) => (
            <Link
              key={news._id}
              to={`/news/${news._id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={news.imageUrl || "/fallback-image.jpg"}
                alt={news.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {news.title}
                </h3>
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
