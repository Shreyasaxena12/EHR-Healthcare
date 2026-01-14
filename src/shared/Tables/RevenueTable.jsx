import React, { useState } from "react";
import RevenueData from "../DataStore/Admin/Revenue.json";

export default function RevenueTable() {
  const [expandedMonth, setExpandedMonth] = useState(null);

  const toggleExpand = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-[color:var(--clr-lemon)]">Monthly Revenue Report</h2> */}

      <div className="overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-[color:var(--clr-lemon)] text-black">
            <tr>
              <th className="px-4 py-2 text-left">Month</th>
              <th className="px-4 py-2 text-left">Total Revenue (INR)</th>
              <th className="px-4 py-2 text-left">Subscription</th>
              <th className="px-4 py-2 text-left">Consultation</th>
              <th className="px-4 py-2 text-left">Lab</th>
              <th className="px-4 py-2 text-left">Misc</th>
              <th className="px-4 py-2 text-left">Departments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {RevenueData.map((data, idx) => (
              <React.Fragment key={idx}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{data.month}</td>
                  <td className="px-4 py-2 font-semibold text-green-700">₹ {data.totalRevenue.toLocaleString()}</td>
                  <td className="px-4 py-2">₹ {data.revenueBreakdown.subscriptionFees.toLocaleString()}</td>
                  <td className="px-4 py-2">₹ {data.revenueBreakdown.consultationFees.toLocaleString()}</td>
                  <td className="px-4 py-2">₹ {data.revenueBreakdown.labServices.toLocaleString()}</td>
                  <td className="px-4 py-2">₹ {data.revenueBreakdown.miscellaneous.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleExpand(data.month)}
                      className="text-blue-600 underline hover:text-blue-800 transition"
                    >
                      {expandedMonth === data.month ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {/* Department Breakdown */}
                {expandedMonth === data.month && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="px-4 py-4">
                      <h4 className="font-semibold text-md mb-2 text-[color:var(--clr-lemon)]">Department-wise Revenue</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                        {Object.entries(data.departments).map(([dept, value], i) => (
                          <div
                            key={i}
                            className="p-3 border border-gray-200 rounded bg-white shadow-sm hover:shadow-md transition"
                          >
                            <p className="capitalize font-semibold">{dept.replace(/([a-z])([A-Z])/g, '$1 $2')}</p>
                            <p>₹ {value.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
