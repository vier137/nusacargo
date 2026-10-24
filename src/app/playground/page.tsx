import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { BADGE_SIZES, BADGE_VARIANTS, Badge } from "@/components/ui/badge";
import { BUTTON_SIZES, BUTTON_VARIANTS, Button } from "@/components/ui/button";
import {
  CARD_PADDINGS,
  CARD_VARIANTS,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { INPUT_SIZES, Input } from "@/components/ui/input";
import { SELECT_SIZES, Select } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { DialogDemo } from "@/components/playground/dialog-demo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SHIPMENT_STATUS } from "@/types/shipment";

export const metadata: Metadata = { title: "Playground Komponen · NusaCargo UI" };

const STATUS_OPTIONS = SHIPMENT_STATUS.map((s) => ({ value: s, label: s }));

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h2 id={id} className="border-b border-slate-200 dark:border-sky-500/20 pb-2 text-lg font-bold text-slate-900 dark:text-white font-mono">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060b19] text-slate-900 dark:text-white futuristic-grid transition-colors duration-200">
      {/* Topbar Navigasi dengan Tombol Back */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-sky-500/20 bg-white/90 dark:bg-[#070e24]/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Tombol Back Sederhana (Panah Saja) */}
            <Link
              href="/shipments"
              title="Kembali"
              aria-label="Kembali"
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-sky-500/30 bg-white dark:bg-[#070f26] text-slate-700 dark:text-sky-300 shadow-2xs hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500 dark:hover:text-slate-950 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block font-mono text-xs text-slate-400 dark:text-sky-400/60 font-semibold">
              UI Design System v2.0
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Konten Utama Galeri Komponen */}
      <main className="mx-auto max-w-4xl space-y-10 p-6 md:py-10">
        <header className="space-y-2 border-b border-slate-200 dark:border-sky-500/20 pb-6">
          <div className="flex items-center gap-2">
            <span className="rounded bg-sky-100 dark:bg-sky-950 px-2 py-0.5 text-xs font-bold text-sky-700 dark:text-sky-300 font-mono border border-sky-500/30">
              KATALOG KOMPONEN
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight font-mono">
            Playground Komponen UI NusaCargo
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
            Seluruh varian dan ukuran komponen antarmuka NusaCargo yang mendukung Mode Terang (Light) dan Mode Gelap Futuristik (Dark).
          </p>
        </header>

        {/* 1. Button */}
        <Section id="sec-button" title="1. Button (Tombol Aksi)">
          <div className="space-y-4 rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5 shadow-2xs">
            {BUTTON_VARIANTS.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3 last:border-0 last:pb-0">
                <span className="w-20 text-xs font-mono font-bold text-slate-400 dark:text-sky-300/80 uppercase">
                  {variant}
                </span>
                {BUTTON_SIZES.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size}
                  </Button>
                ))}
                <Button variant={variant} disabled>
                  disabled
                </Button>
              </div>
            ))}
          </div>
        </Section>

        {/* 2. Badge & Status */}
        <Section id="sec-badge" title="2. Badge & Status Pill">
          <div className="space-y-5 rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5 shadow-2xs">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-sky-300/80 uppercase block">
                Varian Badge Umum:
              </span>
              {BADGE_SIZES.map((size) => (
                <div key={size} className="flex flex-wrap items-center gap-3">
                  <span className="w-16 text-xs text-slate-400 font-mono">{size}</span>
                  {BADGE_VARIANTS.map((variant) => (
                    <Badge key={variant} variant={variant} size={size}>
                      {variant}
                    </Badge>
                  ))}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-sky-300/80 uppercase block">
                Status Pengiriman (Live Ping Indicator):
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {SHIPMENT_STATUS.map((status) => (
                  <StatusBadge key={status} status={status} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Card */}
        <Section id="sec-card" title="3. Card (Wadah Konten)">
          <div className="grid gap-4 sm:grid-cols-3">
            {CARD_VARIANTS.map((variant, i) => (
              <Card key={variant} variant={variant} padding={CARD_PADDINGS[i] ?? "md"}>
                <CardHeader>
                  <CardTitle>
                    {variant} · padding {CARD_PADDINGS[i] ?? "md"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">1.284</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">pengiriman maritim aktif</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* 4. Input */}
        <Section id="sec-input" title="4. Input (Formulir Masukan)">
          <div className="rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5 shadow-2xs">
            <div className="grid gap-4 sm:grid-cols-2">
              {INPUT_SIZES.map((size) => (
                <Input key={size} label={`Nomor resi (${size})`} size={size} placeholder="NC-2026-000481" />
              ))}
              <Input label="Berat Muatan (kg)" type="number" hint="Isi dengan angka bulat dalam satuan kilogram." />
              <Input label="Catatan Pengiriman" required defaultValue={"Muatan barang elektronik prioritaskan dry container."} error="Maksimal 280 karakter." />
              <Input label="Kode Pelabuhan Asal" disabled defaultValue="TPK" hint="Ditetapkan otomatis oleh sistem." />
            </div>
          </div>
        </Section>

        {/* 5. Select */}
        <Section id="sec-select" title="5. Select (Dropdown Pilihan)">
          <div className="rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5 shadow-2xs">
            <div className="grid gap-4 sm:grid-cols-2">
              {SELECT_SIZES.map((size) => (
                <Select key={size} label={`Status kargo (${size})`} size={size} options={STATUS_OPTIONS} />
              ))}
              <Select
                label="Perbarui status muatan"
                options={STATUS_OPTIONS}
                placeholder="Pilih status baru…"
                required
                error="Status wajib dipilih oleh dispatcher."
              />
              <Select label="Status terkunci (nonaktif)" options={STATUS_OPTIONS} disabled defaultValue="transit" />
            </div>
          </div>
        </Section>

        {/* 6. Dialog */}
        <Section id="sec-dialog" title="6. Dialog Konfirmasi Interaktif">
          <div className="rounded-xl border border-slate-200 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-5 shadow-2xs space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-300">
              Mendukung aksesibilitas tuts papan ketik: tombol <kbd className="rounded border px-1.5 py-0.5 font-mono text-[10px] bg-slate-100 dark:bg-slate-800">Enter</kbd> untuk membuka, <kbd className="rounded border px-1.5 py-0.5 font-mono text-[10px] bg-slate-100 dark:bg-slate-800">Tab</kbd> untuk navigasi tombol, dan <kbd className="rounded border px-1.5 py-0.5 font-mono text-[10px] bg-slate-100 dark:bg-slate-800">Escape</kbd> untuk menutup.
            </p>
            <DialogDemo />
          </div>
        </Section>

        {/* Footer Tombol Back Bawah (Ikon Sederhana) */}
        <div className="pt-8 border-t border-slate-200 dark:border-sky-500/20 flex items-center justify-between">
          <Link
            href="/shipments"
            title="Kembali ke Control Tower"
            aria-label="Kembali ke Control Tower"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 hover:brightness-110 shadow-sm transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>

          <Link
            href="/"
            title="Beranda Publik"
            aria-label="Beranda Publik"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-sky-500/30 bg-white dark:bg-[#070f26] text-slate-700 dark:text-sky-300 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-500 dark:hover:text-slate-950 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
