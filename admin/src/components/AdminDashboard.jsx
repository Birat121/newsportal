import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

export default function Dashboard() {
  const [newsList, setNewsList] = useState([]);
  const [categories, setCategories] = useState(["Politics", "Technology", "Sports"]);
  const [stats, setStats] = useState({
    totalNews: 0,
    published: 0,
    draft: 0,
    categoryCounts: {},
  });

  useEffect(() => {
    // Mock data to simulate fetching the news list
    const mockNews = [
      { id: 1, title: "Tech Breakthrough", category: "Technology", status: "Published" },
      { id: 2, title: "Elections Coming", category: "Politics", status: "Draft" },
      { id: 3, title: "World Cup News", category: "Sports", status: "Published" },
      { id: 4, title: "AI in Healthcare", category: "Technology", status: "Draft" },
      { id: 5, title: "Local Elections", category: "Politics", status: "Published" },
      { id: 6, title: "Cricket League", category: "Sports", status: "Draft" },
    ];

    setNewsList(mockNews);

    // Calculate statistics
    const categoryCounts = categories.reduce((acc, category) => {
      acc[category] = mockNews.filter((news) => news.category === category).length;
      return acc;
    }, {});

    setStats({
      totalNews: mockNews.length,
      published: mockNews.filter((news) => news.status === "Published").length,
      draft: mockNews.filter((news) => news.status === "Draft").length,
      categoryCounts,
    });
  }, [categories]);

  // Prepare data for the pie chart
  const pieChartData = Object.entries(stats.categoryCounts).map(([category, count]) => ({
    title: category,
    value: count,
    color: category === "Politics" ? "#3490dc" : category === "Technology" ? "#38b2ac" : "#f6ad55",
  }));

  // Ensure that pieChartData is never undefined or empty
  const chartData = pieChartData.length > 0 ? pieChartData : [{ title: "No Data", value: 1, color: "#ccc" }];

  return (
    <div className="max-w-7xl mx-auto p-8 rounded-xl mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>

      <div className="flex flex-wrap gap-6 justify-between">
        {/* Total News Card */}
        <div className="flex-1 min-w-[250px] bg-blue-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total News</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalNews}</p>
        </div>

        {/* Published News Card */}
        <div className="flex-1 min-w-[250px] bg-green-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Published News</h3>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
        </div>

        {/* Draft News Card */}
        <div className="flex-1 min-w-[250px] bg-yellow-100 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Draft News</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        {/* Categories Pie Chart */}
        <div className="flex-1 min-w-[300px] bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Categories</h3>
          <PieChart
            data={chartData} // Use the safe chartData instead
            label={({ data, dataIndex }) => {
              if (data && data[dataIndex]) {
                return `${data[dataIndex].title}: ${data[dataIndex].value}`;
              }
              return ''; // fallback if data is invalid
            }}
            labelStyle={{ fontSize: '5px', fontFamily: 'sans-serif' }}
            labelPosition={112}
          />
        </div>

        {/* Category Counts Table */}
        <div className="flex-1 min-w-[300px] bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Category Breakdown</h3>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Category</th>
                <th className="p-3 border">News Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.categoryCounts).map(([category, count]) => (
                <tr key={category}>
                  <td className="p-3 border">{category}</td>
                  <td className="p-3 border text-center">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
