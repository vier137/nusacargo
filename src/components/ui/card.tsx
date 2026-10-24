import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const CARD_VARIANTS = ["default", "outline", "elevated"] as const;
export type CardVariant = (typeof CARD_VARIANTS)[number];

export const CARD_PADDINGS = ["sm", "md", "lg"] as const;
export type CardPadding = (typeof CARD_PADDINGS)[number];

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  children?: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white dark:bg-[#0a142e] border border-slate-200/90 dark:border-sky-500/20 shadow-2xs",
  outline: "bg-white dark:bg-[#0a142e] border-2 border-slate-300 dark:border-sky-500/40",
  elevated: "bg-white dark:bg-[#0a142e] border border-slate-200 dark:border-sky-500/30 shadow-md dark:shadow-[0_0_25px_rgba(56,189,248,0.12)]",
};

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  variant = "default",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn("rounded-xl text-slate-900 dark:text-white transition-colors duration-200", variantStyles[variant], paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-2 flex flex-col space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base font-bold text-slate-900 dark:text-white font-mono", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-sm text-slate-600 dark:text-slate-300", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-4 flex items-center pt-2 border-t border-slate-100 dark:border-sky-500/20", className)} {...props}>
      {children}
    </div>
  );
}
