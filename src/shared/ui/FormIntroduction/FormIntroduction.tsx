export interface FormIntroductionProps {
  message: { header: string; subtitle: string };
}

function FormIntroduction({ message }: FormIntroductionProps) {
  return (
    <div className="flex flex-col gap-2 font-jakarta">
      <h1 className="text-3xl font-bold text-text">{message.header}</h1>
      <p className="text-sm text-text-secondary">{message.subtitle}</p>
    </div>
  );
}

export default FormIntroduction;
