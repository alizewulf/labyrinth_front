"use client";

import { getAdminDoctors } from "@/entities/doctor/api/getAdminDoctors";
import { AdminDoctor } from "@/entities/doctor/model/doctor.types";
import CreateDoctorForm from "@/features/createDoctor";
import { useEffect, useState } from "react";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<AdminDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDoctors() {
    try {
      const data = await getAdminDoctors();
      setDoctors(data);
      setError(null);
    } catch {
      setError("Failed to load doctors. Check your access and try again.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const loader = async () => {
      await loadDoctors();
    };
    loader();
  }, []);
  if (isLoading) {
    return <p className="p-8">Loading doctors...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>;
  }

  return (
    <section className="flex flex-col gap-6 p-8">
      <header>
        <h1 className="text-2xl font-semibold">Doctor accounts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage doctor accounts and profile completion.
        </p>
      </header>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-500">Total doctor accounts</p>
        <p className="mt-2 text-3xl font-semibold">{doctors.length}</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-5 py-3 font-medium">Doctor</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Specialization</th>
              <th className="px-5 py-3 font-medium">Experience</th>
              <th className="px-5 py-3 font-medium">Profile</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {doctors.map((doctor) => (
              <tr key={doctor.doctor_id}>
                <td className="px-5 py-4 font-medium text-gray-900">
                  {[doctor.name, doctor.surname].filter(Boolean).join(" ") ||
                    "Not provided"}
                </td>
                <td className="px-5 py-4">{doctor.email}</td>
                <td className="px-5 py-4">
                  {doctor.specialization ?? "Not provided"}
                </td>
                <td className="px-5 py-4">
                  {doctor.experience !== null && doctor.experience_type !== null
                    ? `${doctor.experience} ${
                        doctor.experience_type === "year" ? "years" : "months"
                      }`
                    : "Not provided"}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={
                      doctor.profile_completed
                        ? "rounded-full bg-green-100 px-3 py-1 text-green-700"
                        : "rounded-full bg-amber-100 px-3 py-1 text-amber-700"
                    }
                  >
                    {doctor.profile_completed ? "Complete" : "Incomplete"}
                  </span>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                  No doctor accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CreateDoctorForm onCreated={loadDoctors} />
    </section>
  );
}
