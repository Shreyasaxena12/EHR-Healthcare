import React, { useState } from "react";
import data from "../../../../shared/DataStore/Lab/patient_data.json";

export default function DoctorRequest() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter requests involving a doctor
  const doctorRequests = data.filter(
    (patient) => patient.requestStatus?.type === "Doctor Request"
  );

  // Optional search functionality
  const filteredRequests = doctorRequests.filter((req) => {
    const term = searchTerm.toLowerCase();
    return (
      req.name.toLowerCase().includes(term) ||
      req.requestStatus?.type.toLowerCase().includes(term) ||
      req.requestStatus?.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Doctor Requests</h2>

      <input
        type="text"
        placeholder="Search by patient or status"
        className="mb-4 p-2 border rounded w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredRequests.length === 0 ? (
        <p className="text-gray-500">No doctor requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Patient ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Request Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Requested By</th>
                <th className="p-3">Date</th>
                <th className="p-3">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((patient) => (
                <tr key={patient.patientId} className="border-t hover:bg-gray-50">
                  <td className="p-3">{patient.patientId}</td>
                  <td className="p-3 font-medium">{patient.name}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">{patient.gender}</td>
                  <td className="p-3">{patient.requestStatus?.type}</td>
                  <td
                    className={`p-3 capitalize font-medium ${
                      patient.requestStatus?.status === "Pending"
                        ? "text-yellow-600"
                        : patient.requestStatus?.status === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {patient.requestStatus?.status}
                  </td>
                  <td className="p-3">{patient.requestStatus?.requestedBy}</td>
                  <td className="p-3">{patient.requestStatus?.date}</td>
                  <td className="p-3 text-xs text-gray-500">
                    {patient.requestStatus?.remarks}
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
