-- ================================================
-- KrissDevHub Technologies — Partner Program Migration
-- Run this script in your Supabase SQL Editor
-- ================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Partners Table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  website TEXT,
  company_size TEXT,
  country TEXT NOT NULL,
  linkedin_company TEXT,
  contact_name TEXT NOT NULL,
  designation TEXT,
  contact_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  linkedin_profile TEXT,
  partner_type TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  years_in_business TEXT,
  team_size TEXT,
  portfolio TEXT,
  enterprise_clients TEXT,
  partnership_reason TEXT,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'New' CHECK (
    status IN (
      'New',
      'Under Review',
      'Contacted',
      'Meeting Scheduled',
      'Approved',
      'Rejected',
      'Closed'
    )
  ),
  admin_notes TEXT DEFAULT '',
  history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for searching and filtering
CREATE INDEX IF NOT EXISTS partners_company_email_idx ON partners(company_email);
CREATE INDEX IF NOT EXISTS partners_contact_email_idx ON partners(contact_email);
CREATE INDEX IF NOT EXISTS partners_status_idx ON partners(status);
CREATE INDEX IF NOT EXISTS partners_partner_type_idx ON partners(partner_type);
CREATE INDEX IF NOT EXISTS partners_created_at_idx ON partners(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent conflicts
DROP POLICY IF EXISTS "Allow public insert to partners" ON partners;
DROP POLICY IF EXISTS "Allow admin full access to partners" ON partners;

-- Allow public insert for new partner applications
CREATE POLICY "Allow public insert to partners" ON partners
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users (Admins) full access (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "Allow admin full access to partners" ON partners
  FOR ALL USING (auth.role() = 'authenticated');

-- Grant explicit PostgreSQL table permissions to standard Supabase roles
GRANT ALL ON TABLE partners TO postgres, anon, authenticated, service_role;

-- Updated At Trigger
CREATE TRIGGER partners_updated_at BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
