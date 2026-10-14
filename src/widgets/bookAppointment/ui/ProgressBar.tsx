interface StepProgressProps {
  currentStep: number;
}

interface Step {
  currentStep: number;
  label: string;
}

interface StepStyle {
  span: string;
  p: string;
}
export default function StepProgress({ currentStep }: StepProgressProps) {
  const steps: Step[] = [
    { currentStep: 1, label: "Doctor" },
    { currentStep: 2, label: "Date" },
    { currentStep: 3, label: "Time" },
    { currentStep: 4, label: "Review" },
    { currentStep: 5, label: "Confirmation" },
  ];

  return (
    <section className="flex justify-between p-6 border border-border rounded-xl">
      {steps.map((step) => {
        const isActive = step.currentStep === currentStep;
        const spanStyle = isActive
          ? "bg-primary text-white"
          : "text-[#94A3B8] bg-[#F1F5F9]";
        const textStyle = isActive ? "text-primary" : "text-[#94A3B8]";

        return (
          <div
            key={step.currentStep}
            className="flex gap-2.5 items-center text-xs"
          >
            <span className={`font-bold py-1.5 px-3 ${spanStyle}`}>
              {step.currentStep}
            </span>

            <p className={`font-semibold ${textStyle}`}>{step.label}</p>
          </div>
        );
      })}
    </section>
  );
}
