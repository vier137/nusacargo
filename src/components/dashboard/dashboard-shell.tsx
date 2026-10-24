"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV = [
  {
    href: "/shipments",
    label: "Pengiriman",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    badge: "6",
  },
  {
    href: "/analytics",
    label: "Analitik & SLA",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Pengaturan Sistem",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/playground",
    label: "UI Playground",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.startsWith("/shipments")) return "Pengiriman";
    if (pathname.startsWith("/analytics")) return "Analitik SLA";
    if (pathname.startsWith("/settings")) return "Pengaturan";
    if (pathname.startsWith("/playground")) return "Playground UI";
    return "Control Tower";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060b19] text-slate-900 dark:text-white transition-colors duration-200">
      {/* 1. Backdrop Overlay untuk Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="presentation"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* 2. Sidebar Desktop & Drawer Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-64 border-r border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#070e24] flex flex-col justify-between p-4 shadow-xl lg:shadow-none transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Logo Brand & Tombol Close (Mobile) */}
          <div className="flex items-center justify-between px-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700 text-xs font-black text-white shadow-sm shadow-sky-500/20 border border-sky-400/30 group-hover:scale-105 transition-transform">
                NC
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black tracking-wider text-slate-900 dark:text-white font-mono">
                    NusaCargo
                  </span>
                  <span className="rounded bg-sky-100 dark:bg-sky-950 px-1.5 py-0.2 text-[9px] font-bold text-sky-700 dark:text-sky-300 border border-sky-500/30">
                    TOWER
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-sky-400/60 font-mono">
                  Pusat Kendali Maritim
                </p>
              </div>
            </Link>

            {/* Tombol Silang (Close) Khusus Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup menu navigasi"
              title="Tutup Menu"
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-sky-500/30 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* List Navigasi */}
          <nav className="flex flex-col gap-1.5">
            <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-sky-400/60 font-mono">
              MODUL OPERASIONAL
            </div>
            {NAV.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white dark:bg-sky-500 dark:text-slate-950 shadow-sm dark:shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0c1a3d] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`transition-colors ${
                        isActive
                          ? "text-white dark:text-slate-950"
                          : "text-slate-400 dark:text-sky-400/60 group-hover:text-slate-700 dark:group-hover:text-sky-300"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                        isActive
                          ? "bg-blue-700 text-white dark:bg-sky-600 dark:text-slate-950"
                          : "bg-slate-200 text-slate-700 dark:bg-sky-950/80 dark:text-sky-300 dark:border dark:border-sky-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar: Dispatcher Profile & Simple Back Button */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-sky-500/20">
          <div className="rounded-xl bg-slate-50 dark:bg-[#0a1538] p-3 border border-slate-200/70 dark:border-sky-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">
                Dispatcher
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-white">Budi Prasetyo</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Hub Tg. Priok (TPK)</p>
          </div>

          {/* Tombol Back Sederhana: icon panah saja */}
          <Link
            href="/"
            title="Kembali ke Beranda"
            aria-label="Kembali ke Beranda"
            className="flex items-center justify-center rounded-xl border border-slate-200 dark:border-sky-500/20 py-2.5 text-slate-600 dark:text-sky-300 hover:bg-slate-100 dark:hover:bg-[#0c1a3d] hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </aside>

      {/* 3. Konten Utama (Margin Kiri di Desktop) */}
      <div className="lg:pl-64 flex flex-col min-h-screen min-w-0">
        {/* Sticky Topbar Responsif */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/80 dark:border-sky-500/20 bg-white/95 dark:bg-[#070e24]/90 px-3 sm:px-6 backdrop-blur-md">
          {/* Sisi Kiri Topbar: Hamburger Button (Mobile) + Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Button untuk Buka Drawer di Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka navigasi menu"
              title="Menu Navigasi"
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-sky-500/30 text-slate-700 dark:text-sky-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-white font-mono hidden sm:inline">
                CONTROL TOWER
              </span>
              <span className="hidden sm:inline">/</span>
              <span className="font-semibold text-slate-700 dark:text-sky-300 text-xs sm:text-xs">
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Sisi Kanan Topbar: Status + ThemeToggle + Quick Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-100 dark:bg-sky-950/60 px-3 py-1 text-xs text-slate-600 dark:text-sky-300 font-mono border border-transparent dark:border-sky-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400" />
              <span>Telemetry Normal</span>
            </div>

            <ThemeToggle />

            {/* Tombol Lacak: Responsif (ikon di mobile, teks di desktop) */}
            <Link
              href="/"
              title="Lacak Resi AWB"
              aria-label="Lacak Resi AWB"
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 dark:bg-sky-500 text-white dark:text-slate-950 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold hover:brightness-110 shadow-2xs transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Lacak Resi</span>
            </Link>
          </div>
        </header>

        {/* Konten Halaman: Padding Bersahabat Mobile */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 futuristic-grid">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
