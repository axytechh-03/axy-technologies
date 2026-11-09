import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Inbox,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 1. Fetch real data in parallel (Consolidated into 3 efficient queries instead of 7)
  const [
    { data: allStatuses, count: totalCount },
    { data: recentEnquiries },
    { data: recentActivity },
  ] = await Promise.all([
    supabase.from("enquiries").select("status", { count: "exact" }),
    supabase
      .from("enquiries")
      .select("id, reference, name, email, phone, services, status, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("enquiry_activity")
      .select("id, action, previous_value, new_value, created_at, enquiries(reference, name)")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  let newCount = 0;
  let contactedCount = 0;
  let followUpCount = 0;
  let convertedCount = 0;

  if (allStatuses) {
    for (const item of allStatuses) {
      if (item.status === "new") newCount++;
      else if (item.status === "contacted") contactedCount++;
      else if (item.status === "follow_up") followUpCount++;
      else if (item.status === "converted") convertedCount++;
    }
  }

  const stats = [
    {
      label: "Total Enquiries",
      value: totalCount || 0,
      icon: Inbox,
      change: "All time records",
      color: "text-[#1e293b]",
      bgColor: "bg-white",
      borderColor: "border-[#e2e8f0]",
    },
    {
      label: "New & Pending",
      value: newCount || 0,
      icon: Sparkles,
      change: "Awaiting response",
      color: "text-[#3563f5]",
      bgColor: "bg-gradient-to-br from-[#ffffff] to-[#eff4ff]",
      borderColor: "border-[#c7d7fe]",
      badge: "Action required",
    },
    {
      label: "In Follow-up",
      value: (contactedCount || 0) + (followUpCount || 0),
      icon: PhoneCall,
      change: `${contactedCount || 0} contacted · ${followUpCount || 0} follow-up`,
      color: "text-[#0284c7]",
      bgColor: "bg-white",
      borderColor: "border-[#e2e8f0]",
    },
    {
      label: "Converted",
      value: convertedCount || 0,
      icon: CheckCircle2,
      change: "Successful clients",
      color: "text-[#16a34a]",
      bgColor: "bg-white",
      borderColor: "border-[#e2e8f0]",
    },
  ];

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

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0f172a] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            Real-time pipeline metrics and client project enquiries for AXY Technologies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3563f5] hover:bg-[#254edb] text-white text-xs font-semibold shadow-sm shadow-[#3563f5]/25 transition-all"
          >
            <span>Manage Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`p-5 rounded-2xl border ${stat.borderColor} ${stat.bgColor} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                  {stat.label}
                </span>
                <div className={`p-2 rounded-xl bg-[#f8fafc] ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`font-heading text-3xl font-bold tracking-tight ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
              <div className="mt-2 text-[11px] text-[#64748b] flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-[#94a3b8]" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Two Column Area: Recent Enquiries & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between">
              <div>
                <h2 className="font-heading text-base font-bold text-[#0f172a]">
                  Recent Client Enquiries
                </h2>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Latest project submissions from your website.
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs text-[#3563f5] hover:text-[#1d4ed8] font-semibold flex items-center gap-1"
              >
                View all ({totalCount || 0}) <span>→</span>
              </Link>
            </div>

            {recentEnquiries && recentEnquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fafc] text-[#64748b] font-semibold border-b border-[#e2e8f0]">
                    <tr>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Received</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {recentEnquiries.map((enq) => {
                      const service =
                        Array.isArray(enq.services) && enq.services.length > 0
                          ? enq.services[0]
                          : "General enquiry";

                      const date = new Date(enq.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      });

                      return (
                        <tr
                          key={enq.id}
                          className="hover:bg-[#f8fafc] transition-colors group"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-[#0f172a] group-hover:text-[#3563f5] transition-colors">
                              {enq.name}
                            </div>
                            <div className="text-[11px] text-[#64748b]">
                              {enq.email}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-[#334155]">{service}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            {getStatusBadge(enq.status)}
                          </td>
                          <td className="py-3.5 px-4 text-[#64748b] font-medium">
                            {date}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Link
                              href={`/admin/enquiries/${enq.id}`}
                              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#3563f5] text-[#3563f5] hover:text-white font-semibold transition-colors"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#3563f5] flex items-center justify-center mx-auto mb-3">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-[#0f172a] mb-1">
                  No enquiries recorded yet
                </h3>
                <p className="text-xs text-[#64748b] max-w-sm mx-auto">
                  When visitors submit enquiries via your website contact form, they will appear
                  here in real-time.
                </p>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] text-right">
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-[#3563f5] hover:underline"
            >
              Open Enquiries Management →
            </Link>
          </div>
        </div>

        {/* Recent Activity Log (1 Col) */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#3563f5]" />
                <h2 className="font-heading text-base font-bold text-[#0f172a]">
                  Activity Log
                </h2>
              </div>
              <p className="text-xs text-[#64748b] mt-0.5">
                Audit trail of status changes and team notes.
              </p>
            </div>

            <div className="p-5">
              {recentActivity && recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((act) => {
                    const timeAgo = new Date(act.created_at).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    });

                    // Supabase join typing
                    const enqData = Array.isArray(act.enquiries)
                      ? act.enquiries[0]
                      : act.enquiries;

                    return (
                      <div key={act.id} className="flex items-start gap-3 text-xs">
                        <div className="w-2 h-2 rounded-full bg-[#3563f5] mt-1.5 shrink-0" />
                        <div>
                          <div className="font-medium text-[#1e293b]">
                            {act.action}
                          </div>
                          {enqData?.reference && (
                            <div className="text-[11px] text-[#64748b]">
                              Enquiry: <span className="font-mono text-[#3563f5] font-semibold">{enqData.reference}</span> ({enqData.name})
                            </div>
                          )}
                          <div className="text-[10px] text-[#94a3b8] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-[#64748b]">
                  <p className="text-xs">No recent activity recorded.</p>
                  <p className="text-[11px] text-[#94a3b8] mt-1">
                    Status transitions and internal notes are logged here.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] text-center text-[11px] text-[#64748b]">
            Secured with Supabase Row Level Security
          </div>
        </div>
      </div>
    </div>
  );
}
