import AuthActions from "./actions/AuthActions";
import HeaderNavigation from "./Header.Navigation";
import MobileMenu from "./MobileMenu";
import BrandLogo from "@/shared/widgets/logo/ui/BrandLogo";

export default function Header() {
  return (
    <header className="relative flex justify-between items-center font-jakarta! py-4 px-4 sm:px-8 md:py-5.25 md:px-16 w-full bg-white border-b border-gray-100">
      <BrandLogo />

      <HeaderNavigation />

      <div className="flex items-center gap-3">
        <AuthActions />
        <MobileMenu />
      </div>
    </header>
  );
}
