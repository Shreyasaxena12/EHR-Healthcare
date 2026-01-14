import { useState } from "react";
import data from "../../../../shared/DataStore/Admin/pharmacyData.json";

export default function MedicineIssue() {
  const today = new Date();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Helper: calculate days until expiry
  const daysUntilExpiry = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const diff = expiry - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Helper: determine status
  const getStatus = (item) => {
    const days = daysUntilExpiry(item.expiryDate);
    if (days <= 0) return "Expired";
    if (item.stockAvailable < 10) return "Low Stock";
    if (days <= 30) return "Expiring Soon";
    return "OK";
  };

  // Apply filters
  const issueMedicines = data.filter((item) => {
    const nameMatch = item.drugName.toLowerCase().includes(search.toLowerCase());
    const status = getStatus(item);

    const statusMatch =
      statusFilter === "All" ? status !== "OK" : status === statusFilter;

    return nameMatch && statusMatch;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-[var(--clr-lemon)]">
        Medicine Issues
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by medicine name"
          className="border px-4 py-2 rounded w-full sm:w-64"
        />

        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-64"
        >
          <option value="All">All Issues</option>
          <option value="Expired">Expired</option>
          <option value="Expiring Soon">Expiring Soon</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>

      {issueMedicines.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow border">
            <thead className="bg-gray-100 text-sm text-left">
              <tr>
                <th className="py-2 px-4">Medicine</th>
                <th className="py-2 px-4">Batch</th>
                <th className="py-2 px-4">Expiry</th>
                <th className="py-2 px-4">In</th>
                <th className="py-2 px-4">Stock</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {issueMedicines.map((med, idx) => {
                const status = getStatus(med);
                const days = daysUntilExpiry(med.expiryDate);
                const statusColor =
                  status === "Expired"
                    ? "bg-red-500 text-white"
                    : status === "Expiring Soon"
                    ? "bg-orange-400 text-white"
                    : "bg-yellow-300 text-black";

                return (
                  <tr
                    key={idx}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-4">{med.drugName}</td>
                    <td className="py-2 px-4">{med.batchNumber}</td>
                    <td className="py-2 px-4">
                      {new Date(med.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">
                      {days > 0 ? `${days} day(s)` : "Expired"}
                    </td>
                    <td className="py-2 px-4">{med.stockAvailable}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 font-medium mt-4">No matching medicine issues found.</p>
      )}
    </div>
  );
}
