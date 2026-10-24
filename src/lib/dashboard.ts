import "server-only";
import type { Metrics, Port, Trend } from "@/types/dashboard";
import { fetchJson } from "@/lib/api";

// 1) Data hampir statis -> cache penuh.
//    Catatan: di Next.js 15+ fetch TIDAK lagi di-cache secara bawaan, jadi
//    cache penuh harus ditulis eksplisit dengan cache: "force-cache".
export async function getPorts(): Promise<Port[]> {
  try {
    return await fetchJson<Port[]>(
      "/ports",
      { cache: "force-cache", next: { tags: ["ports"] } },
      "Gagal memuat daftar pelabuhan",
    );
  } catch {
    const { PORTS } = await import("@/lib/mock-data");
    return PORTS;
  }
}

// 2) Ringkasan harian -> revalidasi berkala.
export async function getMetrics(): Promise<Metrics> {
  try {
    return await fetchJson<Metrics>(
      "/metrics",
      { next: { revalidate: 30, tags: ["metrics"] } },
      "Gagal memuat ringkasan metrik",
    );
  } catch {
    const { buildMetrics } = await import("@/lib/mock-data");
    return buildMetrics();
  }
}

// Tren 14 hari -> revalidasi berkala.
// simulateError hanya untuk demo error.tsx (lihat /analytics?demo=error).
export async function getTrend(opts: { simulateError?: boolean | undefined } = {}): Promise<Trend> {
  const simulate = opts.simulateError === true;
  try {
    return await fetchJson<Trend>(
      simulate ? "/trend?fail=1" : "/trend",
      simulate ? { cache: "no-store" } : { next: { revalidate: 30, tags: ["trend"] } },
      "Gagal memuat tren ketepatan waktu",
    );
  } catch (err) {
    if (simulate) throw err;
    const { buildTrend } = await import("@/lib/mock-data");
    return buildTrend();
  }
}
