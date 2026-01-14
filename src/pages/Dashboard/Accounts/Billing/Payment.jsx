import React, { useState } from "react";
import data from "../../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";
import { FaSearch, FaFileCsv } from "react-icons/fa";

export default function Payment() {
  const payments = data.payments || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayments = payments.filter((payment) =>
    payment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const headers = Object.keys(payments[0]).join(",");
    const rows = payments.map((payment) =>
      Object.values(payment).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payments.csv";
    a.click();
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Payments</h2>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaFileCsv /> Export CSV
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by patient name..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Payment ID</th>
              <th className="p-3 text-left">Invoice ID</th>
              <th className="p-3 text-left">Patient Name</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Amount Paid</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((payment, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedPayment(payment)}
              >
                <td className="p-3">{payment.paymentId}</td>
                <td className="p-3">{payment.invoiceId}</td>
                <td className="p-3">{payment.patientName}</td>
                <td className="p-3">{payment.method}</td>
                <td className="p-3 text-green-600 font-medium">
                  ₹{payment.amountPaid.toLocaleString()}
                </td>
                <td className="p-3">{payment.paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of{" "}
          {filteredPayments.length} results
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
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Payment Details</h3>
            <ul className="space-y-2">
              <li>
                <strong>Payment ID:</strong> {selectedPayment.paymentId}
              </li>
              <li>
                <strong>Invoice ID:</strong> {selectedPayment.invoiceId}
              </li>
              <li>
                <strong>Patient Name:</strong> {selectedPayment.patientName}
              </li>
              <li>
                <strong>Payment Method:</strong> {selectedPayment.method}
              </li>
              <li>
                <strong>Amount Paid:</strong> ₹
                {selectedPayment.amountPaid.toLocaleString()}
              </li>
              <li>
                <strong>Payment Date:</strong> {selectedPayment.paymentDate}
              </li>
            </ul>
            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
