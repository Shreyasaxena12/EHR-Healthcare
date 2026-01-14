import { useState } from "react";
import * as XLSX from "xlsx";
import data from "../../../../shared/DataStore/Lab/finance.json";

export default function LabInvoices() {
  const invoices = data?.labBillingRecords || [];

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = invoices.filter((invoice) => {
    const matchesName = invoice.patient.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const invoiceDate = new Date(invoice.billingDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesDate =
      (!from || invoiceDate >= from) && (!to || invoiceDate <= to);

    return matchesName && matchesDate;
  });

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 text-xs font-semibold rounded-full";
    if (status === "Paid") return `${base} bg-green-100 text-green-800`;
    if (status === "Unpaid") return `${base} bg-yellow-100 text-yellow-800`;
    return `${base} bg-red-100 text-red-800`; // Pending
  };

  const exportToExcel = () => {
    const exportData = filtered.map((inv) => ({
      BillingID: inv.billingId,
      Patient: inv.patient.name,
      TotalAmount: inv.grandTotal,
      PaymentStatus: inv.payment.status,
      PaymentMethod: inv.payment.paymentMethod || "N/A",
      BillingDate: new Date(inv.billingDate).toLocaleString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
    XLSX.writeFile(workbook, "LabInvoices.xlsx");
  };

  const printInvoice = (invoice) => {
    const printable = `
      <h2>Invoice: ${invoice.billingId}</h2>
      <p><strong>Patient:</strong> ${invoice.patient.name}</p>
      <p><strong>Date:</strong> ${new Date(invoice.billingDate).toLocaleString()}</p>
      <p><strong>Status:</strong> ${invoice.payment.status}</p>
      <ul>
        ${invoice.tests
          .map(
            (test) =>
              `<li>${test.testName} - ₹${test.finalAmount.toFixed(2)}</li>`
          )
          .join("")}
      </ul>
      <p><strong>Grand Total:</strong> ₹${invoice.grandTotal.toFixed(2)}</p>
    `;
    const w = window.open("", "_blank");
    w.document.write(printable);
    w.document.close();
    w.print();
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Lab Invoices</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by patient name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/3"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
        />

        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Export to Excel
        </button>
      </div>

      {/* Invoices */}
      {filtered.length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((invoice) => (
            <div
              key={invoice.billingId}
              className="border rounded-lg p-4 shadow hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{invoice.patient.name}</h3>
                  <p className="text-sm text-gray-600">
                    Billing ID: {invoice.billingId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(invoice.billingDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <span className={getStatusBadge(invoice.payment.status)}>
                    {invoice.payment.status}
                  </span>
                  <button
                    onClick={() => printInvoice(invoice)}
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    Print
                  </button>
                  <a
                    href={invoice.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    Download
                  </a>
                </div>
              </div>

              <div className="mb-2">
                <p className="font-medium">Tests:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {invoice.tests.map((test) => (
                    <li key={test.testId}>
                      {test.testName} - ₹{test.finalAmount.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-right">
                Total: ₹{invoice.grandTotal.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
