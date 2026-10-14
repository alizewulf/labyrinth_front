import HomePage from "@/pages/guestPage";
import PatientPage from "@/pages/patientPage";
import getHomeData from "@/shared/lib/getHomeData";

export default async function Home() {
  const data = await getHomeData();

  if (data.type === "guest") {
    return <HomePage />;
  }

  return (
    <PatientPage appointments={data.appointments} metrics={data.metrics} />
  );
}
