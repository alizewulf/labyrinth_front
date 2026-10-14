import type { Doctor } from "@/entities/doctor/model/doctor.types";

interface BookingConfirmationProps {
  doctor: Doctor;
  date: string;
  time: string;
}

export default function BookingConfirmation({
  doctor,
  date,
  time,
}: BookingConfirmationProps) {
  return (
    <section className="flex w-[70%] flex-col gap-4 rounded-xl border border-border p-6">
      <h2 className="text-xl font-bold">Appointment pending</h2>

      <p>
        Your appointment with Dr. {doctor.name} {doctor.surname} pending.
      </p>

      <p>Date: {date}</p>
      <p>Time: {time}</p>
    </section>
  );
}
