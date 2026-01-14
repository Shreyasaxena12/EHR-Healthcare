import React, { useState, useMemo } from "react";
import userdata from "../DataStore/Admin/Users.json";

export default function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const rowsPerPage = 5;

  // Search filtered data
  const filteredData = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return userdata.filter((user) => {
      const fullName = `${user.personalInfo.firstName} ${user.personalInfo.lastName}`.toLowerCase();
      return (
        fullName.includes(lower) ||
        user.contactInfo.email.toLowerCase().includes(lower) ||
        user.contactInfo.phone.includes(lower)
      );
    });
  }, [searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.key) {
        case "name":
          aValue = `${a.personalInfo.firstName} ${a.personalInfo.lastName}`.toLowerCase();
          bValue = `${b.personalInfo.firstName} ${b.personalInfo.lastName}`.toLowerCase();
          break;
        case "gender":
          aValue = a.personalInfo.gender.toLowerCase();
          bValue = b.personalInfo.gender.toLowerCase();
          break;
        case "phone":
          aValue = a.contactInfo.phone;
          bValue = b.contactInfo.phone;
          break;
        case "email":
          aValue = a.contactInfo.email.toLowerCase();
          bValue = b.contactInfo.email.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const currentRows = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Sort handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  // Modal handlers
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-[color:var(--clr-lemon)]">User Records</h2> */}

      <input
        type="text"
        placeholder="Search by name, email or phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full md:w-1/2 px-3 py-2 border-b border-[var(--clr-lemon)] outline-none focus:border-yellow-500 transition"
      />

      <div className="overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-[color:var(--clr-lemon)] text-black cursor-pointer select-none">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Photo</th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold"
                onClick={() => requestSort("name")}
              >
                Name {getSortArrow("name")}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold"
                onClick={() => requestSort("gender")}
              >
                Gender {getSortArrow("gender")}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold"
                onClick={() => requestSort("phone")}
              >
                Phone {getSortArrow("phone")}
              </th>
              <th
                className="px-4 py-2 text-left text-sm font-semibold"
                onClick={() => requestSort("email")}
              >
                Email {getSortArrow("email")}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentRows.length > 0 ? (
              currentRows.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={user.personalInfo.photoUrl}
                      alt={`${user.personalInfo.firstName}`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {user.personalInfo.firstName} {user.personalInfo.lastName}
                  </td>
                  <td className="px-4 py-2">{user.personalInfo.gender}</td>
                  <td className="px-4 py-2">{user.contactInfo.phone}</td>
                  <td className="px-4 py-2">{user.contactInfo.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="px-3 py-1 bg-[color:var(--clr-lemon)] text-black font-semibold rounded hover:bg-yellow-400 transition"
                    >
                      View Full
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>
        <span>
          Page <strong>{currentPage}</strong> of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal Popup */}
      {isOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--clr-lemon)] bg-opacity-40">
          <div className="bg-white rounded-lg w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto shadow-lg p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-4 p-5 text-xl font-bold text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-[color:var(--clr-lemon)]">
              Full User Details
            </h3>

            {/* Modal content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">Personal Info</h4>
                <p><b>Name:</b> {selectedUser.personalInfo.firstName} {selectedUser.personalInfo.lastName}</p>
                <p><b>DOB:</b> {selectedUser.personalInfo.dateOfBirth}</p>
                <p><b>Gender:</b> {selectedUser.personalInfo.gender}</p>
                <p><b>Blood Group:</b> {selectedUser.personalInfo.bloodGroup}</p>
                <p><b>Marital Status:</b> {selectedUser.personalInfo.maritalStatus}</p>
                <p><b>Nationality:</b> {selectedUser.personalInfo.nationality}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Contact Info</h4>
                <p><b>Phone:</b> {selectedUser.contactInfo.phone}</p>
                <p><b>Email:</b> {selectedUser.contactInfo.email}</p>
                <p>
                  <b>Address:</b> {selectedUser.contactInfo.address.street}, {selectedUser.contactInfo.address.city},{" "}
                  {selectedUser.contactInfo.address.state}, {selectedUser.contactInfo.address.postalCode},{" "}
                  {selectedUser.contactInfo.address.country}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Emergency Contact</h4>
                <p><b>Name:</b> {selectedUser.emergencyContact.name}</p>
                <p><b>Relationship:</b> {selectedUser.emergencyContact.relationship}</p>
                <p><b>Phone:</b> {selectedUser.emergencyContact.phone}</p>
                <p><b>Email:</b> {selectedUser.emergencyContact.email}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Insurance</h4>
                <p><b>Provider:</b> {selectedUser.insurance.provider}</p>
                <p><b>Policy Number:</b> {selectedUser.insurance.policyNumber}</p>
                <p><b>Valid Till:</b> {selectedUser.insurance.validTill}</p>
                <p><b>Coverage:</b> {selectedUser.insurance.coverageDetails}</p>
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Medical History - Chronic Diseases</h4>
                <ul className="list-disc pl-5">
                  {selectedUser.medicalHistory.chronicDiseases.map((disease, i) => (
                    <li key={i}>{disease}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 w-full gap-4">

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Medical History - Surgeries</h4>
                {selectedUser.medicalHistory.surgeries.map((surgery, i) => (
                  <p key={i}>
                    <b>{surgery.surgeryName}</b> on {surgery.date} at {surgery.hospital}
                  </p>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Medical History - Family History</h4>
                {selectedUser.medicalHistory.familyHistory.map((fh, i) => (
                  <p key={i}>
                    <b>{fh.relation}</b>: {fh.condition}
                  </p>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Allergies</h4>
                {selectedUser.allergies.map((allergy, i) => (
                  <p key={i}>
                    <b>{allergy.allergen}</b>: {allergy.reaction} (Severity: {allergy.severity})
                  </p>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Current Medications</h4>
                {selectedUser.currentMedications.map((med, i) => (
                  <p key={i}>
                    <b>{med.name}</b> - {med.dosage}, {med.frequency} (Prescribed by {med.prescribedBy})
                  </p>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Vaccination Records</h4>
                {selectedUser.vaccinationRecords.map((vax, i) => (
                  <p key={i}>
                    <b>{vax.vaccine}</b> ({vax.dose}) on {vax.date} by {vax.provider}
                  </p>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Appointments</h4>
                {selectedUser.appointments.map((apt) => (
                  <div key={apt.appointmentId} className="mb-1">
                    <p><b>Date:</b> {new Date(apt.date).toLocaleString()}</p>
                    <p><b>Doctor:</b> {apt.doctor}</p>
                    <p><b>Department:</b> {apt.department}</p>
                    <p><b>Status:</b> {apt.status}</p>
                    <p><b>Notes:</b> {apt.notes}</p>
                  </div>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Lab Results</h4>
                {selectedUser.labResults.map((lab, i) => (
                  <p key={i}>
                    <b>{lab.testName}</b> on {lab.date}: {lab.resultsSummary} (<a href={lab.detailsUrl} target="_blank" rel="noreferrer" className="text-[color:var(--clr-lemon)] underline">Details</a>)
                  </p>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">Notes</h4>
                {selectedUser.notes.map((note) => (
                  <p key={note.noteId}>
                    <b>{note.date} ({note.author}):</b> {note.content}
                  </p>
                ))}
              </div>

              <div className="col-span-2">
                <h4 className="font-semibold mb-1">User Preferences</h4>
                <p><b>Language:</b> {selectedUser.userPreferences.language}</p>
                <p><b>Contact Method:</b> {selectedUser.userPreferences.contactMethod}</p>
                <p><b>Notifications:</b></p>
                <ul className="list-disc pl-5">
                  {Object.entries(selectedUser.userPreferences.notificationSettings).map(([key, val]) => (
                    <li key={key}>
                      {key}: {val ? "Enabled" : "Disabled"}
                    </li>
                  ))}
                </ul>
              </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
