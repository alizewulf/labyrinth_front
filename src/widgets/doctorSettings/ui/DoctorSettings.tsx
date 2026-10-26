"use client";

import { useDoctorSettings } from "@/features/doctorSettings/model/useDoctorSettings";
import DoctorSettingsForm from "@/features/doctorSettings/ui/DoctorSettingsForm";
import ChangePasswordForm from "@/features/doctorSettings/ui/ChangePasswordForm";
import DoctorAvatarForm from "@/features/doctorSettings/ui/DoctorAvatarForm";
import DoctorScheduleForm from "@/features/doctorSettings/ui/DoctorScheduleForm";

export default function DoctorSettings() {
  const {
    profile,
    specialities,
    isLoading,
    error,
    saveProfile,
    updateAvatar,
  } = useDoctorSettings();

  if (isLoading) {
    return <div className="p-6 text-center text-text-secondary">Loading settings...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p role="alert" className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          {error}
        </p>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-6 text-center text-text-secondary">Doctor profile not found.</div>;
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6 md:px-8">
      <div>
        <h1 className="text-2xl font-bold font-jakarta text-text-primary">Doctor Settings</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your personal details, specialties, schedule, and security settings.
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Profile Photo
        </h2>
        <DoctorAvatarForm
          avatarUrl={profile.avatar_url}
          onUploaded={updateAvatar}
        />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Personal Information
        </h2>
        <DoctorSettingsForm
          profile={profile}
          specialities={specialities}
          onSubmit={saveProfile}
        />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Working Schedule
        </h2>
        <DoctorScheduleForm />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Change Password
        </h2>
        <ChangePasswordForm />
      </section>
    </main>
  );
}