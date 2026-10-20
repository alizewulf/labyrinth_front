"use client";

import { useState } from "react";
import type { Appointment, AppointmentMetrics } from "@/entities/appointment";
import type { User } from "@/entities/user/user.types";
import DoctorAppointments from "./DoctorAppointments";
import DoctorMetrics from "@/widgets/doctorMetrics";
import DoctorSchedule from "@/widgets/doctorSchedule";

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
  
      <DoctorMetrics metrics={metrics}/>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Appointments</h2>

        <DoctorAppointments
          appointments={appointments}
          onStatusChange={handleAppointmentStatusChange}
        />
      </section>
      <DoctorSchedule/>
    </div>
  );
}
