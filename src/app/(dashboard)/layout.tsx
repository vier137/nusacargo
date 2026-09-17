import type { ReactNode } from "react";
import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[240px_1fr] bg-slate-50 text-slate-900">
      <aside className="border-r border-slate-200 bg-white p-4">
        <Link href="/" className="mb-6 block">
          <p className="text-sm font-bold text-slate-900">NusaCargo Control Tower</p>
          <p className="text-xs text-slate-500">Pemantauan Logistik</p>
        </Link>
        <DashboardNav />
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
