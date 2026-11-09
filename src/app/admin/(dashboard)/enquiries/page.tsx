import React from "react";
import { createClient } from "@/lib/supabase/server";
import { EnquiriesManager, EnquiryItem } from "./EnquiriesManager";

export default async function AdminEnquiriesPage() {
  const supabase = await createClient();

  const { data: rawEnquiries, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Fetch Enquiries Error]", error);
  }

  const enquiries: EnquiryItem[] = (rawEnquiries || []).map((row) => ({
    id: row.id,
    reference: row.reference,
    name: row.name,
    email: row.email,
    phone: row.phone,
    country_code: row.country_code,
    services: Array.isArray(row.services) ? row.services : [],
    requirements: row.requirements,
    project_message: row.project_message,
    status: row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#0f172a] tracking-tight">
            Client Enquiries
          </h1>
          <p className="text-xs text-[#64748b] mt-0.5">
            View, search, filter and manage all inbound project leads from the AXY website.
          </p>
        </div>
      </div>

      <EnquiriesManager initialEnquiries={enquiries} />
    </div>
  );
}
