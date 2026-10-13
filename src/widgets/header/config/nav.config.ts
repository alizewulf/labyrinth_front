interface NavigationConfig {
  route: string;
  label: string;
}

export const ROUTES: NavigationConfig[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/find-a-doctor",
    label: "Find A Doctor",
  },
  {
    route: "/specialities",
    label: "Specialities",
  },
];
