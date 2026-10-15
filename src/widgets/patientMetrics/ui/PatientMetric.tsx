import {
  CalendarSVG,
  ClockSVG,
  CompletedSVG,
} from "../icons/PatientMetric.Icons";

interface PatientMetricProps {
  type: "upcoming" | "pending" | "completed";
  appointment: {
    visitCounts: number;
    nextVisit: string;
  };
}

const metrics = {
  upcoming: {
    title: "Upcoming Appointments",
    description: (nextVisit: string) => `Your next visit ${nextVisit}`,
    Icon: CalendarSVG,
  },
  pending: {
    title: "Pending Requests",
    description: () => "We will notify you when confirmed",
    Icon: ClockSVG,
  },
  completed: {
    title: "Completed Visits",
    description: () => "Care you can keep track of",
    Icon: CompletedSVG,
  },
};

export default function PatientMetric({
  type,
  appointment,
}: PatientMetricProps) {
  const metric = metrics[type];
  const Icon = metric.Icon;

  return (
    <div className="flex flex-col gap-5 w-[434px] h-[161px] rounded-xl p-6 border border-border">
      <div className="flex justify-between">
        <h3 className="font-xs text-text-secondary">{metric.title}</h3>
        <Icon />
      </div>

      <span className="font-bold text-text text-3xl">
        {appointment.visitCounts}
      </span>

      <p className="text-xs text-secondary">
        {metric.description(appointment.nextVisit)}
      </p>
    </div>
  );
}
