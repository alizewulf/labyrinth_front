"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_ROUTES, PATIENT_ROUTES } from "../config/nav.config";
import { useAppSelector } from "@/store/hooks";
export default function HeaderNavigation() {
  const pathName = usePathname();
  const routeClass: string =
    "text-sm font-jakarta leading-[150%] text-text-secondary select-none cursor-pointer";
  const activeRouteClass: string = "font-bold! text-[#2563EB]!";
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const routes = isAuthenticated ? PATIENT_ROUTES : PUBLIC_ROUTES;
  return (
    <>
      {pathName === "/login" || pathName === "/register" ? (
        ""
      ) : (
        <nav className="hidden md:flex gap-6 lg:gap-8">
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
      )}
    </>
  );
}
