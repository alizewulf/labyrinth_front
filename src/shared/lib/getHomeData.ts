import { cookies } from "next/headers";
import {
  getAppointments,
  getAppointmentMetrics,
  getDoctorAppointmentMetrics,
} from "@/entities/appointment";
import type { User } from "@/entities/user/user.types";

export default async function getHomeData() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return { type: "guest" as const };
  }

  const cookie = `access_token=${accessToken}`;

  let user: User;

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

    user = (await response.json()) as User;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return { type: "guest" as const };
  }

  if (user.role === "doctor") {
    try {
      const [appointments, metrics] = await Promise.all([
        getAppointments(cookie),
        getDoctorAppointmentMetrics(cookie),
      ]);

      return {
        type: "doctor" as const,
        user,
        appointments,
        metrics,
      };
    } catch (error) {
      console.error("Failed to load doctor data:", error);

      return {
        type: "doctor" as const,
        user,
        appointments: [],
        metrics: {
          upcoming: 0,
          pending: 0,
          completed: 0,
        },
      };
    }
  }

  if (user.role === "admin") {
    return { type: "admin" as const };
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