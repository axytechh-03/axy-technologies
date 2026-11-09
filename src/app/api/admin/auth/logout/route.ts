import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return NextResponse.json({ success: true, redirect: "/admin/login" });
  } catch (err) {
    console.error("[Logout Error]", err);
    return NextResponse.json(
      { error: "Failed to sign out cleanly." },
      { status: 500 }
    );
  }
}
