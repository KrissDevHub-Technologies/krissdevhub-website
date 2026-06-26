import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HRDashboardClient } from "./hr-dashboard-client";
import {
  getATSStats,
  getApplicationsPerDay,
  getHiringFunnel,
  getTopAppliedJobs,
  getRecentCandidates,
} from "@/lib/ats/candidates";
import { getAllJobsAdmin } from "@/lib/ats/jobs";

export const dynamic = "force-dynamic";

export default async function HRPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const [stats, appsPerDay, funnel, topJobs, recentCandidates, recentJobs] =
    await Promise.all([
      getATSStats(),
      getApplicationsPerDay(7),
      getHiringFunnel(),
      getTopAppliedJobs(5),
      getRecentCandidates(5),
      getAllJobsAdmin().then((jobs) => jobs.slice(0, 5)),
    ]);

  return (
    <HRDashboardClient
      stats={stats}
      appsPerDay={appsPerDay}
      funnel={funnel}
      topJobs={topJobs}
      recentCandidates={recentCandidates}
      recentJobs={recentJobs}
    />
  );
}
