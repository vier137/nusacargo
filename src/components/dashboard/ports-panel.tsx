import type { Port } from "@/types/dashboard";

function getIslandBadge(island: string) {
  switch (island.toLowerCase()) {
    case "sumatra":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30";
    case "jawa":
      return "bg-blue-50 text-blue-700 dark:bg-sky-950/80 dark:text-sky-300 border-blue-200 dark:border-sky-500/30";
    case "sulawesi":
      return "bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-500/30";
    case "kalimantan":
      return "bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-500/30";
    case "papua":
      return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30";
    default:
      return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
  }
}

export function PortsPanelView({ ports }: { ports: Port[] }) {
  return (
    <div className="rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5 shadow-2xs">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 dark:border-sky-500/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 dark:bg-sky-950 text-blue-600 dark:text-sky-400 text-xs border border-sky-500/20">
            ⚓
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              JARINGAN PELABUHAN & HUB MARITIM
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Terminal singgah dan bongkar muat armada Nusantara</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 dark:bg-sky-950 px-3 py-1 text-xs font-bold text-slate-700 dark:text-sky-300 font-mono border border-transparent dark:border-sky-500/30">
          {ports.length} Hub Terkoneksi
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ports.map((port) => (
          <div
            key={port.code}
            className="group flex items-center justify-between rounded-lg border border-slate-200/80 dark:border-sky-500/20 bg-slate-50/40 dark:bg-[#070f26] p-3.5 hover:border-blue-400 dark:hover:border-sky-400 hover:bg-white dark:hover:bg-[#0c1a3f] transition-all"
          >
            <div className="space-y-1">
              <p className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                {port.name}
              </p>
              <div className="flex items-center gap-2">
                <span className={`rounded border px-1.5 py-0.2 text-[10px] font-semibold ${getIslandBadge(port.island)}`}>
                  {port.island}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
                  Aktif
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-sky-950 px-2.5 py-1.5 rounded-md border border-blue-200/80 dark:border-sky-500/30 shadow-2xs">
              {port.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortsPanelSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5">
      <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800 mb-2" />
      <div className="h-3 w-60 rounded bg-slate-100 dark:bg-slate-800/60 mb-4" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-16 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070f26]" />
        ))}
      </div>
    </div>
  );
}
