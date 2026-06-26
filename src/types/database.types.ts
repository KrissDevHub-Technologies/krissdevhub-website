export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          excerpt: string;
          cover_image: string | null;
          tech_stack: string[];
          metrics: Json | null;
          category: string;
          featured: boolean;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_role: string;
          company: string;
          avatar_url: string | null;
          content: string;
          rating: number;
          published: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["testimonials"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          tags: string[];
          author: string;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["blogs"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["blogs"]["Insert"]>;
      };
      careers: {
        Row: {
          id: string;
          title: string;
          slug: string;
          department: string;
          location: string;
          type: string;
          description: string;
          requirements: string[];
          salary_range: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["careers"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["careers"]["Insert"]>;
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          message: string;
          budget: string | null;
          service: string | null;
          status: "new" | "read" | "replied" | "contacted" | "meeting_scheduled" | "proposal_sent" | "negotiation" | "won" | "lost";
          notes: string | null;
          history: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          message: string;
          budget?: string | null;
          service?: string | null;
          status?: "new" | "read" | "replied" | "contacted" | "meeting_scheduled" | "proposal_sent" | "negotiation" | "won" | "lost";
          notes?: string | null;
          history?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          message?: string;
          budget?: string | null;
          service?: string | null;
          status?: "new" | "read" | "replied" | "contacted" | "meeting_scheduled" | "proposal_sent" | "negotiation" | "won" | "lost";
          notes?: string | null;
          history?: Json | null;
          created_at?: string;
        };
      };
      newsletter: {
        Row: {
          id: string;
          email: string;
          active: boolean;
          subscribed_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["newsletter"]["Row"], "id" | "subscribed_at" | "active">;
        Update: Partial<Database["public"]["Tables"]["newsletter"]["Row"]>;
      };
      settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["settings"]["Row"], "updated_at">;
        Update: Partial<Database["public"]["Tables"]["settings"]["Row"]>;
      };
      career_applications: {
        Row: {
          id: string;
          name: string;
          email: string;
          github_url: string | null;
          linkedin_url: string | null;
          resume_url: string;
          cover_letter: string;
          role_slug: string;
          status: "new" | "reviewing" | "shortlisted" | "rejected";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          github_url?: string | null;
          linkedin_url?: string | null;
          resume_url: string;
          cover_letter: string;
          role_slug: string;
          status?: "new" | "reviewing" | "shortlisted" | "rejected";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          github_url?: string | null;
          linkedin_url?: string | null;
          resume_url?: string;
          cover_letter?: string;
          role_slug?: string;
          status?: "new" | "reviewing" | "shortlisted" | "rejected";
          created_at?: string;
        };
      };
      // ── ATS Tables ──────────────────────────────────────
      jobs: {
        Row: {
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
          status: "draft" | "open" | "closed";
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["jobs"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["jobs"]["Insert"]>;
      };
      candidates: {
        Row: {
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
          status: "Applied" | "Screening" | "Interview" | "Shortlisted" | "Talent Pool" | "Offer" | "Hired" | "Rejected" | "On Hold";
          source: string | null;
          notes: string | null;
          status_history: Json;
          applied_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
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
          status?: "Applied" | "Screening" | "Interview" | "Shortlisted" | "Talent Pool" | "Offer" | "Hired" | "Rejected" | "On Hold";
          source?: string | null;
          notes?: string | null;
          status_history?: Json;
          applied_at?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["candidates"]["Row"], "id" | "created_at" | "applied_at">>;
      };
    };
  };
}

// Domain types
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Blog = Database["public"]["Tables"]["blogs"]["Row"];
export type Career = Database["public"]["Tables"]["careers"]["Row"];
export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Newsletter = Database["public"]["Tables"]["newsletter"]["Row"];
export type Settings = Database["public"]["Tables"]["settings"]["Row"];
export type JobRow = Database["public"]["Tables"]["jobs"]["Row"];
export type CandidateRow = Database["public"]["Tables"]["candidates"]["Row"];
