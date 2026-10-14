import Link from "next/link";
import ArrowSVG from "./ArrowSVG";
import FormIntroduction, {
  FormIntroductionProps,
} from "@/shared/ui/FormIntroduction/FormIntroduction";

interface CareCalloutProps extends FormIntroductionProps {
  link: {
    showArrow: boolean;
    textContent: string;
    href: string;
  };
}

export default function CareCallout({ link, message }: CareCalloutProps) {
  return (
    <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 font-jakarta py-8 px-6 md:py-12 md:px-12 rounded-2xl bg-slate-50 border border-border">
      <FormIntroduction
        message={{
          header: message.header,
          subtitle: message.subtitle,
        }}
      />
      <Link
        href={link.href}
        className="py-3 px-5 flex justify-center items-center text-sm font-semibold gap-2 text-white bg-secondary hover:bg-secondary/90 transition-colors rounded-lg shrink-0 w-full sm:w-auto"
      >
        {link.showArrow && <ArrowSVG />}
        <span>{link.textContent}</span>
      </Link>
    </section>
  );
}
