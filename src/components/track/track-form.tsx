"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

const SAMPLES_META: Record<string, { label: string; badge: string }> = {
  "NC-2026-000101": { label: "Jakarta → Surabaya", badge: "Transit" },
  "NC-2026-000102": { label: "Medan → Batam", badge: "Di Pelabuhan" },
  "NC-2026-000103": { label: "Surabaya → Makassar", badge: "Tertunda" },
};

export function TrackForm({ samples }: { samples: readonly string[] }) {
  const [awbInput, setAwbInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    if (!awbInput.trim()) return;
    setIsLoading(true);
    router.push(`/track/${encodeURIComponent(awbInput.trim().toUpperCase())}`);
  };

  const handleSampleClick = (resi: string) => {
    setAwbInput(resi);
    setIsLoading(true);
    router.push(`/track/${encodeURIComponent(resi)}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleTrack} className="space-y-3">
        <label htmlFor="awb-input" className="block text-xs font-bold text-slate-700 dark:text-sky-300 uppercase tracking-wider font-mono">
          Nomor Resi / AWB Telemetri Kargo
        </label>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-sky-400/70">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="awb-input"
              type="text"
              value={awbInput}
              onChange={(e) => setAwbInput(e.target.value)}
              placeholder="Contoh format: NC-2026-000101"
              className="h-12 w-full rounded-xl border border-slate-300 dark:border-sky-500/30 bg-white dark:bg-[#070f26] pl-11 pr-4 text-sm font-mono font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-2xs transition-all focus:border-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 dark:from-sky-500 dark:to-blue-600 px-7 text-sm font-bold text-white dark:text-slate-950 shadow-md shadow-sky-500/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white dark:border-slate-950 border-t-transparent" />
                <span>Mencari...</span>
              </>
            ) : (
              <>
                <span>Lacak Sekarang</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Rekomendasi / Contoh Resi Uji Coba Cepat */}
      <div className="rounded-xl bg-slate-50 dark:bg-[#070e22] p-3.5 border border-slate-200/80 dark:border-sky-500/20">
        <p className="text-[11px] font-semibold text-slate-500 dark:text-sky-300/70 mb-2">
          Uji coba cepat nomor resi simulasi:
        </p>
        <div className="flex flex-wrap gap-2">
          {samples.map((resi) => {
            const meta = SAMPLES_META[resi];
            return (
              <button
                key={resi}
                type="button"
                onClick={() => handleSampleClick(resi)}
                className="group flex items-center gap-2 rounded-lg border border-slate-200 dark:border-sky-500/30 bg-white dark:bg-[#0a1538] px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 shadow-2xs transition-all hover:border-sky-400 dark:hover:border-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/60 cursor-pointer"
              >
                <span className="font-mono font-bold text-blue-600 dark:text-sky-400 group-hover:underline">
                  {resi}
                </span>
                {meta && (
                  <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-600 dark:text-slate-300">
                    {meta.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
