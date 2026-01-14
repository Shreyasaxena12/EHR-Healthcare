import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import NurseTable from "../../../shared/Tables/NurseTable";
import DoctorTable from "../../../shared/Tables/DoctorsTable";
import LabsTable from "../../../shared/Tables/LabsTable";

const sections = [
  { label: "Doctors", component: DoctorTable },
  { label: "Nurses", component: NurseTable },
  { label: "Labs", component: LabsTable },
];

export default function TeamDash() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const ActiveComponent = sections[activeIndex].component;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4 text-[var(--clr-lemon)]">
        Team Dashboard
      </h1>

      {/* Section Tabs */}
      <div className="flex gap-4 mb-4">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded font-medium transition duration-300 ${
              activeIndex === index
                ? "bg-[var(--clr-lemon)] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${sections[activeIndex].label}...`}
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Animated View Switcher */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <ActiveComponent search={searchTerm} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
