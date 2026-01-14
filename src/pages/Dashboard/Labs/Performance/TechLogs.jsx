import data from "../../../../shared/DataStore/Lab/lab_assistant_analytics.json";
import { useState } from "react";

export default function TechLog() {
  const [search, setSearch] = useState("");

  const logs = data.logs?.filter((log) =>
    log.name.toLowerCase().includes(search.toLowerCase()) ||
    log.activity.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lab Assistant Technology Log</h2>

      <input
        type="text"
        placeholder="🔍 Search by name or activity"
        className="p-2 border rounded mb-4 w-full max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {logs.length === 0 ? (
        <p className="text-gray-500">No logs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Timestamp</th>
                <th className="border p-2">Assistant</th>
                <th className="border p-2">Activity</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="border p-2">{log.name}</td>
                  <td className="border p-2">{log.activity}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        log.status === "success"
                          ? "bg-green-100 text-green-700"
                          : log.status === "error"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
