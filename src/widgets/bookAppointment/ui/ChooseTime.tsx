"use client";

import type { Doctor } from "@/entities/doctor/model/doctor.types";
import type { AvailableSlot } from "@/entities/doctorSchedule/api/getAvailableSlots";

interface ChooseTimeProps {
  doctor: Doctor;
  selectedDate: string;
  availableSlots: AvailableSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function ChooseTime({
  doctor,
  selectedDate,
  availableSlots,
  selectedTime,
  onSelectTime,
  onBack,
  onContinue,
}: ChooseTimeProps) {
  const formattedDate = new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <section className="flex w-[70%] flex-col gap-5 rounded-xl border border-border p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">Choose appointment time</h3>

        <p className="text-sm text-text-secondary">
          Select a time for your appointment with Dr. {doctor.name}{" "}
          {doctor.surname}.
        </p>

        <p className="text-sm font-semibold">{formattedDate}</p>
      </div>

      {availableSlots.length === 0 ? (
        <p className="text-sm text-text-secondary">
          No available times for this date. Please go back and choose another
          date.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {availableSlots.map((slot) => {
            const time = slot.startTime.slice(0, 5);
            const isSelected = selectedTime === time;

            return (
              <button
                key={slot.startTime}
                type="button"
                onClick={() => onSelectTime(time)}
                aria-pressed={isSelected}
                className={`rounded-lg border px-3 py-3 text-sm font-semibold transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-white"
                    : "border-border hover:border-primary"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}

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
          onClick={onContinue}
          disabled={!selectedTime}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to review
        </button>
      </div>
    </section>
  );
}
