import { useState, useMemo } from "react";

export default function RevenueReports({ data = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((report) => {
      const monthMatch = report.month.toLowerCase().includes(searchTerm.toLowerCase());
      const amountMatch = report.totalRevenue
        .toString()
        .includes(searchTerm.replace(/\D/g, ""));
      return monthMatch || amountMatch;
    });
  }, [searchTerm, data]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-[var(--clr-lemon)]">
          Monthly Revenue Reports
        </h2>
        <input
          type="text"
          placeholder="Search by amount..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[var(--clr-lemon)]"
        />
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((monthData, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {monthData.month}
              </h3>
              <span className="text-[var(--clr-lemon)] font-bold text-lg">
                ₹{monthData.totalRevenue.toLocaleString()}
              </span>
            </div>

            {/* Revenue Breakdown */}
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Revenue Breakdown</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {Object.entries(monthData.revenueBreakdown).map(([key, value], i) => (
                  <li key={i} className="text-gray-600">
                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>{" "}
                    ₹{value.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Department Revenue */}
            <div>
              <h4 className="font-medium text-gray-700 mb-1">Department Contributions</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                {Object.entries(monthData.departments).map(([key, value], i) => (
                  <li key={i} className="text-gray-600">
                    <span className="font-semibold capitalize">{key}:</span>{" "}
                    ₹{value.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No reports match your search.</p>
      )}
    </div>
  );
}
