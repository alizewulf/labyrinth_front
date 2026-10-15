import {
  getAppointments,
  getDoctorAppointmentMetrics,
} from "@/entities/appointment";
import { User } from "@/entities/user/user.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getDoctorDashboardData() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  const cookie = `access_token=${accessToken}`;
  let user: User;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: { Cookie: cookie },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      redirect("/login");
    }
    user = (await response.json()) as User;
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }

    redirect("/login");
  }

  if (user.role !== "doctor") {
    redirect("/");
  }

  const [appointments, metrics] = await Promise.all([
    getAppointments(cookie),
    getDoctorAppointmentMetrics(cookie),
  ]);

  return {
    user,
    appointments,
    metrics,
  };
}
