import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LabsTable from "../../../../shared/Tables/LabsTable";
import LabsChart from "../../../../shared/Charts/LabsChart";

export default function LabsDash() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="p-4 w-full">
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[var(--clr-lemon)]">Labs Dashboard</h1>
        <button
          onClick={() => setShowChart(prev => !prev)}
          className="bg-[var(--clr-lemon)] hover:brightness-90 text-black font-semibold px-4 py-2 rounded shadow"
        >
          {showChart ? "Show Table" : "Show Chart"}
        </button>
      </div>

      {/* Animated View */}
      <AnimatePresence mode="wait">
        {showChart ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <LabsChart />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <LabsTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
