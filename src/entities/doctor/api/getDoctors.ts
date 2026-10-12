import { API } from "@/shared/api/axios";
import { Doctor } from "../model/doctor.types";

export async function getDoctors(search?: string): Promise<Doctor[]> {
  const response = await API.get<Doctor[]>("/doctors", {
    params: search?.trim() ? { search: search.trim() } : undefined,
  });
  return response.data;
}
