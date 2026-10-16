import type { Appointment, AppointmentMetrics } from "@/entities/appointment";
import type { User } from "@/entities/user/user.types";

interface DoctorPageProps {
  user: User;
  appointments: Appointment[];
  metrics: AppointmentMetrics;
}

export default function DoctorPage({
  user,
  appointments,
  metrics,
}: DoctorPageProps) {
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

        {appointments.length === 0 ? (
          <p className="mt-4 text-gray-500">No appointments yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="rounded-lg border p-4">
                <p className="font-medium">Appointment #{appointment.id}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(appointment.starts_at).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Tbilisi",
                  })}
                </p>
                <p className="mt-1 text-sm">Status: {appointment.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
