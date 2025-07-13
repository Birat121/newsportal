import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Format date in Nepali
const formatNepaliDate = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("ne-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

const NewsDetailPage = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await axios.get(`/api/news/getNews/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error("Failed to fetch news details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!news) return <p className="text-center py-10 text-red-600">News not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-blue-800 mb-4">
        {news.title}
      </h1>

      {/* Author and Date */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <span>✍️ Seven Lake News</span>
        <span>📅 {formatNepaliDate(news.createdAt)}</span>
      </div>

      {/* Image */}
      <img
        src={news.imageUrl}
        alt={news.title}
        className="w-full h-64 object-cover rounded shadow mb-6"
      />

      {/* Description */}
      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
        {news.content}
      </p>
    </div>
  );
};

export default NewsDetailPage;
