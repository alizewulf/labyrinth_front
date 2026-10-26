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
    <div className="flex flex-col justify-between w-full min-h-[160px] rounded-xl p-5 sm:p-6 border border-border bg-white shadow-xs">
      <div className="flex justify-between items-start">
        <h3 className="text-xs sm:text-sm font-medium text-text-secondary">{metric.title}</h3>
        <Icon />
      </div>

      <div className="my-1">
        <span className="font-bold text-text text-2xl sm:text-3xl">
          {appointment.visitCounts}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-text-secondary truncate">
        {metric.description(appointment.nextVisit)}
      </p>
    </div>
  );
}
