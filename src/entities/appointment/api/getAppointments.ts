import { API } from "@/shared/api/axios";
import type { Appointment } from "../model/appointment.types";

export async function getAppointments(): Promise<Appointment[]> {
  const response = await API.get<Appointment[]>("/appointments");

  return response.data;
}
