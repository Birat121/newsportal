// src/pages/SearchResultsPage.jsx
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

const SearchResultsPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/api/news/getNews");
        const filtered = res.data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    if (query) fetchNews();
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-blue-600">"{query}"</span>
      </h2>
      {results.length === 0 ? (
        <p className="text-gray-500">No matching news found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((news) => (
            <div key={news._id} className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{news.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {news.content?.slice(0, 80)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
