"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_ROUTES, PATIENT_ROUTES, DOCTOR_ROUTES, ADMIN_ROUTES } from "../config/nav.config";
import { useAppSelector } from "@/store/hooks";

export default function HeaderNavigation() {
  const pathName = usePathname();
  const routeClass: string =
    "text-sm font-jakarta leading-[150%] text-text-secondary select-none cursor-pointer hover:text-text-primary transition-colors";
  const activeRouteClass: string = "font-bold! text-[#2563EB]!";
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const getRoutes = () => {
    if (!isAuthenticated) return PUBLIC_ROUTES;
    if (user?.role === "doctor") return DOCTOR_ROUTES;
    if (user?.role === "admin") return ADMIN_ROUTES;
    return PATIENT_ROUTES;
  };

  const routes = getRoutes();

  if (pathName === "/login" || pathName === "/register") {
    return null;
  }

  return (
    <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
      {routes.map((route) => (
        <Link
          key={route.label}
          href={`${route.route}`}
          className={`${routeClass} ${pathName === route.route ? activeRouteClass : ""}`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
