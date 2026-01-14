import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Sample colors for revenue categories
const colors = {
  subscriptionFees: "#8884d8",
  consultationFees: "#82ca9d",
  labServices: "#ffc658",
  miscellaneous: "#ff8042"
};

export default function RevenueChart({ data }) {
  // Flatten the data to top-level keys for Recharts
  const chartData = data.map((item) => ({
    month: item.month,
    ...item.revenueBreakdown,
  }));

  return (
    <div className="p-4 bg-white rounded shadow w-full">

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(colors).map((key) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colors[key]}
              name={key.replace(/([A-Z])/g, " $1")}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
