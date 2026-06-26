import { cn } from "@/lib/utils";

// ─── Skeleton blocks ──────────────────────────────────────────────────────────

export function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-white/[0.06]",
        className
      )}
    />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <SkeletonLine className="h-3 w-24" />
        <div className="w-8 h-8 rounded-xl bg-white/[0.05]" />
      </div>
      <SkeletonLine className="h-7 w-16 mb-1" />
      <SkeletonLine className="h-2.5 w-32" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr className="border-b border-white/[0.04]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <SkeletonLine
            className={cn("h-3 rounded", i === 0 ? "w-32" : "w-20")}
          />
        </td>
      ))}
    </tr>
  );
}

export function CandidateProfileSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.06]" />
          <div className="space-y-2 flex-1">
            <SkeletonLine className="h-5 w-40" />
            <SkeletonLine className="h-3 w-28" />
            <div className="flex gap-2 mt-2">
              <SkeletonLine className="h-5 w-16 rounded-full" />
              <SkeletonLine className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
