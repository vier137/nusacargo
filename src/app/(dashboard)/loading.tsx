export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-64 rounded-md bg-slate-200" />
        <div className="h-4 w-96 rounded-md bg-slate-200" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-lg border border-slate-200 bg-slate-100 p-4" />
        <div className="h-24 rounded-lg border border-slate-200 bg-slate-100 p-4" />
        <div className="h-24 rounded-lg border border-slate-200 bg-slate-100 p-4" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-4 h-6 w-48 rounded bg-slate-200" />
        <div className="space-y-3">
          <div className="h-10 rounded bg-slate-100" />
          <div className="h-10 rounded bg-slate-100" />
          <div className="h-10 rounded bg-slate-100" />
          <div className="h-10 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
