import Link from "next/link";
import ArrowSVG from "./ArrowSVG";

export default function CareCallout() {
  return (
    <section className="flex justify-between items-center font-jakarta py-12 px-16">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-3xl text-text">
          The next step toward feeling better.
        </h3>
        <p className="text-sm text-text-secondary">
          Create your free account and keep all your care in one place.
        </p>
      </div>
      <Link
        href="/register"
        className="py-3 px-4.5 flex justify-center items-center text-sm font-semibold gap-2 text-white bg-secondary rounded-lg"
      >
        <ArrowSVG /> <span>Get started today</span>
      </Link>
    </section>
  );
}
