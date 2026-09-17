import Link from "next/link";
import { getShipments } from "@/lib/shipments";
import { StatusBadge } from "@/components/ui/status-badge";

export const metadata = {
  title: "Pengiriman · NusaCargo Control Tower",
  description: "Daftar pemantauan pengiriman logistik antarpulau",
};

export default async function ShipmentsPage() {
  const shipments = await getShipments();

  const total = shipments.length;
  const transitCount = shipments.filter((s) => s.status === "transit").length;
  const delayedCount = shipments.filter((s) => s.status === "tertunda").length;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Daftar Pengiriman</h1>
          <p className="text-xs text-slate-500">
            Monitoring armada kargo dan status pergerakan kontainer aktif.
          </p>
        </div>
        <Link
          href="/"
          className="text-xs text-blue-600 hover:underline"
        >
          ← Beranda Publik
        </Link>
      </div>

      {/* Tiga Kartu Metrik Ringkas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Total Pengiriman</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{total}</p>
          <p className="mt-1 text-[11px] text-slate-400">Semua rute aktif</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Sedang Transit</p>
          <p className="mt-1 text-2xl font-bold text-sky-700">{transitCount}</p>
          <p className="mt-1 text-[11px] text-slate-400">Dalam perjalanan laut & darat</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs text-slate-500">Tertunda (Delay)</p>
          <p className="mt-1 text-2xl font-bold text-rose-700">{delayedCount}</p>
          <p className="mt-1 text-[11px] text-rose-500">Perlu tindak lanjut dispatcher</p>
        </div>
      </div>

      {/* Tabel Pengiriman */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Tabel Muatan Aktif
          </h2>
          <span className="text-xs text-slate-400">{shipments.length} muatan</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-semibold text-slate-500">
              <tr>
                <th className="px-4 py-2.5">No. AWB / Resi</th>
                <th className="px-4 py-2.5">Klien</th>
                <th className="px-4 py-2.5">Rute (Asal → Tujuan)</th>
                <th className="px-4 py-2.5 text-right">Berat</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Estimasi Tiba</th>
                <th className="px-4 py-2.5">Kendaraan</th>
                <th className="px-4 py-2.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((shipment) => (
                <tr key={shipment.awb} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-medium text-blue-600">
                    <Link href={`/track/${shipment.awb}`} className="hover:underline">
                      {shipment.awb}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {shipment.client.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {shipment.origin} → {shipment.destination}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-600">
                    {shipment.weightKg} kg
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(shipment.etaISO).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {shipment.vehicle?.plateNumber ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      href={`/track/${shipment.awb}`}
                      className="rounded border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Lacak
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
