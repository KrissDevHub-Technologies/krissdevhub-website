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
  LogOut,
  User,
  Calendar,
  Building2,
  Phone,
  Briefcase,
  CircleDollarSign,
  Notebook,
  History,
  X,
  ExternalLink,
  Loader2,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface Lead {
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
  history: any; // array of history logs
  created_at: string;
}

interface DashboardClientProps {
  userEmail: string;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-500/10 text-blue-400 border-blue-500/20 glow-blue" },
  { value: "contacted", label: "Contacted", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 glow-indigo" },
  { value: "meeting_scheduled", label: "Meeting Scheduled", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 glow-cyan" },
  { value: "proposal_sent", label: "Proposal Sent", color: "bg-purple-500/10 text-purple-400 border-purple-500/20 glow-purple" },
  { value: "negotiation", label: "Negotiation", color: "bg-orange-500/10 text-orange-400 border-orange-500/20 glow-orange" },
  { value: "won", label: "Won", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-emerald" },
  { value: "lost", label: "Lost", color: "bg-rose-500/10 text-rose-400 border-rose-500/20 glow-rose" },
  // Backward compatibility fallback options
  { value: "read", label: "Read", color: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  { value: "replied", label: "Replied", color: "bg-teal-500/10 text-teal-400 border-teal-500/20" }
];

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Filters & State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  
  // Modal Edit states
  const [notesText, setNotesText] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const supabase = createClient();
  const itemsPerPage = 8;

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads((data || []) as Lead[]);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Mutation: Update Lead Status & History
  const updateStatus = (leadId: string, newStatus: Lead["status"]) => {
    startTransition(async () => {
      try {
        const lead = leads.find((l) => l.id === leadId);
        if (!lead) return;

        const currentHistory = Array.isArray(lead.history) ? lead.history : [];
        const newHistoryLog = {
          from: lead.status,
          to: newStatus,
          timestamp: new Date().toISOString(),
          actor: userEmail
        };
        const updatedHistory = [newHistoryLog, ...currentHistory];

        const { error } = await (supabase as any)
          .from("contacts")
          .update({
            status: newStatus,
            history: updatedHistory
          })
          .eq("id", leadId);

        if (error) throw error;

        // Update local state
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId ? { ...l, status: newStatus, history: updatedHistory } : l
          )
        );

        if (activeLead && activeLead.id === leadId) {
          setActiveLead((prev) =>
            prev ? { ...prev, status: newStatus, history: updatedHistory } : null
          );
        }
      } catch (err) {
        console.error("Failed to update status:", err);
      }
    });
  };

  // Mutation: Update Lead Notes
  const saveNotes = (leadId: string) => {
    startTransition(async () => {
      try {
        const { error } = await (supabase as any)
          .from("contacts")
          .update({ notes: notesText })
          .eq("id", leadId);

        if (error) throw error;

        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, notes: notesText } : l))
        );

        if (activeLead && activeLead.id === leadId) {
          setActiveLead((prev) => (prev ? { ...prev, notes: notesText } : null));
        }
      } catch (err) {
        console.error("Failed to save notes:", err);
      }
    });
  };

  // Bulk Actions
  const handleBulkStatusChange = (newStatus: Lead["status"]) => {
    startTransition(async () => {
      try {
        const selectedIds = Array.from(selectedRows);
        
        // Build updates
        const updates = selectedIds.map(async (id) => {
          const lead = leads.find((l) => l.id === id);
          if (!lead) return;

          const currentHistory = Array.isArray(lead.history) ? lead.history : [];
          const newHistoryLog = {
            from: lead.status,
            to: newStatus,
            timestamp: new Date().toISOString(),
            actor: `${userEmail} (Bulk)`
          };
          const updatedHistory = [newHistoryLog, ...currentHistory];

          return (supabase as any)
            .from("contacts")
            .update({ status: newStatus, history: updatedHistory })
            .eq("id", id);
        });

        await Promise.all(updates);

        // Update local state
        setLeads((prev) =>
          prev.map((l) => {
            if (selectedRows.has(l.id)) {
              const currentHistory = Array.isArray(l.history) ? l.history : [];
              const updatedHistory = [
                { from: l.status, to: newStatus, timestamp: new Date().toISOString(), actor: `${userEmail} (Bulk)` },
                ...currentHistory
              ];
              return { ...l, status: newStatus, history: updatedHistory };
            }
            return l;
          })
        );
        setSelectedRows(new Set());
      } catch (err) {
        console.error("Failed executing bulk status change:", err);
      }
    });
  };

  const handleDeleteLead = (leadId: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    startTransition(async () => {
      try {
        const { error } = await supabase.from("contacts").delete().eq("id", leadId);
        if (error) throw error;

        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (activeLead?.id === leadId) setActiveLead(null);
        setSelectedRows((prev) => {
          const next = new Set(prev);
          next.delete(leadId);
          return next;
        });
      } catch (err) {
        console.error("Failed to delete lead:", err);
      }
    });
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === currentLeads.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentLeads.map((l) => l.id)));
    }
  };

  // Open Modal Helper
  const openDetails = (lead: Lead) => {
    setActiveLead(lead);
    setNotesText(lead.notes || "");
  };

  // Metrics Calculations
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const wonLeadsCount = leads.filter((l) => l.status === "won").length;
  const lostLeadsCount = leads.filter((l) => l.status === "lost").length;
  
  const pipelineLeadsCount = leads.filter((l) =>
    ["contacted", "meeting_scheduled", "proposal_sent", "negotiation"].includes(l.status)
  ).length;

  const conversionRate = totalLeadsCount - newLeadsCount - pipelineLeadsCount > 0
    ? Math.round((wonLeadsCount / (wonLeadsCount + lostLeadsCount || 1)) * 100)
    : 0;

  // Search & Filtering Logic
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.service || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesService = serviceFilter === "all" || lead.service === serviceFilter;
      const matchesBudget = budgetFilter === "all" || lead.budget === budgetFilter;

      return matchesSearch && matchesStatus && matchesService && matchesBudget;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const currentLeads = filteredLeads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getUniqueValues = (key: keyof Lead) => {
    const vals = leads.map((l) => l[key]).filter(Boolean);
    return Array.from(new Set(vals)) as string[];
  };

  const uniqueServices = getUniqueValues("service");
  const uniqueBudgets = getUniqueValues("budget");

  return (
    <div className="min-h-screen bg-[#090909] text-white font-sans selection:bg-white/10 flex flex-col">
      {/* 1. Header */}
      <header className="border-b border-white/[0.04] bg-[#0c0c0c] px-6 py-4 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-bold text-white tracking-tight shadow-md">
            K
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight font-space-grotesk">Lead Manager</h1>
            <span className="text-[10px] text-white/30 font-mono tracking-wider uppercase">KrissDevHub Console</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-white/50 font-light">{userEmail}</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/5 hover:border-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
        
        {/* 2. Metric Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Inquiries", value: totalLeadsCount, desc: "Received leads overall" },
            { label: "New Leads", value: newLeadsCount, desc: "Uncontacted submissions", highlight: newLeadsCount > 0 },
            { label: "Open Pipeline", value: pipelineLeadsCount, desc: "In active negotiation" },
            { label: "Conversion Rate", value: `${conversionRate}%`, desc: "Won leads vs lost leads" }
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#111111] border border-white/[0.05] relative overflow-hidden flex flex-col justify-between group hover:border-white/[0.1] transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-widest block font-medium mb-1.5">{card.label}</span>
                <span className={`text-2xl font-bold font-space-grotesk tracking-tight ${card.highlight ? "text-blue-400" : "text-white"}`}>
                  {loading ? <Loader2 className="w-6 h-6 animate-spin text-white/20" /> : card.value}
                </span>
              </div>
              <p className="text-[10px] text-white/25 mt-3 font-light leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </section>

        {/* 3. Controls & Actions */}
        <section className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/[0.04] space-y-4">
          {/* Filter Row */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-white/25 pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search name, company, message details..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/10 transition-all text-white"
              />
            </div>

            {/* Select Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Status */}
              <div className="relative flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.06] px-3 py-2 rounded-xl text-xs text-white/50">
                <Filter className="w-3 h-3" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none text-white focus:outline-none text-[11px]"
                >
                  <option value="all" className="bg-[#121212] text-white">All Statuses</option>
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#121212] text-white">{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div className="relative flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.06] px-3 py-2 rounded-xl text-xs text-white/50">
                <Briefcase className="w-3 h-3" />
                <select
                  value={serviceFilter}
                  onChange={(e) => {
                    setServiceFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none text-white focus:outline-none text-[11px]"
                >
                  <option value="all" className="bg-[#121212] text-white">All Services</option>
                  {uniqueServices.map((srv) => (
                    <option key={srv} value={srv} className="bg-[#121212] text-white">{srv}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="relative flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.06] px-3 py-2 rounded-xl text-xs text-white/50">
                <CircleDollarSign className="w-3 h-3" />
                <select
                  value={budgetFilter}
                  onChange={(e) => {
                    setBudgetFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none text-white focus:outline-none text-[11px]"
                >
                  <option value="all" className="bg-[#121212] text-white">All Budgets</option>
                  {uniqueBudgets.map((bdg) => (
                    <option key={bdg} value={bdg} className="bg-[#121212] text-white">{bdg}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="relative flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.06] px-3 py-2 rounded-xl text-xs text-white/50">
                <ArrowUpDown className="w-3 h-3" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none text-[11px]"
                >
                  <option value="newest" className="bg-[#121212] text-white">Newest First</option>
                  <option value="oldest" className="bg-[#121212] text-white">Oldest First</option>
                  <option value="name" className="bg-[#121212] text-white">Name A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bulk Actions Panel */}
          <AnimatePresence>
            {selectedRows.size > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 text-white/50">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono font-bold text-[10px]">{selectedRows.size}</span>
                  <span>leads selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35 font-mono uppercase mr-1">Bulk Actions:</span>
                  <button
                    onClick={() => handleBulkStatusChange("contacted")}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 cursor-pointer transition-colors"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("won")}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 cursor-pointer transition-colors"
                  >
                    Mark Won
                  </button>
                  <button
                    onClick={() => handleBulkStatusChange("lost")}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 cursor-pointer transition-colors"
                  >
                    Mark Lost
                  </button>
                  <button
                    onClick={() => setSelectedRows(new Set())}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:bg-white/5 cursor-pointer text-white/60 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 4. Leads Table */}
        <section className="rounded-2xl border border-white/[0.05] bg-[#0c0c0c] overflow-hidden shadow-2xl relative">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={currentLeads.length > 0 && selectedRows.size === currentLeads.length}
                      onChange={toggleSelectAll}
                      className="rounded border-white/20 focus:ring-0 focus:outline-none bg-transparent"
                    />
                  </th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/40 font-mono">Lead Info</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/40 font-mono">Company</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/40 font-mono">Request details</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/40 font-mono">Status</th>
                  <th className="p-4 text-xs font-semibold uppercase tracking-wider text-white/40 font-mono">Submitted</th>
                  <th className="p-4 w-28 text-center text-xs font-semibold uppercase tracking-wider text-white/40 font-mono">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-24 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-white/25" />
                        <span className="text-xs text-white/30 font-light">Loading database submissions...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-xs text-white/35 font-light">
                      No leads match your filter parameters or query.
                    </td>
                  </tr>
                ) : (
                  currentLeads.map((lead) => {
                    const statusConfig = statusOptions.find((opt) => opt.value === lead.status) || {
                      label: lead.status,
                      color: "bg-white/10 text-white border-white/20"
                    };

                    const isRowSelected = selectedRows.has(lead.id);

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => openDetails(lead)}
                        className={`hover:bg-white/[0.01] transition-colors cursor-pointer group select-none ${isRowSelected ? "bg-white/[0.02]" : ""}`}
                      >
                        {/* Checkbox */}
                        <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isRowSelected}
                            onChange={() => toggleSelectRow(lead.id)}
                            className="rounded border-white/20 focus:ring-0 focus:outline-none bg-transparent"
                          />
                        </td>

                        {/* Name & Email */}
                        <td className="p-4">
                          <div>
                            <span className="text-sm font-semibold block text-white group-hover:text-white/80 transition-colors">
                              {lead.name}
                            </span>
                            <span className="text-xs text-white/30 font-light block mt-0.5">
                              {lead.email}
                              {lead.phone && <span className="text-white/20"> · {lead.phone}</span>}
                            </span>
                          </div>
                        </td>

                        {/* Company */}
                        <td className="p-4 text-sm text-white/60 font-light">
                          {lead.company || <span className="text-white/20 italic">Individual</span>}
                        </td>

                        {/* Service & Budget */}
                        <td className="p-4">
                          <div className="space-y-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-white/60 font-mono inline-block">
                              {lead.service || "Not Specified"}
                            </span>
                            <span className="text-[11px] text-white/40 block leading-none font-light">
                              Budget: {lead.budget || "N/A"}
                            </span>
                          </div>
                        </td>

                        {/* Status badge */}
                        <td className="p-4">
                          <span className={`text-[9px] px-2.5 py-1 rounded-full font-semibold border ${statusConfig.color} inline-block uppercase tracking-wider`}>
                            {statusConfig.label}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="p-4 text-xs text-white/40 font-light">
                          {new Date(lead.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-center items-center gap-1.5">
                            {lead.status === "new" && (
                              <button
                                onClick={() => updateStatus(lead.id, "contacted")}
                                className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400 hover:bg-indigo-500/20 transition-colors cursor-pointer font-medium whitespace-nowrap"
                              >
                                Mark Contacted
                              </button>
                            )}
                            <button
                              onClick={() => openDetails(lead)}
                              className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] text-white/60 hover:bg-white/5 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Review
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded bg-red-500/5 border border-red-500/10 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer flex-shrink-0"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="border-t border-white/[0.04] p-4 flex items-center justify-between bg-white/[0.01]">
              <span className="text-xs text-white/35 font-light">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="p-1.5 rounded bg-white/[0.02] border border-white/[0.06] text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="p-1.5 rounded bg-white/[0.02] border border-white/[0.06] text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 5. View Details Modal Overlay */}
      <AnimatePresence>
        {activeLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLead(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] w-full max-w-3xl rounded-2xl border border-white/[0.08] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Top Bar */}
              <div className="px-6 py-4 border-b border-white/[0.04] bg-[#0e0e0e] flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight font-space-grotesk flex items-center gap-2">
                    Inquiry Details
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-white/40 uppercase tracking-widest">
                      {activeLead.id.slice(0, 8)}
                    </span>
                  </h2>
                  <p className="text-[10px] text-white/30 font-light mt-0.5">Submitted on {new Date(activeLead.created_at).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setActiveLead(null)}
                  className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/5 hover:border-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 grid md:grid-cols-2 gap-6">
                
                {/* Left panel: Info & inquiry */}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-[10px] text-white/35 font-mono uppercase tracking-widest mb-1.5">Contact Profile</h3>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-3.5">
                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-white/30" />
                        <div>
                          <span className="text-xs text-white/30 block leading-none">Name</span>
                          <span className="text-xs font-semibold text-white mt-1 block">{activeLead.name}</span>
                        </div>
                      </div>
                      
                      {/* Email */}
                      <div className="flex items-center justify-between gap-3 border-t border-white/[0.02] pt-3">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-white/30" />
                          <div>
                            <span className="text-xs text-white/30 block leading-none">Email</span>
                            <span className="text-xs font-semibold text-white mt-1 block">{activeLead.email}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(activeLead.email, "email")}
                          className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06] hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center justify-between gap-3 border-t border-white/[0.02] pt-3">
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-white/30" />
                          <div>
                            <span className="text-xs text-white/30 block leading-none">Phone</span>
                            <span className="text-xs font-semibold text-white mt-1 block">
                              {activeLead.phone || <span className="text-white/20 italic">Not Provided</span>}
                            </span>
                          </div>
                        </div>
                        {activeLead.phone && (
                          <button
                            onClick={() => copyToClipboard(activeLead.phone!, "phone")}
                            className="p-1.5 rounded bg-white/[0.03] border border-white/[0.06] hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>

                      {/* Company */}
                      <div className="flex items-center gap-3 border-t border-white/[0.02] pt-3">
                        <Building2 className="w-4 h-4 text-white/30" />
                        <div>
                          <span className="text-xs text-white/30 block leading-none">Company</span>
                          <span className="text-xs font-semibold text-white mt-1 block">{activeLead.company || "Individual"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Params */}
                  <div>
                    <h3 className="text-[10px] text-white/35 font-mono uppercase tracking-widest mb-1.5">Request Specs</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-[10px] text-white/30 block mb-1">Service category</span>
                        <span className="text-xs font-semibold text-white font-mono">{activeLead.service || "N/A"}</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <span className="text-[10px] text-white/30 block mb-1">Contract budget</span>
                        <span className="text-xs font-semibold text-white font-mono">{activeLead.budget || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message body */}
                  <div>
                    <h3 className="text-[10px] text-white/35 font-mono uppercase tracking-widest mb-1.5">Inquiry message</h3>
                    <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/[0.06] max-h-[160px] overflow-y-auto">
                      <p className="text-xs text-white/70 leading-relaxed font-light whitespace-pre-wrap">{activeLead.message}</p>
                    </div>
                  </div>
                </div>

                {/* Right panel: CRM notes, status transitions, timeline logs */}
                <div className="space-y-5">
                  
                  {/* Status update select */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-[10px] text-white/35 font-mono uppercase tracking-widest">Lead Status</h3>
                      {activeLead.status === "new" && (
                        <button
                          onClick={() => updateStatus(activeLead!.id, "contacted")}
                          disabled={isPending}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer disabled:opacity-50 uppercase tracking-widest"
                        >
                          Mark Contacted
                        </button>
                      )}
                    </div>
                    <div className="relative flex items-center bg-white/[0.02] border border-white/[0.06] px-3.5 py-2.5 rounded-xl text-xs">
                      <select
                        disabled={isPending}
                        value={activeLead.status}
                        onChange={(e) => updateStatus(activeLead.id, e.target.value as any)}
                        className="w-full bg-transparent border-none text-white focus:outline-none font-semibold uppercase tracking-wider text-[11px] disabled:opacity-50"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#121212] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin absolute right-3.5 text-white/40" />}
                    </div>
                  </div>

                  {/* Notes text area */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-[10px] text-white/35 font-mono uppercase tracking-widest flex items-center gap-1.5">
                        <Notebook className="w-3.5 h-3.5" />
                        CRM Notes
                      </h3>
                      <button
                        onClick={() => saveNotes(activeLead.id)}
                        disabled={isPending}
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer disabled:opacity-50 uppercase tracking-widest"
                      >
                        Save notes
                      </button>
                    </div>
                    <textarea
                      disabled={isPending}
                      rows={4}
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      placeholder="Enter follow-up logs, contact results, proposed architectures, next actions..."
                      className="w-full p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/10 transition-all resize-none text-light leading-relaxed"
                    />
                  </div>

                  {/* History timelines */}
                  <div>
                    <h3 className="text-[10px] text-white/35 font-mono uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" />
                      Status Log Timeline
                    </h3>
                    <div className="border-l border-white/[0.06] pl-4 space-y-4 max-h-[140px] overflow-y-auto pt-1 font-mono">
                      {Array.isArray(activeLead.history) && activeLead.history.length > 0 ? (
                        activeLead.history.map((log: any, idx: number) => {
                          const dateObj = new Date(log.timestamp);
                          const dateStr = dateObj.toLocaleDateString();
                          const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          return (
                            <div key={idx} className="relative text-[10px]">
                              {/* Timeline bullet */}
                              <span className="w-1.5 h-1.5 rounded-full bg-white/20 absolute -left-[20px] top-[4px] border border-[#121212]" />
                              
                              <div className="text-white/70">
                                Changed status from <span className="text-white/40 uppercase">{log.from}</span> to{" "}
                                <span className="text-white font-semibold uppercase">{log.to}</span>
                              </div>
                              <div className="text-white/30 text-[9px] mt-0.5">
                                {dateStr} at {timeStr} by {log.actor}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-[10px] text-white/20 italic font-mono pl-1">
                          No history events recorded yet.
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Actions Bar */}
              <div className="px-6 py-4 border-t border-white/[0.04] bg-[#0e0e0e] flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setActiveLead(null)}
                  className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:bg-white/5 text-xs text-white/75 hover:text-white cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
