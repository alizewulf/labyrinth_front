import { Suspense } from "react";
import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import DoctorSearch from "@/widgets/doctorSearch";
import FilterSidebar from "@/widgets/filterSidebar";
import { FindDoctorProvider, DoctorResults } from "@/features/findDoctor";

export default function FindADoctorPage() {
  return (
    <div className="flex flex-col px-4 py-6 sm:px-8 md:px-16 md:py-10 gap-7 max-w-7xl mx-auto w-full">
      <FormIntroduction
        message={{
          header: "Find the right doctor for you",
          subtitle:
            "Expert care, on your terms. Browse trusted providers near you.",
        }}
      />

      <Suspense fallback={<p className="text-gray-500">Loading doctors...</p>}>
        <FindDoctorProvider>
          <DoctorSearch />
          <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
            <div className="w-full lg:w-72 shrink-0">
              <FilterSidebar />
            </div>
            <div className="flex-1 w-full min-w-0">
              <DoctorResults />
            </div>
          </div>
        </FindDoctorProvider>
      </Suspense>
    </div>
  );
}
