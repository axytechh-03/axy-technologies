import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, internal_notes } = body;

    const supabase = await createClient();

    // 1. Fetch existing record to track diffs for audit log
    const { data: existing, error: fetchErr } = await supabase
      .from("enquiries")
      .select("id, status, internal_notes")
      .eq("id", id)
      .single();

    if (fetchErr || !existing) {
      return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
    }

    const updatePayload: Record<string, unknown> = {};
    const activitiesToInsert = [];

    // Check status change
    if (status && status !== existing.status) {
      const VALID_STATUSES = ["new", "contacted", "follow_up", "converted", "closed"];
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
      }
      updatePayload.status = status;
      activitiesToInsert.push({
        enquiry_id: id,
        admin_id: admin.id,
        action: `Status changed to ${status}`,
        previous_value: existing.status,
        new_value: status,
      });
    }

    // Check internal notes change
    if (internal_notes !== undefined && internal_notes !== existing.internal_notes) {
      updatePayload.internal_notes = internal_notes;
      activitiesToInsert.push({
        enquiry_id: id,
        admin_id: admin.id,
        action: "Internal notes updated",
        previous_value: null,
        new_value: internal_notes ? "Notes saved" : "Notes cleared",
      });
    }

    if (Object.keys(updatePayload).length > 0) {
      const { data: updated, error: updateErr } = await supabase
        .from("enquiries")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();

      if (updateErr) {
        console.error("[Update Enquiry Error]", updateErr);
        return NextResponse.json(
          { error: "Failed to update enquiry in database." },
          { status: 500 }
        );
      }

      // Record activity log
      if (activitiesToInsert.length > 0) {
        await supabase.from("enquiry_activity").insert(activitiesToInsert);
      }

      return NextResponse.json({ success: true, data: updated });
    }

    return NextResponse.json({ success: true, message: "No changes detected." });
  } catch (err) {
    console.error("[Enquiry Patch Exception]", err);
    return NextResponse.json(
      { error: "Server error occurred while updating enquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase.from("enquiries").delete().eq("id", id);

    if (error) {
      console.error("[Delete Enquiry Error]", error);
      return NextResponse.json(
        { error: "Failed to delete enquiry." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Enquiry Delete Exception]", err);
    return NextResponse.json(
      { error: "Server error occurred while deleting enquiry." },
      { status: 500 }
    );
  }
}
