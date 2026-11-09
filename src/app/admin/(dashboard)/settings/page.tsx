import React from "react";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { SettingsClient } from "./SettingsClient";

export default async function AdminSettingsPage() {
  const admin = await getAuthenticatedAdmin();

  const isResendConfigured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY.startsWith("re_")
  );

  const notificationEmail =
    process.env.NOTIFICATION_EMAIL || "axy.techh@gmail.com";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  return (
    <SettingsClient
      adminEmail={admin?.email || "axy.techh@gmail.com"}
      adminName={admin?.fullName || "AXY Administrator"}
      adminRole={admin?.role || "owner"}
      isResendConfigured={isResendConfigured}
      notificationEmail={notificationEmail}
      supabaseUrl={supabaseUrl}
    />
  );
}