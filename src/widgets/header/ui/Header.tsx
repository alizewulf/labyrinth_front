import Link from "next/link";
import HealthIcon from "../icons/Health.Icon";

const mock_routes: string[] = [
  "Home",
  "Find A Doctor",
  "Specialities",
  "About us",
];

export default function Header() {
  return (
    <header className="flex justify-between items-center font-jakarta! py-5.25 px-16">
      <div className="flex gap-2.5 items-center">
        <span className="bg-status-available rounded-lg p-2.5"><HealthIcon/></span>
        <p className="text-2xl font-extrabold text-text">Labyrinth</p>
      </div>

      <div className="flex gap-8">
        {mock_routes.map((route) => (
          <a
            key={route}
            className="text-sm font-jakarta leading-[150%] text-text-secondary select-none cursor-pointer"
          >
            {route}
          </a>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <Link
          href="/login"
          className="text-text-secondary cursor-pointer select-none"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="py-2.75 px-4.5 bg-status-available text-sm font-semibold font-jakarta text-white rounded-lg"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
