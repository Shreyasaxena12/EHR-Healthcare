import React from "react";
import Data from "../../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";

export default function Report() {
  const monthlyRevenue = Data.reportsSummary.monthlyRevenue;
  const monthlyExpenses = Data.reportsSummary.monthlyExpenses;

  const getTotal = (data) =>
    data.reduce((acc, item) => acc + (item.amount || 0), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2 text-green-600">Monthly Revenue</h2>
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Month</th>
                <th className="px-4 py-2 border">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRevenue.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{item.month}</td>
                  <td className="px-4 py-2 border">{item.amount.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="px-4 py-2 border">Total</td>
                <td className="px-4 py-2 border">{getTotal(monthlyRevenue).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2 text-red-600">Monthly Expenses</h2>
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Month</th>
                <th className="px-4 py-2 border">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {monthlyExpenses.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{item.month}</td>
                  <td className="px-4 py-2 border">{item.amount.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="px-4 py-2 border">Total</td>
                <td className="px-4 py-2 border">{getTotal(monthlyExpenses).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
