import { API } from "@/shared/api/axios";
import type { AppointmentMetrics } from "../model/appointment.types";

export async function getAppointmentMetrics(): Promise<AppointmentMetrics> {
  const response = await API.get<AppointmentMetrics>("/appointments/metrics");

  return response.data;
}
