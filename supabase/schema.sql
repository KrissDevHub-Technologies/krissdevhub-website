-- ================================================
-- KrissDevHub Technologies — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- PROJECTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  metrics JSONB,
  category TEXT NOT NULL DEFAULT 'General',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- TESTIMONIALS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  company TEXT NOT NULL,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- BLOGS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  author TEXT NOT NULL DEFAULT 'KrissDevHub Team',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- CAREERS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Remote',
  type TEXT NOT NULL DEFAULT 'Full-time',
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  salary_range TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- CAREER APPLICATIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS career_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  github_url TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  cover_letter TEXT NOT NULL,
  role_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'shortlisted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- CONTACTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  budget TEXT,
  service TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- NEWSLETTER TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ================================================
-- SETTINGS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('site', '{"maintenance": false, "announcement": null}'),
  ('seo', '{"title": "KrissDevHub Technologies", "description": "Building AI-Native Software for the Next Generation."}')
ON CONFLICT (key) DO NOTHING;

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

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blogs_updated_at BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER careers_updated_at BEFORE UPDATE ON careers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- ==================
-- PUBLIC READ POLICIES
-- ==================

-- Projects: public can read published
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (published = true);

-- Testimonials: public can read published
CREATE POLICY "Public can read published testimonials"
  ON testimonials FOR SELECT
  USING (published = true);

-- Blogs: public can read published
CREATE POLICY "Public can read published blogs"
  ON blogs FOR SELECT
  USING (published = true);

-- Careers: public can read published
CREATE POLICY "Public can read published careers"
  ON careers FOR SELECT
  USING (published = true);

-- Settings: public can read
CREATE POLICY "Public can read settings"
  ON settings FOR SELECT
  USING (true);

-- ==================
-- PUBLIC WRITE POLICIES
-- ==================

-- Contacts: anyone can submit
CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  WITH CHECK (true);

-- Newsletter: anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter FOR INSERT
  WITH CHECK (true);

-- Career Applications: anyone can submit
CREATE POLICY "Anyone can submit a career application"
  ON career_applications FOR INSERT
  WITH CHECK (true);

-- ==================
-- AUTHENTICATED (ADMIN) POLICIES
-- ==================

-- Full access for authenticated users on all tables
CREATE POLICY "Authenticated users have full access to projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to blogs"
  ON blogs FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to careers"
  ON careers FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to contacts"
  ON contacts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to newsletter"
  ON newsletter FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to career applications"
  ON career_applications FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================
-- INDEXES for performance
-- ================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
CREATE INDEX IF NOT EXISTS idx_careers_published ON careers(published);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_career_applications_role ON career_applications(role_slug);
