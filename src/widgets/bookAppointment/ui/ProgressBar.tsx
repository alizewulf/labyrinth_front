interface StepProgressProps {
  currentStep: number;
}

interface Step {
  currentStep: number;
  label: string;
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
    <section className="flex items-center justify-between overflow-x-auto p-4 sm:p-6 border border-border rounded-xl bg-white shadow-xs gap-3 no-scrollbar">
      {steps.map((step) => {
        const isActive = step.currentStep === currentStep;
        const isCompleted = step.currentStep < currentStep;
        
        const spanStyle = isActive
          ? "bg-primary text-white"
          : isCompleted
          ? "bg-blue-100 text-primary font-bold"
          : "text-[#94A3B8] bg-[#F1F5F9]";
          
        const textStyle = isActive ? "text-primary font-bold" : "text-[#94A3B8]";

        return (
          <div
            key={step.currentStep}
            className="flex shrink-0 gap-2 items-center text-xs sm:text-sm"
          >
            <span className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold ${spanStyle}`}>
              {isCompleted ? "✓" : step.currentStep}
            </span>

            <p className={`font-semibold hidden sm:inline ${textStyle}`}>{step.label}</p>
          </div>
        );
      })}
    </section>
  );
}
