import { useState } from "react";
import data from "../../../../shared/DataStore/Lab/lab_assistant_analytics.json";

export default function MonthlyAnalytics() {
  const [searchTerm, setSearchTerm] = useState("");

  const assistants = data.performanceAnalytics.filter((assistant) =>
    assistant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lab Assistant Monthly Analytics</h2>

      <input
        type="text"
        placeholder="🔍 Search by name"
        className="p-2 border rounded mb-4 w-full max-w-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {assistants.map((asst) => (
          <div key={asst.assistantId} className="border rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">{asst.name}</h3>
            <p><strong>Department:</strong> {asst.department}</p>
            <p><strong>Samples Handled:</strong> {asst.totalSamplesHandled}</p>
            <p><strong>Avg Time:</strong> {asst.avgSampleProcessingTimeMinutes} mins</p>
            <p><strong>Accuracy:</strong> {asst.accuracyRate}</p>
            <p><strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${asst.status === "Active" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                {asst.status}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Samples</th>
              <th className="border p-2">Accuracy</th>
              <th className="border p-2">Tasks</th>
              <th className="border p-2">Attendance</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {assistants.map((asst) => (
              <tr key={asst.assistantId}>
                <td className="border p-2">{asst.name}</td>
                <td className="border p-2">{asst.totalSamplesHandled}</td>
                <td className="border p-2">{asst.accuracyRate}</td>
                <td className="border p-2">
                  ✅ {asst.completedTasks} / 🕒 {asst.pendingTasks}
                </td>
                <td className="border p-2">
                  {asst.attendance.daysPresent}P / {asst.attendance.daysAbsent}A
                </td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-xs ${asst.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {asst.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
