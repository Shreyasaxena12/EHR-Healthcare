import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserTable from "../../../../shared/Tables/UserTable";
import UserChart from "../../../../shared/Charts/UserChart";

export default function UserDash() {
  const [showChart, setShowChart] = useState(false);

  const handleToggle = () => {
    setShowChart((prev) => !prev);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[var(--clr-lemon)]">
          {showChart ? "User Table" : "User Chart"}
        </h2>
        <button
          onClick={handleToggle}
          className="bg-[var(--clr-lemon)] text-black font-semibold px-4 py-2 rounded shadow hover:brightness-90 transition"
        >
          {showChart ? "Show Chart" : "Show Table"}
        </button>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        {showChart ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <UserTable />
          </motion.div>
        ) : (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <UserChart />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
