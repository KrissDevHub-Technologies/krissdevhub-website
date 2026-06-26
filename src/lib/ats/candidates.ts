"use server";

import { createClient } from "@/lib/supabase/server";
import type {
  Candidate,
  CandidateInsert,
  CandidateFilters,
  CandidateStatus,
  ATSStats,
  DailyApplicationCount,
  FunnelStage,
} from "@/types/ats";

const STATUS_COLORS: Record<CandidateStatus, string> = {
  Applied: "#6366f1",
  Screening: "#8b5cf6",
  Interview: "#06b6d4",
  Shortlisted: "#3b82f6",
  "Talent Pool": "#f59e0b",
  Offer: "#10b981",
  Hired: "#22c55e",
  Rejected: "#ef4444",
  "On Hold": "#6b7280",
};

// ─── Public ──────────────────────────────────────────────────────────────────

export async function submitApplication(
  data: CandidateInsert
): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const supabase = await createClient();

    const { data: created, error } = await supabase
      .from("candidates")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({
        ...(data as any),
        status: "Applied",
        source: "Website",
        status_history: [
          {
            status: "Applied",
            changed_at: new Date().toISOString(),
            note: "Application submitted via website",
          },
        ],
      } as any)
      .select("id")
      .single();

    if (error) {
      console.error("submitApplication error:", error);
      return { success: false, error: "Failed to submit application." };
    }

    return { success: true, id: (created as { id: string }).id };
  } catch (err) {
    console.error("submitApplication error:", err);
    return { success: false, error: "Unexpected error. Please try again." };
  }
}

// ─── Admin (Authenticated) ────────────────────────────────────────────────────

