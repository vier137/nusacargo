import { useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const SELECT_SIZES = ["sm", "md", "lg"] as const;
export type SelectSize = (typeof SELECT_SIZES)[number];

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  size?: SelectSize;
}

const sizeStyles: Record<SelectSize, string> = {
  sm: "h-8 px-2.5 py-1 text-xs",
  md: "h-10 px-3.5 py-2 text-sm",
  lg: "h-12 px-4 py-2.5 text-base",
};

export function Select({
  label,
  options,
  placeholder,
  error,
  hint,
  size = "md",
  className,
  id,
  disabled,
  required,
  defaultValue,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-slate-700 dark:text-sky-300">
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        disabled={disabled}
        required={required}
        defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={cn(
          "w-full rounded-lg border bg-white dark:bg-[#070f26] text-slate-900 dark:text-white transition-colors focus:outline-hidden focus:ring-2",
          error
            ? "border-rose-300 dark:border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20"
            : "border-slate-300 dark:border-sky-500/30 focus:border-sky-500 focus:ring-sky-500/20",
          disabled && "bg-slate-100 dark:bg-[#060c20] text-slate-500 dark:text-slate-500 cursor-not-allowed border-slate-200 dark:border-sky-500/10",
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled className="dark:bg-[#0a142e]">
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="dark:bg-[#0a142e] dark:text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error && (
        <p id={hintId} className="text-[11px] text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
