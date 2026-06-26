import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getJobById } from "@/lib/ats/jobs";
import { JobFormClient } from "../job-form-client";

export default async function EditJobPage({
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

  const job = await getJobById(id);
  if (!job) notFound();

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-3xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white font-space-grotesk">
            Edit Job
          </h1>
          <p className="text-xs text-white/40 mt-0.5">{job.title}</p>
        </div>
        <JobFormClient mode="edit" job={job} />
      </div>
    </div>
  );
}
