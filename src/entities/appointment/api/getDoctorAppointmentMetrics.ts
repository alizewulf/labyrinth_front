import { API } from "@/shared/api/axios";
import type { AppointmentMetrics } from "../model/appointment.types";

export async function getDoctorAppointmentMetrics(
  cookie?: string,
): Promise<AppointmentMetrics> {
  const response = await API.get<AppointmentMetrics>(
    "/appointments/doctor/metrics",
    {
      headers: cookie ? { Cookie: cookie } : undefined,
    },
  );

  return response.data;
}
