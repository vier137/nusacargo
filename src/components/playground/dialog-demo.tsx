"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

// Komponen klien dibuat sekecil mungkin: hanya bagian yang butuh state.
// Halaman /playground sendiri tetap Server Component (Modul 6).
export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("Belum ada aksi.");
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-3">
      <Button ref={triggerRef} variant="danger" onClick={() => setOpen(true)}>
        Batalkan pengiriman
      </Button>
      <p role="status" className="text-sm">
        {result}
      </p>
      <ConfirmDialog
        open={open}
        danger
        triggerRef={triggerRef}
        title="Batalkan pengiriman NC-2026-000481?"
        description="Pengiriman akan ditandai batal dan klien akan diberi tahu. Aksi ini tidak dapat diurungkan."
        confirmLabel="Ya, batalkan"
        cancelLabel="Kembali"
        onCancel={() => {
          setOpen(false);
          setResult("Dibatalkan: tidak ada perubahan.");
        }}
        onConfirm={() => {
          setOpen(false);
          setResult("Dikonfirmasi: pengiriman dibatalkan.");
        }}
      />
    </div>
  );
}
