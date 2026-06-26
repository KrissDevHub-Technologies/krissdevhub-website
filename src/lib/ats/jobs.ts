"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { Job, JobInsert, JobUpdate, JobFilters } from "@/types/ats";

// ─── Public ──────────────────────────────────────────────────────────────────

export async function getOpenJobs(filters?: JobFilters): Promise<Job[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("jobs")
      .select("*")
      .eq("status", "open")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (filters?.department && filters.department !== "all") {
      query = query.eq("department", filters.department);
    }
    if (filters?.location && filters.location !== "all") {
      query = query.ilike("location", `%${filters.location}%`);
    }
    if (filters?.employment_type && filters.employment_type !== "all") {
      query = query.eq("employment_type", filters.employment_type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Job[];
  } catch (err) {
    console.error("getOpenJobs error:", err);
    return [];
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("slug", slug)
      .eq("status", "open")
      .single();

    if (error) return null;
    return data as Job;
  } catch {
    return null;
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Job;
  } catch {
    return null;
  }
}

export async function getFeaturedJobs(): Promise<Job[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "open")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) throw error;
    return (data ?? []) as Job[];
  } catch {
    return [];
  }
}

export async function getJobDepartments(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("department")
      .eq("status", "open");

    if (error) throw error;
    const unique = [...new Set((data ?? []).map((d: { department: string }) => d.department))];
    return unique.sort();
  } catch {
    return [];
  }
}

export async function getJobLocations(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("location")
      .eq("status", "open");

    if (error) throw error;
    const unique = [...new Set((data ?? []).map((d: { location: string }) => d.location))];
    return unique.sort();
  } catch {
    return [];
  }
}

export async function getRelatedJobs(
  currentJobId: string,
  department: string,
  limit = 3
): Promise<Job[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "open")
      .eq("department", department)
      .neq("id", currentJobId)
      .limit(limit);

    if (error) throw error;
    return (data ?? []) as Job[];
  } catch {
    return [];
  }
}

// ─── Admin (Authenticated) ────────────────────────────────────────────────────

export async function getAllJobsAdmin(): Promise<
  (Job & { candidate_count: number })[]
> {
  try {
    const supabase = await createClient();
    const { data: jobs, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Get candidate counts per job
    const { data: counts } = await supabase
      .from("candidates")
      .select("job_id");

    const countMap: Record<string, number> = {};
    (counts ?? []).forEach((c: { job_id: string | null }) => {
      if (c.job_id) {
        countMap[c.job_id] = (countMap[c.job_id] || 0) + 1;
      }
    });

    return (jobs ?? []).map((job: Job) => ({
      ...job,
      candidate_count: countMap[job.id] || 0,
    }));
  } catch (err) {
    console.error("getAllJobsAdmin error:", err);
    return [];
  }
}

export async function createJob(
  data: JobInsert
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const supabase = await createClient();

    // Auto-generate slug if not provided
    const slug = data.slug || slugify(data.title);

    const { data: created, error } = await (supabase
      .from("jobs") as any)
      .insert({ ...data, slug })
      .select("id")
      .single();

    if (error) {
      console.error("createJob error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: created.id };
  } catch (err) {
    console.error("createJob error:", err);
    return { success: false, error: "Failed to create job." };
  }
}

export async function updateJob(
  id: string,
  data: JobUpdate
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase.from("jobs") as any).update(data).eq("id", id);

    if (error) {
      console.error("updateJob error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("updateJob error:", err);
    return { success: false, error: "Failed to update job." };
  }
}

export async function deleteJob(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      console.error("deleteJob error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("deleteJob error:", err);
    return { success: false, error: "Failed to delete job." };
  }
}

export async function duplicateJob(
  id: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: original, error: fetchError } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !original) {
      return { success: false, error: "Job not found." };
    }

    const timestamp = Date.now().toString().slice(-6);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original as Job & { created_at: string; updated_at: string };

    const { data: created, error: insertError } = await (supabase
      .from("jobs") as any)
      .insert({
        ...rest,
        title: `${rest.title} (Copy)`,
        slug: `${rest.slug}-${timestamp}`,
        status: "draft",
        featured: false,
      })
      .select("id")
      .single();

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    return { success: true, id: created.id };
  } catch (err) {
    console.error("duplicateJob error:", err);
    return { success: false, error: "Failed to duplicate job." };
  }
}
