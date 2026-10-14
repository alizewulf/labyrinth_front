export const DEFAULT_DOCTOR_FILTERS: DoctorFilters = {
  specialty: "",
  visitType: ["in-person"],
  availability: "7",
  experience: "",
  rating: "4",
  minFee: 50,
  maxFee: 250,
};
export interface DoctorFilters {
  specialty: string;
  visitType: string[];
  availability: string;
  experience: string;
  rating: string;
  minFee: number;
  maxFee: number;
}
