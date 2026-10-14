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
    <section className="flex justify-between items-center font-jakarta py-12 px-16">
      <FormIntroduction
        message={{
          header: message.header,
          subtitle: message.subtitle,
        }}
      />
      <Link
        href={link.href}
        className="py-3 px-4.5 flex justify-center items-center text-sm font-semibold gap-2 text-white bg-secondary rounded-lg"
      >
        {link.showArrow && <ArrowSVG />}
        <span>{link.textContent}</span>
      </Link>
    </section>
  );
}
