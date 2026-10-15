import { API } from "@/shared/api/axios";
import type {
  DoctorSchedule,
  UpdateDoctorScheduleDto,
} from "../model/doctorSchedule.types";

export async function updateMySchedule(
  data: UpdateDoctorScheduleDto,
): Promise<DoctorSchedule[]> {
  const response = await API.put<DoctorSchedule[]>(
    "/doctor-schedules/me",
    data,
  );

  return response.data;
}