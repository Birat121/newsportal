import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // Import Link

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await axios.get("/api/news/getNews");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestNews(sorted.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch latest news", err);
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-6">
          {latestNews.map((news) => (
            <Link
              key={news._id}
              to={`/news/${news._id}`}   // Link to news detail page
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  {news.content.length > 150
                    ? news.content.substring(0, 150) + "..."
                    : news.content}
                </p>

                <span className="text-xs text-gray-400">
                  {new Date(news.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestNews;
