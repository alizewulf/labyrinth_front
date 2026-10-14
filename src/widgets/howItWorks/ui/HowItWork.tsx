import { processStep_Data } from "../data/processStep_Data";
import ProcessStep from "./ProcessStep";

export default function HowItWork() {
  return (
    <section className="flex font-jakarta flex-col gap-8 py-12 px-16">
      <h3 className="font-bold text-3xl text-text text-center">
        Your path to care, made simple
      </h3>
      <div className="flex justify-between">
        {processStep_Data.map((object) => (
          <ProcessStep object={object} key={object.step} />
        ))}
      </div>
    </section>
  );
}
