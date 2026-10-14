"use client";

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { getSpecialities } from "@/entities/specialities/api/getSpecialities";
import type { Speciality } from "@/entities/specialities/model/speciality.types";

export interface DoctorFilters {
  specialty: string;
  visitType: string[];
  availability: string;
  experience: string;
  rating: string;
  minFee: number;
  maxFee: number;
}

interface FilterSidebarProps {
  onApply: (filters: DoctorFilters) => void;
}

const initialValues: DoctorFilters = {
  specialty: "",
  visitType: ["in-person"],
  availability: "7",
  experience: "",
  rating: "4",
  minFee: 50,
  maxFee: 250,
};

export default function FilterSidebar({ onApply }: FilterSidebarProps) {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  useEffect(() => {
    async function fetchSpecialities() {
      try {
        const data = await getSpecialities();
        setSpecialities(data);
      } catch (error) {
        console.error("Failed to fetch specialities:", error);
      }
    }

    fetchSpecialities();
  }, []);

  return (
    <aside className="w-1/5 flex flex-col gap-5 font-jakarta border border-border rounded-xl p-6">
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<Record<keyof DoctorFilters, string>> = {};

          if (values.minFee < 0) {
            errors.minFee = "Minimum fee cannot be negative";
          }

          if (values.maxFee < values.minFee) {
            errors.maxFee = "Maximum fee must be greater than minimum fee";
          }

          return errors;
        }}
        onSubmit={(values) => {
          onApply(values);
        }}
      >
        {({ values, handleChange, setFieldValue, resetForm, errors }) => (
          <Form className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg text-text">Filters</p>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onApply(initialValues);
                }}
                className="text-xs text-[#2563EB]"
              >
                Reset
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="specialty" className="text-sm font-semibold">
                Specialty
              </label>
              <select
                id="specialty"
                name="specialty"
                value={values.specialty}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="">All specialties</option>
                {specialities.map((speciality) => (
                  <option key={speciality.title} value={speciality.title}>
                    {speciality.title}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="text-sm font-semibold mb-2">Visit type</legend>
              {[
                { value: "in-person", label: "In-person consultation" },
                { value: "video", label: "Video consultation" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={values.visitType.includes(option.value)}
                    onChange={(event) => {
                      const nextValues = event.target.checked
                        ? [...values.visitType, option.value]
                        : values.visitType.filter(
                            (value) => value !== option.value,
                          );

                      setFieldValue("visitType", nextValues);
                    }}
                  />
                  {option.label}
                </label>
              ))}
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="availability" className="text-sm font-semibold">
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={values.availability}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="7">Next 7 days</option>
                <option value="14">Next 14 days</option>
                <option value="30">Next 30 days</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="experience" className="text-sm font-semibold">
                Experience
              </label>
              <select
                id="experience"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="">Any experience</option>
                <option value="1">1+ years</option>
                <option value="3">3+ years</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rating" className="text-sm font-semibold">
                Patient rating
              </label>
              <select
                id="rating"
                name="rating"
                value={values.rating}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="4">4 stars &amp; above</option>
                <option value="4.5">4.5 stars &amp; above</option>
                <option value="5">5 stars</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Consultation fee</p>
              <div className="flex items-center gap-3">
                <label className="flex-1">
                  <span className="text-xs text-text-secondary">Min ($)</span>
                  <input
                    type="number"
                    name="minFee"
                    min={0}
                    value={values.minFee}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border p-2 text-sm"
                  />
                </label>
                <label className="flex-1">
                  <span className="text-xs text-text-secondary">Max ($)</span>
                  <input
                    type="number"
                    name="maxFee"
                    min={0}
                    value={values.maxFee}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-border p-2 text-sm"
                  />
                </label>
              </div>
              {errors.minFee && (
                <p className="text-xs text-red-500">{errors.minFee}</p>
              )}
              {errors.maxFee && (
                <p className="text-xs text-red-500">{errors.maxFee}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#2563EB] py-3 text-sm font-semibold text-white"
            >
              Apply filters
            </button>
          </Form>
        )}
      </Formik>
    </aside>
  );
}
