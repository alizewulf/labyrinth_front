import { API } from "@/shared/api/axios";

export interface AvailableSlot {
  startTime: string;
  endTime: string;
}

export async function getAvailableSlots(
  doctorId: number,
  date: string,
): Promise<AvailableSlot[]> {
  const response = await API.get<AvailableSlot[]>(
    `/doctor-schedules/${doctorId}/available`,
    {
      params: { date },
    },
  );

  return response.data;
}
