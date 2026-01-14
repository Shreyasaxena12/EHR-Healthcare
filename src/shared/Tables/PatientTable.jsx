import React, { useState, useMemo } from "react";
import PatientData from "../DataStore/Admin/Patient.json";

export default function PatientTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const perPage = 5;

  const fallbackImage = "https://via.placeholder.com/100x100.png?text=Patient";

  const filteredPatients = useMemo(() => {
    return PatientData.filter((p) =>
      `${p.firstName} ${p.lastName} ${p.currentDiagnosis} ${p.ward}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredPatients.slice(start, start + perPage);
  }, [page, filteredPatients]);

  const totalPages = Math.ceil(filteredPatients.length / perPage);

  return (
    <div className="p-6 overflow-x-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Patient List</h2>
        <input
          type="text"
          placeholder="Search patient..."
          className="border px-3 py-2 border-b border-[var(--clr-lemon)] outline-none w-full md:w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
        <thead>
          <tr className="bg-[var(--clr-lemon)] text-black">
            <th className="px-4 py-2 text-left">Photo</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Ward</th>
            <th className="px-4 py-2 text-left">Diagnosis</th>
            <th className="px-4 py-2 text-left">Doctor</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p) => (
            <tr key={p.patientId} className="hover:bg-gray-100 border-b">
              <td className="px-4 py-2">
                <img
                  src={p.profileImage || fallbackImage}
                  onError={(e) => (e.target.src = fallbackImage)}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2">{p.firstName} {p.lastName}</td>
              <td className="px-4 py-2">{p.ward}</td>
              <td className="px-4 py-2">{p.currentDiagnosis}</td>
              <td className="px-4 py-2">{p.assignedDoctorName || p.assignedDoctorId}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.status === "Admitted"
                      ? "bg-green-100 text-green-700"
                      : p.status === "Critical"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setSelectedPatient(p)}
                  className="bg-[var(--clr-lemon)] text-black px-3 py-1 rounded-md hover:shadow"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full relative">
            <button
              onClick={() => setSelectedPatient(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <div className="flex items-center gap-4">
              <img
                src={selectedPatient.profileImage || fallbackImage}
                onError={(e) => (e.target.src = fallbackImage)}
                alt="patient"
                className="w-24 h-24 rounded-full border-2 border-[var(--clr-lemon)] object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedPatient.firstName} {selectedPatient.lastName}
                </h3>
                <p className="text-sm text-gray-600">{selectedPatient.ward}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><strong>Patient ID:</strong> {selectedPatient.patientId}</div>
              <div><strong>Age:</strong> {selectedPatient.age}</div>
              <div><strong>Gender:</strong> {selectedPatient.gender}</div>
              <div><strong>Phone:</strong> {selectedPatient.phone}</div>
              <div><strong>Email:</strong> {selectedPatient.email}</div>
              <div><strong>Room:</strong> {selectedPatient.roomNumber}</div>
              <div><strong>Bed:</strong> {selectedPatient.bedNumber}</div>
              <div><strong>Admission:</strong> {new Date(selectedPatient.admissionDate).toLocaleString()}</div>
              <div><strong>Diagnosis:</strong> {selectedPatient.currentDiagnosis}</div>
              <div><strong>Allergies:</strong> {selectedPatient.allergies?.join(", ") || "None"}</div>
              <div><strong>Doctor:</strong> {selectedPatient.assignedDoctorName || selectedPatient.assignedDoctorId}</div>
              <div><strong>Nurse ID:</strong> {selectedPatient.assignedNurseId}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedPatient.address}</div>
              <div className="col-span-2"><strong>New Patient:</strong> {selectedPatient.isNew ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
