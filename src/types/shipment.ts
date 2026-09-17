export const SHIPMENT_STATUS = [
  "dijemput",
  "transit",
  "di-pelabuhan",
  "dikirim",
  "selesai",
  "tertunda",
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUS)[number];

// Tugas Mandiri 1 Modul 2: Model relasi Vehicle dan Driver opsional
export interface Vehicle {
  plateNumber: string;
  type: "truk" | "kapal" | "pesawat";
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
}

export interface Shipment {
  awb: string; // nomor resi, contoh: NC-2026-000481
  origin: string;
  destination: string;
  status: ShipmentStatus;
  weightKg: number;
  etaISO: string;
  delayedMinutes: number;
  client: { id: string; name: string };
  vehicle?: Vehicle;
  driver?: Driver;
}

export type ShipmentSummary = Pick<Shipment, "awb" | "status" | "etaISO">;

// Tugas Mandiri 2 Modul 2: Menghitung selisih menit antara ETA dan waktu sekarang
export function getMinutesUntilETA(etaISO: string): number {
  const eta = new Date(etaISO).getTime();
  const now = Date.now();
  return Math.round((eta - now) / 60000);
}
