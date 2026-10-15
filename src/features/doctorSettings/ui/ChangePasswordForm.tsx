
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { API } from "@/shared/api/axios";

interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm() {
  return (
    <Formik<ChangePasswordValues>
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validate={(values) => {
        const errors: Partial<
          Record<keyof ChangePasswordValues, string>
        > = {};

        if (!values.currentPassword) {
          errors.currentPassword = "Current password is required.";
        }

        if (values.newPassword.length < 8 || values.newPassword.length > 72) {
          errors.newPassword = "Password must contain 8 to 72 characters.";
        } else if (
          !/[a-z]/.test(values.newPassword) ||
          !/[A-Z]/.test(values.newPassword) ||
          !/\d/.test(values.newPassword)
        ) {
          errors.newPassword =
            "Password must contain uppercase and lowercase letters and a number.";
        }

        if (values.newPassword !== values.confirmPassword) {
          errors.confirmPassword = "Passwords do not match.";
        }

        return errors;
      }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        try {
          await API.patch("/users/me/password", {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          });

          resetForm();
          setStatus({ success: "Password changed successfully." });
        } catch {
          setStatus({
            error: "Failed to change password. Check your current password.",
          });
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          {(
            [
              ["currentPassword", "Current Password"],
              ["newPassword", "New Password"],
              ["confirmPassword", "Confirm New Password"],
            ] as const
          ).map(([name, label]) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="mb-1 block text-sm font-medium"
              >
                {label}
              </label>

              <Field
                id={name}
                name={name}
                type="password"
                autoComplete={
                  name === "currentPassword"
                    ? "current-password"
                    : "new-password"
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-600"
              />

              <ErrorMessage
                name={name}
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>
          ))}

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
            {isSubmitting ? "Changing..." : "Change Password"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
