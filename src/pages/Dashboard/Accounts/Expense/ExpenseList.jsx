import React, { useState, useMemo } from "react";
import data from "../../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";

export default function ExpenseList() {
  const expenses = data.expenses;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Get unique categories for the filter dropdown
  const categories = useMemo(() => {
    const cats = expenses.map(exp => exp.category);
    return [...new Set(cats)].sort();
  }, [expenses]);

  // Filter and search expenses
  const filteredExpenses = useMemo(() => {
    return expenses.filter(({ category, description }) => {
      const matchesCategory = filterCategory ? category === filterCategory : true;
      const matchesSearch =
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [expenses, searchTerm, filterCategory]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Expense List</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by description or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 sm:mb-0 px-3 py-2 border rounded-md flex-grow"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Expense Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No expenses found.</p>
        ) : (
          filteredExpenses.map(({ expenseId, amount, category, date, description }) => (
            <div
              key={expenseId}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">{category}</span>
                <span className="text-gray-600 text-sm">
                  {new Date(date).toLocaleDateString()}
                </span>
              </div>
              <p className="mb-3 text-gray-700">{description}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Expense ID: {expenseId}</span>
                <span className="font-semibold text-red-600">₹{amount.toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
