import Link from "next/link";
import { TrackForm } from "@/components/track/track-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const metadata = {
  title: "NusaCargo · Solusi Ekspedisi & Logistik Antarpulau Terintegrasi",
  description: "Sistem pemantauan armada kargo dan pelacakan kontainer maritim di seluruh pelabuhan utama Indonesia.",
};

export default function Home() {
  const sampleResi = ["NC-2026-000101", "NC-2026-000102", "NC-2026-000103"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060b19] text-slate-900 dark:text-white flex flex-col justify-between selection:bg-sky-500 selection:text-white futuristic-grid transition-colors duration-200">
      {/* Navbar Futuristik */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-sky-500/20 bg-white/85 dark:bg-[#070e24]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-sky-600 to-indigo-600 text-sm font-black text-white shadow-md shadow-sky-500/25 border border-sky-400/30">
              NC
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-slate-950 dark:text-white block leading-none font-mono">
                NUSACARGO
              </span>
              <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                TELEMETRY & LOGISTICS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-500/30 bg-sky-50/70 dark:bg-sky-950/50 px-3 py-1 text-[11px] font-semibold text-sky-800 dark:text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse shadow-sm shadow-sky-400" />
              <span>Satelit Maritim Aktif</span>
            </div>

            {/* Tombol Pengubah Mode Gelap/Terang */}
            <ThemeToggle />

            <Link
              href="/shipments"
              className="flex items-center gap-1.5 rounded-xl bg-slate-950 dark:bg-sky-500 text-white dark:text-slate-950 px-3 sm:px-4 py-2 text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all dark:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              <span className="hidden sm:inline">Control Tower</span>
              <span className="sm:hidden">Tower</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Konten Utama Hero */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          {/* Badge Futuristik */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 dark:border-sky-500/30 bg-sky-50/80 dark:bg-[#0b1836] px-4 py-1.5 text-xs font-semibold text-sky-800 dark:text-sky-300 shadow-sm dark:shadow-[0_0_15px_rgba(56,189,248,0.15)] mb-6">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping" />
            <span>Sistem Orkestrasi Maritim & Distribusi Multimoda Terpadu</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-6xl leading-tight">
            Pantau Kargo Maritim <br />
            <span className="bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-500 dark:from-white dark:via-sky-300 dark:to-cyan-400 bg-clip-text text-transparent">
              Presisi & Real-Time
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Lacak pergerakan kontainer FCL/LCL dan posisi armada kapal kargo yang melintasi jalur pelabuhan utama Indonesia mulai dari Tanjung Priok, Perak, Belawan hingga Makassar.
          </p>

          {/* Kotak Form Lacak Resi (HUD Card) */}
          <div className="mt-10 rounded-2xl border border-slate-200/90 dark:border-sky-500/30 bg-white/95 dark:bg-[#0a142e]/90 p-6 sm:p-8 shadow-xl dark:shadow-[0_0_35px_rgba(56,189,248,0.12)] backdrop-blur-md text-left">
            <TrackForm samples={sampleResi} />
          </div>

          {/* Statistik Kunci Armada (Futuristic HUD Metrics) */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 text-left">
            <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white/80 dark:bg-[#0a142e]/60 p-4 shadow-2xs dark:backdrop-blur-sm">
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">6 HUB</p>
              <p className="text-xs text-slate-500 dark:text-sky-300/70 mt-0.5">Pelabuhan Strategis</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white/80 dark:bg-[#0a142e]/60 p-4 shadow-2xs dark:backdrop-blur-sm">
              <p className="text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">&gt; 90%</p>
              <p className="text-xs text-slate-500 dark:text-sky-300/70 mt-0.5">Ketepatan Waktu (SLA)</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white/80 dark:bg-[#0a142e]/60 p-4 shadow-2xs dark:backdrop-blur-sm">
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">LIVE GPS</p>
              <p className="text-xs text-slate-500 dark:text-sky-300/70 mt-0.5">Telemetri Armada</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white/80 dark:bg-[#0a142e]/60 p-4 shadow-2xs dark:backdrop-blur-sm">
              <p className="text-2xl font-black text-indigo-600 dark:text-cyan-400 font-mono">24 / 7</p>
              <p className="text-xs text-slate-500 dark:text-sky-300/70 mt-0.5">Pusat Kendali Tower</p>
            </div>
          </div>

          {/* Layanan Unggulan */}
          <div className="mt-16 text-left">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center tracking-tight">
              Infrastruktur Logistik Antarpulau Generasi Baru
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="group rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e]/80 p-5 shadow-2xs transition-all hover:border-sky-400 dark:hover:border-sky-400 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-sky-950 text-blue-600 dark:text-sky-400 text-lg mb-3 border border-sky-500/20 group-hover:scale-110 transition-transform">
                  ⚓
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pelayaran Maritim Antarpulau</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                  Layanan kontainer FCL & LCL menghubungkan rute strategis Tanjung Priok, Tanjung Perak, Belawan, Makassar, dan Balikpapan.
                </p>
              </div>

              <div className="group rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e]/80 p-5 shadow-2xs transition-all hover:border-sky-400 dark:hover:border-sky-400 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-lg mb-3 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                  🚛
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Distribusi Darat Terhubung GPS</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                  Armada truk tronton dan kontainer pendingin terhubung telematika satelit untuk pengantaran langsung ke pintu penerima (*door-to-door*).
                </p>
              </div>

              <div className="group rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e]/80 p-5 shadow-2xs transition-all hover:border-sky-400 dark:hover:border-sky-400 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-lg mb-3 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  📡
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Control Tower 24/7 & Alerting</h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                  Pusat kendali operasional pintar yang secara proaktif mendeteksi kendala cuaca, antrean pelabuhan, dan potensi keterlambatan.
                </p>
              </div>
            </div>
          </div>

          {/* Banner Akses Dispatcher */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between rounded-xl border border-blue-200/80 dark:border-sky-500/30 bg-gradient-to-r from-blue-50/70 via-indigo-50/60 to-white dark:from-[#0a142e] dark:via-[#0c1a3d] dark:to-[#081026] p-6 shadow-xs text-left">
            <div>
              <span className="rounded bg-blue-100 dark:bg-sky-950 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-sky-300 border border-sky-400/20">PORTAL OPERASIONAL</span>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">Petugas Dispatcher Pelabuhan?</p>
              <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5">
                Akses dashboard internal untuk memantau seluruh manifes kontainer aktif dan performa SLA hari ini.
              </p>
            </div>
            <Link
              href="/shipments"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 dark:bg-sky-500 text-white dark:text-slate-950 px-5 py-2.5 text-xs font-bold hover:brightness-110 shadow-sm transition-all whitespace-nowrap"
            >
              <span>Buka Control Tower</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Elegan */}
      <footer className="border-t border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#070e24] py-6">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 px-4 text-xs text-slate-500 dark:text-slate-400 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-200 font-mono">NusaCargo Telemetry</span>
            <span>·</span>
            <span>Platform Orkestrasi Maritim & Logistik Antarpulau</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/shipments" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Pengiriman</Link>
            <Link href="/analytics" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Analitik SLA</Link>
            <Link href="/settings" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Pengaturan</Link>
            <Link href="/playground" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Playground UI</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
