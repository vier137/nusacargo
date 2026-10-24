import Link from "next/link";
import { getShipments } from "@/lib/shipments";
import { ShipmentFilterBar } from "@/components/shipments/filter-bar";
import { ShipmentTable } from "@/components/shipments/table";

export const metadata = {
  title: "Daftar Pengiriman · NusaCargo Control Tower",
  description: "Daftar pemantauan pengiriman logistik antarpulau",
};

interface ShipmentsPageProps {
  searchParams: Promise<{ q?: string; status?: string }>;
}

export default async function ShipmentsPage({ searchParams }: ShipmentsPageProps) {
  const { q, status } = await searchParams;
  const shipments = await getShipments();

  const total = shipments.length;
  const transitCount = shipments.filter((s) => s.status === "transit").length;
  const delayedCount = shipments.filter((s) => s.status === "tertunda").length;
  const completedCount = shipments.filter((s) => s.status === "selesai").length;

  const query = q?.trim().toLowerCase() ?? "";
  const selectedStatus = status?.trim().toLowerCase() ?? "all";

  const filteredShipments = shipments.filter((s) => {
    const matchesQuery =
      !query ||
      s.awb.toLowerCase().includes(query) ||
      s.client.name.toLowerCase().includes(query) ||
      s.origin.toLowerCase().includes(query) ||
      s.destination.toLowerCase().includes(query);

    const matchesStatus =
      selectedStatus === "all" || s.status.toLowerCase() === selectedStatus;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page Title & Actions: Simpel & Responsif */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight font-mono truncate">
            PENGIRIMAN KARGO
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
            Monitoring armada kargo dan status kontainer aktif.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Tombol Back Sederhana: icon panah saja */}
          <Link
            href="/"
            title="Kembali ke Beranda"
            aria-label="Kembali ke Beranda"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] text-slate-700 dark:text-sky-300 shadow-2xs hover:bg-slate-100 dark:hover:bg-sky-950 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>

          <Link
            href="/analytics"
            title="Buka Analitik SLA"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 dark:bg-sky-500 px-3 py-2 text-xs font-bold text-white dark:text-slate-950 shadow-2xs hover:brightness-110 transition-all"
          >
            <span className="hidden sm:inline">Analitik SLA</span>
            <span className="sm:hidden">SLA</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* 4 Kartu Metrik Ringkas: 2 Kolom di Mobile, 4 di Desktop */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Total</p>
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-sky-950 text-blue-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
              📦
            </span>
          </div>
          <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-mono">{total}</p>
          <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate">Rute aktif</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Transit</p>
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
              🚢
            </span>
          </div>
          <p className="mt-1 text-2xl sm:text-3xl font-black text-sky-700 dark:text-sky-400 font-mono">{transitCount}</p>
          <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate">Dalam perjalanan</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Delay</p>
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20">
              ⚠️
            </span>
          </div>
          <p className="mt-1 text-2xl sm:text-3xl font-black text-rose-700 dark:text-rose-400 font-mono">{delayedCount}</p>
          <p className="text-[10px] sm:text-[11px] text-rose-500 font-medium truncate">Perlu mitigasi</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-3 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Selesai</p>
            <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              ✓
            </span>
          </div>
          <p className="mt-1 text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">{completedCount}</p>
          <p className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate">Bongkar muat</p>
        </div>
      </div>

      {/* Filter Bar */}
      <ShipmentFilterBar />

      {/* Tabel & Card View Pengiriman */}
      {filteredShipments.length > 0 ? (
        <ShipmentTable rows={filteredShipments} />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-8 sm:p-12 text-center shadow-2xs">
          <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#070f26] text-lg sm:text-xl mb-3 text-sky-400 border border-transparent dark:border-sky-500/20">
            🔍
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">
            Tidak ada pengiriman yang sesuai.
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Atur ulang kata kunci pencarian atau filter status.
          </p>
          <Link
            href="/shipments"
            className="mt-4 inline-block rounded-lg bg-blue-600 dark:bg-sky-500 px-4 py-2 text-xs font-bold text-white dark:text-slate-950 hover:brightness-110 transition-colors"
          >
            Hapus Semua Filter
          </Link>
        </div>
      )}
    </div>
  );
}
