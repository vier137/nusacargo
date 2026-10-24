import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

export const BUTTON_VARIANTS = ["primary", "secondary", "outline", "ghost", "danger"] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-2xs border border-transparent dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 dark:shadow-[0_0_15px_rgba(56,189,248,0.35)] font-bold",
  secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 dark:bg-[#0c1a3f] dark:text-slate-200 dark:border-sky-500/20 dark:hover:bg-[#122452]",
  outline: "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 dark:border-sky-500/30 dark:text-sky-300 dark:bg-transparent dark:hover:bg-sky-950/40",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent dark:text-slate-300 dark:hover:bg-sky-950/40 dark:hover:text-white",
  danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-2xs border border-transparent dark:bg-rose-600 dark:hover:bg-rose-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-xs rounded font-medium",
  md: "px-3.5 py-2 text-sm rounded-lg font-medium",
  lg: "px-5 py-2.5 text-base rounded-xl font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
