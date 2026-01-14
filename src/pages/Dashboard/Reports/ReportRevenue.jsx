import React from "react";
import Slider from "react-slick";
import RevenueChart from "../../../shared/Charts/RevenueChart";
import RevenueTable from "../../../shared/Tables/RevenueTable";
import revenueData from "../../../shared/DataStore/Admin/Revenue.json";

export default function ReportRevenue() {
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    arrows: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-2 bg-white rounded shadow">
    

      <Slider {...settings}>
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[var(--clr-lemon)] mb-2">Revenue Chart</h3>
            <RevenueChart data={revenueData} />
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[var(--clr-lemon)] mb-2">Revenue Table</h3>
            <RevenueTable data={revenueData} />
          </div>
        </div>
      </Slider>
    </div>
  );
}
