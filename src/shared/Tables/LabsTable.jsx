import React, { useState, useMemo } from "react";
import LabData from "../DataStore/Admin/LabData.json";

export default function LabsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLab, setSelectedLab] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const rowsPerPage = 5;

  const filteredData = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return LabData.filter((lab) =>
      lab.patientId.toLowerCase().includes(lower) ||
      lab.testName.toLowerCase().includes(lower) ||
      lab.labName.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === "reportDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  const currentRows = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const handleOpenModal = (lab) => {
    setSelectedLab(lab);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLab(null);
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-[color:var(--clr-lemon)]">Lab Reports</h2> */}

      <input
        type="text"
        placeholder="Search patient ID, test, or lab..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full md:w-1/2 px-3 py-2 border-b-2 border-[var(--clr-lemon)] focus:outline-none focus:ring focus:ring-[color:var(--clr-lemon)]"
      />

      <div className="overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-[color:var(--clr-lemon)] text-black cursor-pointer">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Lab Test ID</th>
              <th onClick={() => requestSort("testName")} className="px-4 py-2 text-left text-sm font-semibold">
                Test Name {getSortArrow("testName")}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Patient ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Lab Name</th>
              <th onClick={() => requestSort("reportDate")} className="px-4 py-2 text-left text-sm font-semibold">
                Report Date {getSortArrow("reportDate")}
              </th>
              <th onClick={() => requestSort("status")} className="px-4 py-2 text-left text-sm font-semibold">
                Status {getSortArrow("status")}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentRows.map((lab) => (
              <tr key={lab.labTestId} className="hover:bg-gray-50">
                <td className="px-4 py-2">{lab.labTestId}</td>
                <td className="px-4 py-2">{lab.testName}</td>
                <td className="px-4 py-2">{lab.patientId}</td>
                <td className="px-4 py-2">{lab.labName}</td>
                <td className="px-4 py-2">{new Date(lab.reportDate).toLocaleString()}</td>
                <td className="px-4 py-2">{lab.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleOpenModal(lab)}
                    className="px-3 py-1 bg-[color:var(--clr-lemon)] text-black font-semibold rounded hover:bg-yellow-400 transition"
                  >
                    View Full
                  </button>
                </td>
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-400">No lab results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>
        <span>
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isOpen && selectedLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-4 text-xl font-bold text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-[color:var(--clr-lemon)]">Full Lab Report</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><b>Lab Test ID:</b> {selectedLab.labTestId}</p>
                <p><b>Patient ID:</b> {selectedLab.patientId}</p>
                <p><b>Doctor ID:</b> {selectedLab.doctorId}</p>
                <p><b>Test Name:</b> {selectedLab.testName}</p>
                <p><b>Test Code:</b> {selectedLab.testCode}</p>
                <p><b>Type:</b> {selectedLab.testType}</p>
              </div>

              <div>
                <p><b>Specimen:</b> {selectedLab.specimenType}</p>
                <p><b>Method:</b> {selectedLab.method}</p>
                <p><b>Collected At:</b> {new Date(selectedLab.sampleCollectedAt).toLocaleString()}</p>
                <p><b>Received At:</b> {new Date(selectedLab.sampleReceivedAt).toLocaleString()}</p>
                <p><b>Report Date:</b> {new Date(selectedLab.reportDate).toLocaleString()}</p>
              </div>

              <div>
                <p><b>Lab:</b> {selectedLab.labName}</p>
                <p><b>Address:</b> {selectedLab.labAddress}</p>
                <p><b>Technician:</b> {selectedLab.technician.name} ({selectedLab.technician.technicianId})</p>
                <p><b>Status:</b> {selectedLab.status}</p>
              </div>

              <div>
                <p><b>Billing:</b> ₹{selectedLab.billing.amount} {selectedLab.billing.currency}</p>
                <p><b>Paid:</b> {selectedLab.billing.paid ? "Yes" : "No"}</p>
                <p><b>Payment Method:</b> {selectedLab.billing.paymentMethod}</p>
                <p><b>Transaction ID:</b> {selectedLab.billing.transactionId}</p>
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold">Test Results</h4>
                <table className="w-full border mt-2 text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">Parameter</th>
                      <th className="border px-2 py-1">Value</th>
                      <th className="border px-2 py-1">Unit</th>
                      <th className="border px-2 py-1">Reference</th>
                      <th className="border px-2 py-1">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLab.results.map((res, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1">{res.parameter}</td>
                        <td className="border px-2 py-1">{res.value}</td>
                        <td className="border px-2 py-1">{res.unit}</td>
                        <td className="border px-2 py-1">{res.referenceRange}</td>
                        <td className="border px-2 py-1">{res.flag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="col-span-2">
                <p><b>Summary:</b> {selectedLab.resultSummary}</p>
                <p><b>Comments:</b> {selectedLab.comments}</p>
                <p><b>Follow Up Required:</b> {selectedLab.followUpRequired ? "Yes" : "No"}</p>
                <p><b>Attachment:</b> <a className="text-blue-600 underline" href={selectedLab.attachments[0].url} target="_blank" rel="noreferrer">{selectedLab.attachments[0].fileName}</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
