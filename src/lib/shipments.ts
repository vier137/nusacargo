import type { Shipment } from "@/types/shipment";

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

export async function getShipment(awb: string): Promise<Shipment | null> {
  const cleanAwb = decodeURIComponent(awb).trim().toUpperCase();
  const shipment = MOCK_SHIPMENTS.find(
    (s) => s.awb.toUpperCase() === cleanAwb
  );
  return shipment ?? null;
}

export async function getShipments(): Promise<Shipment[]> {
  return MOCK_SHIPMENTS;
}
