import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEnquiryNotificationEmail } from "@/lib/email";

// Valid services list
const VALID_SERVICES = [
  "Website development",
  "Digital marketing / Meta Ads",
  "Google Ads",
  "SEO optimization",
  "Branding and creative",
  "Multiple Services",
  "Not Sure Yet",
];

// In-memory rate limiting: max 10 submissions per 10 minutes per IP
const ipRateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxAllowed = 10;

  // Cleanup old entries periodically if map grows
  if (ipRateLimitMap.size > 1000) {
    for (const [key, value] of ipRateLimitMap.entries()) {
      if (now > value.resetAt) ipRateLimitMap.delete(key);
    }
  }

  const record = ipRateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    ipRateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (record.count >= maxAllowed) {
    return true;
  }

  record.count += 1;
  return false;
}

interface EnquiryRequestBody {
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  service?: string;
  conditionalServiceDetails?: string;
  message?: string;
  company_url?: string;
  form_loaded_at?: number | string;
}

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();

  // 1. Cross-Instance Client Cooldown (Serverless-compatible protection across all Netlify function instances)
  const rawCookieHeader = request.headers.get("cookie") || "";
  const cookieMatch = rawCookieHeader.match(/axy_enquiry_cooldown=([^;]+)/);
  const cooldownCookie =
    request.cookies.get("axy_enquiry_cooldown")?.value ||
    (cookieMatch ? decodeURIComponent(cookieMatch[1]) : null);
  let clientCooldownRecord: { lastSubmit: number; count: number } | null = null;

  if (cooldownCookie) {
    const [lastSubmitStr, countStr] = cooldownCookie.split(":");
    const lastSubmit = parseInt(lastSubmitStr, 10);
    const count = parseInt(countStr, 10) || 1;

    if (!isNaN(lastSubmit)) {
      clientCooldownRecord = { lastSubmit, count };
      const elapsedSec = Math.floor((Date.now() - lastSubmit) / 1000);

      // Enforce 45-second cooldown between consecutive submissions
      if (elapsedSec < 45) {
        console.warn(`[Enquiries API][${timestamp}] Client cooldown active (${elapsedSec}s elapsed).`);
        return NextResponse.json(
          {
            error:
              "We have already received your submission. Please wait a moment before sending another enquiry or email us directly at axy.techh@gmail.com.",
          },
          { status: 429 }
        );
      }

      // Limit to 5 submissions within the 10-minute cookie window
      if (count >= 5) {
        console.warn(`[Enquiries API][${timestamp}] Client rate limit reached (${count} submissions in window).`);
        return NextResponse.json(
          {
            error:
              "Submission limit reached. Please wait a few minutes before trying again or email us directly at axy.techh@gmail.com.",
          },
          { status: 429 }
        );
      }
    }
  }

  // 2. In-memory IP rate limiting (Fast-path burst shield for warm container instances)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";

  if (clientIp !== "unknown" && isRateLimited(clientIp)) {
    console.warn(`[Enquiries API][${timestamp}] Rate limit exceeded for IP: ${clientIp}`);
    return NextResponse.json(
      {
        error:
          "Too many submissions received from this network. Please wait a few minutes before trying again or email us directly at axy.techh@gmail.com.",
      },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    console.warn(`[Enquiries API][${timestamp}] Malformed JSON payload received.`);
    return NextResponse.json(
      { error: "Invalid JSON request payload." },
      { status: 400 }
    );
  }

  try {
    const {
      name,
      email,
      phone,
      countryCode = "+91",
      service,
      conditionalServiceDetails,
      message,
      company_url, // Honeypot field for automated spam bots
      form_loaded_at, // Time-trap field for automated headless scripts
    } = body as EnquiryRequestBody;

    // Honeypot check: If hidden field is filled, silently return success without database write
    if (company_url) {
      console.warn(`[Enquiries API][${timestamp}] Honeypot triggered by bot submission.`);
      return NextResponse.json(
        {
          success: true,
          reference: "AXY-BOT-FILTERED",
          message: "Enquiry submitted successfully.",
        },
        { status: 200 }
      );
    }

    // Time-trap check: Minimum interaction duration (humans take >2.5s to complete 5 form fields)
    if (form_loaded_at) {
      const timeTakenMs = Date.now() - Number(form_loaded_at);
      if (timeTakenMs < 2500) {
        console.warn(`[Enquiries API][${timestamp}] Time-trap triggered: form submitted in ${timeTakenMs}ms.`);
        return NextResponse.json(
          {
            success: true,
            reference: "AXY-BOT-FILTERED",
            message: "Enquiry submitted successfully.",
          },
          { status: 200 }
        );
      }
    }

    // Diagnostic Log: Request received (without sensitive PII)
    console.log(`[Enquiries API][${timestamp}] Request received:`, {
      service,
      countryCode,
      hasPhone: Boolean(phone),
      hasRequirements: Boolean(conditionalServiceDetails),
    });

    // 1. Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      console.warn(`[Enquiries API][${timestamp}] Validation failed: invalid name`);
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      console.warn(`[Enquiries API][${timestamp}] Validation failed: invalid email format`);
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Phone validation (Optional: empty phone is valid)
    let formattedPhone: string | null = null;
    const cleanPhone = (phone || "").trim().replace(/[\s\-().]/g, "");

    if (cleanPhone) {
      if (countryCode === "+91") {
        const indiaRegex = /^[6-9]\d{9}$/;
        if (!indiaRegex.test(cleanPhone)) {
          console.warn(`[Enquiries API][${timestamp}] Validation failed: invalid Indian phone`);
          return NextResponse.json(
            { error: "Please enter a valid 10-digit Indian phone number." },
            { status: 400 }
          );
        }
      } else {
        const intlRegex = /^\d{7,15}$/;
        if (!intlRegex.test(cleanPhone)) {
          console.warn(`[Enquiries API][${timestamp}] Validation failed: invalid international phone`);
          return NextResponse.json(
            { error: "Please enter a valid phone number (7 to 15 digits)." },
            { status: 400 }
          );
        }
      }
      formattedPhone = `${countryCode} ${cleanPhone}`;
    }

    if (!service || typeof service !== "string" || !VALID_SERVICES.includes(service)) {
      console.warn(`[Enquiries API][${timestamp}] Validation failed: invalid service selection`);
      return NextResponse.json(
        { error: "Please select a valid service from the options." },
        { status: 400 }
      );
    }

    const isConditionalRequired =
      service === "Multiple Services" || service === "Not Sure Yet";

    if (
      isConditionalRequired &&
      (!conditionalServiceDetails ||
        typeof conditionalServiceDetails !== "string" ||
        conditionalServiceDetails.trim().length < 3)
    ) {
      console.warn(`[Enquiries API][${timestamp}] Validation failed: missing conditional service details`);
      return NextResponse.json(
        { error: "Please briefly describe what services or requirements you are looking for." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      console.warn(`[Enquiries API][${timestamp}] Validation failed: message too short`);
      return NextResponse.json(
        { error: "Please provide project details (minimum 5 characters)." },
        { status: 400 }
      );
    }

    // 2. Generate unique reference ID
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const reference = `AXY-${randomCode}-${randomDigits}`;

    console.log(`[Enquiries API][${timestamp}] Validation PASSED. Generated reference: ${reference}`);

    // 3. Database Insertion via Supabase
    const supabase = createAdminClient();

    const payload = {
      reference,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: formattedPhone,
      country_code: countryCode,
      services: [service],
      requirements: isConditionalRequired
        ? conditionalServiceDetails?.trim() ?? null
        : null,
      project_message: message.trim(),
      status: "new",
      created_at: timestamp,
      updated_at: timestamp,
    };

    console.log(`[Enquiries API][${timestamp}] Inserting enquiry into Supabase (ref: ${reference})...`);

    // Pure insert without .select() so it adheres cleanly to public INSERT RLS policies
    const { error: dbError } = await supabase
      .from("enquiries")
      .insert(payload);

    if (dbError) {
      console.error(`[Enquiries API][${timestamp}] Supabase insertion FAILED:`, {
        code: dbError.code,
        message: dbError.message,
        hint: dbError.hint,
        details: dbError.details,
      });

      return NextResponse.json(
        {
          error:
            "We were unable to record your enquiry due to a server error. Please try again or email us directly at axy.techh@gmail.com.",
        },
        { status: 500 }
      );
    }

    console.log(`[Enquiries API][${timestamp}] Supabase insertion SUCCESSFUL for ref: ${reference}`);

    // 4. Trigger Email Notification (non-blocking failure)
    try {
      console.log(`[Enquiries API][${timestamp}] Dispatching email notification for ref: ${reference}...`);
      const emailResult = await sendEnquiryNotificationEmail({
        reference: payload.reference,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        countryCode: payload.country_code,
        service,
        conditionalServiceDetails: payload.requirements,
        message: payload.project_message,
        createdAt: timestamp,
      });

      if (emailResult?.skipped) {
        console.warn(`[Enquiries API][${timestamp}] Email dispatch SKIPPED: ${emailResult.reason}`);
      } else if (!emailResult?.success) {
        console.error(`[Enquiries API][${timestamp}] Email dispatch FAILED:`, emailResult?.error);
      } else {
        console.log(`[Enquiries API][${timestamp}] Email notification ACCEPTED by Resend. Email ID: ${emailResult?.id}`);
      }
    } catch (emailErr) {
      console.warn(
        `[Enquiries API][${timestamp}] Email notification failed (non-blocking):`,
        emailErr instanceof Error ? emailErr.message : emailErr
      );
      // Note: We deliberately do not fail the request if email sending fails
    }

    const response = NextResponse.json(
      {
        success: true,
        reference: payload.reference,
        message: "Enquiry submitted successfully.",
      },
      { status: 201 }
    );

    // Set serverless-compatible client submission cooldown cookie (10 minutes max age)
    const currentCount = clientCooldownRecord ? clientCooldownRecord.count + 1 : 1;
    response.cookies.set({
      name: "axy_enquiry_cooldown",
      value: `${Date.now()}:${currentCount}`,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 600, // 10 minutes
    });

    return response;
  } catch (err) {
    console.error(`[Enquiries API][${timestamp}] Unexpected server exception:`, err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
