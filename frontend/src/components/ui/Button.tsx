import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-6 py-3 font-semibold transition-all duration-300",

        variant === "primary"
          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30"
          : "border border-white/10 bg-white/5 hover:bg-white/10 text-white",

        className
      )}
    >
      {children}
    </button>
  );
}