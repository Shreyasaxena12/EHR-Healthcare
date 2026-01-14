import { useState } from "react";
import data from "../../../../shared/DataStore/Lab/lab_inventory.json";
import { FaEdit, FaPlus } from "react-icons/fa";

export default function StockManagement() {
  const [stockItems, setStockItems] = useState(data.labInventory.consumablesAndReagents || []);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const filtered = stockItems.filter((item) =>
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const handleSave = (updatedItem) => {
    const updatedList = editItem
      ? stockItems.map((item) => (item.itemId === updatedItem.itemId ? updatedItem : item))
      : [...stockItems, { ...updatedItem, itemId: `CR-${Date.now()}` }];
    setStockItems(updatedList);
    setShowModal(false);
  };

  // Old-school CSV export function
  const exportToCSV = () => {
    const headers = ["Item Name", "Category", "Quantity", "Unit", "Location", "Expiry Date", "Status"];
    const rows = filtered.map((item) => [
      item.itemName,
      item.category,
      item.quantityInStock,
      item.unit,
      item.location,
      item.expiryDate || "",
      item.status,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.map(escapeCSV).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lab_stock.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Escape CSV values to handle commas, quotes, etc.
  function escapeCSV(value) {
    if (value == null) return "";
    const str = value.toString();
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by item name..."
          className="border px-3 py-1 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Export CSV
          </button>
          <button
            onClick={handleAddNew}
            className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <FaPlus /> Add Item
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[70vh]">
        <table className="min-w-full bg-white shadow border rounded">
          <thead className="bg-gray-100 text-sm text-left">
            <tr>
              <th className="p-2">Item Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Location</th>
              <th className="p-2">Expiry Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.itemId} className="border-t text-sm">
                <td className="p-2">{item.itemName}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.quantityInStock}</td>
                <td className="p-2">{item.unit}</td>
                <td className="p-2">{item.location}</td>
                <td className="p-2">{item.expiryDate || "N/A"}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline"
                    title="Edit Item"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No matching stock items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4 shadow-lg">
            <h2 className="text-xl font-bold mb-2">{editItem ? "Edit Item" : "Add Stock Item"}</h2>
            <StockForm
              initialData={editItem}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function StockForm({ initialData = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    itemName: initialData.itemName || "",
    category: initialData.category || "",
    quantityInStock: initialData.quantityInStock || 0,
    unit: initialData.unit || "pcs",
    location: initialData.location || "",
    expiryDate: initialData.expiryDate || "",
    status: initialData.status || "Available",
    itemId: initialData.itemId || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="space-y-3">
      <input
        name="itemName"
        value={form.itemName}
        onChange={handleChange}
        placeholder="Item Name"
        className="w-full border px-3 py-1 rounded"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border px-3 py-1 rounded"
        required
      />
      <input
        name="quantityInStock"
        type="number"
        value={form.quantityInStock}
        onChange={handleChange}
        placeholder="Quantity"
        className="w-full border px-3 py-1 rounded"
        required
        min={0}
      />
      <input
        name="unit"
        value={form.unit}
        onChange={handleChange}
        placeholder="Unit (e.g., pcs)"
        className="w-full border px-3 py-1 rounded"
        required
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full border px-3 py-1 rounded"
      />
      <input
        name="expiryDate"
        type="date"
        value={form.expiryDate}
        onChange={handleChange}
        placeholder="Expiry Date"
        className="w-full border px-3 py-1 rounded"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border px-3 py-1 rounded"
        required
      >
        <option value="Available">Available</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="bg-gray-300 px-3 py-1 rounded">
          Cancel
        </button>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
          Save
        </button>
      </div>
    </div>
  );
}
