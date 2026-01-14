import React, { useState, useMemo } from "react";
import Labsdata from "../../../../shared/DataStore/Admin/LabData.json";
import LabReport from "../../../../shared/TestReports/LabReport";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function LabReports() {
  const [searchType, setSearchType] = useState("");

  // Filter reports by testType based on search
  const filteredReports = useMemo(() => {
    if (!searchType.trim()) return Labsdata;
    return Labsdata.filter(report =>
      report.technician.name.toLowerCase().includes(searchType.toLowerCase())
    );
  }, [searchType]);

  const sliderSettings = {
    dots: false,
    infinite: filteredReports.length > 1,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4 text-[var(--clr-lemon)]">Lab Reports</h1> */}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="w-full border-b-2 border-[var(--clr-lemon)] outline-none px-3 py-2"
        />
      </div>

      {/* Slider / Carousel */}
      {filteredReports.length > 0 ? (
        <Slider {...sliderSettings}>
          {filteredReports.map((report) => (
            <div key={report.labTestId} className="px-2">
              <LabReport reports={[report]} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No reports found.</p>
      )}
    </div>
  );
}
