"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Clock,
  Calendar,
  Layers,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Save,
  Loader2,
  Sparkles,
  User,
  History,
} from "lucide-react";

export interface EnquiryDetailData {
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
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  previous_value: string | null;
  new_value: string | null;
  created_at: string;
}

interface EnquiryDetailClientProps {
  enquiry: EnquiryDetailData;
  initialActivities: ActivityItem[];
}

export const EnquiryDetailClient: React.FC<EnquiryDetailClientProps> = ({
  enquiry,
  initialActivities,
}) => {
  const router = useRouter();

  // Local state
  const [status, setStatus] = useState(enquiry.status);
  const [internalNotes, setInternalNotes] = useState(enquiry.internal_notes || "");
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);

  // Loading & notification states
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaveStatus, setNotesSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Status badge helper
  const renderStatusBadge = (currentStatus: string) => {
    switch (currentStatus) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#eff4ff] text-[#3563f5] border border-[#c7d7fe]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3563f5] animate-pulse" />
            New
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f0f9ff] text-[#0284c7] border border-[#bae6fd]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            Contacted
          </span>
        );
      case "follow_up":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#fefce8] text-[#a16207] border border-[#fef08a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
            In Follow-up
          </span>
        );
      case "converted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            Converted
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8]" />
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f1f5f9] text-[#475569]">
            {currentStatus}
          </span>
        );
    }
  };

  // Status change handler
  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status || isUpdatingStatus) return;
    setIsUpdatingStatus(true);
    setActionError(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update status.");
      }

      setStatus(newStatus);
      // Append to activities locally
      setActivities((prev) => [
        {
          id: Math.random().toString(),
          action: `Status changed to ${newStatus}`,
          previous_value: status,
          new_value: newStatus,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Save notes handler
  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    setNotesSaveStatus("idle");
    setActionError(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internal_notes: internalNotes }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save internal notes.");
      }

      setNotesSaveStatus("success");
      setTimeout(() => setNotesSaveStatus("idle"), 3000);

      // Append to activities locally
      setActivities((prev) => [
        {
          id: Math.random().toString(),
          action: "Internal notes updated",
          previous_value: null,
          new_value: internalNotes ? "Notes saved" : "Notes cleared",
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err: unknown) {
      setNotesSaveStatus("error");
      setActionError(err instanceof Error ? err.message : "Failed to save notes.");
    } finally {
      setIsSavingNotes(false);
    }
  };

  // Delete enquiry handler
  const handleDeleteEnquiry = async () => {
    setIsDeleting(true);
    setActionError(null);

    try {
      const res = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete enquiry.");
      }

      router.push("/admin/enquiries");
      router.refresh();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Failed to delete enquiry.");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Clean phone for whatsapp
  const rawCleanPhone = enquiry.phone ? enquiry.phone.replace(/[^0-9]/g, "") : "";
  const cleanPhone =
    enquiry.country_code && rawCleanPhone.length === 10
      ? `${enquiry.country_code.replace(/[^0-9]/g, "")}${rawCleanPhone}`
      : rawCleanPhone;

  const whatsappMessage = encodeURIComponent(
    `Hello ${enquiry.name}, thank you for reaching out to AXY Technologies regarding your enquiry (${enquiry.reference}). I would love to discuss your project requirements.`
  );

  const mailtoSubject = encodeURIComponent(
    `Re: Your enquiry with AXY Technologies [${enquiry.reference}]`
  );

  const formattedDate = new Date(enquiry.created_at).toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e2e8f0] text-xs font-semibold text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Enquiries</span>
          </Link>
          <div className="h-4 w-px bg-[#cbd5e1]" />
          <span className="font-mono text-xs font-bold text-[#3563f5]">
            {enquiry.reference}
          </span>
        </div>

        {/* Action Error Alert */}
        {actionError && (
          <div className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{actionError}</span>
          </div>
        )}
      </div>

      {/* Main Header / Client Card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="font-heading text-2xl font-bold text-[#0f172a]">
              {enquiry.name}
            </h1>
            {renderStatusBadge(status)}
          </div>
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#64748b]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
              Received {formattedDate}
            </span>
            <span>•</span>
            <span className="font-mono text-[#3563f5] font-semibold">
              Ref: {enquiry.reference}
            </span>
          </div>
        </div>

        {/* Quick Action Contact Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Email button */}
          <a
            href={`mailto:${enquiry.email}?subject=${mailtoSubject}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#3563f5] text-[#3563f5] hover:text-white border border-[#c7d7fe] text-xs font-semibold transition-colors min-h-[40px]"
            title="Open Email Client"
          >
            <Mail className="w-4 h-4" />
            <span>Email Client</span>
          </a>

          {/* Call button */}
          {enquiry.phone && (
            <a
              href={`tel:${enquiry.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#334155] border border-[#e2e8f0] text-xs font-semibold transition-colors min-h-[40px]"
              title="Call phone number"
            >
              <Phone className="w-4 h-4 text-[#3563f5]" />
              <span>Call</span>
            </a>
          )}

          {/* WhatsApp button */}
          {cleanPhone && (
            <a
              href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ecfdf5] hover:bg-[#10b981] text-[#059669] hover:text-white border border-[#a7f3d0] text-xs font-semibold transition-colors min-h-[40px]"
              title="Open WhatsApp chat"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          )}

          {/* Delete button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 text-[#ef4444] border border-[#fecaca] text-xs font-semibold transition-colors cursor-pointer min-h-[40px] ml-auto lg:ml-0"
            title="Delete this enquiry"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Details + Workflow Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Client Info, Services, Message, Notes */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Contact Details */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#3563f5]" />
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Full Name */}
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Client Name
                </div>
                <div className="text-sm font-bold text-[#0f172a] flex items-center justify-between">
                  <span>{enquiry.name}</span>
                  <button
                    onClick={() => handleCopy(enquiry.name, "name")}
                    className="text-[#94a3b8] hover:text-[#3563f5] p-1 transition-colors"
                    title="Copy Name"
                  >
                    {copiedField === "name" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Email Address
                </div>
                <div className="text-sm font-bold text-[#0f172a] flex items-center justify-between">
                  <a
                    href={`mailto:${enquiry.email}?subject=${mailtoSubject}`}
                    className="hover:text-[#3563f5] hover:underline truncate"
                  >
                    {enquiry.email}
                  </a>
                  <button
                    onClick={() => handleCopy(enquiry.email, "email")}
                    className="text-[#94a3b8] hover:text-[#3563f5] p-1 transition-colors flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Phone Number
                </div>
                <div className="text-sm font-bold text-[#0f172a] flex items-center justify-between">
                  {enquiry.phone ? (
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="hover:text-[#3563f5] hover:underline"
                    >
                      {enquiry.country_code ? `${enquiry.country_code} ` : ""}
                      {enquiry.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-[#94a3b8] font-normal">
                      Not provided
                    </span>
                  )}
                  {enquiry.phone && (
                    <button
                      onClick={() => handleCopy(enquiry.phone || "", "phone")}
                      className="text-[#94a3b8] hover:text-[#3563f5] p-1 transition-colors"
                      title="Copy Phone"
                    >
                      {copiedField === "phone" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Reference */}
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9]">
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">
                  Enquiry Reference
                </div>
                <div className="text-sm font-mono font-bold text-[#3563f5] flex items-center justify-between">
                  <span>{enquiry.reference}</span>
                  <button
                    onClick={() => handleCopy(enquiry.reference, "ref")}
                    className="text-[#94a3b8] hover:text-[#3563f5] p-1 transition-colors"
                    title="Copy Reference"
                  >
                    {copiedField === "ref" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Requirements */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#3563f5]" />
              Requested Services & Scope
            </h2>

            <div>
              <div className="text-xs text-[#64748b] mb-2 font-medium">
                Selected Services:
              </div>
              <div className="flex flex-wrap gap-2">
                {enquiry.services && enquiry.services.length > 0 ? (
                  enquiry.services.map((svc, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#eff4ff] text-[#3563f5] text-xs font-semibold border border-[#dbeafe]"
                    >
                      <Sparkles className="w-3 h-3" />
                      {svc}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#94a3b8]">None specified</span>
                )}
              </div>
            </div>

            {enquiry.requirements && (
              <div className="pt-2">
                <div className="text-xs text-[#64748b] mb-1 font-medium">
                  Additional Service Specification / Focus:
                </div>
                <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-xs font-medium text-[#334155]">
                  {enquiry.requirements}
                </div>
              </div>
            )}
          </div>

          {/* Project Brief / Message */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3563f5]" />
                Customer Project Message
              </h2>
              <button
                onClick={() => handleCopy(enquiry.project_message, "message")}
                className="inline-flex items-center gap-1 text-xs text-[#64748b] hover:text-[#3563f5] transition-colors"
              >
                {copiedField === "message" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-sm text-[#1e293b] leading-relaxed whitespace-pre-wrap font-sans">
              {enquiry.project_message}
            </div>
          </div>

          {/* Internal Team Notes */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3563f5]" />
                Internal Team Notes
              </h2>
              <span className="text-[11px] text-[#94a3b8]">
                Confidential • Only visible to admins
              </span>
            </div>

            <p className="text-xs text-[#64748b]">
              Record call summaries, quotation amounts, follow-up dates, or requirements
              clarifications here.
            </p>

            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="e.g. Spoke with client on phone. They need an e-commerce website with 50 products by end of month. Budget ~ ₹45,000. Follow up on Thursday."
              rows={5}
              className="w-full bg-[#f8fafc] border border-[#cbd5e1] focus:border-[#3563f5] focus:bg-white rounded-xl p-3.5 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none transition-all resize-y"
            />

            <div className="flex items-center justify-between pt-1">
              <div>
                {notesSaveStatus === "success" && (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Notes saved successfully
                  </span>
                )}
                {notesSaveStatus === "error" && (
                  <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Failed to save notes
                  </span>
                )}
              </div>

              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3563f5] hover:bg-[#284fd4] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSavingNotes ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Lifecycle Transitions & Activity History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status & Lifecycle Management Card */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3563f5]" />
              Manage Status & Lifecycle
            </h2>

            <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-[#64748b] font-medium">Current Status</div>
                <div className="font-bold text-[#0f172a] text-sm capitalize">
                  {status.replace("_", " ")}
                </div>
              </div>
              {renderStatusBadge(status)}
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold text-[#475569]">
                Transition to:
              </div>

              {/* Status transition buttons */}
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleStatusChange("contacted")}
                  disabled={status === "contacted" || isUpdatingStatus}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors border ${
                    status === "contacted"
                      ? "bg-[#f0f9ff] text-[#0284c7] border-[#bae6fd] cursor-default"
                      : "bg-white hover:bg-[#f8fafc] text-[#334155] border-[#e2e8f0] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                    <span>Mark as Contacted</span>
                  </div>
                  {status === "contacted" && <Check className="w-4 h-4 text-[#0284c7]" />}
                </button>

                <button
                  onClick={() => handleStatusChange("follow_up")}
                  disabled={status === "follow_up" || isUpdatingStatus}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors border ${
                    status === "follow_up"
                      ? "bg-[#fefce8] text-[#a16207] border-[#fef08a] cursor-default"
                      : "bg-white hover:bg-[#f8fafc] text-[#334155] border-[#e2e8f0] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                    <span>Move to In Follow-up</span>
                  </div>
                  {status === "follow_up" && <Check className="w-4 h-4 text-[#a16207]" />}
                </button>

                <button
                  onClick={() => handleStatusChange("converted")}
                  disabled={status === "converted" || isUpdatingStatus}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors border ${
                    status === "converted"
                      ? "bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0] cursor-default"
                      : "bg-white hover:bg-[#f0fdf4] text-[#16a34a] border-[#e2e8f0] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                    <span>Mark as Converted 🎉</span>
                  </div>
                  {status === "converted" && <Check className="w-4 h-4 text-[#16a34a]" />}
                </button>

                <button
                  onClick={() => handleStatusChange("closed")}
                  disabled={status === "closed" || isUpdatingStatus}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors border ${
                    status === "closed"
                      ? "bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] cursor-default"
                      : "bg-white hover:bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                    <span>Close Enquiry</span>
                  </div>
                  {status === "closed" && <Check className="w-4 h-4 text-[#64748b]" />}
                </button>

                {status !== "new" && (
                  <button
                    onClick={() => handleStatusChange("new")}
                    disabled={isUpdatingStatus}
                    className="w-full py-2 px-3 text-[11px] font-semibold text-[#64748b] hover:text-[#3563f5] text-center hover:bg-[#eff4ff] rounded-lg transition-colors cursor-pointer"
                  >
                    Reset Status to New
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Activity Log / Timeline Card */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-sm font-bold text-[#0f172a] uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-[#3563f5]" />
              Audit Log & Timeline
            </h2>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]">
              {/* Submission Event */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#3563f5] border-2 border-white ring-2 ring-[#dbeafe]" />
                <div className="text-xs font-bold text-[#0f172a]">
                  Enquiry Submitted
                </div>
                <div className="text-[11px] text-[#64748b]">
                  Submitted via website contact form
                </div>
                <div className="text-[10px] text-[#94a3b8] mt-0.5">
                  {new Date(enquiry.created_at).toLocaleString()}
                </div>
              </div>

              {/* Dynamic Activities */}
              {activities.map((act) => (
                <div key={act.id} className="relative">
                  <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#0284c7] border-2 border-white ring-2 ring-[#e0f2fe]" />
                  <div className="text-xs font-bold text-[#0f172a]">
                    {act.action}
                  </div>
                  {act.previous_value && act.new_value && (
                    <div className="text-[11px] text-[#64748b]">
                      Changed from <strong className="text-[#334155]">{act.previous_value}</strong> to <strong className="text-[#334155]">{act.new_value}</strong>
                    </div>
                  )}
                  <div className="text-[10px] text-[#94a3b8] mt-0.5">
                    {new Date(act.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-[#060a17]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="font-heading text-lg font-bold text-[#0f172a]">
                Delete Enquiry?
              </h3>
              <p className="text-xs text-[#64748b] mt-1.5 leading-relaxed">
                Are you sure you want to permanently delete enquiry{" "}
                <strong className="text-[#0f172a]">{enquiry.reference}</strong> from{" "}
                <strong className="text-[#0f172a]">{enquiry.name}</strong>? This action will remove all customer records and activity history and cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-[#cbd5e1] text-xs font-semibold text-[#475569] hover:bg-[#f8fafc] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEnquiry}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete Enquiry</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};