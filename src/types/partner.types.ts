export type PartnerStatus =
  | "New"
  | "Under Review"
  | "Contacted"
  | "Meeting Scheduled"
  | "Approved"
  | "Rejected"
  | "Closed";

export interface PartnerHistoryItem {
  from: string | null;
  to: string;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface Partner {
  id: string;
  company_name: string;
  company_email: string;
  website: string | null;
  company_size: string | null;
  country: string;
  linkedin_company: string | null;
  contact_name: string;
  designation: string | null;
  contact_email: string;
  phone: string;
  linkedin_profile: string | null;
  partner_type: string;
  services: string[];
  years_in_business: string | null;
  team_size: string | null;
  portfolio: string | null;
  enterprise_clients: string | null;
  partnership_reason: string | null;
  additional_notes: string | null;
  status: PartnerStatus;
  admin_notes: string | null;
  history: PartnerHistoryItem[];
  created_at: string;
  updated_at: string;
}

export interface PartnerApplicationInput {
  company_name: string;
  company_email: string;
  website?: string;
  company_size?: string;
  country: string;
  linkedin_company?: string;
  contact_name: string;
  designation?: string;
  contact_email: string;
  phone: string;
  linkedin_profile?: string;
  partner_type: string;
  services: string[];
  years_in_business?: string;
  team_size?: string;
  portfolio?: string;
  enterprise_clients?: string;
  partnership_reason?: string;
  additional_notes?: string;
  agree_terms: boolean;
}
