import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function TrendingCarousel() {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Calculate dynamic settings based on trendingNews length
  const slidesToShowCount = Math.min(3, trendingNews.length);

  const settings = {
    dots: false,
    infinite: trendingNews.length > 3, // infinite only if more than 3 items
    speed: 700,
    slidesToShow: slidesToShowCount,
    slidesToScroll: 1,
    autoplay: trendingNews.length > 1, // autoplay only if more than 1 slide
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, trendingNews.length),
          infinite: trendingNews.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: false,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get("/api/news/trending");
        setTrendingNews(res.data);
      } catch (err) {
        console.error("Failed to fetch trending news", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (trendingNews.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
        <p>No trending news available.</p>
      </section>
    );
  }

  // If only one news item, show without slider
  if (trendingNews.length === 1) {
    const news = trendingNews[0];
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
        <Link to={`/news/${news._id}`}>
          <div className="bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition max-w-md mx-auto">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="text-xs uppercase text-gray-500 block mb-1">
                {news.category}
              </span>
              <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                {news.title}
              </h3>
            </div>
          </div>
        </Link>
      </section>
    );
  }

  // For 2 or more items, render slider
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
      <Slider {...settings}>
        {trendingNews.map((news) => (
          <div key={news._id} className="px-2">
            <Link to={`/news/${news._id}`}>
              <div className="bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs uppercase text-gray-500 block mb-1">
                    {news.category}
                  </span>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                    {news.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
}
