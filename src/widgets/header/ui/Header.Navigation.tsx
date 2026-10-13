"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_ROUTES } from "../config/nav.config";

export default function HeaderNavigation() {
  const pathName = usePathname();
  const routeClass: string =
    "text-sm font-jakarta leading-[150%] text-text-secondary select-none cursor-pointer";
  const activeRouteClass: string = "font-bold! text-[#2563EB]!";

  return (
    <>
      {pathName === "/login" || pathName === "/register" ? (
        ""
      ) : (
        <nav className="flex gap-8">
          {PUBLIC_ROUTES.map((route) => (
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
