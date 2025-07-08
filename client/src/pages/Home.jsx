import React from 'react'

import TrendingCarousel from '../components/TrendingCarousal'
import LatestNews from '../components/LatestNews'
import CategoryNewsSection from '../components/CategoryNews'


const Home = () => {
  return (
    <main>
      

      <section className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-4xl font-bold mb-4 text-center">ताजा समाचार</h2>
       <LatestNews />
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">ट्रेन्डिङ समाचार</h2>
        
        <TrendingCarousel />
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-4">Explore by Category</h2>
        <CategoryNewsSection />
      </section>
    </main>
  );
};


export default Home