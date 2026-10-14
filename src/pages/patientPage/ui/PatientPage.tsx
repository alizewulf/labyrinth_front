import PatientMetric from "@/widgets/patientMetrics";
import PatientIntroduction from "@/widgets/patientIntroduction/ui/PatientIntroduction";

export default function PatientPage() {
  return (
    <div className="px-12 py-9">
      <PatientIntroduction />
      <div className="flex justify-between">
        <PatientMetric
          appointment={{ nextVisit: "15 october", visitCounts: 15 }}
          type="upcoming"
        />
        <PatientMetric
          appointment={{ nextVisit: "15 october", visitCounts: 15 }}
          type="pending"
        />
        <PatientMetric
          appointment={{ nextVisit: "15 october", visitCounts: 15 }}
          type="completed"
        />
      </div>
    </div>
  );
}
