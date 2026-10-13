import AuthActions from "./actions/AuthActions";
import HeaderNavigation from "./Header.Navigation";
import BrandLogo from "@/shared/widgets/logo/ui/BrandLogo";

export default function Header() {
  return (
    <header className="flex justify-between items-center font-jakarta! py-5.25 px-16">
      <BrandLogo />

      <HeaderNavigation />

      <AuthActions />
    </header>
  );
}
