import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import userdata from "../../shared/DataStore/Admin/Users.json";

export default function UserChart() {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Extract unique departments and months
  const departments = useMemo(() => {
    const all = new Set();
    userdata.forEach(user => {
      user.appointments?.forEach(app => all.add(app.department));
    });
    return ["All", ...Array.from(all)];
  }, []);

  const months = useMemo(() => {
    const all = new Set();
    userdata.forEach(user => {
      user.appointments?.forEach(app => {
        const month = new Date(app.date).toLocaleString("default", {
          year: "numeric",
          month: "short"
        });
        all.add(month);
      });
    });
    return ["All", ...Array.from(all)];
  }, []);

  const chartData = useMemo(() => {
    const appointmentData = {};

    userdata.forEach(user => {
      user.appointments?.forEach(appointment => {
        const month = new Date(appointment.date).toLocaleString("default", {
          year: "numeric",
          month: "short"
        });

        const matchesMonth = selectedMonth === "All" || month === selectedMonth;
        const matchesDept = selectedDepartment === "All" || appointment.department === selectedDepartment;

        if (matchesMonth && matchesDept) {
          appointmentData[month] = (appointmentData[month] || 0) + 1;
        }
      });
    });

    return Object.entries(appointmentData).map(([month, count]) => ({
      month,
      appointments: count
    }));
  }, [selectedMonth, selectedDepartment]);

  return (
    <div className="p-2 w-full">
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-xl font-semibold mb-4">
          <span className="text-[var(--clr-lemon)] text-4xl">{userdata.length}</span> Appointments Per Month
        </h2>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block mb-1 font-medium">Filter by Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {months.map((month, idx) => (
                <option key={idx} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Filter by Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
