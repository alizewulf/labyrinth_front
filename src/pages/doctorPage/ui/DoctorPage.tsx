"use client";

import { useState } from "react";
import type { Appointment, AppointmentMetrics } from "@/entities/appointment";
import type { User } from "@/entities/user/user.types";
import DoctorAppointments from "./DoctorAppointments";
import DoctorScheduleForm from "@/features/doctorSettings/ui/DoctorScheduleForm";

interface DoctorPageProps {
  user: User;
  appointments: Appointment[];
  metrics: AppointmentMetrics;
}

export default function DoctorPage({
  user,
  appointments,
  metrics: initialMetrics,
}: DoctorPageProps) {
  const [metrics, setMetrics] = useState(initialMetrics);

  function handleAppointmentStatusChange(
    appointmentId: number,
    nextStatus: "accepted" | "rejected",
  ) {
    const appointment = appointments.find(
      (item) => item.id === appointmentId,
    );

    if (!appointment) return;

    setMetrics((current) => ({
      ...current,
      pending: Math.max(0, current.pending - 1),
      upcoming:
        nextStatus === "accepted" &&
          new Date(appointment.starts_at).getTime() > Date.now()
          ? current.upcoming + 1
          : current.upcoming,
    }));
  }

  return (
    <div className="px-4 py-6 sm:px-8 md:px-12 md:py-9 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-jakarta text-text-primary">
          Welcome, Dr. {user.name} {user.surname}
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Here is your practice overview and patient appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs">
          <p className="text-xs sm:text-sm text-gray-500">Upcoming appointments</p>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold text-text-primary">{metrics.upcoming}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs">
          <p className="text-xs sm:text-sm text-gray-500">Pending requests</p>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold text-text-primary">{metrics.pending}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-xs">
          <p className="text-xs sm:text-sm text-gray-500">Completed appointments</p>
          <p className="mt-2 text-2xl sm:text-3xl font-semibold text-text-primary">{metrics.completed}</p>
        </div>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Appointments</h2>

        <DoctorAppointments
          appointments={appointments}
          onStatusChange={handleAppointmentStatusChange}
        />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-xs">
        <h2 className="mb-4 text-lg sm:text-xl font-semibold">Working Schedule</h2>
        <DoctorScheduleForm />
      </section>
    </div>
  );
}
