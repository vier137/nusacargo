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
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight font-mono">
            MANAJEMEN PENGIRIMAN KARGO
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitoring posisi armada kapal & truk logistik serta status pergerakan kontainer aktif.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-sky-300 shadow-2xs hover:bg-slate-50 dark:hover:bg-sky-950 transition-colors"
          >
            ← Beranda Publik
          </Link>
          <Link
            href="/analytics"
            className="rounded-lg bg-blue-600 dark:bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-white dark:text-slate-950 shadow-2xs hover:brightness-110 transition-all"
          >
            Lihat Analitik SLA →
          </Link>
        </div>
      </div>

      {/* Empat Kartu Metrik Ringkas & Futuristik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Total Kargo</p>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 dark:bg-sky-950 text-blue-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
              📦
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white font-mono">{total}</p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">Seluruh rute logistik aktif</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Sedang Transit</p>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
              🚢
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-sky-700 dark:text-sky-400 font-mono">{transitCount}</p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">Dalam perjalanan laut & darat</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Tertunda (Delay)</p>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-500/20">
              ⚠️
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-rose-700 dark:text-rose-400 font-mono">{delayedCount}</p>
          <p className="mt-1 text-[11px] text-rose-500 font-medium">Perlu mitigasi dispatcher</p>
        </div>

        <div className="rounded-xl border border-slate-200/80 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 dark:text-sky-300 uppercase tracking-wider font-mono">Tiba / Selesai</p>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              ✓
            </span>
          </div>
          <p className="mt-2 text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">{completedCount}</p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">Bongkar muat sukses</p>
        </div>
      </div>

      {/* Filter Bar (Client Component terisolasi) */}
      <ShipmentFilterBar />

      {/* Tabel Pengiriman (Server Component) */}
      {filteredShipments.length > 0 ? (
        <ShipmentTable rows={filteredShipments} />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-12 text-center shadow-2xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#070f26] text-xl mb-3 text-sky-400 border border-transparent dark:border-sky-500/20">
            🔍
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-white">
            Tidak ada pengiriman yang sesuai dengan kriteria pencarian.
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Pastikan nomor resi atau nama klien sudah benar, atau atur ulang filter status.
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
