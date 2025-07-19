import React from "react";
import { Helmet } from "react-helmet-async";

import TrendingCarousel from "../components/TrendingCarousal";
import LatestNews from "../components/LatestNews";
import CategoryNewsSection from "../components/CategoryNews";
import MainLayout from "../components/MainLayout";

const Home = () => {
  return (
    <>
      {/* 🔍 SEO Meta Tags */}
      <Helmet>
        <title>Nepali News Portal - ताजा र ट्रेन्डिङ समाचार</title>
        <meta
          name="description"
          content="पढ्नुहोस् नेपालको ताजा समाचार, ट्रेन्डिङ समाचार, र विभिन्न श्रेणी अनुसार समाचारहरू। सबै समाचार एकै ठाँउमा।"
        />
        <link rel="canonical" href="https://meronazar.netlify.app/" />
      </Helmet>

      {/* ✅ Latest News with Ad Sidebar */}
      <MainLayout>
        <main className="w-full px-4 mt-8 text-center">
          <section aria-labelledby="latest-news">
            <div className="inline-block bg-red-600 px-8 py-4 rounded-lg mb-6">
              <h1 id="latest-news" className="text-4xl font-bold text-white">
                ताजा समाचार
              </h1>
            </div>
            <LatestNews />
          </section>
        </main>
      </MainLayout>

      {/* ✅ Trending News */}
      <section className="max-w-7xl mx-auto px-4 mt-12" aria-labelledby="trending-news">
        <div className="inline-block bg-red-600 px-6 py-2 rounded-lg mb-4">
          <h2 id="trending-news" className="text-2xl font-bold text-white">
            ट्रेन्डिङ समाचार
          </h2>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
          <TrendingCarousel />
        </div>
      </section>

      {/* ✅ Category Section */}
      <section className="max-w-7xl mx-auto px-4 mt-12 mb-8" aria-labelledby="category-news">
        <div className="inline-block bg-red-600 px-6 py-2 rounded-lg mb-4">
          <h2 id="category-news" className="text-2xl font-bold text-white">
            Explore by Category
          </h2>
        </div>
        <CategoryNewsSection />
      </section>
    </>
  );
};

export default Home;
