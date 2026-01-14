import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./pages/auth/AuthContext";
import ProtectedRoute from "./shared/ProtectedRoutes/ProtectedRoute";

import Navbar from "./shared/Navigationbar/Navbar";

// Auth and Unauthorized
import Login from "./pages/auth/Login";
import Unauthorized from "./pages/Unauthorized";

// Layouts
import AdminLayout from "./pages/Dashboard/Admin/Adminlayou";
import DoctorsLayout from "./pages/Dashboard/Doctors/Doctorslayout";
import LabLayout from "./pages/Dashboard/Labs/Labslayout";
import AccountLayout from "./pages/Dashboard/Accounts/AccountsLayout";

// Admin pages
import AdminDashboard from "./pages/Dashboard/Admin/Dashboard";
import UserDash from "./pages/Dashboard/Admin/User/UserDash";
import Alluser from "./pages/Dashboard/Admin/User/Alluser";
import Adduser from "./pages/Dashboard/Admin/User/Adduser";
import LabsDash from "./pages/Dashboard/Admin/Labs/LabsDash";
import LabReport from "./pages/Dashboard/Admin/Labs/LabReports";
import LabsAssistants from "./pages/Dashboard/Admin/Labs/LabsAssistanst";
import FinDash from "./pages/Dashboard/Admin/Finance/FinDash";
import Reports from "./pages/Dashboard/Admin/Finance/Reports";
import PharmacyDash from "./pages/Dashboard/Admin/Pharmacy/PharmacyDash";
import PharmacyInventory from "./pages/Dashboard/Admin/Pharmacy/PharmacyInventry";
import PharmacyIssue from "./pages/Dashboard/Admin/Pharmacy/MedicineIssue";
import WardsDash from "./pages/Dashboard/Admin/Wards/WardsDash";
import RevenueReports from "./pages/Dashboard/Reports/ReportRevenue";
import ReportDash from "./pages/Dashboard/Reports/ReportDash";
import Teamdash from "./pages/Dashboard/Team/TeamDash";
import Teamdoc from "./pages/Dashboard/Team/TeamDoct";
import Teamnurse from "./pages/Dashboard/Team/TeamNurse";
import Teamlabs from "./pages/Dashboard/Team/TeamLabstaff";

// Doctor pages
import DoctorDashboard from "./pages/Dashboard/Doctors/Dashboard";
import DoctorAppoinment from "./pages/Dashboard/Doctors/Appoinments/TodayAppoinment";
import AllApoinment from "./pages/Dashboard/Doctors/Appoinments/AllApoinment";
import CurrentPatientList from "./pages/Dashboard/Doctors/Patient/CurrentPatientList";
import AllPatient from "./pages/Dashboard/Doctors/Patient/AllPatient";
import AddPatient from "./pages/Dashboard/Doctors/Patient/AddPatient";
import DoctLabReports from "./pages/Dashboard/Doctors/LabReports/AllReports";
import AddReport from "./pages/Dashboard/Doctors/LabReports/AddReport";
import AddPriscription from "./pages/Dashboard/Doctors/Prescription/AddPrescription";
import AllPriscription from "./pages/Dashboard/Doctors/Prescription/AllPrescription";
import DoctStats from "./pages/Dashboard/Doctors/Performance/DoctSats";
import PatientFeedback from "./pages/Dashboard/Doctors/Performance/PatientFeedback";

// Labs pages
import LabsDashboard from "./pages/Dashboard/Labs/Dashboard";
import AllReports from "./pages/Dashboard/Labs/Report/AllReport";
import Uploadreport from "./pages/Dashboard/Labs/Report/Uploadreport";
import PendingLabReport from "./pages/Dashboard/Labs/Report/PendingLabReport";
import DoctorRequest from "./pages/Dashboard/Labs/Request/DoctorRequest";
import NurserRequest from "./pages/Dashboard/Labs/Request/NurseRequest";
import LabPayment from "./pages/Dashboard/Labs/Billing/PaymentRecevied";
import LabInvoices from "./pages/Dashboard/Labs/Billing/LabInvoices";
import LabGenerateBill from "./pages/Dashboard/Labs/Billing/GenerateBill";
import AllLabPatient from "./pages/Dashboard/Labs/Patient/AllPatient";
import AddLabPatient from "./pages/Dashboard/Labs/Patient/AddPatient";
import LabPAtientHistory from "./pages/Dashboard/Labs/Patient/PatientHistory";
import LabEquipment from "./pages/Dashboard/Labs/Inventory/LabEquipment";
import StockManagement from "./pages/Dashboard/Labs/Inventory/StockManagement";
import Labmonthly from "./pages/Dashboard/Labs/Performance/MonthlyAnalytics";
import LabTechLog from "./pages/Dashboard/Labs/Performance/TechLogs";

