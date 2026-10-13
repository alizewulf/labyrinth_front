"use client";

import { Field, Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

export default function DoctorSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <section className="w-full">
      <Formik
        initialValues={{
          search: searchParams.get("search") ?? "",
          location: "",
        }}
        enableReinitialize
        onSubmit={(values) => {
          const search = values.search.trim();
          const params = new URLSearchParams();

          if (search) {
            params.set("search", search);
          }

          const query = params.toString();

          router.push(query ? `/find-a-doctor?${query}` : "/find-a-doctor");
        }}
      >
        {() => (
          <Form className="flex items-end gap-4 rounded-xl border border-border p-5 font-jakarta">
            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="search"
                className="text-sm font-semibold text-text"
              >
                Doctor or specialty
              </label>

              <Field
                id="search"
                name="search"
                type="text"
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

              <Field
                id="location"
                name="location"
                type="text"
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
