export interface DoctorSchedule {
  id: number;
  doctor_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export interface DoctorScheduleEntry {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface UpdateDoctorScheduleDto {
  schedule: DoctorScheduleEntry[];
}