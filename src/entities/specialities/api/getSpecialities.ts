import { API } from "@/shared/api/axios";
import { Speciality } from "../model/speciality.types";

export async function getSpecialties(): Promise<Speciality[]> {
  const response = await API.get("/specialities");
  return response.data;
}
