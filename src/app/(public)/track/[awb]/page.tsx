import Link from "next/link";
import { notFound } from "next/navigation";
import { getShipment } from "@/lib/shipments";
import { StatusBadge } from "@/components/ui/status-badge";


type Props = { params: Promise<{ awb: string }> };

export async function generateMetadata({ params }: Props) {
  const { awb } = await params;
  return {
    title: `Lacak ${awb} · NusaCargo`,
    description: `Status terkini pengiriman ${awb} pada jaringan NusaCargo.`,
  };
}

export default async function TrackPage({ params }: Props) {
  const { awb } = await params;
  const shipment = await getShipment(awb);

  if (!shipment) {
    return notFound();
  }

  const steps = [
    { label: "Dijemput", key: "dijemput" },
    { label: "Di Pelabuhan", key: "di-pelabuhan" },
    { label: "Transit", key: "transit" },
    { label: "Dikirim", key: "dikirim" },
    { label: "Selesai", key: "selesai" },
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
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Kembali ke Dashboard
          </Link>
          <span className="text-xs text-slate-500 font-mono">NusaCargo Tracking System</span>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs text-slate-500">Nomor Resi / AWB</p>
              <h1 id="judul" className="text-xl font-bold text-slate-900 font-mono tracking-wide">
                {shipment.awb}
              </h1>
            </div>
            <div>
              <StatusBadge status={shipment.status} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-slate-500">Klien</p>
              <p className="font-medium text-slate-800">{shipment.client.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Berat</p>
              <p className="font-medium text-slate-800">{shipment.weightKg} kg</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rute</p>
              <p className="font-medium text-slate-800">
                {shipment.origin} → {shipment.destination}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Estimasi Tiba (ETA)</p>
              <p className="font-medium text-slate-800">
                {new Date(shipment.etaISO).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {shipment.delayedMinutes > 0 && (
            <div className="mt-4 rounded-md bg-rose-50 p-3 text-xs text-rose-800 border border-rose-200">
              Keterangan: Pengiriman mengalami keterlambatan sekitar {shipment.delayedMinutes} menit dikarenakan kendala operasional lapangan.
            </div>
          )}

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">Progres Pengiriman</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={step.key} className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                        isCurrent
                          ? "bg-blue-600 text-white ring-2 ring-blue-200"
                          : isCompleted
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`text-xs ${
                        isCurrent
                          ? "font-bold text-blue-700"
                          : isCompleted
                          ? "font-medium text-slate-700"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

