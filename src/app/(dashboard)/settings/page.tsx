"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [dispatcherName, setDispatcherName] = useState("Budi Prasetyo");
  const [dispatcherEmail, setDispatcherEmail] = useState("dispatcher@nusacargo.co.id");
  const [delayThreshold, setDelayThreshold] = useState("60");
  const [refreshInterval, setRefreshInterval] = useState("30");
  const [defaultPort, setDefaultPort] = useState("TPK");
  const [autoAlert, setAutoAlert] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const portOptions = [
    { value: "TPK", label: "Tanjung Priok (Jakarta)" },
    { value: "SUB", label: "Tanjung Perak (Surabaya)" },
    { value: "BLW", label: "Belawan (Medan)" },
    { value: "MAK", label: "Makassar (Sulawesi)" },
    { value: "BPN", label: "Semayang (Balikpapan)" },
    { value: "SOQ", label: "Sorong (Papua)" },
  ];

  const refreshOptions = [
    { value: "15", label: "Setiap 15 Detik" },
    { value: "30", label: "Setiap 30 Detik (Rekomendasi)" },
    { value: "60", label: "Setiap 1 Menit" },
    { value: "300", label: "Setiap 5 Menit" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight">
          PENGATURAN SISTEM & TELEMETRI
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Konfigurasi preferensi operasional dan akun pengguna NusaCargo Control Tower.
        </p>
      </div>

      {saved && (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 p-4 text-xs font-semibold text-emerald-800 dark:text-emerald-300 animate-in fade-in">
          ✓ Konfigurasi parameter operasional berhasil diperbarui ke sistem lokal.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profil Dispatcher */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Petugas Operasional (Dispatcher)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Lengkap"
                value={dispatcherName}
                onChange={(e) => setDispatcherName(e.target.value)}
                required
              />
              <Input
                label="Alamat Email Kerja"
                type="email"
                value={dispatcherEmail}
                onChange={(e) => setDispatcherEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="ID Staf Lapangan"
                defaultValue="DISP-JKT-042"
                disabled
                hint="Ditetapkan otomatis oleh protokol NusaCargo."
              />
              <Select
                label="Hub Pelabuhan Utama"
                options={portOptions}
                value={defaultPort}
                onChange={(e) => setDefaultPort(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Ambang Batas Peringatan & Keterlambatan */}
        <Card>
          <CardHeader>
            <CardTitle>Parameter Pemantauan Kargo & SLA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Batas Keterlambatan Kritis (Menit)"
                type="number"
                value={delayThreshold}
                onChange={(e) => setDelayThreshold(e.target.value)}
                hint="Kargo dengan estimasi delay melampaui angka ini akan ditandai merah."
              />
              <Select
                label="Frekuensi Auto-Refresh Data"
                options={refreshOptions}
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={autoAlert}
                  onChange={(e) => setAutoAlert(e.target.checked)}
                  className="rounded border-slate-300 dark:border-sky-500/30 text-blue-600 dark:text-sky-500 focus:ring-sky-500 h-4 w-4"
                />
                Kirim notifikasi otomatis saat kargo mengalami perubahan rute darurat atau cuaca buruk
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDispatcherName("Budi Prasetyo");
              setDelayThreshold("60");
              setRefreshInterval("30");
            }}
          >
            Reset Default
          </Button>
          <Button type="submit" variant="primary">
            Simpan Konfigurasi
          </Button>
        </div>
      </form>
    </div>
  );
}
