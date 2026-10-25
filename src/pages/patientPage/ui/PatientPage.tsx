import type { Appointment, AppointmentMetrics } from "@/entities/appointment";
import PatientMetric from "@/widgets/patientMetrics";
import PatientIntroduction from "@/widgets/patientIntroduction/ui/PatientIntroduction";

interface PatientPageProps {
  appointments: Appointment[];
  metrics: AppointmentMetrics;
}

export default function PatientPage({
  appointments,
  metrics,
}: PatientPageProps) {
  const nextAppointment = appointments
    .filter(
      (appointment) =>
        appointment.status === "accepted" &&
        new Date(appointment.starts_at) > new Date(),
    )
    .sort(
      (a, b) =>
        new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
    )[0];

  const nextVisit = nextAppointment
    ? new Date(nextAppointment.starts_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        timeZone: "Asia/Tbilisi",
      })
    : "No upcoming visits";

  return (
    <div className="px-4 py-6 sm:px-8 md:px-12 md:py-9">
      <PatientIntroduction />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        <PatientMetric
          appointment={{
            nextVisit,
            visitCounts: metrics.upcoming,
          }}
          type="upcoming"
        />

        <PatientMetric
          appointment={{
            nextVisit: "",
            visitCounts: appointments.filter(
              (appointment) => appointment.status === "pending",
            ).length,
          }}
          type="pending"
        />

        <PatientMetric
          appointment={{
            nextVisit: "",
            visitCounts: metrics.completed,
          }}
          type="completed"
        />
      </div>
    </div>
  );
}
