"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [awbInput, setAwbInput] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awbInput.trim()) return;
    router.push(`/track/${encodeURIComponent(awbInput.trim().toUpperCase())}`);
  };

  const sampleResi = ["NC-2026-000101", "NC-2026-000102", "NC-2026-000103"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Navbar Sederhana */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
              NC
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              NusaCargo
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Link
              href="/shipments"
              className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Control Tower (Dashboard) →
            </Link>
          </nav>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Hero Section Bersih & Sederhana */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 mb-3">
              Ekspedisi Logistik Antarpulau
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Pantau Pengiriman Kargo Anda Secara Cepat
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Lacak posisi kontainer dan muatan armada NusaCargo di seluruh pelabuhan utama Indonesia.
            </p>
          </div>

          {/* Kotak Form Lacak Resi */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <form onSubmit={handleTrack} className="space-y-3">
              <label htmlFor="awb-input" className="block text-xs font-semibold text-slate-700">
                Lacak Nomor Resi / AWB
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="awb-input"
                  type="text"
                  value={awbInput}
                  onChange={(e) => setAwbInput(e.target.value)}
                  placeholder="Contoh: NC-2026-000101"
                  className="flex-1 rounded-md border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Lacak Resi
                </button>
              </div>

              {/* Rekomendasi / Contoh Resi Uji Coba */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
                <span>Contoh resi coba:</span>
                {sampleResi.map((resi) => (
                  <button
                    key={resi}
                    type="button"
                    onClick={() => setAwbInput(resi)}
                    className="font-mono text-blue-600 underline hover:text-blue-800 cursor-pointer"
                  >
                    {resi}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Kartu Informasi Singkat */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-xs font-bold text-slate-800">Kargo Laut Reguler</h2>
              <p className="mt-1 text-xs text-slate-500">
                Pengiriman FCL & LCL lewat rute pelabuhan Tanjung Priok, Perak, Belawan, & Makassar.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-xs font-bold text-slate-800">Distribusi Darat</h2>
              <p className="mt-1 text-xs text-slate-500">
                Armada truk ekspedisi terhubung untuk penjemputan dan pengantaran door-to-door.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-xs font-bold text-slate-800">Control Tower 24/7</h2>
              <p className="mt-1 text-xs text-slate-500">
                Monitoring status armada secara transparan untuk klien korporat dan operasional.
              </p>
            </div>
          </div>

          {/* Banner Akses Dashboard Internal */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between rounded-lg border border-slate-200 bg-slate-100/70 p-4 text-xs">
            <div>
              <p className="font-semibold text-slate-800">Petugas / Dispatcher Operasional?</p>
              <p className="text-slate-500">Masuk ke modul pemantauan untuk melihat seluruh muatan hari ini.</p>
            </div>
            <Link
              href="/shipments"
              className="mt-3 sm:mt-0 font-medium text-blue-600 hover:text-blue-800 underline"
            >
              Buka Halaman Pengiriman →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Sederhana */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <p>© 2026 NusaCargo · Studi Kasus Praktikum Frontend Engineering</p>
      </footer>
    </div>
  );
}
