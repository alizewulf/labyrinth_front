import { getSpecialties } from "@/entities/specialities/api/getSpecialities";
import { specialityIcons } from "@/entities/specialities/data/specialties";

export default async function SpecialtiesCatalog() {
  const specialties = await getSpecialties();

  return (
    <section className="font-jakarta flex flex-col gap-7">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {specialties.map((speciality) => {
          const SVG = specialityIcons[speciality.title];

          return (
            <div
              key={speciality.title}
              className="flex flex-col border p-5.5 min-h-34 border-border rounded-xl gap-3.5"
            >
              {SVG && <SVG />}
              <p className="font-bold text-text text-xl">{speciality.title}</p>
              <span className="text-sm text-text-secondary">
                {speciality.doctorsAmount} doctors
              </span>
              <button className="font-semibold text-sm text-text-secondary border border-border py-3 rounded-lg">
                Find {speciality.title} doctors →
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
