import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../utils/api";

// 🧠 Helper to strip plain text from HTML for meta description
const getPlainText = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// 📅 Format date to English with Kathmandu timezone
const formatEnglishDate = (isoDate) => {
  return new Date(isoDate).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kathmandu",
  });
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

  const plainText = getPlainText(news.content).substring(0, 160);

  return (
    <div className="max-w-5xl mx-auto px-3 py-4 sm:px-6 sm:py-8 lg:py-10">
      {/* 🔍 SEO Meta Tags */}
      <Helmet>
        <title>{news.title} | Seven Lake News</title>
        <meta name="description" content={plainText} />
        <link rel="canonical" href={`https://meronazar.netlify.app/news/${id}`} />
        {/* Open Graph Meta */}
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={plainText} />
        <meta property="og:image" content={news.imageUrl} />
        <meta property="og:url" content={`https://meronazar.netlify.app/news/${id}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="bg-white shadow-lg sm:shadow-2xl rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200">
        {news.category && (
          <div className="mb-3 sm:mb-4">
            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {news.category}
            </span>
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight">
          {news.title}
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 mb-1 flex items-center gap-1">
          <span className="text-sm">✍️</span>
          <span className="font-medium">Seven Lake News</span>
        </p>

        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 flex items-center gap-1">
          <span className="text-sm">📅</span>
          <span>{formatEnglishDate(news.createdAt)}</span>
        </p>

        <div className="mb-6 sm:mb-8 lg:mb-10">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-[500px] object-cover object-center rounded-lg sm:rounded-xl shadow-md sm:shadow-xl"
          />
        </div>

        <div
          className="text-gray-800 text-base sm:text-lg leading-6 sm:leading-7 lg:leading-8 tracking-wide prose prose-sm sm:prose-base lg:prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:font-semibold
          prose-p:mb-4 prose-p:text-justify
          prose-ul:mb-4 prose-ol:mb-4
          prose-li:mb-1
          prose-img:rounded-lg prose-img:shadow-md
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
          prose-a:text-blue-600 prose-a:hover:text-blue-800"
          dangerouslySetInnerHTML={{ __html: news.content }}
        ></div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
