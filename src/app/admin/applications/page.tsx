import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ApplicationsClient } from "./applications-client";
import { getCandidates } from "@/lib/ats/candidates";
import { getAllJobsAdmin } from "@/lib/ats/jobs";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    job?: string;
    status?: string;
    page?: string;
    category?: string;
    skill?: string;
    country?: string;
    experience?: string;
  }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const sp = await searchParams;
  const page = parseInt(sp.page ?? "1");
  const { candidates, total } = await getCandidates(
    {
      job_id: sp.job,
      status: (sp.status as any) ?? "all",
      category: sp.category as any,
      skill: sp.skill,
      country: sp.country,
      min_experience: sp.experience ? parseInt(sp.experience) : undefined,
    },
    page,
    12
  );
  const jobs = await getAllJobsAdmin();

  return (
    <ApplicationsClient
      initialCandidates={candidates}
      total={total}
      page={page}
      jobs={jobs.map((j) => ({ id: j.id, title: j.title }))}
    />
  );
}
