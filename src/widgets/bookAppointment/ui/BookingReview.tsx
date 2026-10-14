"use client";

import type { Doctor } from "@/entities/doctor/model/doctor.types";

interface BookingReviewProps {
  doctor: Doctor;
  date: string;
  time: string;
  onBack: () => void;
  onConfirm: () => void;
}

export default function BookingReview({
  doctor,
  date,
  time,
  onBack,
  onConfirm,
}: BookingReviewProps) {
  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <section className="flex w-[70%] flex-col gap-6 rounded-xl border border-border p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">Review your appointment</h3>

        <p className="text-sm text-text-secondary">
          Check your appointment details before confirming.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-lg bg-background p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-text-secondary">Doctor</p>
          <p className="font-semibold">
            Dr. {doctor.name} {doctor.surname}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-text-secondary">Date</p>
          <p className="font-semibold">{formattedDate}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-text-secondary">Time</p>
          <p className="font-semibold">{time}</p>
        </div>
      </div>

      <div className="flex justify-between border-t border-border pt-5">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Confirm appointment
        </button>
      </div>
    </section>
  );
}
