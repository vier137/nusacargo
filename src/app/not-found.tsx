import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060b19] flex flex-col justify-center items-center px-4 py-16 text-center futuristic-grid text-slate-900 dark:text-white transition-colors duration-200">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-sky-950 text-blue-600 dark:text-sky-400 font-mono font-black text-2xl mb-4 border border-blue-200 dark:border-sky-500/30 shadow-md">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono">
        NOMOR RESI / TAUTAN TIDAK DITEMUKAN
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
        Nomor resi atau tautan yang Anda tuju tidak terdaftar di satelit telemetri pelacakan armada NusaCargo.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-blue-600 dark:bg-sky-500 px-5 py-2.5 text-xs font-bold text-white dark:text-slate-950 hover:brightness-110 shadow-sm transition-all"
        >
          Kembali ke Beranda & Lacak Ulang
        </Link>
        <Link
          href="/shipments"
          className="rounded-xl border border-slate-300 dark:border-sky-500/30 bg-white dark:bg-[#0a142e] px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-sky-300 hover:bg-slate-50 dark:hover:bg-sky-950/60 transition-colors"
        >
          Buka Control Tower
        </Link>
      </div>
    </div>
  );
}
