"use client";

import { useEffect, useMemo, useState } from "react";
import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import DoctorSearch from "@/widgets/doctorSearch";
import FilterSidebar from "@/widgets/filterSidebar";
import DoctorCard from "@/widgets/featuredDoctors/ui/Doctor.Card";
import { getDoctors } from "@/entities/doctor/api/getDoctors";
import type { Doctor } from "@/entities/doctor/model/doctor.types";
import { DoctorFilters } from "@/widgets/filterSidebar/ui/FilterSidebar";

export default function FindADoctorPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<DoctorFilters | null>(
    null,
  );

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch {
        setError("Failed to load doctors. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!appliedFilters) return doctors;

    return doctors.filter((doctor) => {
      if (
        appliedFilters.specialty &&
        doctor.specialization.toLowerCase() !==
          appliedFilters.specialty.toLowerCase()
      ) {
        return false;
      }

      if (appliedFilters.experience) {
        const experienceInYears =
          doctor.experience_type === "year"
            ? doctor.experience
            : doctor.experience / 12;

        if (experienceInYears < Number(appliedFilters.experience)) {
          return false;
        }
      }

      return true;
    });
  }, [doctors, appliedFilters]);

  return (
    <div className="flex flex-col px-16 py-10 gap-7">
      <FormIntroduction
        text={{
          header: "Find the right doctor for you",
          subtitle:
            "Expert care, on your terms. Browse trusted providers near you.",
        }}
      />

      <DoctorSearch />

      <div className="flex items-start gap-6">
        <FilterSidebar onApply={setAppliedFilters} />

        <section className="flex-1">
          {isLoading ? (
            <p className="text-sm text-text-secondary">Loading doctors...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : filteredDoctors.length === 0 ? (
            <p className="text-sm text-text-secondary">
              No doctors found matching your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
