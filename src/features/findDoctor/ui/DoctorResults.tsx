"use client";

import { useMemo } from "react";
import DoctorCard from "@/widgets/featuredDoctors/ui/Doctor.Card";
import { useFindDoctor } from "../model/FindDoctorContext";

export default function DoctorResults() {
  const { doctors, isLoading, error, appliedFilters } = useFindDoctor();

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

  if (isLoading) {
    return (
      <section className="flex-1">
        <p className="text-sm text-text-secondary">Loading doctors...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex-1">
        <p className="text-sm text-red-500">{error}</p>
      </section>
    );
  }

  if (filteredDoctors.length === 0) {
    return (
      <section className="flex-1">
        <p className="text-sm text-text-secondary">
          No doctors found matching your filters.
        </p>
      </section>
    );
  }

  return (
    <section className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}
