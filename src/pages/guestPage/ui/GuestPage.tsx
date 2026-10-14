import CareCallout from "@/shared/widgets/careCallout";
import Hero from "@/shared/widgets/hero";
import FeaturedDoctors from "@/widgets/featuredDoctors";
import HowItWork from "@/widgets/howItWorks";
import Specialties from "@/widgets/specialties/ui/Specialties";

export default function GuestPage() {
  return (
    <div className="flex flex-col py-12 px-16 gap-12">
      <Hero />
      <Specialties />
      <FeaturedDoctors />
      <HowItWork />
      <CareCallout
        message={{
          header: "The next step toward feeling better",
          subtitle:
            "Create your free account and keep all your care in one place",
        }}
        link={{
          showArrow: true,
          textContent: "Get started today",
          href: "/register",
        }}
      />
    </div>
  );
}
