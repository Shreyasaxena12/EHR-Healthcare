import { useState } from "react";
import Data from "../../../../shared/DataStore/Lab/finance.json";

export default function PaymentRecevied() {
  const records = Data?.labBillingRecords || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRecords = records.filter((record) => {
    const nameMatch = record.patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "All" || record.payment.status.toLowerCase() === statusFilter.toLowerCase();
    return nameMatch && statusMatch;
  });

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 text-xs font-semibold rounded-full";
    return status === "Paid"
      ? `${base} bg-green-100 text-green-800`
      : `${base} bg-red-100 text-red-800`;
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Payments Received</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Results */}
      {filteredRecords.length === 0 ? (
        <p className="text-gray-600">No matching payment records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecords.map((record) => (
            <div
              key={record.billingId}
              className="border p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">{record.patient.name}</h3>
                <span className={getStatusBadge(record.payment.status)}>
                  {record.payment.status}
                </span>
              </div>
              <p><strong>Billing ID:</strong> {record.billingId}</p>
              <p><strong>Total Amount:</strong> ₹{record.grandTotal.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {record.payment.paymentMethod || "Not Paid"}</p>
              <p><strong>Date:</strong> {new Date(record.billingDate).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
