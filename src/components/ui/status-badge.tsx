import type { ShipmentStatus } from "@/types/shipment";

const CONFIG: Record<ShipmentStatus, { bg: string; dot: string; label: string }> = {
  dijemput: {
    bg: "bg-slate-100 text-slate-700 dark:bg-[#0c1a3f] dark:text-slate-300 border-slate-200 dark:border-sky-500/20",
    dot: "bg-slate-400 dark:bg-slate-500",
    label: "Dijemput",
  },
  transit: {
    bg: "bg-blue-50 text-blue-700 dark:bg-sky-950/80 dark:text-sky-300 border-blue-200/80 dark:border-sky-500/40",
    dot: "bg-blue-500 dark:bg-sky-400",
    label: "Dalam Transit",
  },
  "di-pelabuhan": {
    bg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-500/40",
    dot: "bg-indigo-500 dark:bg-indigo-400",
    label: "Di Pelabuhan",
  },
  dikirim: {
    bg: "bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200/80 dark:border-amber-500/40",
    dot: "bg-amber-500 dark:bg-amber-400",
    label: "Sedang Dikirim",
  },
  selesai: {
    bg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-500/40",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    label: "Selesai",
  },
  tertunda: {
    bg: "bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200/80 dark:border-rose-500/40",
    dot: "bg-rose-500 dark:bg-rose-400",
    label: "Tertunda",
  },
};

export function StatusBadge({ status }: { status: ShipmentStatus }) {
  const conf = CONFIG[status] ?? {
    bg: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300",
    dot: "bg-slate-400",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-2xs font-mono ${conf.bg}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status === "transit" && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping" />
        )}
        {status === "tertunda" && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${conf.dot}`} />
      </span>
      {conf.label}
    </span>
  );
}
