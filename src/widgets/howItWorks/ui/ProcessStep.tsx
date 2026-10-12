import type { ProcessStep } from "../data/processStep_Data";

interface ProcessStepProps {
  object: ProcessStep;
}

export default function ProcessStep({ object }: ProcessStepProps) {
  return (
    <div className="flex font-jakarta flex-col gap-3 w-101.25">
      <span className="text-2xl font-bold text-[#2563EB]">0{object.step}</span>
      <h3 className="font-bold text-xl text-text">{object.label}</h3>
      <span className="text-sm text-text-secondary">{object.caption}</span>
    </div>
  );
}
