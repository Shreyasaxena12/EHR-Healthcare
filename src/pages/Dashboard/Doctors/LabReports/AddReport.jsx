import React, { useState } from "react";

export default function AddReport() {
  const [formData, setFormData] = useState({
    labTestId: "",
    patientId: "",
    doctorId: "D1001",
    testName: "",
    testCode: "",
    testType: "",
    method: "",
    specimenType: "",
    sampleCollectedAt: "",
    sampleReceivedAt: "",
    reportDate: "",
    labName: "",
    labAddress: "",
    technicianId: "",
    technicianName: "",
    status: "Pending",
    resultSummary: "",
    results: [
      { parameter: "", value: "", unit: "", referenceRange: "", flag: "" }
    ],
    attachmentName: "",
    attachmentUrl: "",
    billingAmount: "",
    paymentMethod: "",
    transactionId: "",
    comments: "",
    followUpRequired: false,
    retestScheduled: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleResultChange = (index, e) => {
    const { name, value } = e.target;
    const updatedResults = [...formData.results];
    updatedResults[index][name] = value;
    setFormData({ ...formData, results: updatedResults });
  };

  const addResult = () => {
    setFormData({
      ...formData,
      results: [
        ...formData.results,
        { parameter: "", value: "", unit: "", referenceRange: "", flag: "" }
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.labTestId || !formData.testName || !formData.patientId) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Submitted Report Data:", formData);
    alert("Report Submitted!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Add Patient Report</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <input name="labTestId" placeholder="Lab Test ID" onChange={handleChange} value={formData.labTestId} className="input" />
          <input name="patientId" placeholder="Patient ID" onChange={handleChange} value={formData.patientId} className="input" />
          <input name="testName" placeholder="Test Name" onChange={handleChange} value={formData.testName} className="input" />
          <input name="testCode" placeholder="Test Code" onChange={handleChange} value={formData.testCode} className="input" />
          <input name="testType" placeholder="Test Type" onChange={handleChange} value={formData.testType} className="input" />
          <input name="method" placeholder="Method Used" onChange={handleChange} value={formData.method} className="input" />
          <input name="specimenType" placeholder="Specimen Type" onChange={handleChange} value={formData.specimenType} className="input" />
          <input name="sampleCollectedAt" type="datetime-local" onChange={handleChange} value={formData.sampleCollectedAt} className="input" />
          <input name="sampleReceivedAt" type="datetime-local" onChange={handleChange} value={formData.sampleReceivedAt} className="input" />
          <input name="reportDate" type="datetime-local" onChange={handleChange} value={formData.reportDate} className="input" />
        </div>

        {/* Lab Details */}
        <div className="grid grid-cols-2 gap-4">
          <input name="labName" placeholder="Lab Name" onChange={handleChange} value={formData.labName} className="input" />
          <input name="labAddress" placeholder="Lab Address" onChange={handleChange} value={formData.labAddress} className="input" />
          <input name="technicianId" placeholder="Technician ID" onChange={handleChange} value={formData.technicianId} className="input" />
          <input name="technicianName" placeholder="Technician Name" onChange={handleChange} value={formData.technicianName} className="input" />
        </div>

        {/* Result Summary */}
        <textarea name="resultSummary" placeholder="Result Summary" onChange={handleChange} value={formData.resultSummary} className="textarea" />

        {/* Results Section */}
        <div>
          <h3 className="font-semibold mb-2">Results</h3>
          {formData.results.map((res, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 mb-2">
              <input placeholder="Parameter" name="parameter" value={res.parameter} onChange={(e) => handleResultChange(index, e)} className="input" />
              <input placeholder="Value" name="value" value={res.value} onChange={(e) => handleResultChange(index, e)} className="input" />
              <input placeholder="Unit" name="unit" value={res.unit} onChange={(e) => handleResultChange(index, e)} className="input" />
              <input placeholder="Reference Range" name="referenceRange" value={res.referenceRange} onChange={(e) => handleResultChange(index, e)} className="input" />
              <input placeholder="Flag" name="flag" value={res.flag} onChange={(e) => handleResultChange(index, e)} className="input" />
            </div>
          ))}
          <button type="button" onClick={addResult} className="text-indigo-600 hover:underline mt-2">+ Add Another</button>
        </div>

        {/* Attachments */}
        <div className="grid grid-cols-2 gap-4">
          <input name="attachmentName" placeholder="File Name" onChange={handleChange} value={formData.attachmentName} className="input" />
          <input name="attachmentUrl" placeholder="Attachment URL" onChange={handleChange} value={formData.attachmentUrl} className="input" />
        </div>
        {formData.attachmentUrl && (
          <p className="text-sm mt-2">Preview: <a href={formData.attachmentUrl} target="_blank" className="text-blue-600 underline">View File</a></p>
        )}

        {/* Billing Info */}
        <div className="grid grid-cols-2 gap-4">
          <input name="billingAmount" type="number" placeholder="Billing Amount" onChange={handleChange} value={formData.billingAmount} className="input" />
          <input name="paymentMethod" placeholder="Payment Method" onChange={handleChange} value={formData.paymentMethod} className="input" />
          <input name="transactionId" placeholder="Transaction ID" onChange={handleChange} value={formData.transactionId} className="input" />
        </div>

        <textarea name="comments" placeholder="Doctor Comments" onChange={handleChange} value={formData.comments} className="textarea" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="followUpRequired" checked={formData.followUpRequired} onChange={handleChange} />
          Follow-up Required
        </label>

        <input name="retestScheduled" type="date" onChange={handleChange} value={formData.retestScheduled} className="input" />

        <button type="submit" className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700">Submit Report</button>
      </form>
    </div>
  );
}
