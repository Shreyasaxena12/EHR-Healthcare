import { useState, useMemo } from "react";
import data from "../../../../shared/DataStore/Lab/patient_data.json";

const ITEMS_PER_PAGE = 10;

export default function AllPatient() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPatients = useMemo(() => {
    return data.filter((patient) =>
      [
        patient.name,
        patient.gender,
        patient.contact?.email,
        patient.contact?.phone,
        patient.attending?.type,
        patient.attending?.name,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPatients, currentPage]);

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Patients</h2>

      <input
        type="text"
        placeholder="Search patients or attending staff..."
        className="mb-4 p-2 border rounded w-full md:w-1/2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPatients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Attending By</th>
                <th className="p-3">Assigned To</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{patient.name}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3 capitalize">{patient.gender}</td>
                  <td className="p-3">{patient.contact?.email || "N/A"}</td>
                  <td className="p-3">{patient.contact?.phone || "N/A"}</td>
                  <td className="p-3 capitalize">{patient.attending?.type || "N/A"}</td>
                  <td className="p-3">{patient.attending?.name || "N/A"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        patient.attending?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {patient.attending?.status || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
