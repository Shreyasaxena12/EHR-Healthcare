import { useState } from "react";
import data from "../../../../shared/DataStore/Lab/patient_data.json";

const getSeverityColor = (status) => {
  switch (status?.toLowerCase()) {
    case "resolved":
      return "bg-green-100 text-green-700";
    case "ongoing":
      return "bg-yellow-100 text-yellow-800";
    case "critical":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function PatientHistory() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase()) ||
    patient.medicalHistory?.some((item) =>
      item.condition.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Patient History</h2>

      {/* 🔍 Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or condition..."
          className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧾 Patient Cards */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No matching patients found.</p>
      ) : (
        filteredData.map((patient) => (
          <div
            key={patient.patientId}
            className="mb-8 bg-white border border-gray-200 rounded-xl shadow-lg p-6"
          >
            {/* 👤 Basic Info */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {patient.name} ({patient.gender}, {patient.age} years)
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Contact: <span className="font-medium">{patient.contact.phone}</span> |{" "}
                {patient.contact.email}
              </p>
              {patient.requestStatus && (
                <p className="text-sm text-gray-600 mt-1">
                  Attending: {patient.requestStatus.type} - {patient.requestStatus.requestedBy}
                </p>
              )}
            </div>

            {/* 🩺 Medical History */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {patient.medicalHistory?.map((entry, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <p className="text-sm text-gray-500 mb-1">Diagnosed: {entry.diagnosedDate}</p>
                  <p className="font-semibold text-gray-700">
                    Condition: <span className="font-normal">{entry.condition}</span>
                  </p>
                  <p className="font-semibold text-gray-700">
                    Treatment: <span className="font-normal">{entry.treatment}</span>
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${getSeverityColor(entry.status)}`}
                  >
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>

            {/* 💳 Payment Summary */}
            <div className="mt-5">
              <p className="text-sm text-gray-600">
                Insurance: {patient.paymentDetails.insuranceProvider} | Policy:{" "}
                {patient.paymentDetails.policyNumber}
              </p>
              <p className="text-sm text-gray-600">
                Outstanding Amount: ₹{patient.paymentDetails.outstandingAmount}
              </p>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
