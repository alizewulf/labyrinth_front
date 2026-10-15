import AuthActions from "./actions/AuthActions";
import HeaderNavigation from "./Header.Navigation";
import BrandLogo from "@/shared/widgets/logo/ui/BrandLogo";

export default function Header() {
  return (
    <header className="flex justify-between items-center font-jakarta! py-4 px-4 sm:px-8 md:py-5.25 md:px-16 w-full">
      <BrandLogo />

      <HeaderNavigation />

      <AuthActions />
    </header>
  );
}
