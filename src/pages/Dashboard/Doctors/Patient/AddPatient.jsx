import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddPatient() {
  const [photoPreview, setPhotoPreview] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      admissionDate: "",
      photo: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      age: Yup.number().min(0, "Invalid age").required("Required"),
      gender: Yup.string().required("Required"),
      phone: Yup.string().matches(/^\+91\d{10}$/, "Enter valid +91 phone").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      address: Yup.string().required("Required"),
      admissionDate: Yup.string().required("Required"),
      photo: Yup.string().url("Invalid URL"),
    }),
    onSubmit: (values) => {
      console.log("New Patient:", values);
      alert("Patient added successfully!");
    },
  });

  const handlePhotoChange = (e) => {
    formik.handleChange(e);
    setPhotoPreview(e.target.value);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-[var(--clr-lemon)] mb-4">Add New Patient</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="w-full border px-4 py-2 rounded outline-none"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="w-full border px-4 py-2 rounded outline-none"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
            )}
          </div>

          <div>
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              className="w-full border px-4 py-2 rounded outline-none"
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-500 text-sm">{formik.errors.age}</p>
            )}
          </div>

          <div>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              className="w-full border px-4 py-2 rounded outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone (+91...)"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full border px-4 py-2 rounded outline-none"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full border px-4 py-2 rounded outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="admissionDate"
              type="date"
              value={formik.values.admissionDate}
              onChange={formik.handleChange}
              className="w-full border px-4 py-2 rounded outline-none"
            />
            {formik.touched.admissionDate && formik.errors.admissionDate && (
              <p className="text-red-500 text-sm">{formik.errors.admissionDate}</p>
            )}
          </div>

          <div>
            <input
              name="photo"
              placeholder="Photo URL"
              value={formik.values.photo}
              onChange={handlePhotoChange}
              className="w-full border px-4 py-2 rounded outline-none"
            />
            {formik.touched.photo && formik.errors.photo && (
              <p className="text-red-500 text-sm">{formik.errors.photo}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <textarea
            name="address"
            rows="3"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="w-full border px-4 py-2 rounded outline-none"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}
        </div>

        {/* Photo Preview */}
        {photoPreview && (
          <div className="flex justify-center">
            <img
              src={photoPreview}
              alt="Patient Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-[var(--clr-lemon)] text-white px-6 py-2 rounded"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
}
