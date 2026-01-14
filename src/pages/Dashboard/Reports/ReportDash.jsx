import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Slider from "react-slick";

import LabReport from "../../../shared/TestReports/LabReport";
import RevenueReports from "../../../shared/TestReports/RevenueReports";
import RevenueChart from "../../../shared/Charts/RevenueChart";
import LabsChart from "../../../shared/Charts/LabsChart";

import revenueData from "../../../shared/DataStore/Admin/Revenue.json";
import labData from "../../../shared/DataStore/Admin/LabData.json";

export default function ReportDash() {
  const [showCharts, setShowCharts] = useState(false);

  const toggleView = () => setShowCharts(prev => !prev);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[var(--clr-lemon)]">
          {showCharts ? "Charts View" : "Reports View"}
        </h2>
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-[var(--clr-lemon)] text-white rounded shadow transition hover:brightness-110"
        >
          {showCharts ? "Show Reports" : "Show Charts"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showCharts ? (
          <motion.div
            key="charts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Slider {...settings}>
              <div>
                <RevenueChart data={revenueData} />
              </div>
              <div>
                <LabsChart />
              </div>
            </Slider>
          </motion.div>
        ) : (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Slider {...settings}>
              <div>
                <RevenueReports data={revenueData} />
              </div>
              <div>
                <LabReport reports={labData} />
              </div>
            </Slider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
