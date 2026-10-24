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
    <div className="rounded-xl border border-rose-200 bg-white p-8 text-center shadow-xs">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-600 mb-3">
        ⚠️
      </div>
      <h2 className="text-base font-bold text-slate-900">Gagal Memuat Data Analitik</h2>
      <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
        {error.message || "Terjadi kendala saat mengambil data tren atau metrik dari server."}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Coba Lagi
        </button>
        <Link
          href="/analytics"
          className="rounded-md border border-slate-300 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Muat Ulang Halaman
        </Link>
      </div>
    </div>
  );
}
