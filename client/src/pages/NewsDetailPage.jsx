import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

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
        const res = await api.get(`/api/news/getNews/${id}`);
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
    return <p className="text-center py-10 text-red-600">News not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-900 mb-4 leading-tight">
          {news.title}
        </h1>

        {/* Author */}
        <p className="text-sm text-gray-500 mb-1">
          ✍️ <span className="font-medium">Seven Lake News</span>
        </p>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-6">
          📅 {formatNepaliDate(news.createdAt)}
        </p>

        {/* Image */}
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-72 object-cover rounded-lg mb-8 shadow-md"
        />

        {/* Content */}
        <div
          className="text-gray-800 text-lg leading-8 tracking-wide prose max-w-none"
          dangerouslySetInnerHTML={{ __html: news.content }}
        ></div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
