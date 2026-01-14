import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const COLORS = ["#34d399", "#f87171"]; // Green for available, red for occupied

export default function WardChart({ data }) {
  const [selectedFloor, setSelectedFloor] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Extract unique floor and type values
  const floors = useMemo(() => ["All", ...new Set(data.map(item => item.floor))], [data]);
  const types = useMemo(() => ["All", ...new Set(data.map(item => item.type))], [data]);

  // Filtered data
  const filtered = useMemo(() => {
    return data.filter(item => {
      const floorMatch = selectedFloor === "All" || item.floor === parseInt(selectedFloor);
      const typeMatch = selectedType === "All" || item.type === selectedType;
      return floorMatch && typeMatch;
    });
  }, [data, selectedFloor, selectedType]);

  const barData = filtered.map(ward => ({
    id: ward.id,
    capacity: ward.capacity,
    occupied: ward.currentOccupancy,
    available: ward.capacity - ward.currentOccupancy,
  }));

  const totalBeds = filtered.reduce((acc, ward) => acc + ward.capacity, 0);
  const totalOccupied = filtered.reduce((acc, ward) => acc + ward.currentOccupancy, 0);
  const totalAvailable = totalBeds - totalOccupied;

  const pieData = [
    { name: "Occupied", value: totalOccupied },
    { name: "Available", value: totalAvailable },
  ];

  // Trend data (mocked per month for simplicity)
  const trendData = [
    { month: "Jan", occupancy: totalOccupied - 3 },
    { month: "Feb", occupancy: totalOccupied - 2 },
    { month: "Mar", occupancy: totalOccupied - 1 },
    { month: "Apr", occupancy: totalOccupied },
    { month: "May", occupancy: totalOccupied + 2 },
    { month: "Jun", occupancy: totalOccupied + 3 },
  ];

  return (
    <div className="space-y-10">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Filter by Floor</label>
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {floors.map((floor, idx) => (
              <option key={idx} value={floor}>{floor}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Filter by Ward Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {types.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-[var(--clr-lemon)]">Ward Occupancy</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="id" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupied" stackId="a" fill="#f87171" name="Occupied" />
            <Bar dataKey="available" stackId="a" fill="#34d399" name="Available" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-[var(--clr-lemon)]">Total Bed Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart (Trend Over Time) */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-[var(--clr-lemon)]">Occupancy Trend (Last 6 Months)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="occupancy" stroke="#4f46e5" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
