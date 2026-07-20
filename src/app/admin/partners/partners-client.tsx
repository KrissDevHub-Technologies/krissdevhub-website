"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Building2,
  Phone,
  Briefcase,
  Notebook,
  History,
  X,
  ExternalLink,
  Loader2,
  Users,
  Handshake,
  Globe,
  Mail,
  User,
  Calendar,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Partner, PartnerStatus, PartnerHistoryItem } from "@/types/partner.types";
import { cn } from "@/lib/utils";

interface PartnersClientProps {
  userEmail: string;
}

const statusOptions: { value: PartnerStatus; label: string; color: string }[] = [
  { value: "New", label: "New", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { value: "Under Review", label: "Under Review", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  { value: "Contacted", label: "Contacted", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  { value: "Meeting Scheduled", label: "Meeting Scheduled", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  { value: "Approved", label: "Approved", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { value: "Rejected", label: "Rejected", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  { value: "Closed", label: "Closed", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
];

const partnerTypeFilterOptions = [
  "All",
  "Referral Partner",
  "Technology Partner",
  "Implementation Partner",
  "Sales Partner",
  "Recruitment Partner",
  "Strategic Partner",
];

export default function PartnersClient({ userEmail }: PartnersClientProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePartner, setActivePartner] = useState<Partner | null>(null);

  // Modal Note State
  const [notesText, setNotesText] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [fetchError, setFetchError] = useState<string | null>(null);

  const supabase = createClient();
  const itemsPerPage = 8;

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPartners((data || []) as Partner[]);
    } catch (err: any) {
      console.error("Error fetching partners:", err);
      setFetchError(
        err?.message ||
          "Permission denied or table missing. Please run supabase/migration_partner_program.sql in Supabase SQL Editor."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Mutation: Update Partner Status & History
  const updateStatus = (partnerId: string, newStatus: PartnerStatus) => {
    startTransition(async () => {
      try {
        const partner = partners.find((p) => p.id === partnerId);
        if (!partner) return;

        const currentHistory = Array.isArray(partner.history) ? partner.history : [];
        const newHistoryLog: PartnerHistoryItem = {
          from: partner.status,
          to: newStatus,
          timestamp: new Date().toISOString(),
          actor: userEmail,
        };
        const updatedHistory = [newHistoryLog, ...currentHistory];

        const { error } = await (supabase as any)
          .from("partners")
          .update({
            status: newStatus,
            history: updatedHistory,
          })
          .eq("id", partnerId);

        if (error) throw error;

        // Update local state
        setPartners((prev) =>
          prev.map((p) =>
            p.id === partnerId ? { ...p, status: newStatus, history: updatedHistory } : p
          )
        );

        if (activePartner && activePartner.id === partnerId) {
          setActivePartner((prev) =>
            prev ? { ...prev, status: newStatus, history: updatedHistory } : null
          );
        }
      } catch (err) {
        console.error("Failed to update partner status:", err);
      }
    });
  };

  // Mutation: Update Admin Notes
  const saveNotes = (partnerId: string) => {
    setSavingNotes(true);
    startTransition(async () => {
      try {
        const partner = partners.find((p) => p.id === partnerId);
        const currentHistory = partner && Array.isArray(partner.history) ? partner.history : [];
        
        const newHistoryLog: PartnerHistoryItem = {
          from: partner?.status || "New",
          to: partner?.status || "New",
          timestamp: new Date().toISOString(),
          actor: userEmail,
          note: "Admin note updated",
        };
        const updatedHistory = [newHistoryLog, ...currentHistory];

        const { error } = await (supabase as any)
          .from("partners")
          .update({
            admin_notes: notesText,
            history: updatedHistory,
          })
          .eq("id", partnerId);

        if (error) throw error;

        setPartners((prev) =>
          prev.map((p) =>
            p.id === partnerId ? { ...p, admin_notes: notesText, history: updatedHistory } : p
          )
        );

        if (activePartner && activePartner.id === partnerId) {
          setActivePartner((prev) =>
            prev ? { ...prev, admin_notes: notesText, history: updatedHistory } : null
          );
        }
      } catch (err) {
        console.error("Failed to save admin notes:", err);
      } finally {
        setSavingNotes(false);
      }
    });
  };

  // Unique Countries for Filter Dropdown
  const countries = Array.from(new Set(partners.map((p) => p.country).filter(Boolean)));

  // Filter & Search Logic
  const filteredPartners = partners
    .filter((partner) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        partner.company_name.toLowerCase().includes(q) ||
        partner.contact_name.toLowerCase().includes(q) ||
        partner.contact_email.toLowerCase().includes(q) ||
        partner.company_email.toLowerCase().includes(q) ||
        (partner.website && partner.website.toLowerCase().includes(q));

      const matchesStatus = statusFilter === "All" || partner.status === statusFilter;
      const matchesType = typeFilter === "All" || partner.partner_type === typeFilter;
      const matchesCountry = countryFilter === "All" || partner.country === countryFilter;

      return matchesSearch && matchesStatus && matchesType && matchesCountry;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage) || 1;
  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats Calculations
  const totalApplications = partners.length;
  const newApplications = partners.filter((p) => p.status === "New").length;
  const contactedCount = partners.filter(
    (p) => p.status === "Contacted" || p.status === "Meeting Scheduled"
  ).length;
  const approvedPartners = partners.filter((p) => p.status === "Approved").length;
  const rejectedCount = partners.filter((p) => p.status === "Rejected").length;

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto space-y-8 text-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <Handshake className="w-7 h-7 text-blue-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Partner CRM</h1>
          </div>
          <p className="text-xs sm:text-sm text-white/40 mt-1 font-light">
            Manage partner applications, co-selling leads, and partnership onboarding pipelines.
          </p>
        </div>
      </div>

      {/* DASHBOARD CARDS (Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Total Applications</p>
            <p className="text-2xl font-bold text-white mt-1">{totalApplications}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">New Applications</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{newApplications}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Contacted</p>
            <p className="text-2xl font-bold text-indigo-400 mt-1">{contactedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Phone className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Approved Partners</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{approvedPartners}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">Rejected</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{rejectedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {fetchError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <strong className="block text-rose-200">Database Permission Error:</strong>
            <span>{fetchError}</span>
          </div>
          <button
            onClick={() => fetchPartners()}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-medium text-xs border border-rose-500/30 transition-colors"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* SEARCH AND FILTERS BAR */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search by company, contact name, email, website..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#09090b] border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-[#09090b] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="All">All Statuses</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-white/40 font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-[#09090b] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              {partnerTypeFilterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          {countries.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-white/40 font-medium">Country:</span>
              <select
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl bg-[#09090b] border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="All">All Countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#09090b] border border-white/10 text-xs text-white/70 hover:text-white transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortBy === "newest" ? "Newest First" : "Oldest First"}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="rounded-2xl bg-[#111111] border border-white/[0.08] overflow-hidden shadow-2xl">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-white/40 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <span className="text-xs">Loading partner applications...</span>
          </div>
        ) : paginatedPartners.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-white/40 gap-3 text-center px-4">
            <Handshake className="w-10 h-10 text-white/20" />
            <p className="text-sm font-semibold text-white/70">No partner applications found</p>
            <p className="text-xs text-white/40 max-w-sm">
              Try adjusting your search query or status/type filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#09090b]/50 text-white/40 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="py-3.5 px-5">Company</th>
                  <th className="py-3.5 px-5">Contact Person</th>
                  <th className="py-3.5 px-5">Email</th>
                  <th className="py-3.5 px-5">Partner Type</th>
                  <th className="py-3.5 px-5">Country</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Submitted Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-white/80 font-light">
                {paginatedPartners.map((partner) => {
                  const statusOpt =
                    statusOptions.find((s) => s.value === partner.status) || statusOptions[0];

                  return (
                    <tr
                      key={partner.id}
                      onClick={() => {
                        setActivePartner(partner);
                        setNotesText(partner.admin_notes || "");
                      }}
                      className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                    >
                      <td className="py-4 px-5 font-semibold text-white">
                        <div>
                          <span>{partner.company_name}</span>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="block text-[10px] text-blue-400 hover:underline font-normal truncate max-w-[180px]"
                            >
                              {partner.website.replace(/^https?:\/\//, "")}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div>
                          <span className="font-medium text-white/90">{partner.contact_name}</span>
                          {partner.designation && (
                            <span className="block text-[10px] text-white/40">{partner.designation}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-white/60">{partner.contact_email}</td>
                      <td className="py-4 px-5">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11px] font-medium text-white/80">
                          {partner.partner_type}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/60">{partner.country}</td>
                      <td className="py-4 px-5">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-semibold border inline-block",
                            statusOpt.color
                          )}
                        >
                          {partner.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-white/40 text-[11px]">
                        {new Date(partner.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setActivePartner(partner);
                            setNotesText(partner.admin_notes || "");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {!loading && filteredPartners.length > 0 && (
          <div className="p-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/40">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredPartners.length)} of{" "}
              {filteredPartners.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-white/70 font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PARTNER DETAILS DRAWER / MODAL */}
      <AnimatePresence>
        {activePartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end"
            onClick={() => setActivePartner(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-full max-w-2xl bg-[#0f0f12] h-full overflow-y-auto border-l border-white/10 p-6 sm:p-8 space-y-8 text-white relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="flex items-start justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 font-mono">
                    Partner Application
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    {activePartner.company_name}
                  </h2>
                  <p className="text-xs text-white/40 mt-0.5">
                    Submitted on{" "}
                    {new Date(activePartner.created_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setActivePartner(null)}
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Management */}
              <div className="p-5 rounded-2xl bg-[#141419] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-white/50 tracking-wider">
                    Application Status
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold border",
                      statusOptions.find((s) => s.value === activePartner.status)?.color
                    )}
                  >
                    {activePartner.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      disabled={isPending}
                      onClick={() => updateStatus(activePartner.id, opt.value)}
                      className={cn(
                        "py-2 px-2.5 rounded-xl text-xs font-medium border transition-all text-center truncate",
                        activePartner.status === opt.value
                          ? "bg-blue-600 text-white border-blue-500 shadow-md"
                          : "bg-[#09090b] text-white/60 border-white/10 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/[0.06] pb-2">
                  Company Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/40 block">Company Name:</span>
                    <span className="text-white font-medium">{activePartner.company_name}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Company Email:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-medium">{activePartner.company_email}</span>
                      <button
                        onClick={() => copyToClipboard(activePartner.company_email, "c_email")}
                        className="text-white/30 hover:text-white"
                      >
                        {copiedField === "c_email" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-white/40 block">Website:</span>
                    {activePartner.website ? (
                      <a
                        href={activePartner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        {activePartner.website} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-white/30">N/A</span>
                    )}
                  </div>
                  <div>
                    <span className="text-white/40 block">Company Size:</span>
                    <span className="text-white">{activePartner.company_size || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Country:</span>
                    <span className="text-white font-medium">{activePartner.country}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">LinkedIn Company Page:</span>
                    {activePartner.linkedin_company ? (
                      <a
                        href={activePartner.linkedin_company}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        View LinkedIn <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-white/30">N/A</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/[0.06] pb-2">
                  Contact Person Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/40 block">Full Name:</span>
                    <span className="text-white font-medium">{activePartner.contact_name}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Designation:</span>
                    <span className="text-white">{activePartner.designation || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Email:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-medium">{activePartner.contact_email}</span>
                      <button
                        onClick={() => copyToClipboard(activePartner.contact_email, "p_email")}
                        className="text-white/30 hover:text-white"
                      >
                        {copiedField === "p_email" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-white/40 block">Phone Number:</span>
                    <span className="text-white font-medium">{activePartner.phone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-white/40 block">LinkedIn Profile:</span>
                    {activePartner.linkedin_profile ? (
                      <a
                        href={activePartner.linkedin_profile}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        View Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-white/30">N/A</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Partnership & Services */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/[0.06] pb-2">
                  Partnership & Services
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-white/40 block mb-1">Partner Type:</span>
                    <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold inline-block">
                      {activePartner.partner_type}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-2">Services Offered:</span>
                    {activePartner.services && activePartner.services.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {activePartner.services.map((srv) => (
                          <span
                            key={srv}
                            className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-white/80"
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-white/30">None specified</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Details & Portfolio */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/[0.06] pb-2">
                  Company Experience & Portfolio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/40 block">Years in Business:</span>
                    <span className="text-white">{activePartner.years_in_business || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Current Team Size:</span>
                    <span className="text-white">{activePartner.team_size || "N/A"}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-white/40 block">Portfolio Website:</span>
                    {activePartner.portfolio ? (
                      <a
                        href={activePartner.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline inline-flex items-center gap-1"
                      >
                        {activePartner.portfolio} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-white/30">N/A</span>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-white/40 block">Previous Enterprise Clients:</span>
                    <p className="text-white/80 mt-1 whitespace-pre-wrap bg-[#09090b] p-3 rounded-xl border border-white/10">
                      {activePartner.enterprise_clients || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reason for Partnership & Additional Notes */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 border-b border-white/[0.06] pb-2">
                  About Partnership
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-white/40 block">Why Partner With KrissDevHub:</span>
                    <p className="text-white/80 mt-1 whitespace-pre-wrap bg-[#09090b] p-3 rounded-xl border border-white/10">
                      {activePartner.partnership_reason || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/40 block">Additional Notes from Applicant:</span>
                    <p className="text-white/80 mt-1 whitespace-pre-wrap bg-[#09090b] p-3 rounded-xl border border-white/10">
                      {activePartner.additional_notes || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ADMIN INTERNAL NOTES */}
              <div className="p-5 rounded-2xl bg-[#141419] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Notebook className="w-4 h-4 text-amber-400" />
                  <span>Internal Admin Notes (Never visible to applicants)</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Add private evaluation notes, call outcomes, or partner deal notes..."
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#09090b] border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
                <button
                  onClick={() => saveNotes(activePartner.id)}
                  disabled={savingNotes}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {savingNotes ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Admin Notes"
                  )}
                </button>
              </div>

              {/* ACTIVITY TIMELINE */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                  <History className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">
                    Activity Timeline
                  </h3>
                </div>
                {Array.isArray(activePartner.history) && activePartner.history.length > 0 ? (
                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/[0.08]">
                    {activePartner.history.map((log: PartnerHistoryItem, idx: number) => (
                      <div key={idx} className="relative text-xs">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#0f0f12]" />
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white">
                            {log.note || (log.from ? `Status changed to ${log.to}` : `Application Submitted`)}
                          </span>
                          <span className="text-[10px] text-white/30">
                            {new Date(log.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/40 mt-0.5 font-light">By {log.actor}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-white/30 italic">No activity history recorded yet.</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