// Accounts page
import AccountsDashboard from "./pages/Dashboard/Accounts/Dashboard";
import Invoices from "./pages/Dashboard/Accounts/Billing/Invoices";
import CreateInvoice from "./pages/Dashboard/Accounts/Billing/CreateInvoice";
import Payment from "./pages/Dashboard/Accounts/Billing/Payment";
import Refunds from "./pages/Dashboard/Accounts/Billing/Refunds";
import ExpenseList from "./pages/Dashboard/Accounts/Expense/ExpenseList";
import AddExpense from "./pages/Dashboard/Accounts/Expense/AddExpense";
import InsuranceClaim from "./pages/Dashboard/Accounts/Insurance/Claim";
import SubmitInsurance from "./pages/Dashboard/Accounts/Insurance/SubmitInsurance";
import InsuranceReport from "./pages/Dashboard/Accounts/Insurance/InsuranceReport";
import Report from "./pages/Dashboard/Accounts/Reports/Reports";
import AccountUser from "./pages/Dashboard/Accounts/User/User"

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  // Hide navbar on login and unauthorized page
  const noNavbarPaths = ["/", "/unauthorized"];
  const hideNavbar = noNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="allusers" element={<Alluser />} />
          <Route path="user-dash" element={<UserDash />} />
          <Route path="add-user" element={<Adduser />} />

          <Route path="labs-dash" element={<LabsDash />} />
          <Route path="labs-report" element={<LabReport />} />
          <Route path="labs-assistants" element={<LabsAssistants />} />

          <Route path="finance-dash" element={<FinDash />} />
          <Route path="finance-reports" element={<Reports />} />

          <Route path="pharmacy-dash" element={<PharmacyDash />} />
          <Route path="pharmacy-inventory" element={<PharmacyInventory />} />
          <Route path="pharmacy-issue" element={<PharmacyIssue />} />

          <Route path="wards-dash" element={<WardsDash />} />

          <Route path="reports-dash" element={<ReportDash />} />
          <Route path="reports-revenue" element={<RevenueReports />} />

          <Route path="team-dash" element={<Teamdash />} />
          <Route path="team-doctor" element={<Teamdoc />} />
          <Route path="team-nurse" element={<Teamnurse />} />
          <Route path="team-lab" element={<Teamlabs />} />
        </Route>

        {/* Doctor */}
        <Route
          path="/doctor-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorsLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppoinment />} />
          <Route path="all-apointments" element={<AllApoinment />} />
          <Route path="current-patient" element={<CurrentPatientList />} />
          <Route path="all-patient" element={<AllPatient />} />
          <Route path="add-patient" element={<AddPatient />} />
          <Route path="reports" element={<DoctLabReports />} />
          <Route path="add-reports" element={<AddReport />} />
          <Route path="all-prescription" element={<AllPriscription />} />
          <Route path="add-prescription" element={<AddPriscription />} />
          <Route path="stats" element={<DoctStats />} />
          <Route path="feedbacks" element={<PatientFeedback />} />
        </Route>

        {/* Labs */}
        <Route
          path="/labs-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["labs"]}>
              <LabLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<LabsDashboard />} />
          <Route path="all-report" element={<AllReports />} />
          <Route path="upload-report" element={<Uploadreport />} />
          <Route path="pending-reports" element={<PendingLabReport />} />
          <Route path="doctor-request" element={<DoctorRequest />} />
          <Route path="nurse-request" element={<NurserRequest />} />
          <Route path="all-patient" element={<AllLabPatient />} />
          <Route path="add-patient" element={<AddLabPatient />} />
          <Route path="patient-history" element={<LabPAtientHistory />} />
          <Route path="invoices" element={<LabInvoices />} />
          <Route path="payments" element={<LabPayment />} />
          <Route path="generate-bill" element={<LabGenerateBill />} />
          <Route path="equipment" element={<LabEquipment />} />
          <Route path="stock" element={<StockManagement />} />
          <Route path="analytics" element={<Labmonthly />} />
          <Route path="technician-logs" element={<LabTechLog />} />
        </Route>

        {/* Accounts */}
        <Route
          path="/accounts-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["accounts"]}>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AccountsDashboard />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/create" element={<CreateInvoice />} />
          <Route path="payments" element={<Payment />} />
          <Route path="refunds" element={<Refunds />} />
          <Route path="expenses" element={<ExpenseList />} />
          <Route path="expenses/add" element={<AddExpense />} />
          <Route path="insurance-claims" element={<InsuranceClaim />} />
          <Route path="insurance-claims/submit" element={<SubmitInsurance />} />
          <Route path="insurance-claims/reports" element={<InsuranceReport />} />
          <Route path="reports" element={<Report/>}/>
          <Route path ="users" element={<AccountUser/>}/>

        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
