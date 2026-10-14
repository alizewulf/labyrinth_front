import Link from "next/link";
import HealthIcon from "../icons/Health.Icon";

export default function BrandLogo() {
  return (
    <div className="flex gap-2.5 items-center select-none">
      <Link
        href="/"
        className="cursor-pointer w-full flex gap-2.5 items-center"
      >
        <span className="bg-status-available rounded-lg p-2.5">
          <HealthIcon />
        </span>
        <p className="text-2xl font-extrabold text-text">Labyrinth</p>
      </Link>
    </div>
  );
}
