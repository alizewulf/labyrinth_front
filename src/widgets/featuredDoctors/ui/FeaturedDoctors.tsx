import type { Doctor } from "@/entities/doctor/model/doctor.types";
import DoctorCard from "./Doctor.Card";

async function FeaturedDoctors() {
  const doctors = await getDoctors();

  return (
    <section className="flex flex-col gap-7">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 font-jakarta">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-bold text-2xl sm:text-3xl text-text">
            Meet your next doctor
          </h3>
          <span className="text-text-secondary text-xs sm:text-sm">
            Highly rated specialists, selected for their expertise and
            compassion.
          </span>
        </div>
        <a href="#" className="font-jakarta font-bold text-sm sm:text-base text-[#2563EB] hover:underline">
          View all doctors →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {doctors
          .slice(0, 4)
          .map((doctor: Doctor) => (
            <DoctorCard doctor={doctor} key={doctor.id} />
          ))}
      </div>
    </section>
  );
}

async function getDoctors() {
  const response = await fetch("/api/doctors");
  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  return response.json();
}

export default FeaturedDoctors;
