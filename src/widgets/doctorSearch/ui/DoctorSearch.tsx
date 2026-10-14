"use client";

import { Form, Formik } from "formik";

interface DoctorSearchProps {
  onSearch: (search: string) => void;
}

export default function DoctorSearch({ onSearch }: DoctorSearchProps) {
  return (
    <section className="w-full">
      <Formik
        initialValues={{
          search: "",
          location: "",
        }}
        onSubmit={(values) => {
          onSearch(values.search.trim());
        }}
      >
        {({ values, handleChange }) => (
          <Form className="flex items-end gap-4 rounded-xl border border-border p-5 font-jakarta">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="search"
                className="text-sm font-semibold text-text"
              >
                Doctor or specialty
              </label>
              <input
                id="search"
                name="search"
                type="text"
                value={values.search}
                onChange={handleChange}
                placeholder="Search by doctor name or specialty"
                className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="location"
                className="text-sm font-semibold text-text"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={values.location}
                onChange={handleChange}
                placeholder="San Francisco Bay Area"
                className="w-full rounded-lg border border-border px-4 py-3 text-sm outline-none focus:border-[#2563EB]"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white"
            >
              Search
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
