import type { AppointmentMetrics } from "@/entities/appointment";

interface DoctorMetricsProps {
    metrics: AppointmentMetrics
}

function DoctorMetrics({metrics}:DoctorMetricsProps) {
    const card_style = "rounded-lg border p-5"
    return (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className={card_style}>
                <p>Upcoming appointments</p>
                <p>{metrics.upcoming}</p>
            </div>

            <div className={card_style}>
                <p>Pending requests</p>
                <p>{metrics.pending}</p>
            </div>

            <div className={card_style}>
                <p>Completed Appointments</p>
                <p>{metrics.completed}</p>
            </div>
        </div>
    )
}

export default DoctorMetrics