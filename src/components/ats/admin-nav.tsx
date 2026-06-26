"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Star,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { KLogo } from "@/components/shared/k-logo";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  section?: string;
}

const ATS_NAV: NavItem[] = [
  // CRM
  {
    label: "Leads CRM",
    href: "/admin",
    icon: MessageSquare,
    section: "CRM",
  },
  // ATS
  {
    label: "HR Dashboard",
    href: "/admin/hr",
    icon: LayoutDashboard,
    section: "ATS",
  },
  {
    label: "Jobs",
    href: "/admin/careers",
    icon: Briefcase,
    section: "ATS",
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: Users,
    section: "ATS",
  },
  {
    label: "Talent Pool",
    href: "/admin/talent-pool",
    icon: Star,
    section: "ATS",
  },
];

interface AdminNavProps {
  userEmail: string;
  notificationCount?: number;
}

export function AdminNav({ userEmail, notificationCount = 0 }: AdminNavProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const sections = ["CRM", "ATS"];

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-[#0d0d0d] border-r border-white/[0.06] transition-all duration-300 shrink-0",
        collapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]", collapsed && "justify-center px-0")}>
        <KLogo size={28} />
        {!collapsed && (
          <div>
            <span className="text-xs font-bold text-white font-space-grotesk tracking-tight">KrissDevHub</span>
            <p className="text-[9px] text-white/30 -mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        {sections.map((section) => {
          const items = ATS_NAV.filter((n) => n.section === section);
          return (
            <div key={section}>
              {!collapsed && (
                <p className="text-[9px] uppercase tracking-widest text-white/25 font-semibold px-2 mb-1.5">
                  {section}
                </p>
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-medium transition-all duration-150",
                        collapsed ? "justify-center" : "",
                        isActive
                          ? "bg-white/[0.08] text-white"
                          : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {!collapsed && item.badge != null && item.badge > 0 && (
                        <span className="ml-auto text-[9px] font-bold bg-blue-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                          {item.badge > 99 ? "99+" : item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Notification indicator */}
      {notificationCount > 0 && !collapsed && (
        <div className="mx-3 mb-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-[10px] text-blue-400 font-medium">
            {notificationCount} new application{notificationCount > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Bottom */}
      <div className={cn("border-t border-white/[0.06] p-3", collapsed && "flex flex-col items-center")}>
        {!collapsed && (
          <p className="text-[10px] text-white/30 mb-2 truncate px-1">{userEmail}</p>
        )}
        <button
          onClick={handleLogout}
          title="Sign out"
          className="flex items-center gap-2 w-full rounded-lg px-2 py-1.5 text-xs text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/[0.10] flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/[0.25] transition-all z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
}
