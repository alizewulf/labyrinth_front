import type { Appointment } from "@/entities/appointment";
import DoctorAppointments from "@/widgets/doctorAppointments/ui/DoctorAppointments";

interface DoctorAppointmentsSectionProps {
    appointments: Appointment[];
    onStatusChange: (
        appointmentId: number,
        nextStatus: "accepted" | "rejected",
    ) => void;
}

export default function DoctorAppointmentsSection({
    appointments,
    onStatusChange,
}: DoctorAppointmentsSectionProps) {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold">Appointments\</h2>

            <DoctorAppointments
                appointments={appointments}
                onStatusChange={onStatusChange}
            />
        </section>

    );
}