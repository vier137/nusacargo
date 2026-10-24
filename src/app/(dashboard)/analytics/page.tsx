import { Suspense } from "react";
import Link from "next/link";
import { getMetrics, getPorts, getTrend } from "@/lib/dashboard";
import {
  MetricCardsView,
  MetricCardsSkeleton,
} from "@/components/dashboard/metric-cards";
import {
  TrendPanelView,
  TrendPanelSkeleton,
} from "@/components/dashboard/trend-panel";
import {
  PortsPanelView,
  PortsPanelSkeleton,
} from "@/components/dashboard/ports-panel";

export const metadata = {
  title: "Analitik & Performa · NusaCargo Control Tower",
  description: "Laporan analitik ketepatan waktu dan jaringan operasional armada",
};

interface AnalyticsPageProps {
  searchParams: Promise<{ demo?: string }>;
}

async function MetricsSection() {
  const metrics = await getMetrics();
  return <MetricCardsView metrics={metrics} />;
}

async function TrendSection({ simulateError }: { simulateError?: boolean | undefined }) {
  try {
    const trend = await getTrend({ simulateError });
    return <TrendPanelView trend={trend} />;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal memuat tren ketepatan waktu";
    return (
      <div className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-white dark:bg-[#0a142e] p-6 shadow-2xs">
        <div className="flex flex-col items-center justify-center text-center py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mb-2 border border-rose-500/30">
            ⚠️
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono">Simulasi Gangguan Layanan Aktif</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md">
            {message} (Kode: HTTP 500 dari endpoint <code className="text-rose-600 dark:text-rose-400 font-mono">/api/trend?fail=1</code>).
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Link
              href="/analytics"
              className="rounded-lg bg-blue-600 dark:bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-white dark:text-slate-950 hover:brightness-110 transition-colors"
            >
              Matikan Simulasi (Tampilkan Normal)
            </Link>
            <Link
              href="/analytics?demo=error"
              className="rounded-lg border border-slate-300 dark:border-sky-500/30 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-sky-300 hover:bg-slate-50 dark:hover:bg-sky-950/50 transition-colors"
            >
              Coba Ulang Permintaan Ganjil/Genap
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

async function PortsSection() {
  const ports = await getPorts();
  return <PortsPanelView ports={ports} />;
}

export default async function AnalyticsPage({ searchParams }: AnalyticsPageProps) {
  const { demo } = await searchParams;
  const isDemoError = demo === "error";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
            ANALITIK TELEMETRI & SLA ARMADA
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pemantauan ketepatan waktu pengiriman antarpulau dan utilisasi pelabuhan singgah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isDemoError ? (
            <Link
              href="/analytics"
              className="rounded-lg bg-slate-900 dark:bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-white dark:text-slate-950 hover:brightness-110 transition-colors"
            >
              ← Kembali ke Mode Normal
            </Link>
          ) : (
            <Link
              href="/analytics?demo=error"
              className="rounded-lg border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-sky-300 hover:bg-slate-50 dark:hover:bg-sky-950 transition-colors"
              title="Menguji ketahanan sistem saat API mengalami gangguan (Modul 9)"
            >
              Uji Simulasi Error
            </Link>
          )}
        </div>
      </div>

      {/* Bagian 1: Metrik Ringkasan Utama */}
      <Suspense fallback={<MetricCardsSkeleton />}>
        <MetricsSection />
      </Suspense>

      {/* Bagian 2: Tren 14 Hari */}
      <Suspense fallback={<TrendPanelSkeleton />}>
        <TrendSection simulateError={isDemoError} />
      </Suspense>

      {/* Bagian 3: Hub Pelabuhan */}
      <Suspense fallback={<PortsPanelSkeleton />}>
        <PortsSection />
      </Suspense>
    </div>
  );
}
