import React, { useEffect, useState } from "react";
import axios from "axios";

const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await axios.get("/api/news/getNews");
        let newsArray = [];

        if (Array.isArray(res.data)) {
          newsArray = res.data;
        } else if (Array.isArray(res.data.data)) {
          newsArray = res.data.data;
        } else {
          console.warn("Unexpected API response format:", res.data);
        }

        const sorted = newsArray.sort(
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
            <div
              key={news._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
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
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                  {news.content}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(news.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestNews;
