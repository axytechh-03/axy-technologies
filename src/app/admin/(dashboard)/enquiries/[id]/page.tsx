import React from "react";
import Link from "next/link";
import { ArrowLeft, Inbox } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { EnquiryDetailClient, EnquiryDetailData, ActivityItem } from "./EnquiryDetailClient";

export default async function AdminEnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch enquiry
  const { data: enquiryRow, error: enquiryError } = await supabase
    .from("enquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (enquiryError || !enquiryRow) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#f1f5f9] text-[#94a3b8] flex items-center justify-center mx-auto mb-2">
          <Inbox className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-xl font-bold text-[#0f172a]">
          Enquiry Not Found
        </h1>
        <p className="text-xs text-[#64748b] max-w-sm mx-auto">
          The requested enquiry record does not exist or may have been deleted by an administrator.
        </p>
        <div>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3563f5] text-white text-xs font-semibold shadow-xs hover:bg-[#284fd4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Enquiries</span>
          </Link>
        </div>
      </div>
    );
  }

  // Fetch enquiry activity log
  const { data: activityRows } = await supabase
    .from("enquiry_activity")
    .select("id, action, previous_value, new_value, created_at")
    .eq("enquiry_id", id)
    .order("created_at", { ascending: false });

  const enquiry: EnquiryDetailData = {
    id: enquiryRow.id,
    reference: enquiryRow.reference,
    name: enquiryRow.name,
    email: enquiryRow.email,
    phone: enquiryRow.phone,
    country_code: enquiryRow.country_code,
    services: Array.isArray(enquiryRow.services) ? enquiryRow.services : [],
    requirements: enquiryRow.requirements,
    project_message: enquiryRow.project_message,
    status: enquiryRow.status,
    internal_notes: enquiryRow.internal_notes,
    created_at: enquiryRow.created_at,
    updated_at: enquiryRow.updated_at,
  };

  const activities: ActivityItem[] = (activityRows || []).map((a) => ({
    id: a.id,
    action: a.action,
    previous_value: a.previous_value,
    new_value: a.new_value,
    created_at: a.created_at,
  }));

  return <EnquiryDetailClient enquiry={enquiry} initialActivities={activities} />;
}