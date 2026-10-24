import type { Metrics } from "@/types/dashboard";
import { formatTime, formatNumber } from "@/lib/format";

export function MetricCardsView({ metrics }: { metrics: Metrics }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
        <span className="font-semibold text-slate-700 dark:text-sky-300 uppercase">RINGKASAN TELEMETRI OPERASIONAL</span>
        <span className="text-slate-400 dark:text-slate-500">Pembaruan: {formatTime(metrics.generatedAt)} WIB</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Pengiriman */}
        <div className="rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3.5 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Total Muatan</span>
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-sky-950 text-blue-600 dark:text-sky-400 text-xs sm:text-sm font-bold border border-sky-500/20">
              📦
            </span>
          </div>
          <p className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-mono">{formatNumber(metrics.totalShipments)}</p>
          <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500">
            <span className="truncate">Rute aktif</span>
            <span className="font-bold text-slate-600 dark:text-sky-300">100%</span>
          </div>
        </div>

        {/* Card 2: Sedang Transit */}
        <div className="rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3.5 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Sedang Transit</span>
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-bold border border-sky-500/20">
              🚢
            </span>
          </div>
          <p className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-black text-sky-700 dark:text-sky-400 font-mono">{formatNumber(metrics.inTransit)}</p>
          <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500">
            <span className="truncate">Laut & darat</span>
            <span className="font-bold text-sky-700 dark:text-sky-400">
              {metrics.totalShipments > 0
                ? Math.round((metrics.inTransit / metrics.totalShipments) * 100)
                : 0}
              %
            </span>
          </div>
        </div>

        {/* Card 3: Tertunda */}
        <div className="rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3.5 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Tertunda</span>
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-bold border border-rose-500/20">
              ⚠️
            </span>
          </div>
          <p className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-black text-rose-700 dark:text-rose-400 font-mono">{formatNumber(metrics.delayed)}</p>
          <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-rose-500 font-medium">
            <span className="truncate">Mitigasi</span>
            <span className="font-bold">Prioritas</span>
          </div>
        </div>

        {/* Card 4: Tingkat Ketepatan */}
        <div className="rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3.5 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Ketepatan SLA</span>
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold border border-emerald-500/20">
              🎯
            </span>
          </div>
          <p className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">{metrics.ontimeRate}%</p>
          <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500">
            <span className="truncate">Target &ge; 90%</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              {metrics.ontimeRate >= 90 ? "Tercapai" : "Evaluasi"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MetricCardsSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 w-48 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 sm:h-28 rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3.5 sm:p-5" />
        ))}
      </div>
    </div>
  );
}
