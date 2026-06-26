import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { JobsListClient } from "./jobs-list-client";
import { getAllJobsAdmin } from "@/lib/ats/jobs";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const jobs = await getAllJobsAdmin();

  return <JobsListClient initialJobs={jobs} />;
}
