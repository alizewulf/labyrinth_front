import { API } from "@/shared/api/axios";
import { Doctor } from "../model/doctor.types";

export async function getDoctors(): Promise<Doctor[]> {
  const response = await API.get<Doctor[]>("/doctors");
  return response.data;
}
