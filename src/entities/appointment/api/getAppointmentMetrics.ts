import { API } from "@/shared/api/axios";
import type { AppointmentMetrics } from "../model/appointment.types";

export async function getAppointmentMetrics(
  cookie?: string,
): Promise<AppointmentMetrics> {
  const response = await API.get<AppointmentMetrics>("/appointments/metrics", {
    headers: cookie ? { Cookie: cookie } : undefined,
  });

  return response.data;
}
