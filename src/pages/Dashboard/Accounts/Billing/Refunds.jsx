import React, { useState } from "react";
import data from "../../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";
import { FaSearch, FaFileCsv } from "react-icons/fa";

export default function Refunds() {
  const refunds = data.Refunds || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const itemsPerPage = 10;

  const filteredRefunds = refunds
    .filter((refund) =>
      refund.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((refund) =>
      statusFilter === "All" ? true : refund.status === statusFilter
    );

  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage);
  const paginatedRefunds = filteredRefunds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const headers = Object.keys(refunds[0]).join(",");
    const rows = refunds.map((refund) =>
      Object.values(refund).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "refunds.csv";
    a.click();
  };

  return (
    <section className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Refunds</h2>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaFileCsv /> Export CSV
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by patient name..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Claim ID</th>
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Date Submitted</th>
              <th className="p-3 text-left">Amount Claimed</th>
              <th className="p-3 text-left">Insurance Company</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRefunds.map((refund, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedRefund(refund)}
              >
                <td className="p-3">{refund.claimId}</td>
                <td className="p-3">{refund.patientName}</td>
                <td className="p-3">{refund.dateSubmitted}</td>
                <td className="p-3 text-green-600 font-medium">
                  ₹{refund.amountClaimed.toLocaleString()}
                </td>
                <td className="p-3">{refund.insuranceCompany}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      refund.status === "Approved"
                        ? "bg-green-600"
                        : refund.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {refund.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredRefunds.length)} of{" "}
          {filteredRefunds.length} results
        </p>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : totalPages
              )
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedRefund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Refund Details</h3>
            <ul className="space-y-2">
              <li>
                <strong>Claim ID:</strong> {selectedRefund.claimId}
              </li>
              <li>
                <strong>Patient Name:</strong> {selectedRefund.patientName}
              </li>
              <li>
                <strong>Date Submitted:</strong> {selectedRefund.dateSubmitted}
              </li>
              <li>
                <strong>Amount Claimed:</strong> ₹
                {selectedRefund.amountClaimed.toLocaleString()}
              </li>
              <li>
                <strong>Insurance Company:</strong>{" "}
                {selectedRefund.insuranceCompany}
              </li>
              <li>
                <strong>Status:</strong> {selectedRefund.status}
              </li>
            </ul>
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedRefund(null)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
