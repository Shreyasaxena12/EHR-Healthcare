import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoomsTable from "../../../../shared/Tables/RoomsTable";
import WardChart from "../../../../shared/Charts/WardChart";
import data from "../../../../shared/DataStore/Admin/Rooms.json";

export default function WardsDash() {
  const [showChart, setShowChart] = useState(false);

  const toggleView = () => setShowChart(prev => !prev);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-[var(--clr-lemon)]">
          {showChart ? "Ward Statistics" : "Room Table"}
        </h1>
        <button
          onClick={toggleView}
          className="px-4 py-2 rounded bg-[var(--clr-lemon)] text-white transition hover:brightness-110"
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
            <WardChart data={data} />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <RoomsTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
