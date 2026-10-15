
"use client";

import { useDoctorSettings } from "@/features/doctorSettings/model/useDoctorSettings";
import DoctorSettingsForm from "@/features/doctorSettings/ui/DoctorSettingsForm";
import ChangePasswordForm from "@/features/doctorSettings/ui/ChangePasswordForm";
import DoctorAvatarForm from "@/features/doctorSettings/ui/DoctorAvatarForm";

export default function DoctorSettingsPage() {
  const {
    profile,
    specialities,
    isLoading,
    error,
    saveProfile,
    updateAvatar,
  } = useDoctorSettings();

  if (isLoading) {
    return <p className="p-6">Loading settings...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="p-6 text-red-600">
        {error}
      </p>
    );
  }

  if (!profile) {
    return <p className="p-6">Doctor profile not found.</p>;
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

      <section className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-medium">
          Profile Photo
        </h2>

        <DoctorAvatarForm
          avatarUrl={profile.avatar_url}
          onUploaded={updateAvatar}
        />
      </section>

      <section className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-medium">
          Change Password
        </h2>

        <ChangePasswordForm />
      </section>
    </main>
  );
}
