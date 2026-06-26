import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCandidateById } from "@/lib/ats/candidates";
import { CandidateProfileClient } from "./candidate-profile-client";

export const dynamic = "force-dynamic";

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const candidate = await getCandidateById(id);
  if (!candidate) notFound();

  return <CandidateProfileClient candidate={candidate} adminEmail={user.email ?? "Admin"} />;
}
