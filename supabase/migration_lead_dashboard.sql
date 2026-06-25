-- ================================================
-- KrissDevHub Technologies — Lead Management DB Migration
-- Run this in your Supabase SQL Editor to upgrade the schema
-- ================================================

-- 1. Drop existing status constraint if it exists
ALTER TABLE public.contacts DROP CONSTRAINT IF EXISTS contacts_status_check;

-- 2. Re-create constraint supporting all active CRM statuses
ALTER TABLE public.contacts ADD CONSTRAINT contacts_status_check 
  CHECK (status IN ('new', 'read', 'replied', 'contacted', 'meeting_scheduled', 'proposal_sent', 'negotiation', 'won', 'lost'));

-- 3. Add notes and history columns if not present
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS history JSONB DEFAULT '[]'::jsonb;
