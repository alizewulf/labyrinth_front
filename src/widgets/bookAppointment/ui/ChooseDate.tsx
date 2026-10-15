"use client";

import { useEffect, useState } from "react";
import type { Doctor } from "@/entities/doctor/model/doctor.types";
import {
  getAvailableSlots,
  type AvailableSlot,
} from "@/entities/doctorSchedule/api/getAvailableSlots";

interface ChooseDateProps {
  doctor: Doctor;
  selectedDate: string | null;
  availableSlots: AvailableSlot[];
  onSelectDate: (date: string) => void;
  onAvailableSlotsChange: (slots: AvailableSlot[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function ChooseDate({
  doctor,
  selectedDate,
  availableSlots,
  onSelectDate,
  onAvailableSlotsChange,
  onBack,
  onContinue,
}: ChooseDateProps) {
  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadSlots() {
      if (!selectedDate) {
        onAvailableSlotsChange([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      onAvailableSlotsChange([]);

      try {
        const data = await getAvailableSlots(doctor.id, selectedDate);

        console.log("Doctor ID:", doctor.id);
        console.log("Selected date:", selectedDate);
        console.log("Available slots:", data);

        if (isCurrent) {
          onAvailableSlotsChange(data);
        }
      } catch {
        if (isCurrent) {
          setError("Failed to load available times. Please try again.");
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadSlots();

    return () => {
      isCurrent = false;
    };
  }, [doctor.id, selectedDate, onAvailableSlotsChange]);

  return (
    <section className="flex w-[70%] flex-col gap-5 rounded-xl border border-border p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">Choose appointment date</h3>

        <p className="text-sm text-text-secondary">
          Select a date for your appointment with Dr. {doctor.name}{" "}
          {doctor.surname}.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="appointment-date" className="text-sm font-semibold">
          Appointment date
        </label>

        <input
          id="appointment-date"
          type="date"
          min={minDate}
          value={selectedDate ?? ""}
          onChange={(event) => onSelectDate(event.target.value)}
          className="w-full rounded-lg border border-border px-3 py-2"
        />
      </div>

      {isLoading && (
        <p className="text-sm text-text-secondary">
          Checking available times...
        </p>
      )}

      {!isLoading && error && <p className="text-sm text-red-500">{error}</p>}

      {!isLoading && !error && selectedDate && availableSlots.length === 0 && (
        <p className="text-sm text-text-secondary">
          No available times for this date. Please choose another date.
        </p>
      )}

      {!isLoading && !error && availableSlots.length > 0 && (
        <p className="text-sm text-green-700">
          Available appointments: {availableSlots.length}
        </p>
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
          disabled={
            !selectedDate ||
            isLoading ||
            Boolean(error) ||
            availableSlots.length === 0
          }
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to time
        </button>
      </div>
    </section>
  );
}
