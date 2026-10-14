import { Suspense } from "react";
import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import DoctorSearch from "@/widgets/doctorSearch";
import FilterSidebar from "@/widgets/filterSidebar";
import { FindDoctorProvider, DoctorResults } from "@/features/findDoctor";

export default function FindADoctorPage() {
  return (
    <div className="flex flex-col px-16 py-10 gap-7">
      <FormIntroduction
        text={{
          header: "Find the right doctor for you",
          subtitle:
            "Expert care, on your terms. Browse trusted providers near you.",
        }}
      />

      <Suspense fallback={<p>Loading doctors...</p>}>
        <FindDoctorProvider>
          <DoctorSearch />
          <div className="flex items-start gap-6">
            <FilterSidebar />
            <DoctorResults />
          </div>
        </FindDoctorProvider>
      </Suspense>
    </div>
  );
}
