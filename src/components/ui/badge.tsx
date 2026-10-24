import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const BADGE_VARIANTS = ["default", "secondary", "outline", "success", "warning", "danger"] as const;
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export const BADGE_SIZES = ["sm", "md"] as const;
export type BadgeSize = (typeof BADGE_SIZES)[number];

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-blue-100 text-blue-800 border border-blue-200",
  secondary: "bg-slate-100 text-slate-700 border border-slate-200",
  outline: "border border-slate-300 text-slate-700 bg-white",
  success: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  warning: "bg-amber-100 text-amber-900 border border-amber-200",
  danger: "bg-rose-100 text-rose-800 border border-rose-200",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
