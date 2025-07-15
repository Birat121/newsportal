import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import NepaliDate from "nepali-date";

// Nepali digit map
const nepaliDigits = {
  "0": "०", "1": "१", "2": "२", "3": "३", "4": "४",
  "5": "५", "6": "६", "7": "७", "8": "८", "9": "९"
};

// Convert number to Nepali digits
const toNepaliNumber = (num) =>
  num.toString().split("").map(d => nepaliDigits[d] || d).join("");

// Time of day period (e.g., साँझ, बिहान)
const getTimePeriod = (hour) => {
  if (hour < 4) return "मध्यरात";
  if (hour < 12) return "बिहान";
  if (hour < 17) return "दिउँसो";
  if (hour < 20) return "साँझ";
  return "राति";
};

// Format Nepali BS date + time
const formatNepaliDate = (isoDate) => {
  const adDate = new Date(isoDate);
  const bsDate = new NepaliDate(adDate);

  const hour = adDate.getHours();
  const minute = adDate.getMinutes();
  const hour12 = hour % 12 || 12;

  return `${toNepaliNumber(bsDate.getDate())} ${bsDate.getMonthName()} ${toNepaliNumber(bsDate.getYear())}, ${getTimePeriod(hour)} ${toNepaliNumber(hour12)}:${toNepaliNumber(minute.toString().padStart(2, "0"))} बजे`;
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
          className="w-full h-[500px] md:h-[600px] object-cover rounded-xl mb-10 shadow-xl"
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
