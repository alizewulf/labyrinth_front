import { getSpecialties } from "@/entities/specialities/api/getSpecialities";
import { specialityIcons } from "@/entities/specialities/data/specialties";
import Link from "next/link";

async function Specialties() {
  const specialties = await getSpecialties();

  return (
    <section className="font-jakarta flex flex-col gap-7">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-bold text-3xl text-text">
            Care for every part of you
          </h3>
          <p className="text-text-secondary font-jakarta text-sm">
            Explore our specialties and find the expertise you need.
          </p>
        </div>

        <Link
          href="/specialties"
          className="font-jakarta font-bold text-[#2563EB]"
        >
          All specialties →
        </Link>
      </div>

      <div className="flex justify-between">
        {specialties.slice(0, 5).map((speciality) => {
          const SVG = specialityIcons[speciality.title];

          return (
            <div
              key={speciality.title}
              className="flex flex-col border p-5.5 w-51.25 h-34 border-border rounded-xl gap-3"
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
