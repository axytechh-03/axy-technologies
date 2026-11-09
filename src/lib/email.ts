import { Resend } from "resend";

export interface EnquiryEmailData {
  reference: string;
  name: string;
  email: string;
  phone?: string | null;
  countryCode?: string | null;
  service: string;
  conditionalServiceDetails?: string | null;
  message: string;
  createdAt: string;
}

/**
 * Sends a notification email to the AXY team when a new enquiry is submitted.
 * Fails gracefully without throwing, ensuring enquiry storage is never rolled back.
 */
export async function sendEnquiryNotificationEmail(data: EnquiryEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM;
  const toAddress = process.env.NOTIFICATION_EMAIL || "axy.techh@gmail.com";

  if (!apiKey || !apiKey.startsWith("re_")) {
    console.warn(
      "[Resend Email] RESEND_API_KEY is not configured or placeholder. Skipping email dispatch."
    );
    return {
      success: false,
      skipped: true,
      reason: "RESEND_API_KEY not configured.",
    };
  }

  if (!fromAddress) {
    console.warn(
      "[Resend Email] EMAIL_FROM is not configured. Please configure a verified domain in Resend."
    );
    return {
      success: false,
      skipped: true,
      reason: "EMAIL_FROM domain not configured.",
    };
  }

  try {
    const resend = new Resend(apiKey);

    const formattedDate = new Date(data.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const phoneDisplay = data.phone ? data.phone : "Not provided";
    const requirementsBlock = data.conditionalServiceDetails
      ? `
        <div style="margin-top: 14px; padding: 12px 16px; background-color: #f1f4fa; border-left: 3px solid #3563f5; border-radius: 4px;">
          <strong style="display:block; font-size: 11px; text-transform: uppercase; color: #4b5563; margin-bottom: 4px;">Additional Requirements:</strong>
          <span style="font-size: 13px; color: #1f2937; line-height: 1.5;">${escapeHtml(data.conditionalServiceDetails)}</span>
        </div>
      `
      : "";

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Enquiry — AXY Technologies</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fc; margin: 0; padding: 24px;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e5e9f2; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
    <!-- Header -->
    <div style="background-color: #080d1b; padding: 28px 32px; border-bottom: 2px solid #3563f5;">
      <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700; letter-spacing: -0.02em;">
        AXY <span style="font-size: 11px; color: #82a5ff; letter-spacing: 0.15em; font-weight: 600;">TECHNOLOGIES</span>
      </h1>
      <p style="color: #aab7d0; font-size: 13px; margin: 6px 0 0 0;">
        New Client Project Enquiry Received
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #edf1f7; padding-bottom: 14px;">
        <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Reference</span>
        <span style="font-size: 13px; font-weight: 700; color: #3563f5; font-family: monospace; background: #edf2ff; padding: 4px 10px; border-radius: 6px;">${escapeHtml(data.reference)}</span>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600; width: 35%;">Client Name</td>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Email Address</td>
          <td style="padding: 8px 0; font-size: 14px; color: #111827;">
            <a href="mailto:${escapeHtml(data.email)}" style="color: #3563f5; text-decoration: none; font-weight: 500;">${escapeHtml(data.email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Phone Number</td>
          <td style="padding: 8px 0; font-size: 14px; color: #111827;">${escapeHtml(phoneDisplay)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Service Needed</td>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #3563f5;">${escapeHtml(data.service)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: 600;">Submitted At</td>
          <td style="padding: 8px 0; font-size: 13px; color: #4b5563;">${escapeHtml(formattedDate)} (IST)</td>
        </tr>
      </table>

      ${requirementsBlock}

      <!-- Project Message -->
      <div style="margin-top: 20px;">
        <span style="font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: 700; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Project Details & Message:</span>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 13px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
      </div>

      <!-- Action Button -->
      <div style="margin-top: 28px; text-align: center;">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Project%20Enquiry%20%E2%80%94%20AXY%20Technologies%20(${escapeHtml(data.reference)})"
           style="background-color: #3563f5; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-block;">
          Reply to Client Directly ↗
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f4fa; padding: 16px 32px; text-align: center; font-size: 11px; color: #8290ac; border-top: 1px solid #e5e9f2;">
      AXY Technologies — Confidential Admin Notification. Stored securely in Supabase.
    </div>
  </div>
</body>
</html>
    `;

    const { data: result, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: data.email,
      subject: `[New Enquiry ${data.reference}] ${data.name} — ${data.service}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Email Error]", error);
      return { success: false, error };
    }

    return { success: true, id: result?.id };
  } catch (err) {
    console.error("[Resend Email Exception]", err);
    return { success: false, error: err };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
