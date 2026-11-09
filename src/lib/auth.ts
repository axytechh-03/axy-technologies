import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  fullName: string;
}

/**
 * Server-side helper to verify that the current request is from an authorized administrator.
 * Wrapped with React.cache() to deduplicate Supabase Auth & profile lookups within the same request pass.
 */
export const getAuthenticatedAdmin = cache(async (): Promise<AdminUser | null> => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return null;
    }

    const email = user.email.toLowerCase();
    const isOwner = email === "axy.techh@gmail.com";

    // Query admin profile from database
    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("id, email, full_name, role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile) {
      return {
        id: user.id,
        email: profile.email,
        role: profile.role,
        fullName: profile.full_name || "AXY Administrator",
      };
    }

    // Initial owner bootstrap if profile is not yet created in table
    if (isOwner) {
      return {
        id: user.id,
        email: user.email,
        role: "owner",
        fullName: (user.user_metadata?.full_name as string) || "AXY Owner",
      };
    }

    return null;
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof (err as { digest: unknown }).digest === "string" &&
      (err as { digest: string }).digest.startsWith("DYNAMIC_SERVER_USAGE")
    ) {
      throw err;
    }
    console.error("[getAuthenticatedAdmin exception]", err);
    return null;
  }
});
