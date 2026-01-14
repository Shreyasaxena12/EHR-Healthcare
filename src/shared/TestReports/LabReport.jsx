export default function LabReport({ reports }) {
  if (!reports || reports.length === 0) {
    return <p className="p-6 text-center text-gray-500">No lab reports available.</p>;
  }

  return (
    <div className="space-y-10">
      {reports.map((report, idx) => (
        <div
          key={report.labTestId || idx}
          className="bg-white rounded p-4 shadow-lg space-y-6 text-sm md:text-base"
        >
          {/* Header */}
          <div className=" flex flex-col gap-3 border-b pb-4">
            <h1 className="text-4xl font-bold text-[var(--clr-lemon)]">Lab Test Report</h1>
            <p className="text-gray-600 text-3xl">Name: {report.technician.name}</p>
            <div className="flex items-center gap-3">

              <p className="text-gray-600 border-b-1">Lab Name: {report.labName}</p> -
              <p className="text-gray-600 border-b-1">Lab ID: {report.labId}</p> -

              <p className="text-gray-600 border-b-1">Test ID: {report.labTestId}</p> -
              <p className="text-gray-600 border-b-1">Patient ID: {report.patientId}</p> -
              <p className="text-gray-600 border-b-1">Doctor ID: {report.doctorId}</p>
            </div>

          </div>

          {/* Test Info */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[var(--clr-lemon)]">Test Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <p><strong>Test Name:</strong> {report.testName}</p>
              <p><strong>Test Code:</strong> {report.testCode}</p>
              <p><strong>Type:</strong> {report.testType}</p>
              <p><strong>Method:</strong> {report.method}</p>
              <p><strong>Specimen Type:</strong> {report.specimenType}</p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[var(--clr-lemon)]">Sample Timeline</h2>
            <p><strong>Collected At:</strong> {new Date(report.sampleCollectedAt).toLocaleString()}</p>
            <p><strong>Received At:</strong> {new Date(report.sampleReceivedAt).toLocaleString()}</p>
            <p><strong>Reported On:</strong> {new Date(report.reportDate).toLocaleString()}</p>
          </div>

          {/* Technician and Lab */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[var(--clr-lemon)]">Lab & Technician</h2>
            <p><strong>Lab:</strong> {report.labName}</p>
            <p><strong>Address:</strong> {report.labAddress}</p>
            <p><strong>Technician:</strong> {report.technician.name} (ID: {report.technician.technicianId})</p>
          </div>

          {/* Results Table */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[var(--clr-lemon)]">Test Results</h2>
            <div className="overflow-auto">
              <table className="min-w-full border border-gray-300 text-left">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="border px-4 py-2">Parameter</th>
                    <th className="border px-4 py-2">Value</th>
                    <th className="border px-4 py-2">Unit</th>
                    <th className="border px-4 py-2">Reference Range</th>
                    <th className="border px-4 py-2">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {report.results.map((res, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{res.parameter}</td>
                      <td className="border px-4 py-2">{res.value}</td>
                      <td className="border px-4 py-2">{res.unit}</td>
                      <td className="border px-4 py-2">{res.referenceRange}</td>
                      <td className="border px-4 py-2">{res.flag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary and Comments */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[var(--clr-lemon)]">Summary</h2>
            <p><strong>Status:</strong> {report.status}</p>
            <p><strong>Summary:</strong> {report.resultSummary}</p>
            <p><strong>Comments:</strong> {report.comments}</p>
            <p><strong>Follow-up Required:</strong> {report.followUpRequired ? "Yes" : "No"}</p>
          </div>

          {/* Billing Info */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[var(--clr-lemon)]">Billing Details</h2>
            <p><strong>Amount:</strong> ₹{report.billing.amount} {report.billing.currency}</p>
            <p><strong>Paid:</strong> {report.billing.paid ? "Yes" : "No"}</p>
            <p><strong>Payment Method:</strong> {report.billing.paymentMethod}</p>
            <p><strong>Transaction ID:</strong> {report.billing.transactionId}</p>
          </div>

          {/* Attachment */}
          <div>
            <h2 className="font-semibold text-lg mb-2 text-[var(--clr-lemon)]">Attachments</h2>
            {report.attachments.map((file, i) => (
              <a
                key={i}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                📄 {file.fileName}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
