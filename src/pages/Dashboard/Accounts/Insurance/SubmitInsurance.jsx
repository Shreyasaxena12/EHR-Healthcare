import React, { useState } from "react";

export default function SubmitInsurance() {
  const [formData, setFormData] = useState({
    patientName: "",
    insuranceCompany: "",
    amountClaimed: "",
    dateSubmitted: "",
    status: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (!formData.insuranceCompany.trim()) newErrors.insuranceCompany = "Insurance company is required";
    if (!formData.amountClaimed || isNaN(formData.amountClaimed) || Number(formData.amountClaimed) <= 0)
      newErrors.amountClaimed = "Enter a valid amount";
    if (!formData.dateSubmitted) newErrors.dateSubmitted = "Date is required";
    if (!formData.status) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Submitted Insurance Data:", formData);
      // Reset form
      setFormData({
        patientName: "",
        insuranceCompany: "",
        amountClaimed: "",
        dateSubmitted: "",
        status: "",
        description: "",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Submit Insurance</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Patient Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.patientName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter patient name"
          />
          {errors.patientName && <p className="text-red-600 text-sm mt-1">{errors.patientName}</p>}
        </div>

        {/* Insurance Company */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Insurance Company</label>
          <input
            type="text"
            name="insuranceCompany"
            value={formData.insuranceCompany}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.insuranceCompany ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter insurance company"
          />
          {errors.insuranceCompany && (
            <p className="text-red-600 text-sm mt-1">{errors.insuranceCompany}</p>
          )}
        </div>

        {/* Amount Claimed */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Amount Claimed (₹)</label>
          <input
            type="number"
            name="amountClaimed"
            value={formData.amountClaimed}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.amountClaimed ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter amount"
            min="0"
          />
          {errors.amountClaimed && (
            <p className="text-red-600 text-sm mt-1">{errors.amountClaimed}</p>
          )}
        </div>

        {/* Date Submitted */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Date Submitted</label>
          <input
            type="date"
            name="dateSubmitted"
            value={formData.dateSubmitted}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.dateSubmitted ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dateSubmitted && (
            <p className="text-red-600 text-sm mt-1">{errors.dateSubmitted}</p>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.status ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
        </div>

        {/* Description (Optional) */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-gray-300"
            placeholder="Additional info..."
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
}