export async function getCandidates(
  filters?: CandidateFilters,
  page = 1,
  pageSize = 10
): Promise<{ candidates: Candidate[]; total: number }> {
  try {
    const supabase = await createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("candidates")
      .select("*, job:job_id(id, title, department, slug)", { count: "exact" })
      .order("applied_at", { ascending: false })
      .range(from, to);

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }
    if (filters?.job_id) {
      query = query.eq("job_id", filters.job_id);
    }
    if (filters?.min_experience != null) {
      query = query.gte("experience_years", filters.min_experience);
    }
    if (filters?.max_experience != null) {
      query = query.lte("experience_years", filters.max_experience);
    }
    if (filters?.search) {
      query = query.or(
        `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
      );
    }
    if (filters?.country) {
      query = query.ilike("location", `%${filters.country}%`);
    }
    if (filters?.skill) {
      query = query.overlaps("skills", [filters.skill]);
    }
    if (filters?.category && filters.category !== "all") {
      const { data: catJobs } = await supabase
        .from("jobs")
        .select("id")
        .eq("department", "AI Workforce");
      
      const workforceJobIds = (catJobs ?? []).map((j: { id: string }) => j.id);
      
      if (filters.category === "workforce") {
        if (workforceJobIds.length > 0) {
          query = query.in("job_id", workforceJobIds);
        } else {
          return { candidates: [], total: 0 };
        }
      } else if (filters.category === "ats") {
        if (workforceJobIds.length > 0) {
          query = query.not("job_id", "in", `(${workforceJobIds.join(",")})`);
        }
      }
    }

    const { data, error, count } = await query;
    if (error) throw error;
    return { candidates: (data ?? []) as Candidate[], total: count ?? 0 };
  } catch (err) {
    console.error("getCandidates error:", err);
    return { candidates: [], total: 0 };
  }
}

export async function getCandidateById(id: string): Promise<Candidate | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("candidates")
      .select("*, job:job_id(id, title, department, slug)")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Candidate;
  } catch {
    return null;
  }
}

export async function getTalentPool(filters?: {
  search?: string;
  skills?: string[];
  min_experience?: number;
}): Promise<Candidate[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("candidates")
      .select("*, job:job_id(id, title, department, slug)")
      .eq("status", "Talent Pool")
      .order("applied_at", { ascending: false });

    if (filters?.search) {
      query = query.or(
        `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,location.ilike.%${filters.search}%`
      );
    }
    if (filters?.min_experience != null) {
      query = query.gte("experience_years", filters.min_experience);
    }
    if (filters?.skills && filters.skills.length > 0) {
      query = query.overlaps("skills", filters.skills);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Candidate[];
  } catch (err) {
    console.error("getTalentPool error:", err);
    return [];
  }
}

export async function updateCandidateStatus(
  id: string,
  status: CandidateStatus,
  note?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Get current status_history
    const { data: current, error: fetchError } = await supabase
      .from("candidates")
      .select("status_history")
      .eq("id", id)
      .single();

    if (fetchError || !current) return { success: false, error: "Candidate not found." };

    const history = Array.isArray((current as any).status_history)
      ? ((current as any).status_history as any[])
      : [];

    const newEntry = {
      status,
      changed_at: new Date().toISOString(),
      note: note || undefined,
    };

    const { error } = await (supabase
      .from("candidates") as any)
      .update({
        status,
        status_history: [...history, newEntry],
      })
      .eq("id", id);

    if (error) {
      console.error("updateCandidateStatus error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("updateCandidateStatus error:", err);
    return { success: false, error: "Failed to update status." };
  }
}

export async function addCandidateNote(
  id: string,
  note: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await (supabase
      .from("candidates") as any)
      .update({ notes: note })
      .eq("id", id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save note." };
  }
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export async function getATSStats(): Promise<ATSStats> {
  try {
    const supabase = await createClient();

    const [jobsRes, candidatesRes, todayRes] = await Promise.all([
      supabase.from("jobs").select("status"),
      supabase.from("candidates").select("status"),
      supabase
        .from("candidates")
        .select("id", { count: "exact" })
        .gte("applied_at", new Date(Date.now() - 86400000).toISOString()),
    ]);

    const jobs = jobsRes.data ?? [];
    const candidates = candidatesRes.data ?? [];

    const countByStatus = (status: string) =>
      candidates.filter((c: { status: string }) => c.status === status).length;

    return {
      total_jobs: jobs.length,
      open_jobs: jobs.filter((j: { status: string }) => j.status === "open").length,
      total_applications: candidates.length,
      shortlisted: countByStatus("Shortlisted"),
      talent_pool: countByStatus("Talent Pool"),
      offers: countByStatus("Offer"),
      hired: countByStatus("Hired"),
      applications_today: todayRes.count ?? 0,
    };
  } catch (err) {
    console.error("getATSStats error:", err);
    return {
      total_jobs: 0,
      open_jobs: 0,
      total_applications: 0,
      shortlisted: 0,
      talent_pool: 0,
      offers: 0,
      hired: 0,
      applications_today: 0,
    };
  }
}

export async function getApplicationsPerDay(
  days = 7
): Promise<DailyApplicationCount[]> {
  try {
    const supabase = await createClient();
    const since = new Date(Date.now() - days * 86400000).toISOString();

    const { data, error } = await supabase
      .from("candidates")
      .select("applied_at")
      .gte("applied_at", since)
      .order("applied_at", { ascending: true });

    if (error) throw error;

    // Group by day
    const dayMap: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date(Date.now() - (days - 1 - i) * 86400000);
      const key = d.toISOString().slice(0, 10);
      dayMap[key] = 0;
    }

    (data ?? []).forEach((c: { applied_at: string }) => {
      const key = c.applied_at.slice(0, 10);
      if (key in dayMap) dayMap[key]++;
    });

    return Object.entries(dayMap).map(([date, count]) => ({ date, count }));
  } catch {
    return [];
  }
}

export async function getHiringFunnel(): Promise<FunnelStage[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("candidates")
      .select("status");

    if (error) throw error;

    const stages: CandidateStatus[] = [
      "Applied",
      "Screening",
      "Interview",
      "Shortlisted",
      "Offer",
      "Hired",
    ];

    return stages.map((stage) => ({
      stage,
      count: (data ?? []).filter((c: { status: string }) => c.status === stage).length,
      color: STATUS_COLORS[stage],
    }));
  } catch {
    return [];
  }
}

export async function getTopAppliedJobs(
  limit = 5
): Promise<{ job_title: string; count: number }[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("candidates")
      .select("job_id, job:job_id(title)");

    if (error) throw error;

    const countMap: Record<string, { title: string; count: number }> = {};
    (data ?? []).forEach((c: { job_id: string | null; job: { title: string } | null }) => {
      if (c.job_id && c.job) {
        if (!countMap[c.job_id]) {
          countMap[c.job_id] = { title: c.job.title, count: 0 };
        }
        countMap[c.job_id].count++;
      }
    });

    return Object.values(countMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
      .map((v) => ({ job_title: v.title, count: v.count }));
  } catch {
    return [];
  }
}

export async function getRecentCandidates(limit = 5): Promise<Candidate[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("candidates")
      .select("*, job:job_id(id, title, department, slug)")
      .order("applied_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []) as Candidate[];
  } catch {
    return [];
  }
}
