import React, { useState, useMemo } from "react";
import data from "../../shared/DataStore/Admin/pharmacyData.json";

const ITEMS_PER_PAGE = 10;

export default function PharmacyTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Filter data by drugName or expiryDate
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const term = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.drugName.toLowerCase().includes(term) ||
        item.expiryDate.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Pagination logic
  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  // Change page handler
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > pageCount) return;
    setPage(pageNum);
  };

  return (
    <div className="p-4 bg-white rounded shadow overflow-x-auto">
      <div className="flex items-center justify-between">

      <h2 className="text-xl font-semibold mb-4 text-[var(--clr-lemon)]">
        Pharmacy Inventory
      </h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Drug Name or Expiry Date (YYYY-MM-DD)"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1); // Reset page on new search
        }}
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
      />
      </div>

      <table className="min-w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Drug ID</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Form</th>
            <th className="border px-3 py-2">Strength</th>
            <th className="border px-3 py-2">Route</th>
            <th className="border px-3 py-2">Batch #</th>
            <th className="border px-3 py-2">Expiry</th>
            <th className="border px-3 py-2">Stock</th>
            <th className="border px-3 py-2">Cost Price</th>
            <th className="border px-3 py-2">Selling Price</th>
            <th className="border px-3 py-2">Manufacturer</th>
            <th className="border px-3 py-2">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <tr key={item.drugId} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{item.drugId}</td>
                <td className="border px-3 py-2">{item.drugName}</td>
                <td className="border px-3 py-2">{item.form}</td>
                <td className="border px-3 py-2">{item.strength}</td>
                <td className="border px-3 py-2">{item.route}</td>
                <td className="border px-3 py-2">{item.batchNumber}</td>
                <td className="border px-3 py-2">{item.expiryDate}</td>
                <td className="border px-3 py-2">{item.stockAvailable}</td>
                <td className="border px-3 py-2">₹{item.costPrice}</td>
                <td className="border px-3 py-2">₹{item.sellingPrice}</td>
                <td className="border px-3 py-2">{item.manufacturer}</td>
                <td className="border px-3 py-2">{item.supplier}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center py-4">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(pageCount).keys()].map((i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`px-3 py-1 border rounded ${
                pageNum === page ? "bg-[var(--clr-lemon)] text-white" : ""
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === pageCount}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
