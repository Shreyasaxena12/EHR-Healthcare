import data from "../../../../shared/DataStore/Doctors/DocProfile.json";

export default function DoctStats() {
  const doctor = data[0]; // assuming single doctor data
  const stats = doctor.monthlyStats;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-2 text-indigo-800">
        Monthly Stats for {doctor.fullName}
      </h2>
      <p className="text-sm text-gray-600 mb-6">Period: {stats.month}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Appointments */}
        <StatCard title="Total Appointments" value={stats.appointmentStats.total} />
        <StatCard title="Completed Appointments" value={stats.appointmentStats.completed} />
        <StatCard title="Cancelled Appointments" value={stats.appointmentStats.cancelled} />
        <StatCard title="No-Shows" value={stats.appointmentStats.noShow} />
        <StatCard title="New Patients" value={stats.appointmentStats.newPatients} />

        {/* Patients */}
        <StatCard title="Unique Patients Seen" value={stats.patientStats.uniqueSeen} />
        <StatCard title="Follow-Ups" value={stats.patientStats.followUps} />
        <StatCard title="Inpatients" value={stats.patientStats.inpatients} />
        <StatCard title="Outpatients" value={stats.patientStats.outpatients} />

        {/* Prescriptions */}
        <StatCard title="Prescriptions Given" value={stats.prescriptionStats.total} />
        <StatCard title="Most Common Diagnosis" value={stats.prescriptionStats.mostCommonDiagnosis} />
        <StatCard title="Avg. Prescriptions per Patient" value={stats.prescriptionStats.averagePrescriptionsPerPatient} />

        {/* Lab */}
        <StatCard title="Tests Ordered" value={stats.labStats.testsOrdered} />
        <StatCard title="Reports Reviewed" value={stats.labStats.reportsReviewed} />
        <StatCard title="Pending Reports" value={stats.labStats.pending} />

        {/* Revenue */}
        <StatCard title="Revenue Generated" value={`₹${stats.revenueStats.total.toLocaleString()}`} />
        <StatCard title="Avg Revenue / Patient" value={`₹${stats.revenueStats.averagePerPatient}`} />

        {/* Time */}
        <StatCard title="Avg. Consultation Time" value={`${stats.timeStats.avgConsultationTimeMins} mins`} />
        <StatCard title="Working Days" value={stats.timeStats.workingDays} />
        <StatCard title="On Leave Days" value={stats.timeStats.onLeaveDays} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-2xl font-semibold text-indigo-700">{value}</p>
    </div>
  );
}
