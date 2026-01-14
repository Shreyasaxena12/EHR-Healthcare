import React, { useState } from "react";
import data from "../../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const invoices = data.invoices;

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || invoice.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="">
        <div className="flex">

        </div>
      <h2 className="text-2xl font-semibold mb-4">Invoices</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by patient or invoice ID"
          className="px-4 py-2 border rounded shadow-sm w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded shadow-sm w-full md:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      {filteredInvoices.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Invoice ID</th>
                <th className="py-2 px-4 border-b">Patient Name</th>
                <th className="py-2 px-4 border-b">Amount (₹)</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Due Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-2 px-4 border-b">{invoice.invoiceId}</td>
                  <td className="py-2 px-4 border-b">{invoice.patientName}</td>
                  <td className="py-2 px-4 border-b">₹{invoice.amount}</td>
                  <td className="py-2 px-4 border-b">{invoice.date}</td>
                  <td className="py-2 px-4 border-b">{invoice.dueDate}</td>
                  <td
                    className={`py-2 px-4 border-b font-medium ${
                      invoice.status === "Paid"
                        ? "text-green-600"
                        : invoice.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {invoice.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No invoices match your search or filter.</p>
      )}
    </div>
  );
}
