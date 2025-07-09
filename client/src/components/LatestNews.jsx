import React from 'react';

const sampleNews = [
  {
    id: 1,
    title: 'India’s Economy Surges in Q1: Key Highlights',
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1600&q=80',
    summary: 'India has posted record-breaking GDP growth in the first quarter, signaling a strong economic rebound.',
    date: 'April 28, 2025',
  },
  {
    id: 2,
    title: 'Global Climate Summit: What Was Agreed?',
    image: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80',
    summary: 'Leaders across the globe have pledged stricter measures on carbon emissions...',
    date: 'April 27, 2025',
  },
  {
    id: 3,
    title: 'Premier League: Weekend Match Roundup',
    image: 'https://images.unsplash.com/photo-1601385743162-24d62c6b7d81?auto=format&fit=crop&w=1600&q=80',
    summary: 'Exciting matches, stunning goals, and dramatic finishes — here’s your weekend football recap.',
    date: 'April 27, 2025',
  },
];

const LatestNews = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      
      <div className="space-y-6">
        {sampleNews.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{news.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{news.summary}</p>
              <span className="text-xs text-gray-400">{news.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
