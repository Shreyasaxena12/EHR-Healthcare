import { useState } from "react";

export default function AddPatient() {
  const labAssistant = localStorage.getItem("ehrUser.role") || "Unknown";

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, gender, email, phone } = formData;
    if (!name || !age || !gender || !email || !phone) {
      setError("All fields are required.");
      return;
    }

    const newPatient = {
      ...formData,
      addedBy: labAssistant,
      createdAt: new Date().toISOString(),
    };

    console.log("Patient Added:", newPatient);

    // Reset form
    setFormData({
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
    });
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add New Patient</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full border p-2 rounded"
          value={formData.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="w-full border p-2 rounded"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* Displaying Lab Assistant Name */}
        <div className="text-sm text-gray-500">
          <strong>Added By:</strong> {labAssistant}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
}
