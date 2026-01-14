import React, { useState } from "react";

export default function CreateInvoice() {
  const [formData, setFormData] = useState({
    invoiceId: "",
    patientName: "",
    amount: "",
    date: "",
    dueDate: "",
    status: "Paid",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.invoiceId) newErrors.invoiceId = "Invoice ID is required.";
    if (!formData.patientName) newErrors.patientName = "Patient Name is required.";
    if (!formData.amount || isNaN(formData.amount))
      newErrors.amount = "Valid amount is required.";
    if (!formData.date) newErrors.date = "Invoice Date is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due Date is required.";
    if (!formData.status) newErrors.status = "Status is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted Invoice Data:", formData);
      // Reset form if needed:
      setFormData({ invoiceId: "", patientName: "", amount: "", date: "", dueDate: "", status: "Paid" });
    }
  };

  return (
    <section className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Invoice ID */}
        <div>
          <label className="block font-medium">Invoice ID</label>
          <input
            type="text"
            name="invoiceId"
            value={formData.invoiceId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.invoiceId && <p className="text-red-500 text-sm">{errors.invoiceId}</p>}
        </div>

        {/* Patient Name */}
        <div>
          <label className="block font-medium">Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="block font-medium">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

        {/* Invoice Date */}
        <div>
          <label className="block font-medium">Invoice Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Invoice
        </button>
      </form>
    </section>
  );
}
