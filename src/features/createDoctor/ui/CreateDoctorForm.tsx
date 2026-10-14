"use client";

import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { createDoctor } from "../api/createDoctor";

interface CreateDoctorValues {
  email: string;
  password: string;
}

const initialValues: CreateDoctorValues = {
  email: "",
  password: "",
};
interface CreateDoctorFormProps {
  onCreated: () => void;
}

export default function CreateDoctorForm({ onCreated }: CreateDoctorFormProps) {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  return (
    <Formik<CreateDoctorValues>
      initialValues={initialValues}
      validate={(values) => {
        const errors: Partial<Record<keyof CreateDoctorValues, string>> = {};

        if (!values.email.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
          errors.email = "Enter a valid email";
        }

        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 8) {
          errors.password = "Password must contain at least 8 characters";
        }

        return errors;
      }}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        setSuccessMessage("");
        setServerError("");

        try {
          await createDoctor({
            email: values.email.trim(),
            password: values.password,
          });
          setSuccessMessage("Doctor account created successfully");
          onCreated();
          resetForm();
        } catch (error) {
          if (
            typeof error === "object" &&
            error !== null &&
            "response" in error
          ) {
            const response = error.response;

            if (
              typeof response === "object" &&
              response !== null &&
              "status" in response &&
              response.status === 409
            ) {
              setServerError("An account with this email already exists");
            } else {
              setServerError("Failed to create doctor account");
            }
          } else {
            setServerError("Failed to create doctor account");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="flex max-w-lg flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Create doctor account</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="doctor@example.com"
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Temporary password</label>
            <Field
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
            {touched.password && errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {serverError && (
            <p role="alert" className="text-sm text-red-600">
              {serverError}
            </p>
          )}

          {successMessage && (
            <p role="status" className="text-sm text-green-700">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
