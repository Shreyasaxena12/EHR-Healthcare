import { useState } from "react";

export default function GenerateBill() {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    contact: "",
    discount: 0,
    tests: [{ testName: "", price: 0, tax: 0 }],
  });

  const handleTestChange = (index, field, value) => {
    const updatedTests = [...form.tests];
    updatedTests[index][field] = field === "price" || field === "tax" ? parseFloat(value) || 0 : value;
    setForm({ ...form, tests: updatedTests });
  };

  const addTest = () => {
    setForm({ ...form, tests: [...form.tests, { testName: "", price: 0, tax: 0 }] });
  };

  const removeTest = (index) => {
    const updatedTests = [...form.tests];
    updatedTests.splice(index, 1);
    setForm({ ...form, tests: updatedTests });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Generated Bill:", form);
    alert("Bill generated! (Check console for data)");
  };

  const subtotal = form.tests.reduce((sum, t) => sum + t.price, 0);
  const totalTax = form.tests.reduce((sum, t) => sum + (t.price * t.tax) / 100, 0);
  const total = subtotal + totalTax - Number(form.discount || 0);

  return (
    <section className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Generate Lab Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            type="tel"
            placeholder="Contact Number"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        {/* Test List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add Lab Tests</h3>
          {form.tests.map((test, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
              <input
                type="text"
                placeholder="Test Name"
                value={test.testName}
                onChange={(e) => handleTestChange(idx, "testName", e.target.value)}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={test.price}
                onChange={(e) => handleTestChange(idx, "price", e.target.value)}
                className="border px-3 py-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Tax (%)"
                value={test.tax}
                onChange={(e) => handleTestChange(idx, "tax", e.target.value)}
                className="border px-3 py-2 rounded"
              />
              {form.tests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTest(idx)}
                  className="text-red-500 underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addTest}
            className="text-blue-600 underline text-sm"
          >
            + Add Another Test
          </button>
        </div>

        {/* Discount */}
        <div>
          <label className="block font-medium mb-1">Discount (₹):</label>
          <input
            type="number"
            value={form.discount}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* Summary */}
        <div className="border-t pt-4">
          <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
          <p><strong>Total Tax:</strong> ₹{totalTax.toFixed(2)}</p>
          <p><strong>Discount:</strong> ₹{form.discount}</p>
          <p className="text-lg font-bold mt-2">Total Bill: ₹{total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Bill
        </button>
      </form>
    </section>
  );
}
