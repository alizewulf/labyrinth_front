import CareCallout from "@/widgets/careCallout";
import DoctorSearch from "@/widgets/doctorSearch";
import FeaturedDoctors from "@/widgets/featuredDoctors";
import HowItWork from "@/widgets/howItWorks";
import Specialties from "@/widgets/specialties/ui/Specialties";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col py-12 px-16 gap-12">
      <Suspense fallback={<p>Loading search...</p>}>
        <DoctorSearch />
      </Suspense>
      <Specialties />
      <FeaturedDoctors />
      <HowItWork />
      <CareCallout />
    </div>
  );
}
