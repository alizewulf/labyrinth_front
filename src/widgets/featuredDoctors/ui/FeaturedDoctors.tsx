import { getDoctors } from "@/entities/doctor/api/getDoctors";
import Image from "next/image";

async function FeaturedDoctors() {
  const doctors = await getDoctors();

  return (
    <section className="flex flex-col">
      <div className="flex justify-between font-jakarta">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-bold text-3xl text-text">
            Meet your next doctor
          </h3>
          <span className="text-text-secondary text-sm">
            Highly rated specialists, selected for their expertise and
            compassion.
          </span>
        </div>
        <a href="#" className="font-jakarta font-bold text-[#2563EB]">
          View all doctors →
        </a>
      </div>

      <div className="flex">
        {doctors.map((doctor) => (
          <div className="flex flex-col" key={doctor.id}>
            {doctor.avatar_url && (
              <Image
                src={doctor.avatar_url}
                alt={`${doctor.name} ${doctor.surname}`}
                width={300}
                height={300}
              />
            )}
            <h4>
              {doctor.name} {doctor.surname}
            </h4>
            <span>{doctor.specialization}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedDoctors;
