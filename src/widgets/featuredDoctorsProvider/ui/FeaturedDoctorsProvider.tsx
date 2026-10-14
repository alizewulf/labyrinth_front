import { getDoctors } from "@/entities/doctor/api/getDoctors";
import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import Image from "next/image";

export default async function FeaturedDoctorsProvider() {
  const doctors = await getDoctors();
  return (
    <section className="flex flex-col gap-7">
      <FormIntroduction
        text={{
          header: "Meet the people behind your care",
          subtitle:
            "Highly rated specialists, selected for their expertise and compassion",
        }}
      />
      <div className="flex justify-between gap-5">
        {doctors.slice(0, 3).map((doctor) => (
          <div
            key={doctor.id}
            className="border border-border rounded-xl flex flex-col gap-3 p-5"
          >
            {doctor.avatar_url && (
              <Image
                src={doctor.avatar_url}
                width={385}
                height={190}
                alt={doctor.name}
                className="rounded-xl"
              />
            )}
            <p className="font-bold text-lg text-text">
              Dr {doctor.name} {doctor.surname}
            </p>
            <span className="text-sm text-text-secondary">{doctor.specialization}</span>
            <button className="rounded-lg border border-border font-semibold text-xs text-text-secondary py-3.5">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
