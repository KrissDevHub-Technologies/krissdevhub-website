import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTalentPool } from "@/lib/ats/candidates";
import { TalentPoolClient } from "./talent-pool-client";

export const dynamic = "force-dynamic";

export default async function TalentPoolPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const candidates = await getTalentPool();

  return <TalentPoolClient initialCandidates={candidates} />;
}
