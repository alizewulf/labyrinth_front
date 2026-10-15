export interface Doctor {
  id: number;
  user_id: number;
  name: string;
  surname: string;
  specialization: string;
  experience_type: "month" | "year";
  experience: number;
  avatar_url: string | null;
  city: string | null;
}

export interface AdminDoctor {
  doctor_id: number;
  user_id: number;
  email: string;
  name: string | null;
  surname: string | null;
  city: string | null;
  specialization: string | null;
  experience_type: "month" | "year" | null;
  experience: number | null;
  created_at: string;
  profile_completed: boolean;
}
