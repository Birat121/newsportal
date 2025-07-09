import React from "react";

import TrendingCarousel from "../components/TrendingCarousal";
import LatestNews from "../components/LatestNews";
import CategoryNewsSection from "../components/CategoryNews";

const Home = () => {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 mt-8 text-center">
        <div className="inline-block bg-red-600 px-8 py-4 rounded-lg mb-6">
          <h2 className="text-4xl font-bold text-white">ताजा समाचार</h2>
        </div>
        <LatestNews />
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="inline-block bg-red-600 px-6 py-2 rounded-lg mb-4">
          <h2 className="text-2xl font-bold text-white">ट्रेन्डिङ समाचार</h2>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
          <TrendingCarousel />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <div className="inline-block bg-red-600 px-6 py-2 rounded-lg mb-4">
          <h2 className="text-2xl font-bold text-white">Explore by Category</h2>
        </div>
        <CategoryNewsSection />
      </section>
    </main>
  );
};

export default Home;
