import React, { useState } from "react";
import reportData from "../../../../shared/DataStore/Lab/Allreport.json";

export default function AllReports() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reportData.filter((report) => {
    const term = searchTerm.toLowerCase();
    return (
      report.patient.name.toLowerCase().includes(term) ||
      report.doctor.name.toLowerCase().includes(term) ||
      report.testType.toLowerCase().includes(term) ||
      report.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Lab Reports</h2>

      <input
        type="text"
        placeholder="Search by patient, doctor, test, or status"
        className="mb-4 p-2 border rounded w-full md:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Report ID</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Test Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Report Date</th>
              <th className="p-3">Organization</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.reportId} className="border-t hover:bg-gray-50">
                  <td className="p-3">{report.reportId}</td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{report.patient.name}</p>
                      <p className="text-xs text-gray-500">{report.patient.age} yrs, {report.patient.gender}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <p>{report.doctor.name}</p>
                    <p className="text-xs text-gray-500">{report.doctor.specialization}</p>
                  </td>
                  <td className="p-3">{report.testType}</td>
                  <td className={`p-3 font-medium capitalize ${report.status === "pending" ? "text-red-600" : "text-green-600"}`}>
                    {report.status}
                  </td>
                  <td className="p-3">{report.reportDate || "—"}</td>
                  <td className="p-3">
                    <p>{report.organization.name}</p>
                    <p className="text-xs text-gray-500">{report.organization.department}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan="7">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
