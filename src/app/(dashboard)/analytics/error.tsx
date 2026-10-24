"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Analytics error boundary caught:", error);
  }, [error]);

  return (
    <div className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-white dark:bg-[#0a142e] p-8 text-center shadow-xs">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950 text-xl text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-500/30">
        ⚠️
      </div>
      <h2 className="text-base font-bold text-slate-900 dark:text-white font-mono">Gagal Memuat Data Analitik</h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        {error.message || "Terjadi kendala saat mengambil data tren atau metrik dari server."}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-blue-600 dark:bg-sky-500 px-4 py-2 text-xs font-bold text-white dark:text-slate-950 hover:brightness-110 transition-all cursor-pointer shadow-2xs"
        >
          Coba Lagi
        </button>
        <Link
          href="/analytics"
          className="rounded-lg border border-slate-300 dark:border-sky-500/30 bg-white dark:bg-[#070f26] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-sky-300 hover:bg-slate-50 dark:hover:bg-sky-950 transition-colors"
        >
          Muat Ulang
        </Link>
      </div>
    </div>
  );
}
