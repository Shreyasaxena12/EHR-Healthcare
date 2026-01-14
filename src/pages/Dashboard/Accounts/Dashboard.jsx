import data from "../../../shared/DataStore/Accounts/ehr_accounts_dashboard_data.json";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaWallet,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6961"];

export default function AccountsDashboard() {
  const {
    claimsStatus,
    expensesOverview,
    insuranceReimbursements,
    outstandingInvoicesCount,
    pendingPayments,
    profitLoss,
    totalRevenue
  } = data.dashboard || {};

  const claimChartData = [
    { name: "Submitted", value: claimsStatus?.submitted || 0 },
    { name: "Approved", value: claimsStatus?.approved || 0 },
    { name: "Pending", value: claimsStatus?.pending || 0 },
    { name: "Rejected", value: claimsStatus?.rejected || 0 }
  ];

  const summaryCards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <FaArrowUp className="text-2xl text-green-600" />,
      bg: "bg-green-100"
    },
    {
      title: "Expenses",
      value: `₹${expensesOverview.toLocaleString()}`,
      icon: <FaArrowDown className="text-2xl text-red-600" />,
      bg: "bg-red-100"
    },
    {
      title: "Profit / Loss",
      value: `₹${profitLoss.toLocaleString()}`,
      icon: (
        <span className={`text-2xl ${profitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
          {profitLoss >= 0 ? <FaArrowUp /> : <FaArrowDown />}
        </span>
      ),
      bg: profitLoss >= 0 ? "bg-green-100" : "bg-red-100"
    },
    {
      title: "Insurance Reimbursement",
      value: `₹${insuranceReimbursements.toLocaleString()}`,
      icon: <FaMoneyBillWave className="text-2xl text-blue-600" />,
      bg: "bg-blue-100"
    },
    {
      title: "Pending Payments",
      value: `₹${pendingPayments.toLocaleString()}`,
      icon: <FaWallet className="text-2xl text-yellow-600" />,
      bg: "bg-yellow-100"
    },
    {
      title: "Outstanding Invoices",
      value: outstandingInvoicesCount,
      icon: <FaFileInvoiceDollar className="text-2xl text-purple-600" />,
      bg: "bg-purple-100"
    }
  ];

  return (
    <div className=" space-y-3">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {summaryCards.map((card, idx) => (
          <div key={idx} className={`p-4 rounded-xl shadow ${card.bg} flex items-center space-x-4`}>
            {card.icon}
            <div>
              <p className="text-sm text-gray-600">{card.title}</p>
              <p className="text-lg font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Claims Status Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Claims Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={claimChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {claimChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
