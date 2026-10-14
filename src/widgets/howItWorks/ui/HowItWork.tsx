import { processStep_Data } from "../data/processStep_Data";
import ProcessStep from "./ProcessStep";

export default function HowItWork() {
  return (
    <section className="flex font-jakarta flex-col gap-6 md:gap-8 py-8 md:py-12">
      <h3 className="font-bold text-2xl sm:text-3xl text-text text-center">
        Your path to care, made simple
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {processStep_Data.map((object) => (
          <ProcessStep object={object} key={object.step} />
        ))}
      </div>
    </section>
  );
}
