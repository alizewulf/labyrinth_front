import { API } from "@/shared/api/axios";

interface CreateDoctorDto {
  email: string;
  password: string;
}

interface CreateDoctorResponse {
  userId: number;
  doctorId: number;
}

export async function createDoctor(
  data: CreateDoctorDto,
): Promise<CreateDoctorResponse> {
  const response = await API.post<CreateDoctorResponse>("/admin/doctors", data);

  return response.data;
}
