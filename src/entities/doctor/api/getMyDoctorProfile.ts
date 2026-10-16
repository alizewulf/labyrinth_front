
import { API } from "@/shared/api/axios";
import type { MyDoctorProfile } from "../model/doctor.types";

export async function getMyDoctorProfile(): Promise<MyDoctorProfile> {
  const response = await API.get<MyDoctorProfile>("/doctors/me");

  return response.data;
}
