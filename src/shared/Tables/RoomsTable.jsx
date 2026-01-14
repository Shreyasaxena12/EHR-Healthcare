import React, { useState } from "react";
import RoomsData from "../DataStore/Admin/Rooms.json";

export default function RoomsTable() {
  const [expandedRoom, setExpandedRoom] = useState(null);

  const toggleExpand = (roomId) => {
    setExpandedRoom(expandedRoom === roomId ? null : roomId);
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-[color:var(--clr-lemon)]">Hospital Rooms Overview</h2> */}

      <div className="overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-[color:var(--clr-lemon)] text-black">
            <tr>
              <th className="px-4 py-2 text-left">Room ID</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Floor</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Capacity</th>
              <th className="px-4 py-2 text-left">Occupancy</th>
              <th className="px-4 py-2 text-left">Patients</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {RoomsData.map((room) => (
              <React.Fragment key={room.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold">{room.id}</td>
                  <td className="px-4 py-2">{room.type}</td>
                  <td className="px-4 py-2">{room.floor}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{room.capacity}</td>
                  <td className="px-4 py-2">{room.currentOccupancy}</td>
                  <td className="px-4 py-2">
                    {room.patientsAssigned.length > 0 ? (
                      <button
                        onClick={() => toggleExpand(room.id)}
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {expandedRoom === room.id ? "Hide" : "View"}
                      </button>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                </tr>

                {expandedRoom === room.id && (
                  <tr className="bg-gray-50">
                    <td colSpan="7" className="px-4 py-3">
                      <p className="font-semibold text-[color:var(--clr-lemon)] mb-1">Assigned Patients:</p>
                      <ul className="list-disc list-inside text-sm">
                        {room.patientsAssigned.map((pid, i) => (
                          <li key={i}>{pid}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
