"use client";

import { useEffect, useState } from "react";
import type { Doctor } from "@/entities/doctor/model/doctor.types";
import { getDoctors } from "@/entities/doctor/api/getDoctors";

interface ChooseDoctorProps {
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
  onContinue: () => void;
  onCancel: () => void;
}

export default function ChooseDoctor({
  selectedDoctor,
  onSelectDoctor,
  onContinue,
  onCancel,
}: ChooseDoctorProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadDoctors() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getDoctors(search);

        if (isCurrent) {
          setDoctors(data);
        }
      } catch {
        if (isCurrent) {
          setError("Failed to load doctors. Please try again.");
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadDoctors();

    return () => {
      isCurrent = false;
    };
  }, [search]);

  const specialties = [
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  const filteredDoctors = doctors.filter(
    (doctor) => !specialty || doctor.specialization === specialty,
  );

  return (
    <section className="flex w-[70%] flex-col gap-5 rounded-xl border border-border p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">Choose your doctor</h3>

        <p className="text-sm text-text-secondary">
          Find an experienced provider for your needs. Select a doctor to see
          available appointment dates.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="doctor-search" className="text-sm font-semibold">
            Search doctors
          </label>

          <input
            id="doctor-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name"
            className="rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="doctor-specialty" className="text-sm font-semibold">
            Specialty
          </label>

          <select
            id="doctor-specialty"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
            className="rounded-lg border border-border px-3 py-2 outline-none focus:border-primary"
          >
            <option value="">All specialties</option>

            {specialties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading && (
          <p className="py-4 text-sm text-text-secondary">Loading doctors...</p>
        )}

        {!isLoading && error && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-red-500">{error}</p>

            <button
              type="button"
              onClick={() => setSearch((value) => value + " ")}
              className="text-sm font-semibold text-primary"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && filteredDoctors.length === 0 && (
          <p className="py-4 text-sm text-text-secondary">No doctors found.</p>
        )}

        {!isLoading &&
          !error &&
          filteredDoctors.map((doctor) => {
            const isSelected = selectedDoctor?.id === doctor.id;
            if (doctor === null) {
              return
            }
            return (
              <button
                key={doctor.id}
                type="button"
                onClick={() => onSelectDoctor(doctor)}
                aria-pressed={isSelected}
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {doctor.avatar_url ? (
                  <img
                    src={doctor.avatar_url}
                    alt={`${doctor.name} ${doctor.surname}`}
                    className="size-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] font-bold text-[#64748B]">
                    {doctor.name?.charAt(0)}
                    {doctor.surname?.charAt(0)}
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-1">
                  <span className="font-semibold text-text">
                    Dr. {doctor.name} {doctor.surname}
                  </span>

                  <span className="text-sm text-text-secondary">
                    {doctor.specialization}
                  </span>

                  <span className="text-xs text-text-secondary">
                    {doctor.experience}{" "}
                    {doctor.experience_type === "year" ? "years" : "months"} of
                    experience
                  </span>
                </div>

                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-[#CBD5E1]"
                  }`}
                >
                  {isSelected && "✓"}
                </span>
              </button>
            );
          })}
      </div>

      <div className="flex justify-between border-t border-border pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
        >
          Cancel booking
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedDoctor}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to date
        </button>
      </div>
    </section>
  );
}
