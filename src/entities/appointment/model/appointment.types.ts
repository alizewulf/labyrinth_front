export type AppointmentStatus =
  "pending" | "accepted" | "rejected" | "completed" | "cancelled";

export interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface AppointmentMetrics {
  upcoming: number;
  pending: number;
  completed: number;
}
