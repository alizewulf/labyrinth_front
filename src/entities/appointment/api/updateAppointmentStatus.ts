import { API } from "@/shared/api/axios";

interface UpdateAppointmentStatusResponse {
  message?: string;
}

export async function updateAppointmentStatus(
  appointmentId: number,
  status: "accepted" | "rejected",
): Promise<UpdateAppointmentStatusResponse> {
  const response = await API.patch<UpdateAppointmentStatusResponse>(
    `/appointments/${appointmentId}/status`,
    { status },
  );

  return response.data;
}
