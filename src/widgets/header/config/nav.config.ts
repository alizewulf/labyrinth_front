export interface NavigationConfig {
  route: string;
  label: string;
}

export const PUBLIC_ROUTES: NavigationConfig[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/find-a-doctor",
    label: "Find A Doctor",
  },
  {
    route: "/specialties",
    label: "Specialities",
  },
];

export const PATIENT_ROUTES: NavigationConfig[] = [
  { route: "/", label: "Dashboard" },
  { route: "/book-appointment", label: "Book appointment" },
];

export const DOCTOR_ROUTES: NavigationConfig[] = [
  { route: "/doctor", label: "Dashboard" },
  { route: "/doctor/settings", label: "Settings" },
];

export const ADMIN_ROUTES: NavigationConfig[] = [
  { route: "/admin/doctors", label: "Doctors" },
];
