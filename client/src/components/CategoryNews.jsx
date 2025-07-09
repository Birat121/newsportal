import React from "react";

const newsByCategory = {
  समाचार: [
    {
      id: 1,
      title: "UN Assembly Discusses Global Economic Trends",
      image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "European Union Moves to Tighten Borders",
      image: "https://images.unsplash.com/photo-1570623130241-56b0e7b8c9f7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 7,
      title: "Global Trade Faces Uncertainty Amid Global Shifts",
      image: "https://images.unsplash.com/photo-1580546583505-80112bb91c95?auto=format&fit=crop&w=400&q=80",
    },
  ],
  समाज: [
    {
      id: 3,
      title: "Apple Launches New iPhone with AI Integration",
      image: "https://images.unsplash.com/photo-1560329365-f14b0db34d75?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "OpenAI Unveils GPT-5 Capabilities",
      image: "https://images.unsplash.com/photo-1599390524176-62cb0f415fb3?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 8,
      title: "Tesla Introduces New Autonomous Driving Features",
      image: "https://images.unsplash.com/photo-1560277797-6eab3c337ef2?auto=format&fit=crop&w=400&q=80",
    },
  ],
  राजनीति: [
    {
      id: 5,
      title: "WHO Issues New Guidelines for Mental Health",
      image: "https://images.unsplash.com/photo-1590087081076-d2ad0d8db6d5?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      title: "Study Shows Link Between Sleep and Heart Health",
      image: "https://images.unsplash.com/photo-1519223972-527a9e55b2d9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 9,
      title: "New Breakthrough in Cancer Treatment",
      image: "https://images.unsplash.com/photo-1581349485323-b4fd9925b086?auto=format&fit=crop&w=400&q=80",
    },
  ],
  प्रविधि: [
    {
      id: 10,
      title: "Quantum Computing Set to Revolutionize AI",
      image: "https://images.unsplash.com/photo-1581091215367-59c72a1a9f0b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 11,
      title: "5G Expansion Plans Announced by Major Telecoms",
      image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 12,
      title: "Cybersecurity Trends in 2025: What to Expect",
      image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d5?auto=format&fit=crop&w=400&q=80",
    },
  ],
  स्वास्थ्य: [
    {
      id: 13,
      title: "Yoga Proven to Improve Mental Health, Study Finds",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc3f4?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 14,
      title: "COVID-25 Vaccine Rollout Begins in Europe",
      image: "https://images.unsplash.com/photo-1588776814546-d9c3e10c9c9c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 15,
      title: "Nutrition Myths Debunked by New Research",
      image: "https://images.unsplash.com/photo-1534536281715-e28d76689b2a?auto=format&fit=crop&w=400&q=80",
    },
  ],
};

const CategoryNewsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
      {Object.entries(newsByCategory).map(([category, articles]) => (
        <div key={category}>
          <div className="inline-block bg-red-600 text-white px-6 py-2 rounded mb-6 text-xl font-semibold shadow">
            {category}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition w-full"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-44 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-800">
                    {article.title}
                  </h3>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline mt-2 block"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoryNewsSection;
