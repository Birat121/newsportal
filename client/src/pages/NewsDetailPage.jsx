// src/pages/NewsDetailPage.jsx

import { useParams } from "react-router-dom";

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

  // Same static content for all news, just image changes with ID
  const news = {
    _id: id,
    title: "सात ताल समाचार शीर्षक",
    author: "Seven Lake News",
    createdAt: new Date().toISOString(),
    image: `https://source.unsplash.com/random/800x400?sig=${id}`,
    description: `यो समाचारको पूर्ण विवरण हो जुन यो पृष्ठमा देखाइएको छ। यहाँ तपाईंले समाचारको विस्तृत विवरण पढ्न सक्नुहुन्छ। यो डेमो सामग्री हो जुन सबै ID मा एउटै रहनेछ।`,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-blue-800 mb-4">
        {news.title}
      </h1>

      {/* Author and Date */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <span>✍️ {news.author}</span>
        <span>📅 {formatNepaliDate(news.createdAt)}</span>
      </div>

      {/* Image */}
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-64 object-cover rounded shadow mb-6"
      />

      {/* Description */}
      <p className="text-gray-800 text-lg leading-relaxed">{news.description}</p>
    </div>
  );
};

export default NewsDetailPage;
