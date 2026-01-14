import React, { useState } from "react";
import data from "../../../../shared/DataStore/Admin/LabData.json";
import Table from "../../../../shared/TestReports/LabReport";

export default function AllReports() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = data.filter((report) =>
    report.technician.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">All Lab Reports</h1>

      <input
        type="text"
        placeholder="Search by patient name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 w-full border-b-2 border-[var(--clr-lemon)] outline-none"
      />

      <Table reports={filteredReports} />
    </div>
  );
}
