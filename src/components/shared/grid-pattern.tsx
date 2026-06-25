import { cn } from "@/lib/utils";

interface GridPatternProps {
  className?: string;
  type?: "dot" | "line";
}

export function GridPattern({ className, type = "dot" }: GridPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none",
        type === "dot" ? "dot-grid" : "line-grid",
        className
      )}
    />
  );
}
