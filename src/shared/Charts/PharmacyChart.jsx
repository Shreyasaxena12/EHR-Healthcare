import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import data from "../../shared/DataStore/Admin/pharmacyData.json";

export default function PharmacyChart() {
  // Optionally, sort drugs by stock available descending
  const chartData = [...data].sort((a, b) => b.stockAvailable - a.stockAvailable);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-[var(--clr-lemon)]">
        Pharmacy Stock Levels
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="drugName" 
            angle={-45} 
            textAnchor="end" 
            interval={0} 
            height={60} 
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stockAvailable" fill="var(--clr-lemon)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
