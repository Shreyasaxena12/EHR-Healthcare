import { useState } from "react";
import data from "../../../../shared/DataStore/Lab/lab_inventory.json";

export default function LabEquipment() {
  const initialData = data?.labInventory?.equipment || [];

  const [inventory, setInventory] = useState(initialData);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredInventory = inventory.filter((item) =>
    item.equipmentName.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (item) => {
    setSelected(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelected(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setInventory((prev) =>
      prev.filter((equip) => equip.equipmentId !== selected.equipmentId)
    );
    setIsDeleteModalOpen(false);
    setSelected(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setInventory((prev) =>
      prev.map((item) =>
        item.equipmentId === selected.equipmentId ? selected : item
      )
    );
    setIsEditModalOpen(false);
    setSelected(null);
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Lab Equipment Inventory</h2>

      <input
        type="text"
        placeholder="Search Equipment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 border border-gray-300 rounded w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.equipmentId}>
                <td className="border p-2">{item.equipmentName}</td>
                <td className="border p-2">{item.model}</td>
                <td className="border p-2">{item.quantityAvailable}</td>
                <td className="border p-2">{item.location}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
          >
            <h3 className="text-lg font-bold mb-4">Edit Equipment</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={selected.equipmentName}
                onChange={(e) =>
                  setSelected({ ...selected, equipmentName: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Equipment Name"
              />
              <input
                type="text"
                value={selected.model}
                onChange={(e) =>
                  setSelected({ ...selected, model: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Model"
              />
              <input
                type="number"
                value={selected.quantityAvailable}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    quantityAvailable: parseInt(e.target.value),
                  })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Quantity"
              />
              <input
                type="text"
                value={selected.location}
                onChange={(e) =>
                  setSelected({ ...selected, location: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Location"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{selected?.equipmentName}</strong>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
