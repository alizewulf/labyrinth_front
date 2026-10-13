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
