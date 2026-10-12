"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavigation() {
  const mock_routes: string[] = ["Find A Doctor", "Specialities", "About us"];
  const pathName = usePathname();
  const routeClass: string =
    "text-sm font-jakarta leading-[150%] text-text-secondary select-none cursor-pointer";
  const activeRouteClass: string = "font-bold! text-[#2563EB]!";
  return (
    <nav className="flex gap-8">
      <Link
        href="/"
        className={`${routeClass} ${pathName === "/" ? activeRouteClass : ""}`}
      >
        Home
      </Link>
      {mock_routes.map((route) => (
        <a key={route} className={`${routeClass}`}>
          {route}
        </a>
      ))}
    </nav>
  );
}
