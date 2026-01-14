import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Adduser() {
  const formik = useFormik({
    initialValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        maritalStatus: "",
        nationality: "",
        photoUrl: "",
      },
      contactInfo: {
        phone: "",
        email: "",
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
      },
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
        email: "",
      },
      insurance: {
        provider: "",
        policyNumber: "",
        validTill: "",
        coverageDetails: "",
      },
    },
    validationSchema: Yup.object({
      personalInfo: Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        dateOfBirth: Yup.date().required("Date of birth is required"),
        gender: Yup.string().required("Gender is required"),
        bloodGroup: Yup.string().required("Blood group is required"),
        maritalStatus: Yup.string().required("Marital status is required"),
        nationality: Yup.string().required("Nationality is required"),
        photoUrl: Yup.string().url("Invalid URL").required("Photo URL is required"),
      }),
      contactInfo: Yup.object({
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        address: Yup.object({
          street: Yup.string().required("Street is required"),
          city: Yup.string().required("City is required"),
          state: Yup.string().required("State is required"),
          postalCode: Yup.string().required("Postal code is required"),
          country: Yup.string().required("Country is required"),
        }),
      }),
      emergencyContact: Yup.object({
        name: Yup.string().required("Name is required"),
        relationship: Yup.string().required("Relationship is required"),
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
      }),
      insurance: Yup.object({
        provider: Yup.string().required("Provider is required"),
        policyNumber: Yup.string().required("Policy number is required"),
        validTill: Yup.string().required("Valid till date is required"),
        coverageDetails: Yup.string().required("Coverage details are required"),
      }),
    }),
    onSubmit: (values) => {
      console.log("Submitted user:", values);
      alert("User data submitted successfully!");
    },
  });

  const renderInput = (label, namePath, type = "text") => {
    const value = namePath.split(".").reduce((acc, key) => acc[key], formik.values);
    const error =
      namePath.split(".").reduce((acc, key) => acc?.[key], formik.touched) &&
      namePath.split(".").reduce((acc, key) => acc?.[key], formik.errors);

    const handleChange = (e) => {
      const keys = namePath.split(".");
      const lastKey = keys.pop();
      const newValues = { ...formik.values };
      let target = newValues;
      keys.forEach((k) => (target = target[k]));
      target[lastKey] = e.target.value;
      formik.setValues(newValues);
    };

    const handleBlur = () => formik.setFieldTouched(namePath, true);

    return (
      <div className="flex flex-col">
        <label className="text-[var(--clr-lemon)] font-medium mb-1">{label}</label>
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border rounded px-3 py-2"
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--clr-lemon)] mb-8">Add User</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-10">
        {/* PERSONAL INFO */}
        <fieldset className="border rounded p-4">
          <legend className="text-lg font-semibold text-[var(--clr-lemon)] mb-4">Personal Info</legend>
          <div className="grid grid-cols-2 gap-4">
            {renderInput("First Name", "personalInfo.firstName")}
            {renderInput("Last Name", "personalInfo.lastName")}
            {renderInput("Date of Birth", "personalInfo.dateOfBirth", "date")}
            {renderInput("Gender", "personalInfo.gender")}
            {renderInput("Blood Group", "personalInfo.bloodGroup")}
            {renderInput("Marital Status", "personalInfo.maritalStatus")}
            {renderInput("Nationality", "personalInfo.nationality")}
            {renderInput("Photo URL", "personalInfo.photoUrl")}
          </div>
        </fieldset>

        {/* CONTACT INFO */}
        <fieldset className="border rounded p-4">
          <legend className="text-lg font-semibold text-[var(--clr-lemon)] mb-4">Contact Info</legend>
          <div className="grid grid-cols-2 gap-4">
            {renderInput("Phone", "contactInfo.phone")}
            {renderInput("Email", "contactInfo.email")}
            {renderInput("Street", "contactInfo.address.street")}
            {renderInput("City", "contactInfo.address.city")}
            {renderInput("State", "contactInfo.address.state")}
            {renderInput("Postal Code", "contactInfo.address.postalCode")}
            {renderInput("Country", "contactInfo.address.country")}
          </div>
        </fieldset>

        {/* EMERGENCY CONTACT */}
        <fieldset className="border rounded p-4">
          <legend className="text-lg font-semibold text-[var(--clr-lemon)] mb-4">Emergency Contact</legend>
          <div className="grid grid-cols-2 gap-4">
            {renderInput("Name", "emergencyContact.name")}
            {renderInput("Relationship", "emergencyContact.relationship")}
            {renderInput("Phone", "emergencyContact.phone")}
            {renderInput("Email", "emergencyContact.email")}
          </div>
        </fieldset>

        {/* INSURANCE */}
        <fieldset className="border rounded p-4">
          <legend className="text-lg font-semibold text-[var(--clr-lemon)] mb-4">Insurance</legend>
          <div className="grid grid-cols-2 gap-4">
            {renderInput("Provider", "insurance.provider")}
            {renderInput("Policy Number", "insurance.policyNumber")}
            {renderInput("Valid Till", "insurance.validTill", "date")}
            {renderInput("Coverage Details", "insurance.coverageDetails")}
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-[var(--clr-lemon)] hover:brightness-90 px-6 py-2 rounded text-black font-semibold shadow-md"
        >
          Submit User
        </button>
      </form>
    </div>
  );
}
