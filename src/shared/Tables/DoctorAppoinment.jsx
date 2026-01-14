import React, { useState } from "react";
import data from "../../shared/DataStore/Doctors/Appointments.json";

export default function DoctorAppoinment({ filterBy = null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const itemsPerPage = 10;

  // Step 1: Apply filter if `filterBy` is passed
  let filteredData = filterBy
    ? data.filter((item) => item.status.toLowerCase() === filterBy.toLowerCase())
    : data;

  // Step 2: Search Filtering
  const filtered = filteredData.filter(
    (item) =>
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Step 3: Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (appointment) => setSelectedAppointment(appointment);
  const closeModal = () => setSelectedAppointment(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {filterBy ? `${filterBy} Appointments` : "All Appointments"}
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by patient or reason..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border-b-2 w-full border-[var(--clr-lemon)] outline-none"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr key={item.appointmentId} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td className="px-4 py-3 font-medium">{item.patientName}</td>
                <td className="px-4 py-3">
                  <div>{item.date}</div>
                  <div className="text-xs text-gray-500">{item.time}</div>
                </td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "Today"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">{item.reason}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => openModal(item)}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="text-center text-gray-500 py-6">No matching appointments found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-1 rounded-full ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
              <p><strong>Date:</strong> {selectedAppointment.date}</p>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>
              <p><strong>Type:</strong> {selectedAppointment.type}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
              <p><strong>Notes:</strong> {selectedAppointment.notes}</p>
              <p><strong>Duration:</strong> {selectedAppointment.duration}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
