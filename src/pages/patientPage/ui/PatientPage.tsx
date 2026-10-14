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
    <div className="px-12 py-9">
      <PatientIntroduction />

      <div className="flex justify-between">
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
            visitCounts: metrics.pending,
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
