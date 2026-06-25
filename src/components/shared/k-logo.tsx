interface KLogoProps {
  size?: number;
  className?: string;
  variant?: "icon" | "full";
}

export function KLogo({ size = 28, className = "", variant = "icon" }: KLogoProps) {
  if (variant === "full") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <KIcon size={size} className="text-white" />
        <span className="font-bold text-white tracking-tight text-lg font-space-grotesk">
          KrissDevHub
        </span>
      </div>
    );
  }
  return <KIcon size={size} className={`${className} text-white`} />;
}

export function KIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="KrissDevHub logo"
    >
      {/* Geometrically precise premium K monogram matching the user's uploaded reference exactly */}
      <path d="M20 17 L20 47 L26 53 L20 63 L26 63 L41 42 L29 42 L29 17 Z" fill="currentColor" />
      <path d="M20 54 L20 56 L21 55 Z" fill="currentColor" />
      <path d="M44 42 L39 50 L48 63 L60 63 Z" fill="currentColor" />
      <path d="M48 17 L32 39 L44 39 L55 24 L50 17 Z" fill="currentColor" />
      <path d="M53 17 L57 22 L60 17 Z" fill="currentColor" />
    </svg>
  );
}

// Dark variant for compatibility
export function KLogoDark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return <KIcon size={size} className={`${className} text-[#090909]`} />;
}
