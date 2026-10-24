"use client";

import { useRouter } from "next/navigation";

export function CloseDetailButton() {
  const router = useRouter();

  const handleClose = () => {
    // Kembali ke halaman sebelumnya (misal /shipments dengan filternya),
    // atau jika dibuka langsung di tab baru, arahkan ke /shipments.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/shipments");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClose}
      aria-label="Tutup"
      title="Tutup"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-sky-500/30 bg-slate-100 dark:bg-[#070f26] text-slate-500 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 dark:hover:bg-rose-950/70 dark:hover:text-rose-400 dark:hover:border-rose-500/50 transition-all cursor-pointer shadow-xs active:scale-90"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
