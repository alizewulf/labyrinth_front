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
    <div className="px-12 py-9">
      <h1 className="text-2xl font-semibold">
        Welcome, Dr. {user.name} {user.surname}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-gray-500">Upcoming appointments</p>
          <p className="mt-2 text-2xl font-semibold">{metrics.upcoming}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-gray-500">Pending requests</p>
          <p className="mt-2 text-2xl font-semibold">{metrics.pending}</p>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-gray-500">Completed appointments</p>
          <p className="mt-2 text-2xl font-semibold">{metrics.completed}</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Appointments</h2>

        <DoctorAppointments
          appointments={appointments}
          onStatusChange={handleAppointmentStatusChange}
        />
      </section>
      <section className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-medium">Working Schedule</h2>
        <DoctorScheduleForm />
      </section>
    </div>
  );
}
