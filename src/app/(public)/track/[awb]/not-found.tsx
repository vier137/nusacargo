import Link from "next/link";

export default function TrackNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-xs">
        <h2 className="text-lg font-bold text-slate-900">Resi Tidak Ditemukan</h2>

        <p className="mt-2 text-xs text-slate-600">
          Nomor resi yang Anda masukkan belum terdaftar dalam sistem pengiriman NusaCargo.
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Pastikan format resi sudah benar (contoh: <span className="font-mono font-semibold">NC-2026-000101</span>).
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Coba Lacak Resi Lain
          </Link>
          <Link
            href="/shipments"
            className="rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Buka Dashboard Pengiriman
          </Link>
        </div>
      </div>
    </div>
  );
}
