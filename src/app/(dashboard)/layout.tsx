import type { ReactNode } from "react";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[260px_1fr] bg-slate-50 dark:bg-[#060b19] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Sidebar Navigasi Kiri */}
      <aside className="border-r border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#070e24] flex flex-col justify-between p-4 shadow-2xs">
        <div className="space-y-6">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 px-2 py-1 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 text-xs font-black text-white shadow-sm shadow-sky-500/20 border border-sky-400/30 group-hover:scale-105 transition-transform">
              NC
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-wider text-slate-900 dark:text-white font-mono">NusaCargo</span>
                <span className="rounded bg-sky-100 dark:bg-sky-950 px-1.5 py-0.2 text-[9px] font-bold text-sky-700 dark:text-sky-300 border border-sky-500/30">TOWER</span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-sky-400/60 font-mono">Pusat Kendali Maritim</p>
            </div>
          </Link>

          {/* Navigasi Utama */}
          <DashboardNav />
        </div>

        {/* Footer Sidebar: Info Dispatcher Aktif */}
        <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-sky-500/20">
          <div className="rounded-xl bg-slate-50 dark:bg-[#0a1538] p-3 border border-slate-200/70 dark:border-sky-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">
                Sesi Dispatcher
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">Budi Prasetyo</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Hub Tg. Priok (TPK)</p>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-sky-500/20 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            ← Keluar ke Beranda Publik
          </Link>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <div className="flex flex-col min-w-0">
        {/* Topbar Ringkas */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-200/80 dark:border-sky-500/20 bg-white/95 dark:bg-[#070e24]/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-white font-mono">CONTROL TOWER</span>
            <span>/</span>
            <span className="text-slate-500 dark:text-sky-300/70">Pemantauan Antarpulau</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-100 dark:bg-sky-950/60 px-3 py-1 text-xs text-slate-600 dark:text-sky-300 font-mono border border-transparent dark:border-sky-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400" />
              <span>Telemetry Normal (WIB)</span>
            </div>

            {/* Toggle Mode Gelap / Terang */}
            <ThemeToggle />

            <Link
              href="/"
              className="rounded-lg bg-blue-600 dark:bg-sky-500 text-white dark:text-slate-950 px-3.5 py-1.5 text-xs font-bold hover:brightness-110 shadow-2xs transition-all"
            >
              Lacak Resi
            </Link>
          </div>
        </header>

        {/* Konten Halaman */}
        <main className="flex-1 p-6 md:p-8 futuristic-grid">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
