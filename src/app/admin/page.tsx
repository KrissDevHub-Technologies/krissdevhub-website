import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./dashboard-client";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user session is found on the server, redirect to login
  if (!user) {
    redirect("/admin/login");
  }

  return <DashboardClient userEmail={user.email || "Admin"} />;
}
