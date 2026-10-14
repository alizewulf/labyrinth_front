import { cookies } from "next/headers";
import { getAppointments, getAppointmentMetrics } from "@/entities/appointment";

export default async function getHomeData() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return { type: "guest" as const };
  }

  const cookie = `access_token=${accessToken}`;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: {
          Cookie: cookie,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { type: "guest" as const };
    }
  } catch (error) {
    console.error("Failed to verify session:", error);
    return { type: "guest" as const };
  }

  try {
    const [appointments, metrics] = await Promise.all([
      getAppointments(cookie),
      getAppointmentMetrics(cookie),
    ]);

    return {
      type: "patient" as const,
      appointments,
      metrics,
    };
  } catch (error) {
    console.error("Failed to load patient data:", error);

    return {
      type: "patient" as const,
      appointments: [],
      metrics: {
        upcoming: 0,
        pending: 0,
        completed: 0,
      },
    };
  }
}
