import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { JobFormClient } from "../job-form-client";

export default async function NewJobPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-3xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white font-space-grotesk">
            Create Job Posting
          </h1>
          <p className="text-xs text-white/40 mt-0.5">
            Fill in the details below to post a new opening
          </p>
        </div>
        <JobFormClient mode="create" />
      </div>
    </div>
  );
}
