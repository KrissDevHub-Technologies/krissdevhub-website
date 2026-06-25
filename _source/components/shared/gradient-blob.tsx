"use client";

import { cn } from "@/lib/utils";

interface GradientBlobProps {
  className?: string;
  color?: "blue" | "purple" | "indigo" | "mixed";
}

export function GradientBlob({ className, color = "mixed" }: GradientBlobProps) {
  const colorMap = {
    blue: "from-blue-600/20 via-blue-500/10 to-transparent",
    purple: "from-purple-600/20 via-purple-500/10 to-transparent",
    indigo: "from-indigo-600/20 via-indigo-500/10 to-transparent",
    mixed: "from-blue-600/20 via-purple-500/10 to-transparent",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl animate-blob",
        `bg-gradient-radial ${colorMap[color]}`,
        className
      )}
      aria-hidden="true"
    />
  );
}
