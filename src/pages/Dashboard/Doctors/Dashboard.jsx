import React, { useState } from "react";
import RawData from "../../../shared/DataStore/Doctors/DocProfile";

export default function Dashboard() {
  const [data, setData] = useState(RawData);

  const toggleStatus = (id) => {
    const updated = data.map((doc) =>
      doc.id === id
        ? {
            ...doc,
            availability: {
              ...doc.availability,
              status: doc.availability.status === "Online" ? "Offline" : "Online",
            },
          }
        : doc
    );
    setData(updated);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome, {data?.[0].fullName}</h1>

      {data.map((doc) => (
        <div
          key={doc.id}
          className="bg-white rounded-2xl shadow-md p-6 mb-12 grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Profile */}
          <div className="col-span-1">
            <div className="flex flex-col items-center">
              <img
                src={doc.photo}
                alt={doc.fullName}
                className="w-24 h-24 rounded-full border-4 border-indigo-100 object-cover mb-3"
              />
              <h2 className="text-xl font-bold text-gray-800">{doc.fullName}</h2>
              <p className="text-indigo-600">{doc.specialization}</p>
              <p className="text-sm text-gray-500 italic">{doc.department}</p>

              {/* Status badge */}
              <span
                className={`mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                  doc.availability.status === "Online"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doc.availability.status}
              </span>

              {/* Toggle Button */}
              <button
                onClick={() => toggleStatus(doc.id)}
                className="mt-3 px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow"
              >
                Set {doc.availability.status === "Online" ? "Offline" : "Online"}
              </button>

              {/* Contact and Experience */}
              <div className="mt-4 text-sm text-gray-600 space-y-1 text-left w-full">
                <p><strong>Experience:</strong> {doc.experience}</p>
                <p><strong>Email:</strong> {doc.email}</p>
                <p><strong>Phone:</strong> {doc.phone}</p>
                <p><strong>Timings:</strong> {doc.availability.timings}</p>
                <p><strong>Joined:</strong> {doc.joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-span-1 flex flex-col gap-4 justify-center">
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-indigo-700">{doc.stats.totalPatients}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Appointments Today</p>
              <p className="text-2xl font-bold text-green-700">{doc.stats.appointmentsToday}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Pending Lab Reports</p>
              <p className="text-2xl font-bold text-yellow-700">{doc.stats.pendingLabReports}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">Prescriptions Given</p>
              <p className="text-2xl font-bold text-blue-700">{doc.stats.prescriptionsGiven}</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Appointments</h3>
            <ul className="text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto pr-2">
              {doc.appointments.map((apt) => (
                <li key={apt.appointmentId} className="border rounded-lg p-2 bg-gray-50">
                  <p className="font-medium">{apt.patientName}</p>
                  <p>{apt.date} at {apt.time}</p>
                  <p className="text-xs italic">{apt.type} • {apt.status}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Patients */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Patients</h3>
            <ul className="text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto pr-2">
              {doc.patients.map((patient) => (
                <li key={patient.patientId} className="flex items-center gap-3 border rounded-lg p-2 bg-gray-50">
                  <img
                    src={patient.photo}
                    alt={patient.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{patient.age} yrs • {patient.gender}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
