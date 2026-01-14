import React, { useState, useMemo } from "react";
import nurseData from "../DataStore/Admin/Nurse.json";
import { saveAs } from "file-saver";
import Papa from "papaparse";

export default function NurseTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("firstName");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNurse, setSelectedNurse] = useState(null);

  const nursesPerPage = 5;

  // Unique department list
  const departments = useMemo(() => [
    "All",
    ...Array.from(new Set(nurseData.map((n) => n.department))),
  ], []);

  // Filter, search and sort
  const filteredNurses = useMemo(() => {
    let filtered = nurseData;

    if (searchQuery.trim()) {
      filtered = filtered.filter((n) =>
        `${n.firstName} ${n.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter !== "All") {
      filtered = filtered.filter((n) => n.department === departmentFilter);
    }

    return filtered.sort((a, b) => {
      const valA = a[sortBy]?.toString().toLowerCase();
      const valB = b[sortBy]?.toString().toLowerCase();
      return valA.localeCompare(valB);
    });
  }, [searchQuery, departmentFilter, sortBy]);

  const totalPages = Math.ceil(filteredNurses.length / nursesPerPage);
  const currentNurses = filteredNurses.slice(
    (currentPage - 1) * nursesPerPage,
    currentPage * nursesPerPage
  );

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredNurses);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "nurse_list.csv");
  };

  return (
    <div className="p-6 overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border-b border-[var(--clr-lemon)] outline-none px-3 py-2  w-full md:w-96"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="flex items-center gap-3">

        <select
          className="border-b border-[var(--clr-lemon)] px-3 py-2 outline-none w-full md:w-64"
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <button
          onClick={exportToCSV}
          className="bg-[var(--clr-lemon)] text-white cursor-pointer px-4 py-2 rounded-md font-medium hover:shadow"
        >
          Export CSV
        </button>
        </div>
      </div>

      <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
        <thead>
          <tr className="bg-gray-300 text-black">
            <th className="px-4 py-2 text-left">Profile</th>
            <th
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => setSortBy("firstName")}
            >
              Name ⬍
            </th>
            <th
              className="px-4 py-2 text-left cursor-pointer"
              onClick={() => setSortBy("department")}
            >
              Department ⬍
            </th>
            <th className="px-4 py-2 text-left">Experience</th>
            <th className="px-4 py-2 text-left">Shift</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentNurses.map((nurse) => (
            <tr
              key={nurse.nurseId}
              className="hover:bg-gray-100 border-b transition-all"
            >
              <td className="px-4 py-2">
                <img
                  src={nurse.profileImage}
                  alt={nurse.firstName}
                  className="w-24 h-24 rounded-md object-cover"
                />
              </td>
              <td className="px-4 py-2">{nurse.firstName} {nurse.lastName}</td>
              <td className="px-4 py-2">{nurse.department}</td>
              <td className="px-4 py-2">{nurse.experienceYears} yrs</td>
              <td className="px-4 py-2">{nurse.shift}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setSelectedNurse(nurse)}
                  className="bg-[var(--clr-lemon)] cursor-pointer text-black px-3 py-1 rounded-md hover:shadow-md"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Nurse Modal */}
      {selectedNurse && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
            <button
              onClick={() => setSelectedNurse(null)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <div className="flex items-center gap-4">
              <img
                src={selectedNurse.profileImage}
                alt="Nurse"
                className="w-24 h-24 rounded-md border-2 border-[var(--clr-lemon)] object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedNurse.firstName} {selectedNurse.lastName}
                </h3>
                <p className="text-sm text-gray-600">{selectedNurse.department}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><strong>Age:</strong> {selectedNurse.age}</div>
              <div><strong>Gender:</strong> {selectedNurse.gender}</div>
              <div><strong>Phone:</strong> {selectedNurse.phone}</div>
              <div><strong>Email:</strong> {selectedNurse.email}</div>
              <div><strong>Qualification:</strong> {selectedNurse.qualification}</div>
              <div><strong>Experience:</strong> {selectedNurse.experienceYears} yrs</div>
              <div><strong>Shift:</strong> {selectedNurse.shift}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedNurse.address}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
