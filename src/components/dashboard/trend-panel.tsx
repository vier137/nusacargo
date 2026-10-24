import type { Trend } from "@/types/dashboard";
import { formatTime } from "@/lib/format";

export function TrendPanelView({ trend }: { trend: Trend }) {
  const avgRate =
    trend.points.length > 0
      ? Math.round(
          (trend.points.reduce((acc, curr) => acc + curr.ontimeRate, 0) / trend.points.length) * 10
        ) / 10
      : 0;

  const maxRate = Math.max(...trend.points.map((p) => p.ontimeRate));
  const minRate = Math.min(...trend.points.map((p) => p.ontimeRate));

  return (
    <div className="rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5 shadow-2xs">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-sky-500/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 dark:bg-sky-950 text-blue-600 dark:text-sky-400 text-xs border border-sky-500/20">
            📊
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              TREN KETEPATAN WAKTU 14 HARI (SLA)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Persentase armada kargo tiba tepat waktu sesuai jadwal estimasi tiba (ETA).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 dark:bg-[#070f26] px-3 py-1.5 border border-slate-200/80 dark:border-sky-500/20">
            <div>
              <span className="text-[10px] text-slate-400 dark:text-sky-300/70 block font-medium font-mono">Rata-rata 14 Hari</span>
              <span className="text-sm font-black text-blue-600 dark:text-sky-400 font-mono">{avgRate}%</span>
            </div>
            <div className="border-l border-slate-200 dark:border-slate-800 pl-2 text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5 font-mono">
              <div>Tertinggi: <span className="font-bold text-emerald-600 dark:text-emerald-400">{maxRate}%</span></div>
              <div>Terendah: <span className="font-bold text-amber-600 dark:text-amber-400">{minRate}%</span></div>
            </div>
          </div>

          <span className="font-mono text-xs text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-800 pl-3 hidden sm:inline">
            Update: {formatTime(trend.generatedAt)}
          </span>
        </div>
      </div>

      {/* Bar Chart Sederhana & Responsif dengan Tailwind */}
      <div className="space-y-3">
        <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
          <div className="flex items-end gap-2 h-48 pt-6 px-1 min-w-[480px] sm:min-w-0 sm:grid sm:grid-cols-14">
            {trend.points.map((pt, idx) => {
              const isHigh = pt.ontimeRate >= 90;
              const isMedium = pt.ontimeRate >= 80 && pt.ontimeRate < 90;

              return (
                <div key={idx} className="flex-1 min-w-[26px] sm:min-w-0 flex flex-col items-center h-full justify-end group relative">
                {/* Floating Tooltip */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20 whitespace-nowrap rounded bg-slate-900 dark:bg-sky-500 px-1.5 py-0.5 text-[10px] font-mono font-bold text-white dark:text-slate-950 shadow-sm">
                  {pt.ontimeRate}%
                </div>

                <div className="w-full bg-slate-100 dark:bg-[#070f26] rounded-t-sm h-36 flex items-end overflow-hidden border-b border-slate-200 dark:border-slate-800">
                  <div
                    style={{ height: `${Math.min(Math.max(pt.ontimeRate, 10), 100)}%` }}
                    className={`w-full rounded-t-xs transition-all duration-300 group-hover:brightness-110 ${
                      isHigh
                        ? "bg-gradient-to-t from-emerald-600 to-emerald-400 dark:shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                        : isMedium
                        ? "bg-gradient-to-t from-blue-600 to-sky-400 dark:shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                        : "bg-gradient-to-t from-amber-600 to-amber-400 dark:shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                    }`}
                  />
                </div>
                <span className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-semibold font-mono truncate w-full text-center">
                  {pt.day}
                </span>
              </div>
            );
          })}
          </div>
        </div>

        {/* Legend & Target SLA */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100 dark:border-sky-500/20 text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px] font-medium font-mono text-slate-400 dark:text-sky-300/70">
            Target SLA Minimum: <span className="font-bold text-slate-700 dark:text-white">90.0%</span>
          </span>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
              <span>&ge; 90% (Sangat Baik)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shadow-sm shadow-sky-400" />
              <span>80% - 89% (Optimal)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-400" />
              <span>&lt; 80% (Perhatian)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrendPanelSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5">
      <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800 mb-2" />
      <div className="h-3 w-72 rounded bg-slate-100 dark:bg-slate-800/60 mb-6" />
      <div className="h-48 rounded bg-slate-50 dark:bg-[#070f26] flex items-end gap-2 p-3">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-slate-200 dark:bg-slate-800"
            style={{ height: `${40 + (i % 5) * 12}%` }}
          />
        ))}
      </div>
    </div>
  );
}
