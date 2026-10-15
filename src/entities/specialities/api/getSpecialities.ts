import { API } from "@/shared/api/axios";
import { Speciality } from "../model/speciality.types";

export async function getSpecialties(): Promise<Speciality[]> {
  try {
    const response = await API.get("/specialities");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch specialties:", error);
    return [];
  }
}
