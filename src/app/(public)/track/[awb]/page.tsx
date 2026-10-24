import { notFound } from "next/navigation";
import { getShipment } from "@/lib/shipments";
import { StatusBadge } from "@/components/ui/status-badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CloseDetailButton } from "@/components/track/close-button";

type Props = { params: Promise<{ awb: string }> };

export async function generateMetadata({ params }: Props) {
  const { awb } = await params;
  return {
    title: `Detail Muatan ${awb} · NusaCargo Telemetry`,
    description: `Rincian status posisi terkini pengiriman kontainer ${awb} pada jaringan NusaCargo.`,
  };
}

export default async function TrackPage({ params }: Props) {
  const { awb } = await params;
  const shipment = await getShipment(awb);

  if (!shipment) {
    return notFound();
  }

  const steps = [
    { label: "Dijemput", desc: "Muatan diambil dari gudang pengirim", key: "dijemput" },
    { label: "Di Pelabuhan", desc: "Pemeriksaan kontainer & manifes dermaga", key: "di-pelabuhan" },
    { label: "Transit Maritim", desc: "Pelayaran kapal melintasi rute antarpulau", key: "transit" },
    { label: "Proses Antar", desc: "Truk distribusi menuju titik tujuan", key: "dikirim" },
    { label: "Tiba & Diterima", desc: "Kargo diterima oleh pihak penerima", key: "selesai" },
  ];

  const statusIndexMap: Record<string, number> = {
    dijemput: 0,
    "di-pelabuhan": 1,
    transit: 2,
    dikirim: 3,
    selesai: 4,
    tertunda: 2,
  };

  const currentStep = statusIndexMap[shipment.status] ?? 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060b19] py-8 sm:py-12 px-4 sm:px-6 futuristic-grid text-slate-900 dark:text-white transition-colors duration-200 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl">
        {/* Topbar Bersih */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50/70 dark:bg-sky-950/60 px-3 py-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400" />
            <span className="text-xs font-mono text-sky-800 dark:text-sky-300 font-semibold">Live Satellite Tracking</span>
          </div>

          <ThemeToggle />
        </div>

        {/* Kartu Utama Rincian Pengiriman (HUD Modal Card) */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-sky-500/30 bg-white/95 dark:bg-[#0a142e]/90 p-6 sm:p-8 shadow-xl dark:shadow-[0_0_35px_rgba(56,189,248,0.12)] backdrop-blur-md relative">
          {/* Header Resi dengan Tombol Silang (✕) */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-sky-500/20 pb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-sky-400/70 font-mono">
                TELEMETRI SURAT JALAN (AWB)
              </span>
              <h1 id="judul" className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white font-mono tracking-tight mt-0.5">
                {shipment.awb}
              </h1>
            </div>

            <div className="flex items-center gap-2.5">
              <StatusBadge status={shipment.status} />
              
              {/* Tombol Silang (✕) untuk menutup tampilan detail */}
              <CloseDetailButton />
            </div>
          </div>

          {/* Rincian Muatan Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-xs sm:grid-cols-4 border-b border-slate-100 dark:border-sky-500/20 pb-6">
            <div className="rounded-xl bg-slate-50 dark:bg-[#070f26] p-3.5 border border-slate-100 dark:border-sky-500/20">
              <p className="text-slate-400 dark:text-sky-300/70 font-medium">Klien Korporat</p>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{shipment.client.name}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-[#070f26] p-3.5 border border-slate-100 dark:border-sky-500/20">
              <p className="text-slate-400 dark:text-sky-300/70 font-medium">Berat Muatan</p>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 font-mono">{shipment.weightKg.toLocaleString("id-ID")} kg</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-[#070f26] p-3.5 border border-slate-100 dark:border-sky-500/20">
              <p className="text-slate-400 dark:text-sky-300/70 font-medium">Pelabuhan Asal</p>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 truncate">{shipment.origin}</p>
            </div>
            <div className="rounded-xl bg-slate-50 dark:bg-[#070f26] p-3.5 border border-slate-100 dark:border-sky-500/20">
              <p className="text-slate-400 dark:text-sky-300/70 font-medium">Pelabuhan Tujuan</p>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 truncate">{shipment.destination}</p>
            </div>
          </div>

          {/* Info Tambahan Armada & ETA */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-blue-50/50 dark:bg-[#0c1c42] p-3.5 border border-blue-100 dark:border-sky-500/30 text-blue-950 dark:text-sky-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-sky-400 tracking-wider font-mono">Armada Terpasang</span>
                <p className="font-bold text-sm mt-0.5 text-slate-900 dark:text-white">{shipment.vehicle?.plateNumber ?? "Armada Multimoda"}</p>
              </div>
              <span className="rounded bg-blue-100 dark:bg-sky-950 px-2 py-1 text-xs font-semibold capitalize text-blue-800 dark:text-sky-300 border border-transparent dark:border-sky-500/30">
                {shipment.vehicle?.type ?? "Reguler"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-[#070f26] p-3.5 border border-slate-100 dark:border-sky-500/20">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-sky-300/70 tracking-wider font-mono">Estimasi Tiba (ETA)</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                  {new Date(shipment.etaISO).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Jakarta",
                  })} WIB
                </p>
              </div>
            </div>
          </div>

          {/* Peringatan Delay Jika Ada */}
          {shipment.delayedMinutes > 0 && (
            <div className="mt-4 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/30 p-4 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="font-bold text-rose-900 dark:text-rose-200">Perhatian: Kargo Mengalami Keterlambatan</p>
                <p className="mt-0.5 text-rose-700 dark:text-rose-300/90">
                  Estimasi tiba tertunda sekitar <span className="font-bold font-mono">{shipment.delayedMinutes} menit</span> dikarenakan antrean operasional dermaga atau penyesuaian cuaca laut.
                </p>
              </div>
            </div>
          )}

          {/* Stepper Timeline Perjalanan */}
          <div className="mt-8 pt-2">
            <h2 className="mb-6 text-sm font-bold text-slate-900 dark:text-white font-mono">
              MILESTONE PROGRES PERJALANAN
            </h2>

            <div className="relative">
              {/* Garis Penghubung Latar */}
              <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-5 relative z-10">
                {steps.map((step, idx) => {
                  const isCompleted = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={step.key} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 sm:text-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all shadow-sm ${
                          isCurrent
                            ? "bg-blue-600 dark:bg-sky-500 text-white dark:text-slate-950 ring-4 ring-blue-100 dark:ring-sky-500/30 dark:shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                            : isCompleted
                            ? "bg-emerald-600 text-white"
                            : "bg-white dark:bg-[#070f26] text-slate-400 border-2 border-slate-200 dark:border-slate-800"
                        }`}
                      >
                        {isCompleted ? "✓" : idx + 1}
                      </div>

                      <div className="flex-1">
                        <p
                          className={`text-xs font-bold ${
                            isCurrent
                              ? "text-blue-700 dark:text-sky-400"
                              : isCompleted
                              ? "text-slate-900 dark:text-white"
                              : "text-slate-400 dark:text-slate-600"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
