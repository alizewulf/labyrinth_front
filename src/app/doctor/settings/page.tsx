
"use client";

import DoctorSettingsForm from "@/features/doctorSettings/ui/DoctorSettingsForm";
import { useDoctorSettings } from "@/features/doctorSettings/model/useDoctorSettings";

export default function DoctorSettingsPage() {
  const {
    profile,
    specialities,
    isLoading,
    error,
    saveProfile,
  } = useDoctorSettings();

  if (isLoading) {
    return <p>Loading settings...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!profile) {
    return <p>Doctor profile not found.</p>;
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Doctor Settings</h1>

      <section className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-medium">
          Personal Information
        </h2>

        <DoctorSettingsForm
          profile={profile}
          specialities={specialities}
          onSubmit={saveProfile}
        />
      </section>
    </main>
  );
}
