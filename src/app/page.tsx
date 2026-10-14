import HomePage from "@/pages/guestPage";
import PatientPage from "@/pages/patientPage";
import { cookies } from "next/headers";
import { getAppointments, getAppointmentMetrics } from "@/entities/appointment";
export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return <HomePage />;
  }

  let isAuthenticated = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    isAuthenticated = response.ok;
  } catch (error) {
    console.error("Failed to verify session:", error);
  }

  if (isAuthenticated) {
    try {
      const cookie = `access_token=${accessToken}`;

      const [appointments, metrics] = await Promise.all([
        getAppointments(cookie),
        getAppointmentMetrics(cookie),
      ]);

      return <PatientPage appointments={appointments} metrics={metrics} />;
    } catch (error) {
      console.error("Failed to load patient data:", error);

      return (
        <PatientPage
          appointments={[]}
          metrics={{
            upcoming: 0,
            pending: 0,
            completed: 0,
          }}
        />
      );
    }
  }

  return <HomePage />;
}
