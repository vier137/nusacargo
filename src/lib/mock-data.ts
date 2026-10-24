// Sumber data tiruan (stand-in untuk API perusahaan). Modul 8 akan menggantinya
// dengan berkas JSON >= 120 baris. Data pengiriman di bawah dipindahkan dari
// lib/shipments.ts milikmu tanpa perubahan.
import type { Shipment } from "@/types/shipment";
import type { Metrics, Port, Trend } from "@/types/dashboard";

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export const PORTS: Port[] = [
  { code: "BLW", name: "Belawan", island: "Sumatra" },
  { code: "TPK", name: "Tanjung Priok", island: "Jawa" },
  { code: "SUB", name: "Tanjung Perak", island: "Jawa" },
  { code: "MAK", name: "Makassar", island: "Sulawesi" },
  { code: "BPN", name: "Balikpapan", island: "Kalimantan" },
  { code: "SOQ", name: "Sorong", island: "Papua" },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    awb: "NC-2026-000101",
    origin: "Jakarta (Tanjung Priok)",
    destination: "Surabaya (Tanjung Perak)",
    status: "transit",
    weightKg: 1250,
    etaISO: "2026-09-18T14:00:00Z",
    delayedMinutes: 0,
    client: { id: "CL-01", name: "PT Maju Logistik" },
    vehicle: { plateNumber: "B 9123 KGO", type: "truk" },
    driver: { id: "DR-01", name: "Agus Santoso", phone: "081234567890" },
  },
  {
    awb: "NC-2026-000102",
    origin: "Medan (Belawan)",
    destination: "Batam (Batu Ampar)",
    status: "di-pelabuhan",
    weightKg: 420,
    etaISO: "2026-09-19T09:30:00Z",
    delayedMinutes: 45,
    client: { id: "CL-02", name: "CV Sumber Makmur" },
    vehicle: { plateNumber: "KM NUSA-08", type: "kapal" },
  },
  {
    awb: "NC-2026-000103",
    origin: "Surabaya (Tanjung Perak)",
    destination: "Makassar (Soekarno-Hatta)",
    status: "tertunda",
    weightKg: 3100,
    etaISO: "2026-09-20T17:00:00Z",
    delayedMinutes: 180,
    client: { id: "CL-03", name: "PT Nusantara Bahari" },
    vehicle: { plateNumber: "KM BINTANG-02", type: "kapal" },
  },
  {
    awb: "NC-2026-000104",
    origin: "Bandung (Gedebage)",
    destination: "Semarang (Tanjung Emas)",
    status: "dikirim",
    weightKg: 150,
    etaISO: "2026-09-17T21:00:00Z",
    delayedMinutes: 0,
    client: { id: "CL-04", name: "Toko Berkah Elektronik" },
    vehicle: { plateNumber: "D 8421 BB", type: "truk" },
  },
  {
    awb: "NC-2026-000105",
    origin: "Balikpapan (Semayang)",
    destination: "Samarinda (Palaran)",
    status: "selesai",
    weightKg: 850,
    etaISO: "2026-09-17T11:00:00Z",
    delayedMinutes: 0,
    client: { id: "CL-05", name: "PT Indo Pangan Jaya" },
    vehicle: { plateNumber: "KT 7721 LK", type: "truk" },
  },
  {
    awb: "NC-2026-000106",
    origin: "Jakarta (Halim)",
    destination: "Banjarmasin (Syamsudin Noor)",
    status: "dijemput",
    weightKg: 240,
    etaISO: "2026-09-18T10:00:00Z",
    delayedMinutes: 0,
    client: { id: "CL-06", name: "CV Borneo Express" },
    vehicle: { plateNumber: "PK-NCA", type: "pesawat" },
  },
];

export function buildMetrics(): Metrics {
  const total = MOCK_SHIPMENTS.length;
  // "Tertunda" mengikuti definisi halaman /shipments: status === "tertunda".
  const delayed = MOCK_SHIPMENTS.filter((s) => s.status === "tertunda").length;
  const inTransit = MOCK_SHIPMENTS.filter((s) => s.status === "transit").length;
  // Ketepatan waktu lebih ketat: pengiriman dengan menit keterlambatan apa pun dihitung terlambat.
  const late = MOCK_SHIPMENTS.filter((s) => s.delayedMinutes > 0).length;
  return {
    totalShipments: total,
    inTransit,
    delayed,
    ontimeRate: Math.round(((total - late) / total) * 1000) / 10,
    generatedAt: new Date().toISOString(),
  };
}

const dayLabel = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  timeZone: "Asia/Jakarta",
});

export function buildTrend(): Trend {
  const points = Array.from({ length: 14 }, (_, i) => {
    const daysAgo = 13 - i;
    return {
      day: dayLabel.format(new Date(Date.now() - daysAgo * 86_400_000)),
      ontimeRate: Math.round((86 + 6 * Math.sin(i / 2) + (i % 3)) * 10) / 10,
    };
  });
  return { points, generatedAt: new Date().toISOString() };
}
