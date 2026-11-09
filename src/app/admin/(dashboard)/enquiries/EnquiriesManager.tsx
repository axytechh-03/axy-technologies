"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  Layers,
} from "lucide-react";

export interface EnquiryItem {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string | null;
  country_code: string | null;
  services: string[];
  requirements: string | null;
  project_message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface EnquiriesManagerProps {
  initialEnquiries: EnquiryItem[];
}

export const EnquiriesManager: React.FC<EnquiriesManagerProps> = ({
  initialEnquiries,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  // Deferred query prevents input typing lag during fast search
  const deferredQuery = useDeferredValue(searchQuery);

  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter & Search (uses deferredQuery for non-blocking UI updates)
  const filtered = useMemo(() => {
    const q = deferredQuery.toLowerCase().trim();

    return initialEnquiries.filter((item) => {
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.reference.toLowerCase().includes(q) ||
        (item.phone && item.phone.toLowerCase().includes(q));

      const matchStatus = statusFilter === "all" || item.status === statusFilter;

      const matchService =
        serviceFilter === "all" ||
        item.services.some((s) => s.toLowerCase() === serviceFilter.toLowerCase());

      return matchSearch && matchStatus && matchService;
    });
  }, [initialEnquiries, deferredQuery, statusFilter, serviceFilter]);

  // Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [filtered, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  // CSV Export
  const handleExportCSV = () => {
    if (sorted.length === 0) return;

    const headers = [
      "Reference",
      "Customer Name",
      "Email Address",
      "Phone Number",
      "Services",
      "Additional Requirements",
      "Project Message",
      "Status",
      "Submitted At (UTC)",
    ];

    const rows = sorted.map((e) => [
      `"${e.reference}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.phone || ""}"`,
      `"${e.services.join(", ")}"`,
      `"${(e.requirements || "").replace(/"/g, '""')}"`,
      `"${e.project_message.replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${e.created_at}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().split("T")[0];
    link.href = url;
    link.setAttribute("download", `AXY_Enquiries_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#eff4ff] text-[#3563f5] border border-[#c7d7fe]">
            New
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd]">
            Contacted
          </span>
        );
      case "follow_up":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#fefce8] text-[#a16207] border border-[#fef08a]">
            Follow-up
          </span>
        );
      case "converted":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
            Converted
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]">
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#f1f5f9] text-[#475569]">
            {status}
          </span>
        );
    }
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, ref…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-xs text-[#0f172a] focus:bg-white focus:outline-none focus:border-[#3563f5] focus:ring-2 focus:ring-[#3563f5]/15 transition-all min-h-[38px]"
            />
          </div>

          {/* Action & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-2.5 py-1.5 min-h-[36px]">
              <Filter className="w-3.5 h-3.5 text-[#64748b] shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs text-[#334155] font-medium outline-none cursor-pointer"
                aria-label="Filter by Status"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="follow_up">Follow-up</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Service Filter */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-2.5 py-1.5 min-h-[36px]">
              <select
                value={serviceFilter}
                onChange={(e) => {
                  setServiceFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-xs text-[#334155] font-medium outline-none cursor-pointer"
                aria-label="Filter by Service"
              >
                <option value="all">All Services</option>
                <option value="Website development">Website dev</option>
                <option value="Digital marketing / Meta Ads">Meta Ads</option>
                <option value="Google Ads">Google Ads</option>
                <option value="SEO optimization">SEO</option>
                <option value="Branding and creative">Branding</option>
                <option value="Multiple Services">Multiple</option>
                <option value="Not Sure Yet">Not Sure</option>
              </select>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
              }
              className="flex items-center gap-1.5 bg-[#f8fafc] hover:bg-[#e2e8f0] border border-[#e2e8f0] rounded-xl px-3 py-1.5 text-xs text-[#334155] font-medium transition-colors cursor-pointer min-h-[36px]"
              title="Toggle sort order"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#64748b]" />
              <span>{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              disabled={sorted.length === 0}
              className="flex items-center gap-1.5 bg-[#eff4ff] hover:bg-[#3563f5] text-[#3563f5] hover:text-white border border-[#c7d7fe] rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter count summary */}
        <div className="flex items-center justify-between text-[11px] text-[#64748b] pt-1 border-t border-[#f1f5f9]">
          <span>
            Showing <strong>{paginated.length}</strong> of <strong>{sorted.length}</strong> records (Total: {initialEnquiries.length})
          </span>
          {(searchQuery || statusFilter !== "all" || serviceFilter !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setServiceFilter("all");
                setCurrentPage(1);
              }}
              className="text-[#3563f5] hover:underline font-semibold cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Main Enquiries Content Container */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xs overflow-hidden">
        {paginated.length > 0 ? (
          <>
            {/* 1. Desktop & Tablet Table (>= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafc] text-[#64748b] font-semibold border-b border-[#e2e8f0]">
                  <tr>
                    <th className="py-3 px-4">Ref</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {paginated.map((enq) => {
                    const service =
                      Array.isArray(enq.services) && enq.services.length > 0
                        ? enq.services[0]
                        : "General";

                    return (
                      <tr
                        key={enq.id}
                        className="hover:bg-[#f8fafc] transition-colors group"
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-[#3563f5]">
                          <Link
                            href={`/admin/enquiries/${enq.id}`}
                            className="hover:underline"
                          >
                            {enq.reference}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4">
                          <Link
                            href={`/admin/enquiries/${enq.id}`}
                            className="font-semibold text-[#0f172a] group-hover:text-[#3563f5] transition-colors block"
                          >
                            {enq.name}
                          </Link>
                          {enq.requirements && (
                            <span className="text-[10px] text-[#94a3b8] truncate block max-w-xs">
                              {enq.requirements}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-[#334155]">{enq.email}</div>
                          <div className="text-[11px] text-[#94a3b8]">
                            {enq.phone || "No phone"}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#334155]">
                          {service}
                        </td>
                        <td className="py-3.5 px-4">{getStatusBadge(enq.status)}</td>
                        <td className="py-3.5 px-4 text-[#64748b]">{formatDate(enq.created_at)}</td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/admin/enquiries/${enq.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#3563f5] text-[#3563f5] hover:text-white font-semibold transition-colors text-xs"
                          >
                            <span>Manage</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 2. Mobile Card View (< 768px: 360px - 767px) */}
            <div className="md:hidden divide-y divide-[#f1f5f9]">
              {paginated.map((enq) => {
                const service =
                  Array.isArray(enq.services) && enq.services.length > 0
                    ? enq.services[0]
                    : "General enquiry";

                return (
                  <div key={enq.id} className="p-4 space-y-3">
                    {/* Top Row: Ref & Status */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-[#3563f5]">
                        {enq.reference}
                      </span>
                      {getStatusBadge(enq.status)}
                    </div>

                    {/* Client Name & Service */}
                    <div>
                      <Link
                        href={`/admin/enquiries/${enq.id}`}
                        className="font-heading font-bold text-sm text-[#0f172a] hover:text-[#3563f5] transition-colors block"
                      >
                        {enq.name}
                      </Link>
                      <div className="flex items-center gap-1.5 text-xs text-[#475569] mt-0.5 font-medium">
                        <Layers className="w-3 h-3 text-[#3563f5]" />
                        <span>{service}</span>
                      </div>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-1 text-xs text-[#64748b] bg-[#f8fafc] p-2.5 rounded-xl border border-[#f1f5f9]">
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
                        <span className="truncate">{enq.email}</span>
                      </div>
                      {enq.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
                          <span>{enq.country_code ? `${enq.country_code} ` : ""}{enq.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[11px] text-[#94a3b8] pt-0.5">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>{formatDate(enq.created_at)}</span>
                      </div>
                    </div>

                    {/* Manage Button (Full-width touch target >= 44px) */}
                    <Link
                      href={`/admin/enquiries/${enq.id}`}
                      className="w-full min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#3563f5] text-[#3563f5] hover:text-white font-semibold transition-colors text-xs"
                    >
                      <span>Manage Enquiry</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[#f1f5f9] text-[#94a3b8] flex items-center justify-center mx-auto mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-sm text-[#0f172a] mb-1">
              No matching enquiries found
            </h3>
            <p className="text-xs text-[#64748b] max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all" || serviceFilter !== "all"
                ? "Try adjusting your search criteria or clearing active filters."
                : "No customer submissions recorded yet."}
            </p>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between">
            <span className="text-xs text-[#64748b]">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f1f5f9] disabled:opacity-40 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f1f5f9] disabled:opacity-40 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
