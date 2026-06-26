-- ================================================
-- KrissDevHub ATS v1 Migration
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ================================================

-- Enable UUID extension (safe if already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- JOBS TABLE (replaces the limited 'careers' table)
-- ================================================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Remote',
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT NOT NULL DEFAULT '',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- CANDIDATES TABLE (replaces limited 'career_applications')
-- ================================================
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_file TEXT,
  cover_letter TEXT,
  experience_years INTEGER,
  current_company TEXT,
  current_ctc TEXT,
  expected_ctc TEXT,
  notice_period TEXT,
  location TEXT,
  skills TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'Applied' CHECK (status IN (
    'Applied', 'Screening', 'Interview', 'Shortlisted',
    'Talent Pool', 'Offer', 'Hired', 'Rejected', 'On Hold'
  )),
  source TEXT DEFAULT 'Website',
  notes TEXT DEFAULT '',
  status_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- UPDATED_AT TRIGGERS
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS jobs_updated_at ON jobs;
CREATE TRIGGER jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Public can read open jobs
CREATE POLICY "Public can read open jobs"
  ON jobs FOR SELECT
  USING (status = 'open');

-- Anyone can submit application
CREATE POLICY "Anyone can submit candidate application"
  ON candidates FOR INSERT
  WITH CHECK (true);

-- Authenticated users have full access
CREATE POLICY "Authenticated full access to jobs"
  ON jobs FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access to candidates"
  ON candidates FOR ALL
  USING (auth.role() = 'authenticated');

-- Grant access to all standard Supabase roles
GRANT ALL ON TABLE jobs TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE candidates TO postgres, anon, authenticated, service_role;

-- ================================================
-- INDEXES
-- ================================================
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(featured);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_candidates_job_id ON candidates(job_id);
CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);
CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates(email);
CREATE INDEX IF NOT EXISTS idx_candidates_applied_at ON candidates(applied_at DESC);

-- ================================================
-- ENABLE REALTIME on candidates (for admin notifications)
-- ================================================
ALTER PUBLICATION supabase_realtime ADD TABLE candidates;

-- ================================================
-- STORAGE BUCKET for resumes
-- NOTE: Run this in Supabase Dashboard > Storage if SQL doesn't create it
-- ================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  false,
  10485760, -- 10MB
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Anyone can upload
CREATE POLICY "Anyone can upload resume"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

-- Authenticated users can read/download resumes
CREATE POLICY "Authenticated can read resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Authenticated can delete resumes
CREATE POLICY "Authenticated can delete resumes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- ================================================
-- SAMPLE SEED JOBS (comment out if not needed)
-- ================================================
-- INSERT INTO jobs (title, slug, department, location, employment_type, salary_min, salary_max, description, responsibilities, requirements, benefits, status, featured)
-- VALUES
-- (
--   'Senior Full-Stack Engineer',
--   'senior-fullstack-engineer',
--   'Engineering',
--   'Remote (Worldwide)',
--   'Full-time',
--   90000,
--   140000,
--   'We are looking for a Senior Full-Stack Engineer to join our core product team. You will architect and ship features that power our AI-native SaaS products.',
--   ARRAY[
--     'Design and implement scalable full-stack features using Next.js and Supabase',
--     'Lead code reviews and mentor junior engineers',
--     'Collaborate directly with clients on system architecture',
--     'Own features end-to-end from design to production deployment'
--   ],
--   ARRAY[
--     '4+ years of production Next.js / React experience',
--     'Strong TypeScript and SQL fundamentals',
--     'Experience with Supabase or PostgreSQL at scale',
--     'Proven track record of shipping quality software'
--   ],
--   ARRAY[
--     'Fully remote with async-first culture',
--     '$1,500/year learning budget',
--     'MacBook Pro + peripherals of your choice',
--     'Unlimited PTO',
--     'Competitive equity package'
--   ],
--   'open',
--   true
-- );
