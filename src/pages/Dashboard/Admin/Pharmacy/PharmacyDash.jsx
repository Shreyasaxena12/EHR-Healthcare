import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PharmacyTable from "../../../../shared/Tables/PharmacyTable";
import PharmacyChart from "../../../../shared/Charts/PharmacyChart";

export default function PharmacyDash() {
  const [showChart, setShowChart] = useState(false);

  const handleToggle = () => {
    setShowChart((prev) => !prev);
  };

  return (
    <div className="p-2">
        <div className="flex items-center justify-between">

      <h1 className="text-2xl font-semibold mb-4 text-[var(--clr-lemon)]">
        Pharmacy Dashboard
      </h1>
      <button
        onClick={handleToggle}
        className="mb-6 px-4 py-2 bg-[var(--clr-lemon)] text-white rounded hover:bg-yellow-500 transition"
      >
        {showChart ? "Show Table" : "Show Chart"}
      </button>
        </div>
      


      <AnimatePresence mode="wait">
        {showChart ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <PharmacyChart />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <PharmacyTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
