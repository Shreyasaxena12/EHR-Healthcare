import { useState } from "react";
import { FaUserInjured, FaFileMedical, FaCheckCircle, FaMoneyBillWave, FaChartBar, FaChartLine } from "react-icons/fa";
import DashCard from "../../../shared/Cards/Dashcard";
import Data from "../../../shared/DataStore/Lab/patient_data.json";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function Dashboard() {


  const totalPatients = Data.length;
  const pendingRequests = Data.filter(p => p.requestStatus.status === "Pending").length;
  const approvedRequests = Data.filter(p => p.requestStatus.status === "Approved").length;
  const totalOutstanding = Data.reduce((acc, p) => acc + p.paymentDetails.outstandingAmount, 0);

  const paymentData = Data.map((patient, index) => ({
    name: `P${index + 1}`,
    paid: patient.paymentDetails.paymentHistory.reduce((sum, p) => sum + p.amount, 0),
    due: patient.paymentDetails.outstandingAmount,
  }));

  return (
    <div className="p-2">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashCard
          num={totalPatients}
          text="Total Patients"
          icon={<FaUserInjured />}
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <DashCard
          num={pendingRequests}
          text="Pending Requests"
          icon={<FaFileMedical />}
          bgColor="bg-yellow-100"
          textColor="text-yellow-800"
        />
        <DashCard
          num={approvedRequests}
          text="Approved Requests"
          icon={<FaCheckCircle />}
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <DashCard
          num={`₹${totalOutstanding}`}
          text="Outstanding Amount"
          icon={<FaMoneyBillWave />}
          bgColor="bg-red-100"
          textColor="text-red-800"
        />
      </div>

     

      {/* Charts */}
     
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FaChartBar /> Payment Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="paid" fill="#4ade80" name="Paid" />
                <Bar dataKey="due" fill="#f87171" name="Outstanding" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FaChartLine /> Cumulative Payment Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="paid" stroke="#3b82f6" name="Paid" />
                <Line type="monotone" dataKey="due" stroke="#ef4444" name="Outstanding" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
   
    </div>
  );
}
