import { InformationSVG } from "../icons/Notice.Icons";

interface NoticeProps {
  message: {
    title: string;
    description: string;
  };
  notification: "information";
}

export default function Notice({ message, notification }: NoticeProps) {
  return (
    <section className="flex gap-3.5">
      {notification === "information" && <InformationSVG />}
      <div className="flex flex-col gap-1">
        <p
          className={`${notification === "information" ? "text-info" : ""} text-xs font-bold`}
        >
          {message.title}
        </p>
        <span className="text-text-secondary text-xs">
          {message.description}
        </span>
      </div>
    </section>
  );
}
