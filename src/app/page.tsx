import HomePage from "@/pages/guestPage";
import PatientPage from "@/pages/patientPage";
import DoctorPage from "@/pages/doctorPage";
import getHomeData from "@/shared/lib/getHomeData";
import AdminDoctors from "@/widgets/adminDoctors";

export default async function Home() {
  const data = await getHomeData();

  if (data.type === "guest") {
    return <HomePage />;
  }

  if (data.type === "doctor") {
    return (
      <DoctorPage
        user={data.user}
        appointments={data.appointments}
        metrics={data.metrics}
      />
    );
  }

  if (data.type === "admin") {
    return <AdminDoctors/>
  }

  return (
    <PatientPage
      appointments={data.appointments}
      metrics={data.metrics}
    />
  );
}