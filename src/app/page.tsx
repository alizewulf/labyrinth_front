import CareCallout from "@/widgets/careCallout";
import DoctorSearch from "@/widgets/doctorSearch";
import FeaturedDoctors from "@/widgets/featuredDoctors";
import HowItWork from "@/widgets/howItWorks";
import Specialities from "@/widgets/specialities/ui/Specialities";

export default function Home() {
  return (
    <div className="flex flex-col py-12 px-16 gap-12">
      <DoctorSearch />
      <Specialities />
      <FeaturedDoctors />
      <HowItWork />
      <CareCallout />
    </div>
  );
}
