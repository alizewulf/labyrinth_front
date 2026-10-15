import { getSpecialties } from "@/entities/specialities/api/getSpecialities";
import { specialityIcons } from "@/entities/specialities/data/specialties";
import Link from "next/link";

async function Specialties() {
  const specialties = await getSpecialties();

  return (
    <section className="font-jakarta flex flex-col gap-6 md:gap-7">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-bold text-2xl sm:text-3xl text-text">
            Care for every part of you
          </h3>
          <p className="text-text-secondary font-jakarta text-xs sm:text-sm">
            Explore our specialties and find the expertise you need.
          </p>
        </div>

        <Link
          href="/specialties"
          className="font-jakarta font-bold text-sm sm:text-base text-[#2563EB] hover:underline"
        >
          All specialties →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {specialties.slice(0, 5).map((speciality) => {
          const SVG = specialityIcons[speciality.title];

          return (
            <div
              key={speciality.title}
              className="flex flex-col border p-4 sm:p-5.5 w-full min-h-34 border-border rounded-xl gap-2.5 sm:gap-3 hover:border-primary/50 transition-colors"
            >
              {SVG && <SVG />}

              <p className="font-bold text-text text-sm">{speciality.title}</p>

              <span className="text-xs text-text-secondary">
                {speciality.doctorsAmount} Doctors
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Specialties;
