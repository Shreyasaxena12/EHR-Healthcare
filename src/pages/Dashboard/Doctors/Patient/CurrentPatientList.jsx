import React from "react";
import data from "../../../../shared/DataStore/Doctors/DocProfile.json";

export default function CurrentPatientList() {
  const doctor = data[0]; // assuming first doctor for now
  const patients = doctor.patients || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Current Patients of {doctor.fullName}
      </h2>

      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div
              key={patient.patientId}
              className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center"
            >
              <img
                src={patient.photo}
                alt={patient.firstName}
                className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-indigo-200"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {patient.firstName} {patient.lastName}
              </h3>
              <p className="text-sm text-gray-500">Age: {patient.age} | {patient.gender}</p>
              <p className="text-sm text-gray-500">{patient.phone}</p>
              <p className="text-sm text-gray-500">{patient.email}</p>
              <p className="text-sm text-gray-500 italic">
                Admitted on: {patient.admissionDate}
              </p>
              <p className="text-sm text-gray-600 mt-2">{patient.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
