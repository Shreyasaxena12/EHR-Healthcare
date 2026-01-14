import React, { useState } from "react";
import reportData from "../../../../shared/DataStore/Lab/Allreport.json";

export default function PendingLabReport() {
  const [reports, setReports] = useState(reportData);

  const handleAction = (reportId, action) => {
    const updatedReports = reports.map((report) => {
      if (report.reportId === reportId) {
        return {
          ...report,
          status: action === "approve" ? "completed" : "rejected",
        };
      }
      return report;
    });
    setReports(updatedReports);
  };

  const pendingReports = reports.filter((report) => report.status === "pending");

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pending Lab Reports</h2>

      {pendingReports.length === 0 ? (
        <p className="text-gray-500">No pending reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Report ID</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Test Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Organization</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingReports.map((report) => (
                <tr key={report.reportId} className="border-t hover:bg-gray-50">
                  <td className="p-3">{report.reportId}</td>
                  <td className="p-3">
                    <p className="font-medium">{report.patient.name}</p>
                    <p className="text-xs text-gray-500">
                      {report.patient.age} yrs, {report.patient.gender}
                    </p>
                  </td>
                  <td className="p-3">
                    <p>{report.doctor.name}</p>
                    <p className="text-xs text-gray-500">
                      {report.doctor.specialization}
                    </p>
                  </td>
                  <td className="p-3">{report.testType}</td>
                  <td className="p-3 text-red-600 font-medium capitalize">{report.status}</td>
                  <td className="p-3">
                    <p>{report.organization.name}</p>
                    <p className="text-xs text-gray-500">{report.organization.department}</p>
                  </td>
                  <td className="p-3 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAction(report.reportId, "approve")}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(report.reportId, "reject")}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
