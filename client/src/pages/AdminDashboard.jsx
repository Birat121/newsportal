import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#5533AA"];

const AdminDashboard = () => {
  const [totalNews, setTotalNews] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Mock data since no backend yet
    const mockTotal = 120;
    const mockCategoryCounts = [
      { category: "Sports", count: 40 },
      { category: "Politics", count: 30 },
      { category: "Technology", count: 25 },
      { category: "Entertainment", count: 15 },
      { category: "Business", count: 10 },
    ];

    // Simulate API delay with timeout
    setTimeout(() => {
      setTotalNews(mockTotal);
      setCategoryData(mockCategoryCounts);
    }, 500);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h2>

        {/* Total news box */}
        <div className="mb-8 max-w-sm">
          <div className="bg-blue-600 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Total News Articles</h3>
            <p className="text-5xl font-bold">{totalNews}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-10">
          {/* Pie Chart */}
          <div>
            <h3 className="text-xl font-semibold mb-4">News by Category</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={categoryData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Bar Chart */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Category Count Bar Chart</h3>
            <BarChart width={400} height={300} data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;


