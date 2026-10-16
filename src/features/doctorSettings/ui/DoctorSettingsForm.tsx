
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import type { MyDoctorProfile } from "@/entities/doctor/model/doctor.types";
import type { Speciality } from "@/entities/specialities/model/speciality.types";
import type { DoctorSettingsValues } from "../model/useDoctorSettings";

interface DoctorSettingsFormProps {
  profile: MyDoctorProfile;
  specialities: Speciality[];
  onSubmit: (values: DoctorSettingsValues) => Promise<void>;
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600";

export default function DoctorSettingsForm({
  profile,
  specialities,
  onSubmit,
}: DoctorSettingsFormProps) {
  return (
    <Formik<DoctorSettingsValues>
      enableReinitialize
      initialValues={{
        name: profile.name ?? "",
        surname: profile.surname ?? "",
        specialization: profile.specialization ?? "",
      }}
      validate={(values) => {
        const errors: Partial<Record<keyof DoctorSettingsValues, string>> = {};

        if (values.name.trim().length < 2) {
          errors.name = "First name must contain at least 2 characters.";
        }

        if (values.surname.trim().length < 2) {
          errors.surname = "Last name must contain at least 2 characters.";
        }

        if (!values.specialization) {
          errors.specialization = "Please select a specialization.";
        }

        return errors;
      }}
      onSubmit={async (values, { setStatus }) => {
        try {
          await onSubmit({
            name: values.name.trim(),
            surname: values.surname.trim(),
            specialization: values.specialization,
          });

          setStatus({ success: "Profile updated successfully." });
        } catch {
          setStatus({
            error: "Failed to update profile. Please try again.",
          });
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium"
            >
              First Name
            </label>

            <Field
              id="name"
              name="name"
              autoComplete="given-name"
              className={inputClass}
            />

            <ErrorMessage
              name="name"
              component="p"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="surname"
              className="mb-1 block text-sm font-medium"
            >
              Last Name
            </label>

            <Field
              id="surname"
              name="surname"
              autoComplete="family-name"
              className={inputClass}
            />

            <ErrorMessage
              name="surname"
              component="p"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="specialization"
              className="mb-1 block text-sm font-medium"
            >
              Specialization
            </label>

            <Field
              as="select"
              id="specialization"
              name="specialization"
              className={inputClass}
            >
              <option value="">Select a specialization</option>

              {specialities.map((speciality) => (
                <option key={speciality.title} value={speciality.title}>
                  {speciality.title}
                </option>
              ))}
            </Field>

            <ErrorMessage
              name="specialization"
              component="p"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          {status?.success && (
            <p role="status" className="text-sm text-green-700">
              {status.success}
            </p>
          )}

          {status?.error && (
            <p role="alert" className="text-sm text-red-600">
              {status.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
