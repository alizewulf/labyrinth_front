import { API } from "@/shared/api/axios";
import type { Appointment } from "../model/appointment.types";

interface CreateAppointmentPayload {
  doctorId: number;
  startsAt: string;
}

export async function createAppointment(
  payload: CreateAppointmentPayload,
): Promise<Appointment> {
  const response = await API.post<Appointment>("/appointments", payload);

  return response.data;
}
