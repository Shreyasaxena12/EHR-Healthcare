import React, { useState } from "react";

export default function AddExpense() {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Simple validation function
  const validate = () => {
    const newErrors = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount greater than 0";
    }
    if (!form.category.trim()) {
      newErrors.category = "Category is required";
    }
    if (!form.date) {
      newErrors.date = "Date is required";
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log("New Expense Data:", form);

    // Reset form after submit
    setForm({
      amount: "",
      category: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="amount">
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
            min="0"
            step="0.01"
            placeholder="Enter amount"
          />
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="text-red-600 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter description"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
