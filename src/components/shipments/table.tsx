import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Shipment } from "@/types/shipment";

function getVehicleIcon(type?: string) {
  switch (type) {
    case "kapal":
      return { icon: "🚢", label: "Kapal Laut" };
    case "pesawat":
      return { icon: "✈️", label: "Kargo Udara" };
    default:
      return { icon: "🚛", label: "Truk Darat" };
  }
}

export function ShipmentTable({ rows }: { rows: Shipment[] }) {
  return (
    <div className="rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] overflow-hidden shadow-xs transition-colors duration-200">
      {/* Header Tabel / Card */}
      <div className="border-b border-slate-200/80 dark:border-sky-500/20 px-4 sm:px-5 py-3 sm:py-3.5 bg-slate-50/70 dark:bg-[#070e24] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse shadow-sm shadow-sky-400" />
          <h2 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono">
            Manifes Muatan Aktif
          </h2>
        </div>
        <span className="rounded-full bg-slate-200/80 dark:bg-sky-950 px-2.5 py-0.5 text-[11px] sm:text-xs font-bold text-slate-700 dark:text-sky-300 font-mono border border-transparent dark:border-sky-500/30">
          {rows.length} kargo
        </span>
      </div>

      {/* 1. Tampilan Khusus Mobile: List Kartu Kargo Rapi (md:hidden) */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/80 md:hidden">
        {rows.map((shipment) => {
          const vehicle = getVehicleIcon(shipment.vehicle?.type);
          const isLate = shipment.delayedMinutes > 0;

          return (
            <div
              key={shipment.awb}
              className="p-4 hover:bg-blue-50/30 dark:hover:bg-sky-950/20 transition-colors space-y-3"
            >
              {/* Header Kartu: AWB + Status */}
              <div className="flex items-center justify-between gap-2">
                <Link
                  href={`/track/${shipment.awb}`}
                  className="font-mono text-sm font-bold text-blue-600 dark:text-sky-400 hover:underline"
                >
                  {shipment.awb}
                </Link>
                <StatusBadge status={shipment.status} />
              </div>

              {/* Rute & Kendaraan */}
              <div className="rounded-lg bg-slate-50 dark:bg-[#070f26] p-2.5 border border-slate-100 dark:border-sky-500/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{shipment.origin.split(" ")[0]}</span>
                  <span className="text-slate-400 dark:text-sky-400">→</span>
                  <span>{shipment.destination.split(" ")[0]}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400">
                  <span className="truncate max-w-[170px]">{shipment.client.name}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <span>{vehicle.icon}</span>
                    <span>{shipment.vehicle?.plateNumber ?? "-"}</span>
                  </span>
                </div>
              </div>

              {/* Berat, ETA & Tombol Detail */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-[11px] space-y-0.5">
                  <div className="text-slate-500 dark:text-slate-400">
                    ETA:{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {new Date(shipment.etaISO).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Jakarta",
                      })}
                    </span>
                    {isLate && (
                      <span className="ml-1 font-semibold text-rose-600 dark:text-rose-400">
                        (+{shipment.delayedMinutes}m)
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-slate-400 dark:text-slate-500">
                    Muatan: <span className="font-semibold text-slate-700 dark:text-slate-300">{shipment.weightKg} kg</span>
                  </div>
                </div>

                <Link
                  href={`/track/${shipment.awb}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-50 dark:bg-sky-950/80 border border-blue-200 dark:border-sky-500/30 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-sky-300 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-slate-950 transition-all"
                >
                  <span>Detail</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Tampilan Khusus Tablet & Desktop: Tabel Data Lengkap (hidden md:block) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-200">
          <thead className="border-b border-slate-200 dark:border-sky-500/20 bg-slate-50/50 dark:bg-[#070e24]/70 text-[11px] font-semibold text-slate-500 dark:text-sky-300/80 uppercase tracking-wider font-mono">
            <tr>
              <th scope="col" className="px-5 py-3">No. AWB / Resi</th>
              <th scope="col" className="px-4 py-3">Klien Korporat</th>
              <th scope="col" className="px-4 py-3">Rute Pelabuhan</th>
              <th scope="col" className="px-4 py-3 text-right">Berat Muatan</th>
              <th scope="col" className="px-4 py-3">Status Terkini</th>
              <th scope="col" className="px-4 py-3">Estimasi Tiba (ETA)</th>
              <th scope="col" className="px-4 py-3">Armada Pengangkut</th>
              <th scope="col" className="px-5 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {rows.map((shipment) => {
              const vehicle = getVehicleIcon(shipment.vehicle?.type);
              const isLate = shipment.delayedMinutes > 0;

              return (
                <tr
                  key={shipment.awb}
                  className="hover:bg-blue-50/40 dark:hover:bg-sky-950/30 transition-colors group"
                >
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-600 dark:text-sky-400">
                    <Link
                      href={`/track/${shipment.awb}`}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>{shipment.awb}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </td>

                  <td className="px-4 py-3.5 font-medium text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 dark:bg-sky-950 text-[10px] font-bold text-slate-600 dark:text-sky-300 border border-transparent dark:border-sky-500/20">
                        {shipment.client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[140px]">{shipment.client.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span>{shipment.origin.split(" ")[0]}</span>
                      <span className="text-slate-400 dark:text-sky-500">→</span>
                      <span>{shipment.destination.split(" ")[0]}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate max-w-[160px]">
                      {shipment.origin} ke {shipment.destination}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right font-mono font-medium text-slate-800 dark:text-slate-200">
                    {shipment.weightKg.toLocaleString("id-ID")} kg
                  </td>

                  <td className="px-4 py-3.5">
                    <StatusBadge status={shipment.status} />
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {new Date(shipment.etaISO).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Jakarta",
                      })}
                    </div>
                    {isLate && (
                      <span className="inline-block mt-0.5 rounded bg-rose-50 dark:bg-rose-950/80 px-1.5 py-0.2 text-[10px] font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30">
                        +{shipment.delayedMinutes}m delay
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <span title={vehicle.label}>{vehicle.icon}</span>
                      <span className="font-mono text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        {shipment.vehicle?.plateNumber ?? "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <Link
                      href={`/track/${shipment.awb}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-sky-500/30 bg-white dark:bg-[#070f26] px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:text-sky-300 shadow-2xs hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500 dark:hover:text-slate-950 transition-all"
                    >
                      <span>Detail</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
