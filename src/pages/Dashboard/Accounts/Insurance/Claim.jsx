import React, { useState, useMemo } from "react";
import data from "../../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";

export default function Claim() {
  const claimData = data.Insurance.claimList;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Get unique status values for filter dropdown
  const statuses = useMemo(() => {
    const uniqueStatuses = claimData.map((c) => c.status);
    return [...new Set(uniqueStatuses)].sort();
  }, [claimData]);

  // Filter and search claims
  const filteredClaims = useMemo(() => {
    return claimData.filter(({ patientName, insuranceCompany, status }) => {
      const matchesSearch =
        patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insuranceCompany.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus ? status === filterStatus : true;

      return matchesSearch && matchesStatus;
    });
  }, [claimData, searchTerm, filterStatus]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Claim List</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by patient or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 sm:mb-0 px-3 py-2 border rounded-md flex-grow"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Claims Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredClaims.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No claims found.</p>
        ) : (
          filteredClaims.map(
            ({
              claimId,
              patientName,
              insuranceCompany,
              amountClaimed,
              dateSubmitted,
              status,
            }) => (
              <div
                key={claimId}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h2 className="text-lg font-semibold mb-1">{patientName}</h2>
                <p className="text-gray-600 mb-2">{insuranceCompany}</p>
                <p className="mb-2 text-sm text-gray-700">
                  Amount Claimed:{" "}
                  <span className="font-semibold">₹{amountClaimed.toLocaleString()}</span>
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  Date Submitted: {new Date(dateSubmitted).toLocaleDateString()}
                </p>
                <p
                  className={`font-semibold ${
                    status === "Approved"
                      ? "text-green-600"
                      : status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {status}
                </p>
                <p className="mt-2 text-xs text-gray-500">Claim ID: {claimId}</p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
