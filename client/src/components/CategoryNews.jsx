import React from "react";

const newsByCategory = {
  World: [
    {
      id: 1,
      title: "UN Assembly Discusses Global Economic Trends",
      image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=400&q=80", // World/Global Economy
    },
    {
      id: 2,
      title: "European Union Moves to Tighten Borders",
      image: "https://images.unsplash.com/photo-1570623130241-56b0e7b8c9f7?auto=format&fit=crop&w=400&q=80", // EU Politics
    },
    {
      id: 7,
      title: "Global Trade Faces Uncertainty Amid Global Shifts",
      image: "https://images.unsplash.com/photo-1580546583505-80112bb91c95?auto=format&fit=crop&w=400&q=80", // Global Trade
    },
  ],
  Technology: [
    {
      id: 3,
      title: "Apple Launches New iPhone with AI Integration",
      image: "https://images.unsplash.com/photo-1560329365-f14b0db34d75?auto=format&fit=crop&w=400&q=80", // Apple/Technology
    },
    {
      id: 4,
      title: "OpenAI Unveils GPT-5 Capabilities",
      image: "https://images.unsplash.com/photo-1599390524176-62cb0f415fb3?auto=format&fit=crop&w=400&q=80", // AI/Innovation
    },
    {
      id: 8,
      title: "Tesla Introduces New Autonomous Driving Features",
      image: "https://images.unsplash.com/photo-1560277797-6eab3c337ef2?auto=format&fit=crop&w=400&q=80", // Tesla/Autonomous Driving
    },
  ],
  Health: [
    {
      id: 5,
      title: "WHO Issues New Guidelines for Mental Health",
      image: "https://images.unsplash.com/photo-1590087081076-d2ad0d8db6d5?auto=format&fit=crop&w=400&q=80", // Mental Health
    },
    {
      id: 6,
      title: "Study Shows Link Between Sleep and Heart Health",
      image: "https://images.unsplash.com/photo-1519223972-527a9e55b2d9?auto=format&fit=crop&w=400&q=80", // Health/Sleep
    },
    {
      id: 9,
      title: "New Breakthrough in Cancer Treatment",
      image: "https://images.unsplash.com/photo-1581349485323-b4fd9925b086?auto=format&fit=crop&w=400&q=80", // Cancer/Treatment
    },
  ],
};




const CategoryNewsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
      {Object.entries(newsByCategory).map(([category, articles]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-300">
            {category} News
          </h2>
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
