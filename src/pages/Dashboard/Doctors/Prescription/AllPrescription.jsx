import React, { useState } from "react";
import data from "../../../../shared/DataStore/Doctors/Prescriptions.json";

export default function AllPrescription() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Filter by patient name or diagnosis
  const filteredData = data.filter(
    (presc) =>
      presc.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      presc.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">All Prescriptions</h2>

      <input
        type="text"
        placeholder="Search by patient name or diagnosis..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border-b-2 border-[var(--clr-lemon)] w-full outline-none"
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-indigo-600 text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Doctor</th>
              <th className="px-4 py-2">Diagnosis</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Follow-up</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={item.prescriptionId} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 font-medium">{item.patientName}</td>
                <td className="px-4 py-2">{item.doctorName}</td>
                <td className="px-4 py-2">{item.diagnosis}</td>
                <td className="px-4 py-2">{item.dateIssued}</td>
                <td className="px-4 py-2">{item.followUpDate}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setSelectedPrescription(item)}
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <p className="text-center py-6 text-gray-500">No prescriptions found.</p>
        )}
      </div>

      {/* Modal for details */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedPrescription(null)}
              className="absolute top-2 right-4 text-xl text-gray-500 hover:text-red-500"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">Prescription Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Patient:</strong> {selectedPrescription.patientName}</p>
              <p><strong>Doctor:</strong> {selectedPrescription.doctorName}</p>
              <p><strong>Diagnosis:</strong> {selectedPrescription.diagnosis}</p>
              <p><strong>Visit Type:</strong> {selectedPrescription.visitType}</p>
              <p><strong>Date Issued:</strong> {selectedPrescription.dateIssued}</p>
              <p><strong>Follow-up:</strong> {selectedPrescription.followUpDate}</p>
              <p><strong>Notes:</strong> {selectedPrescription.notes}</p>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Medications</h4>
                <ul className="list-disc pl-6 space-y-1">
                  {selectedPrescription.medications.map((med, idx) => (
                    <li key={idx}>
                      {med.medicineName} — {med.dosage}, {med.frequency} ({med.duration})<br />
                      <span className="text-xs text-gray-500 italic">
                        {med.instructions} | Route: {med.route}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedPrescription.attachments.length > 0 && (
                <div className="mt-4">
                  <p><strong>Attachment:</strong>{" "}
                    <a
                      href={selectedPrescription.attachments[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {selectedPrescription.attachments[0].fileName}
                    </a>
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedPrescription(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
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
