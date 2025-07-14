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
  if (!news)
    return (
      <p className="text-center py-10 text-red-600">News not found.</p>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6">{news.title}</h1>

        {/* Author */}
        <p className="text-sm text-gray-600 mb-1">✍️ Seven Lake News</p>

        {/* Date */}
        <p className="text-sm text-gray-600 mb-6">📅 {formatNepaliDate(news.createdAt)}</p>

        {/* Image */}
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-64 object-cover rounded mb-6 shadow"
        />

        {/* Content */}
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
          {news.content}
        </p>
      </div>
    </div>
  );
};

export default NewsDetailPage;

