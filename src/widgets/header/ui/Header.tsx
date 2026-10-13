import Link from "next/link";
import HeaderNavigation from "./Header.Navigation";
import BrandLogo from "@/shared/widgets/logo/ui/BrandLogo";

export default function Header() {
  return (
    <header className="flex justify-between items-center font-jakarta! py-5.25 px-16">
      <BrandLogo />

      <HeaderNavigation />

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
