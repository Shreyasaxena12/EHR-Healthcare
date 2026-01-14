import React, { useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import labdata from "../../shared/DataStore/Admin/LabData.json";

export default function LabsChart() {
  const [selectedLab, setSelectedLab] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState("All");

  // Extract unique lab names and doctor IDs
  const labNames = useMemo(() => ["All", ...new Set(labdata.map(lab => lab.labName))], []);
  const doctorIds = useMemo(() => ["All", ...new Set(labdata.map(lab => lab.doctorId))], []);

  // Process data: count tests per month
  const chartData = useMemo(() => {
    const countsByMonth = {};

    labdata.forEach(lab => {
      const matchesLab = selectedLab === "All" || lab.labName === selectedLab;
      const matchesDoctor = selectedDoctor === "All" || lab.doctorId === selectedDoctor;

      if (matchesLab && matchesDoctor) {
        const month = new Date(lab.sampleCollectedAt).toLocaleString("default", {
          year: "numeric",
          month: "short"
        });

        countsByMonth[month] = (countsByMonth[month] || 0) + 1;
      }
    });

    return Object.entries(countsByMonth)
      .sort((a, b) => new Date(`1 ${a[0]}`) - new Date(`1 ${b[0]}`))
      .map(([month, count]) => ({
        month,
        tests: count
      }));
  }, [selectedLab, selectedDoctor]);

  return (
    <div className="p-4 bg-white rounded shadow w-full">
     

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="block font-medium mb-1 text-[var(--clr-lemon)]">Filter by Lab Name</label>
          <select
            value={selectedLab}
            onChange={(e) => setSelectedLab(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {labNames.map((lab, i) => (
              <option key={i} value={lab}>{lab}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-[var(--clr-lemon)]">Filter by Doctor ID</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {doctorIds.map((doc, i) => (
              <option key={i} value={doc}>{doc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-[400px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="tests"
                stroke="var(--clr-lemon)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">No data found for selected filters.</p>
        )}
      </div>
    </div>
  );
}
