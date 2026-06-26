// ================================================
// KrissDevHub ATS — Type Definitions
// ================================================

export type CandidateStatus =
  | 'Applied'
  | 'Screening'
  | 'Interview'
  | 'Shortlisted'
  | 'Talent Pool'
  | 'Offer'
  | 'Hired'
  | 'Rejected'
  | 'On Hold';

export type JobStatus = 'draft' | 'open' | 'closed';

export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'
  | 'Freelance';

export interface StatusHistoryEntry {
  status: CandidateStatus;
  changed_at: string;
  changed_by?: string;
  note?: string;
}

// ================================================
// JOB
// ================================================
export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  salary_min: number | null;
  salary_max: number | null;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  status: JobStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobInsert {
  title: string;
  slug: string;
  department: string;
  location?: string;
  employment_type?: string;
  salary_min?: number | null;
  salary_max?: number | null;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  status?: JobStatus;
  featured?: boolean;
}

export interface JobUpdate extends Partial<JobInsert> {}

// ================================================
// CANDIDATE
// ================================================
export interface Candidate {
  id: string;
  job_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  resume_file: string | null;
  cover_letter: string | null;
  experience_years: number | null;
  current_company: string | null;
  current_ctc: string | null;
  expected_ctc: string | null;
  notice_period: string | null;
  location: string | null;
  skills: string[];
  status: CandidateStatus;
  source: string | null;
  notes: string | null;
  status_history: StatusHistoryEntry[];
  applied_at: string;
  created_at: string;
  // Joined fields
  job?: Pick<Job, 'id' | 'title' | 'department' | 'slug'> | null;
}

export interface CandidateInsert {
  job_id?: string | null;
  full_name: string;
  email: string;
  phone?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  resume_file?: string | null;
  cover_letter?: string | null;
  experience_years?: number | null;
  current_company?: string | null;
  current_ctc?: string | null;
  expected_ctc?: string | null;
  notice_period?: string | null;
  location?: string | null;
  skills?: string[];
  status?: CandidateStatus;
  source?: string | null;
}

// ================================================
// DASHBOARD STATS
// ================================================
export interface ATSStats {
  total_jobs: number;
  open_jobs: number;
  total_applications: number;
  shortlisted: number;
  talent_pool: number;
  offers: number;
  hired: number;
  applications_today: number;
}

export interface DailyApplicationCount {
  date: string;
  count: number;
}

export interface FunnelStage {
  stage: CandidateStatus;
  count: number;
  color: string;
}

// ================================================
// FILTERS
// ================================================
export interface JobFilters {
  search?: string;
  department?: string;
  location?: string;
  employment_type?: string;
}

export interface CandidateFilters {
  search?: string;
  job_id?: string;
  status?: CandidateStatus | 'all';
  min_experience?: number;
  max_experience?: number;
}

// ================================================
// FORM STATE
// ================================================
export interface ApplicationFormState {
  success: boolean;
  error?: string;
  candidate_id?: string;
}

export interface JobFormState {
  success: boolean;
  error?: string;
  job_id?: string;
}

// ================================================
// NOTIFICATION
// ================================================
export interface ATSNotification {
  id: string;
  type: 'new_application';
  candidate_name: string;
  job_title: string;
  candidate_id: string;
  received_at: string;
  read: boolean;
}
