import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/ats/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check auth to conditionally show sidebar
  // Individual pages and middleware handle redirect-to-login
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user, render children without sidebar (login page renders standalone)
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <AdminNav userEmail={user.email || "Admin"} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
