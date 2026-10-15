import { API } from "@/shared/api/axios";
import type { AdminDoctor } from "../model/doctor.types";

export async function getAdminDoctors(): Promise<AdminDoctor[]> {
  const response = await API.get<AdminDoctor[]>("/admin/doctors");

  return response.data;
}
