import React from 'react'
import HeroSection from '../components/Hero'
import TrendingCarousel from '../components/TrendingCarousal'
import LatestNews from '../components/LatestNews'
import CategoryNewsSection from '../components/CategoryNews'


const Home = () => {
  return (
    <main>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        <TrendingCarousel />
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <LatestNews />
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-4">Explore by Category</h2>
        <CategoryNewsSection />
      </section>
    </main>
  );
};


export default Home