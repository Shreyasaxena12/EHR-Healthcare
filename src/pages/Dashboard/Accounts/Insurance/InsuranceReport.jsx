import React, { useState } from "react";
import data from "../../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";

export default function InsuranceReport() {
  const reports = data?.Insurance?.claimReports || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = reports.filter(
    (report) =>
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.claimId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Insurance Claim Reports</h2>

      <input
        type="text"
        placeholder="Search by Patient or Claim ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-md mb-4 w-full md:w-1/2"
      />

      {filteredReports.length === 0 ? (
        <p>No insurance reports found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredReports.map((report, idx) => (
            <div
              key={report.claimId || idx}
              onClick={() => setSelectedReport(report)}
              className="border rounded-lg shadow p-4 bg-white cursor-pointer hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">
                  Claim ID: {report.claimId}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Patient:</strong> {report.patientName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Insurance:</strong> {report.insuranceCompany}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Amount Claimed:</strong> ₹{report.amountClaimed}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">
              Claim ID: {selectedReport.claimId}
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    selectedReport.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : selectedReport.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedReport.status}
                </span>
              </p>
              <p>
                <strong>Patient Name:</strong> {selectedReport.patientName}
              </p>
              <p>
                <strong>Insurance Company:</strong>{" "}
                {selectedReport.insuranceCompany}
              </p>
              <p>
                <strong>Date Submitted:</strong>{" "}
                {selectedReport.dateSubmitted}
              </p>
              <p>
                <strong>Approval Date:</strong>{" "}
                {selectedReport.approvalDate || "N/A"}
              </p>

              <div className="mt-4">
                <h4 className="font-semibold">Claim Details:</h4>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    <strong>Hospital:</strong>{" "}
                    {selectedReport.claimDetails.hospital}
                  </li>
                  <li>
                    <strong>Doctor:</strong>{" "}
                    {selectedReport.claimDetails.doctor}
                  </li>
                  <li>
                    <strong>Diagnosis:</strong>{" "}
                    {selectedReport.claimDetails.diagnosis}
                  </li>
                  <li>
                    <strong>Treatment:</strong>{" "}
                    {selectedReport.claimDetails.treatment}
                  </li>
                  <li>
                    <strong>Treatment Date:</strong>{" "}
                    {selectedReport.claimDetails.treatmentDate}
                  </li>
                  <li>
                    <strong>Documents:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {selectedReport.claimDetails.documentsSubmitted.map(
                        (doc, i) => (
                          <li key={i}>{doc}</li>
                        )
                      )}
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <p>
                  <strong>Amount Claimed:</strong> ₹
                  {selectedReport.amountClaimed}
                </p>
                <p>
                  <strong>Amount Approved:</strong> ₹
                  {selectedReport.amountApproved}
                </p>
              </div>

              {selectedReport.notes && (
                <p className="mt-3">
                  <strong>Notes:</strong> {selectedReport.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
