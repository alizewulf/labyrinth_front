
"use client";

import { useState } from "react";
import type { Appointment } from "@/entities/appointment";
import { updateAppointmentStatus } from "@/entities/appointment/api/updateAppointmentStatus";

interface DoctorAppointmentsProps {
    appointments: Appointment[];
    onStatusChange: (
        appointmentId: number,
        nextStatus: "accepted" | "rejected",
    ) => void;
}

export default function DoctorAppointments({
    appointments: initialAppointments, onStatusChange,
}: DoctorAppointmentsProps) {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [error, setError] = useState("");

    async function handleStatusChange(
        appointmentId: number,
        status: "accepted" | "rejected",
    ) {
        setLoadingId(appointmentId);
        setError("");

        try {
            await updateAppointmentStatus(appointmentId, status);

            setAppointments((current) =>
                current.map((appointment) =>
                    appointment.id === appointmentId
                        ? { ...appointment, status }
                        : appointment,
                ),
            );
            onStatusChange(appointmentId, status);
        } catch {
            setError("Failed to update appointment status. Please try again.");
        } finally {
            setLoadingId(null);
        }
    }

    if (appointments.length === 0) {
        return <p className="mt-4 text-gray-500">No appointments yet.</p>;
    }

    return (
        <div className="mt-4 space-y-3">
            {error && <p className="text-sm text-red-600">{error}</p>}

            {appointments.map((appointment) => {
                const isPending = appointment.status === "pending";
                const isLoading = loadingId === appointment.id;

                return (
                    <article
                        key={appointment.id}
                        className="rounded-lg border p-4"
                    >
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <div>
                                <p className="font-medium">
                                    Appointment #{appointment.id}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {new Date(appointment.starts_at).toLocaleString("en-GB", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                        timeZone: "Asia/Tbilisi",
                                    })}
                                </p>

                                <p className="mt-1 text-sm">
                                    Status: {appointment.status}
                                </p>
                            </div>

                            {isPending && (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        disabled={loadingId !== null}
                                        onClick={() =>
                                            handleStatusChange(appointment.id, "accepted")
                                        }
                                        className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                                    >
                                        {isLoading ? "Saving..." : "Accept"}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={loadingId !== null}
                                        onClick={() =>
                                            handleStatusChange(appointment.id, "rejected")
                                        }
                                        className="rounded-md bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                                    >
                                        {isLoading ? "Saving..." : "Reject"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
