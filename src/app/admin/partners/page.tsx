import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PartnersClient from "./partners-client";

export default async function AdminPartnersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if unauthenticated
  if (!user) {
    redirect("/admin/login");
  }

  return <PartnersClient userEmail={user.email || "Admin"} />;
}
