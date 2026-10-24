import { connection } from "next/server";
import { MetricCardsView } from "@/components/dashboard/metric-cards";
import { PortsPanelView } from "@/components/dashboard/ports-panel";
import { TrendPanelView } from "@/components/dashboard/trend-panel";
import { getMetrics, getPorts, getTrend } from "@/lib/dashboard";

// HALAMAN EKSPERIMEN (hapus setelah pengukuran dicatat).
// Versi SEBELUM streaming: semua data ditunggu (paralel) baru halaman dikirim.
export default async function StreamingBeforePage() {
  await connection();
  const [metrics, trend, ports] = await Promise.all([getMetrics(), getTrend(), getPorts()]);

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Analitik (tanpa streaming)</h1>
      <MetricCardsView metrics={metrics} />
      <TrendPanelView trend={trend} />
      <PortsPanelView ports={ports} />
    </main>
  );
}
