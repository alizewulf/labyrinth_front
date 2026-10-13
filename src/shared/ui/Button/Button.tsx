import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary";

type ButtonProps = {
  variant: ButtonVariant;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white",
};

export default function Button({
  variant,
  children,
  onClick,
  type,
}: ButtonProps) {
  return (
    <button className={variantStyles[variant]} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
