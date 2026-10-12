import Image from "next/image";
import type { Doctor } from "@/entities/doctor/model/doctor.types";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="flex font-jakarta flex-col border border-border rounded-xl gap-4 p-5">
      {doctor.avatar_url && (
        <Image
          loading="eager"
          src={doctor.avatar_url}
          width={250}
          height={155}
          className="rounded-xl"
          alt={`${doctor.name} ${doctor.surname}`}
        />
      )}

      <div className="flex flex-col gap-1">
        <p className="font-bold text-text text-lg">
          Dr {doctor.name} {doctor.surname}
        </p>
        <span className="text-secondary text-xs"> {doctor.specialization}</span>
      </div>

      <div className="flex">
        <span className="text-xs text-text-secondary">
          {doctor.experience}{" "}
          {doctor.experience_type === "month" ? "Months" : "Years"} experience
        </span>
      </div>

      <button className="font-semibold py-2.75 text-sm text-text-secondary rounded-lg border border-border">
        View Profile
      </button>
    </div>
  );
}
