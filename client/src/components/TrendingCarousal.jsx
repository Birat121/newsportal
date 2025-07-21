import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function TrendingCarousel() {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const slidesToShowCount = Math.min(3, trendingNews.length);

  const settings = {
    dots: false,
    infinite: trendingNews.length > 3,
    speed: 700,
    slidesToShow: slidesToShowCount,
    slidesToScroll: 1,
    autoplay: trendingNews.length > 1,
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

  const Heading = () => (
    <h2 id="trending-heading" className="text-2xl font-bold mb-4">
      🔥 Trending Now
    </h2>
  );

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10" aria-labelledby="trending-heading">
        <Heading />
        <p role="status" aria-live="polite">Loading...</p>
      </section>
    );
  }

  if (trendingNews.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10" aria-labelledby="trending-heading">
        <Heading />
        <p role="alert">No trending news available.</p>
      </section>
    );
  }

  if (trendingNews.length === 1) {
    const news = trendingNews[0];
    return (
      <section className="max-w-7xl mx-auto px-4 py-10" aria-labelledby="trending-heading">
        <Heading />
        <Link to={`/news/${news._id}`} aria-label={`Read more about ${news.title}`}>
          <div
            className="bg-white shadow-lg rounded overflow-hidden hover:shadow-xl transition max-w-md mx-auto"
            role="article"
          >
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

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-10"
      aria-labelledby="trending-heading"
      role="region"
      aria-roledescription="carousel"
      aria-label="Trending News Carousel"
    >
      <Heading />
      <Slider {...settings}>
        {trendingNews.map((news, index) => (
          <div key={news._id} className="px-2" role="group" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${trendingNews.length}`}>
            <Link to={`/news/${news._id}`} aria-label={`Read more about ${news.title}`}>
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
