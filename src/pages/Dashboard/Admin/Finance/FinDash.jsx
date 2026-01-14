import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevenueTable from "../../../../shared/Tables/RevenueTable";
import RevenueChart from "../../../../shared/Charts/RevenueChart";
import Revenuedata from "../../../../shared/DataStore/Admin/Revenue.json";

export default function FinDash() {
  const [showChart, setShowChart] = useState(true);

  const toggleView = () => setShowChart((prev) => !prev);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {showChart ? "Revenue Chart" : "Revenue Table"}
        </h2>
        <button
          onClick={toggleView}
          className="bg-[var(--clr-lemon)] hover:bg-yellow-500 text-white px-2 py-2 rounded transition duration-300"
        >
          {showChart ? "Show Table" : "Show Chart"}
        </button>
      </div>

      {/* AnimatePresence handles smooth exit/entry */}
      <AnimatePresence mode="wait">
        {showChart ? (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <RevenueChart data={Revenuedata} />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <RevenueTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
