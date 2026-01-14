import React, { useState, useMemo } from "react";
import DoctorsData from "../DataStore/Admin/Doctors.json";
import { saveAs } from "file-saver";
import { IoCloseCircleSharp } from "react-icons/io5";

// Export CSV utility
const exportToCSV = (data) => {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) => Object.values(row).join(","));
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "doctors_list.csv");
};

export default function DoctorsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctorsPerPage = 5;

  // Filtered data based on search
  const filteredDoctors = useMemo(() => {
    return DoctorsData.filter((doc) =>
      `${doc.firstName} ${doc.lastName} ${doc.specialty} ${doc.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const currentDoctors = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );

  const handleRowClick = (doctor) => setSelectedDoctor(doctor);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">Doctors</h1>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search doctors..."
            className="px-3 py-2 border-b border-[var(--clr-lemon)] outline-none"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button
            onClick={() => exportToCSV(filteredDoctors)}
            className="px-4 py-2 cursor-pointer bg-[var(--clr-lemon)] text-white rounded transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-blue-50">
            <tr className="text-left text-gray-600 uppercase tracking-wide">
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Specialty</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Phone</th>

              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Fee (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentDoctors.map((doctor) => (
              <tr
                key={doctor.doctorId}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(doctor)}
              >
                <td className="px-4 py-3">
                  <img
                    src={doctor.profileImage}
                    alt={doctor.firstName}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  Dr. {doctor.firstName} {doctor.lastName}
                </td>
                <td className="px-4 py-3">{doctor.specialty}</td>
                <td className="px-4 py-3">{doctor.experienceYears} yrs</td>
                <td className="px-4 py-3">{doctor.phone} </td>

                <td className="px-4 py-3 text-sm text-gray-600">{doctor.email}</td>
                <td className="px-4 py-3 text-green-600 font-bold">₹{doctor.consultationFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-[var(--clr-lemon)] bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full relative">
            <button
              
              className="absolute text-4xl top-2 right-2 text-gray-500 cursor-pointer hover:text-[var(--clr-lemon)]"
            >
             <IoCloseCircleSharp onClick={() => setSelectedDoctor(null)}/>
            </button>
            <div className="flex items-start gap-4">
              <img
                src={selectedDoctor.profileImage}
                alt="Profile"
                className="w-48 h-48 rounded-md object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                </h2>
                <p className="text-blue-600">{selectedDoctor.specialty}</p>
                <p className="text-sm text-gray-500 mb-2">{selectedDoctor.email}</p>
                <p><strong>Experience:</strong> {selectedDoctor.experienceYears} years</p>
                <p><strong>Phone:</strong> {selectedDoctor.phone}</p>
                <p><strong>Clinic:</strong> {selectedDoctor.clinicAddress}</p>
                <p><strong>Available:</strong> {selectedDoctor.availableDays.join(", ")} at {selectedDoctor.availableTimings}</p>
                <p><strong>Fee:</strong> ₹{selectedDoctor.consultationFee}</p>
                <p><strong>Qualifications:</strong></p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {selectedDoctor.qualifications.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => alert("Booking functionality coming soon!")}
                className="px-4 py-2 bg-[var(--clr-lemon)] text-white rounded cursor-pointer hover:bg-[var(--clr-lemon)]/90 transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
