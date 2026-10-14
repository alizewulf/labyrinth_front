"use client";

import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";

import { getSpecialities } from "@/entities/specialities/api/getSpecialities";
import type { Speciality } from "@/entities/specialities/model/speciality.types";
import { useFindDoctor } from "@/features/findDoctor";
import {
  DEFAULT_DOCTOR_FILTERS,
  DoctorFilters,
} from "@/features/findDoctor/model/doctorFilter.types";

export default function FilterSidebar() {
  const { appliedFilters, setAppliedFilters } = useFindDoctor();

  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchSpecialities() {
      try {
        const data = await getSpecialities();

        if (!cancelled) {
          setSpecialities(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch specialities:", error);
        }
      }
    }

    fetchSpecialities();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className="flex w-1/5 flex-col gap-5 rounded-xl border border-border p-6 font-jakarta">
      <Formik<DoctorFilters>
        initialValues={appliedFilters}
        enableReinitialize
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
          setAppliedFilters(values);
        }}
      >
        {({ values, setFieldValue, resetForm, errors }) => (
          <Form className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-text">Filters</p>

              <button
                type="button"
                onClick={() => {
                  resetForm({ values: DEFAULT_DOCTOR_FILTERS });
                  setAppliedFilters(DEFAULT_DOCTOR_FILTERS);
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

              <Field
                as="select"
                id="specialty"
                name="specialty"
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="">All specialties</option>

                {specialities.map((speciality) => (
                  <option key={speciality.title} value={speciality.title}>
                    {speciality.title}
                  </option>
                ))}
              </Field>
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-2 text-sm font-semibold">Visit type</legend>

              {[
                { value: "in-person", label: "In-person consultation" },
                { value: "video", label: "Video consultation" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm"
                >
                  <Field
                    type="checkbox"
                    name="visitType"
                    value={option.value}
                    checked={values.visitType.includes(option.value)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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

              <Field
                as="select"
                id="availability"
                name="availability"
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="7">Next 7 days</option>
                <option value="14">Next 14 days</option>
                <option value="30">Next 30 days</option>
              </Field>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="experience" className="text-sm font-semibold">
                Experience
              </label>

              <Field
                as="select"
                id="experience"
                name="experience"
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="">Any experience</option>
                <option value="1">1+ years</option>
                <option value="3">3+ years</option>
                <option value="5">5+ years</option>
                <option value="10">10+ years</option>
              </Field>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rating" className="text-sm font-semibold">
                Patient rating
              </label>

              <Field
                as="select"
                id="rating"
                name="rating"
                className="w-full rounded-lg border border-border bg-white p-2 text-sm"
              >
                <option value="4">4 stars &amp; above</option>
                <option value="4.5">4.5 stars &amp; above</option>
                <option value="5">5 stars</option>
              </Field>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Consultation fee</p>

              <div className="flex items-center gap-3">
                <label className="flex-1">
                  <span className="text-xs text-text-secondary">Min ($)</span>

                  <Field
                    type="number"
                    name="minFee"
                    min={0}
                    className="mt-1 w-full rounded-lg border border-border p-2 text-sm"
                  />
                </label>

                <label className="flex-1">
                  <span className="text-xs text-text-secondary">Max ($)</span>

                  <Field
                    type="number"
                    name="maxFee"
                    min={0}
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
