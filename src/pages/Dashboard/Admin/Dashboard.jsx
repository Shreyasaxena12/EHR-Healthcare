import React, { useState, useEffect } from "react";
import DoctorData from "../../../shared/DataStore/Admin/Doctors.json";
import NurseData from "../../../shared/DataStore/Admin/Nurse.json";
import UserData from "../../../shared/DataStore/Admin/Users.json";
import LabData from "../../../shared/DataStore/Admin/LabData.json";
import Patientdata from "../../../shared/DataStore/Admin/Patient.json";
import Revenuedata from "../../../shared/DataStore/Admin/Revenue.json";
import RoomsData from "../../../shared/DataStore/Admin/Rooms.json";

import DashCard from "../../../shared/Cards/Dashcard";
import { FaUserDoctor, FaPeopleGroup } from "react-icons/fa6";
import { FaUserNurse, FaHospitalUser } from "react-icons/fa";
import { GiTestTubes, GiMoneyStack } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";

import DoctorsTable from "../../../shared/Tables/DoctorsTable";
import NurseTable from "../../../shared/Tables/NurseTable";
import UserTable from "../../../shared/Tables/UserTable";
import LabsTable from "../../../shared/Tables/LabsTable";
import PatientTable from "../../../shared/Tables/PatientTable";
import RevenueTable from "../../../shared/Tables/RevenueTable";
import RoomsTable from "../../../shared/Tables/RoomsTable";

export default function Dashboard() {
  const [activeTable, setActiveTable] = useState("Doctors");
  const [fadeIn, setFadeIn] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const cardData = [
    {
      icon: <FaUserDoctor />,
      title: "Doctors",
      count: DoctorData.length,
    },
    {
      icon: <FaUserNurse />,
      title: "Nurses",
      count: NurseData.length,
    },
    {
      icon: <FaPeopleGroup />,
      title: "Users",
      count: UserData.length,
    },
    {
      icon: <GiTestTubes />,
      title: "Labs",
      count: LabData.length,
    },
    {
      icon: <FaHospitalUser />,
      title: "Patients",
      count: Patientdata.length,
    },
    {
      icon: <GiMoneyStack />,
      title: "Revenue",
      count: Revenuedata.length,
    },
    {
      icon: <MdBedroomParent />,
      title: "Rooms",
      count: RoomsData.length,
    },
  ];

  // Fade in animation trigger on table change
  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [activeTable]);

  const renderTable = () => {
    switch (activeTable) {
      case "Doctors":
        return <DoctorsTable search={searchValue} />;
      case "Nurses":
        return <NurseTable search={searchValue} />;
      case "Users":
        return <UserTable search={searchValue} />;
      case "Labs":
        return <LabsTable search={searchValue} />;
      case "Patients":
        return <PatientTable search={searchValue} />;
      case "Revenue":
        return <RevenueTable search={searchValue} />;
      case "Rooms":
        return <RoomsTable search={searchValue} />;
      default:
        return <DoctorsTable search={searchValue} />;
    }
  };

  return (
    <div className="p-2 space-y-6">
      {/* Responsive Card Layout */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 min-w-max px-2 py-1">
          {cardData.map((data, index) => (
            <div
              key={index}
              className={`min-w-[160px] cursor-pointer transition-transform hover:scale-105 ${activeTable === data.title ? "ring-1 ring-[color:var(--clr-lemon)] rounded" : ""
                }`}
              onClick={() => {
                setSearchValue("");
                setActiveTable(data.title);
              }}
            >
              <DashCard icon={data.icon} text={data.title} num={data.count} />
            </div>
          ))}
        </div>
      </div>


      <div className="text-[color:var(--clr-lemon)] flex items-center justify-center font-bold text-2xl">{activeTable} Table</div>



      {/* Table with Fade Animation */}
      <div
        className={`transition-opacity duration-500 ease-in-out ${fadeIn ? "opacity-100" : "opacity-0"}`}
      >
        {renderTable()}
      </div>
    </div>
  );
}
