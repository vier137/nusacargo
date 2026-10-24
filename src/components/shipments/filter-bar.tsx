"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { SHIPMENT_STATUS } from "@/types/shipment";

export function ShipmentFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentQ = searchParams.get("q") ?? "";
  const currentStatus = searchParams.get("status") ?? "all";

  const [keyword, setKeyword] = useState(currentQ);

  useEffect(() => {
    setKeyword(currentQ);
  }, [currentQ]);

  const updateFilters = (newQ: string, newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQ.trim()) {
      params.set("q", newQ.trim());
    } else {
      params.delete("q");
    }

    if (newStatus && newStatus !== "all") {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
    updateFilters(val, currentStatus);
  };

  const handleStatusChange = (status: string) => {
    updateFilters(keyword, status);
  };

  const handleReset = () => {
    setKeyword("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasFilter = currentQ !== "" || currentStatus !== "all";

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 dark:border-sky-500/20 bg-white dark:bg-[#0a142e] p-4 shadow-2xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-1 flex-col gap-1 text-xs font-bold text-slate-700 dark:text-sky-300 font-mono">
          <span>PENCARIAN TELEMETRI (AWB, KLIEN, RUTE PELABUHAN)</span>
          <div className="relative mt-1">
            <input
              value={keyword}
              onChange={handleSearchChange}
              placeholder="Ketik AWB (contoh: NC-2026-000101) atau nama klien..."
              className="h-10 w-full rounded-lg border border-slate-300 dark:border-sky-500/30 bg-white dark:bg-[#070f26] px-3.5 pr-8 text-sm font-normal text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
            />
            {isPending && (
              <span className="absolute right-3 top-2.5 text-xs text-sky-500 animate-spin">
                ⏳
              </span>
            )}
          </div>
        </label>

        {hasFilter && (
          <button
            type="button"
            onClick={handleReset}
            className="self-end sm:self-auto text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer pt-4 sm:pt-0"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Filter Kategori Status: Scroll Horisontal di Mobile & Rapi di Desktop */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-sky-500/10 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
        <span className="shrink-0 text-xs text-slate-500 dark:text-sky-400/70 mr-1 font-mono text-[11px]">
          STATUS:
        </span>
        <button
          type="button"
          onClick={() => handleStatusChange("all")}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
            currentStatus === "all"
              ? "bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 dark:shadow-[0_0_10px_rgba(56,189,248,0.4)]"
              : "bg-slate-100 text-slate-600 dark:bg-[#0c1a3f] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#122452]"
          }`}
        >
          Semua
        </button>
        {SHIPMENT_STATUS.map((status) => {
          const isSelected = currentStatus === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(status)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white dark:bg-sky-500 dark:text-slate-950 dark:shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                  : "bg-slate-100 text-slate-600 dark:bg-[#0c1a3f] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#122452]"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
}
