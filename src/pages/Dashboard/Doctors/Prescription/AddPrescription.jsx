import React, { useState } from "react";

export default function AddPrescription({ onSubmit }) {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "D1001",
    doctorName: "Dr. Anupam Upadhyay",
    dateIssued: new Date().toISOString().slice(0, 10),
    visitType: "Outpatient",
    diagnosis: "",
    notes: "",
    followUpDate: "",
    medications: [
      { medicineName: "", dosage: "", frequency: "", duration: "", instructions: "", route: "" },
    ],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedChange = (index, e) => {
    const meds = [...formData.medications];
    meds[index][e.target.name] = e.target.value;
    setFormData({ ...formData, medications: meds });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { medicineName: "", dosage: "", frequency: "", duration: "", instructions: "", route: "" }],
    });
  };

  const removeMedication = (index) => {
    const meds = formData.medications.filter((_, i) => i !== index);
    setFormData({ ...formData, medications: meds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.patientId || !formData.patientName || !formData.diagnosis) {
      alert("Please fill required fields: Patient ID, Name and Diagnosis.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-semibold mb-4">Add Prescription</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          Patient ID*:
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>

        <label>
          Patient Name*:
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          Date Issued:
          <input
            type="date"
            name="dateIssued"
            value={formData.dateIssued}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        <label>
          Visit Type:
          <select
            name="visitType"
            value={formData.visitType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Outpatient</option>
            <option>Inpatient</option>
            <option>Online</option>
          </select>
        </label>
      </div>

      <label>
        Diagnosis*:
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          rows={3}
        />
      </label>

      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </label>

      <label>
        Follow-up Date:
        <input
          type="date"
          name="followUpDate"
          value={formData.followUpDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>

      <div>
        <h3 className="font-semibold mb-2">Medications</h3>

        {formData.medications.map((med, idx) => (
          <div key={idx} className="border rounded p-4 mb-4 relative">
            <button
              type="button"
              onClick={() => removeMedication(idx)}
              className="absolute top-2 right-2 text-red-500 font-bold"
              title="Remove medication"
              disabled={formData.medications.length === 1}
            >
              &times;
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label>
                Medicine Name:
                <input
                  type="text"
                  name="medicineName"
                  value={med.medicineName}
                  onChange={(e) => handleMedChange(idx, e)}
                  className="w-full border p-2 rounded"
                />
              </label>

              <label>
                Dosage:
                <input
                  type="text"
                  name="dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedChange(idx, e)}
                  className="w-full border p-2 rounded"
                />
              </label>

              <label>
                Frequency:
                <input
                  type="text"
                  name="frequency"
                  value={med.frequency}
                  onChange={(e) => handleMedChange(idx, e)}
                  placeholder="e.g. Once daily"
                  className="w-full border p-2 rounded"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <label>
                Duration:
                <input
                  type="text"
                  name="duration"
                  value={med.duration}
                  onChange={(e) => handleMedChange(idx, e)}
                  placeholder="e.g. 5 days"
                  className="w-full border p-2 rounded"
                />
              </label>

              <label>
                Instructions:
                <input
                  type="text"
                  name="instructions"
                  value={med.instructions}
                  onChange={(e) => handleMedChange(idx, e)}
                  placeholder="e.g. After meals"
                  className="w-full border p-2 rounded"
                />
              </label>

              <label>
                Route:
                <input
                  type="text"
                  name="route"
                  value={med.route}
                  onChange={(e) => handleMedChange(idx, e)}
                  placeholder="e.g. Oral"
                  className="w-full border p-2 rounded"
                />
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addMedication}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Medication
        </button>
      </div>

      <button
        type="submit"
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Submit Prescription
      </button>
    </form>
  );
}
