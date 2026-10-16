import getDoctorDashboardData from "@/shared/lib/getDoctorDashboardData";
import DoctorPage from "@/pages/doctorPage";

export default async function DoctorDashboard() {
  const { user, appointments, metrics } = await getDoctorDashboardData();

  return (
    <DoctorPage user={user} appointments={appointments} metrics={metrics} />
  );
}
