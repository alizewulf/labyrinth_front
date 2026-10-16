import { API } from "@/shared/api/axios";
import type { DoctorSchedule } from "../model/doctorSchedule.types";

export async function getMySchedule(): Promise<DoctorSchedule[]> {
  const response = await API.get<DoctorSchedule[]>("/doctor-schedules/me");
  return response.data;
}