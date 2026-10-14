import { API } from "@/shared/api/axios";
import type { Appointment } from "../model/appointment.types";

export async function getAppointments(cookie?: string): Promise<Appointment[]> {
  const response = await API.get<Appointment[]>("/appointments", {
    headers: cookie ? { Cookie: cookie } : undefined,
  });

  return response.data;
}
