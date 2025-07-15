import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
};

const CategoryNewsSection = () => {
  const [categoryNews, setCategoryNews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupedNews = async () => {
      try {
        const res = await axios.get("/api/news/category-section");
        setCategoryNews(res.data);
      } catch (err) {
        console.error("Error fetching category news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupedNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
      {Object.entries(categoryNews).map(([category, articles]) => (
        <div
          key={category}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6"
        >
          <div className="inline-block bg-red-600 text-white px-6 py-2 rounded text-xl font-semibold shadow">
            {category}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article) => (
              <Link
                to={`/news/${article._id}`}
                key={article._id}
                className="bg-gray-50 rounded-lg shadow hover:shadow-md transition w-full"
              >
                <img
                  src={article.imageUrl || "/fallback-image.jpg"}
                  alt={article.title}
                  className="w-full h-44 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-800">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {stripHtmlTags(article.content).substring(0, 80)}...
                  </p>
                  <span className="text-blue-600 text-sm hover:underline block mt-2">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoryNewsSection;
