# AXY Technologies — Supabase Database & Auth Setup Guide

This guide walks you through activating the Supabase backend, Row-Level Security (RLS) policies, and administrative authentication for the AXY Technologies platform.

---

## Step 1: Execute the Database Migration

1. Open your Supabase Project Dashboard:  
   👉 [https://supabase.com/dashboard/project/csjowswyovxlazzoziqn](https://supabase.com/dashboard/project/csjowswyovxlazzoziqn)
2. In the left-hand navigation, click on **SQL Editor**.
3. Click **New Query** (or the **+** button).
4. Copy the entire contents of [`001_initial_schema_and_rls.sql`](./migrations/001_initial_schema_and_rls.sql) and paste them into the SQL editor window.
5. Click **Run** (or press `Ctrl + Enter` / `Cmd + Enter`).
6. You will see: `Success. No rows returned`.

### What this migration creates:
- **`enquiries` table**: Stores inbound client leads with reference IDs (e.g. `AXY-XXXX-XXXX`), services requested, requirements, contact details, and lifecycle status (`new`, `contacted`, `follow_up`, `converted`, `closed`).
- **`admin_profiles` table**: Secure administrator registry linking to Supabase `auth.users`.
- **`enquiry_activity` table**: Audit log tracking status transitions and internal notes.
- **Row-Level Security (RLS)**:
  - **Public visitors**: Allowed to submit enquiries (`INSERT` only). Cannot read, update, or delete any records.
  - **Authorized administrators**: Allowed full `SELECT`, `UPDATE`, and `DELETE` access on enquiries and audit logs.
- **Auto-provisioning trigger**: Automatically gives administrator privileges to `axy.techh@gmail.com` when the account is created in Supabase Auth.

---

## Step 2: Create the Initial Administrator Account

1. In your Supabase Dashboard, go to **Authentication** > **Users**.
2. Click **Add user** > **Create user** (or **Invite user**):
   - **User Email**: `axy.techh@gmail.com`
   - **Password**: Set a secure password of your choice (minimum 8 characters).
   - Check **Auto Confirm User?**: `Yes` (recommended so you can log in immediately without verifying email).
3. Click **Create user**.
4. The database trigger automatically registers this account in `admin_profiles` with the `owner` role.

---

## Step 3: Sign In to the Admin Dashboard

1. Start your local development server or open the deployed site:
   - Route: `/admin/login`
2. Enter:
   - **Email**: `axy.techh@gmail.com`
   - **Password**: (The password you set in Step 2)
3. You will be redirected to `/admin/dashboard`, where you can:
   - Monitor real-time lead KPIs
   - Search, filter, and paginate client enquiries
   - Transition lead statuses (`New` ➔ `Contacted` ➔ `In Follow-up` ➔ `Converted` / `Closed`)
   - Add internal notes and view the enquiry timeline
   - Export filtered enquiries as CSV
   - Update admin passwords and settings

---

## Step 4 (Optional): Enable Resend Email Notifications

To receive instant email notifications whenever a customer submits the enquiry form:
1. Sign up for a free account at [https://resend.com](https://resend.com).
2. Generate an API Key (starts with `re_...`).
3. In `axy-technologies/.env.local` (and in your Netlify dashboard under **Site Settings > Environment Variables**), set:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=AXY Technologies <onboarding@resend.dev> # or your verified domain
   NOTIFICATION_EMAIL=axy.techh@gmail.com
   ```
*(Note: If Resend is not configured, the website safely falls back to recording enquiries in Supabase without interrupting the user experience.)*

---

## Step 5: Partner Administrator Onboarding (When Ready)

The system is pre-configured to support multiple administrators:
1. When you want to add a business partner, invite them in **Supabase Dashboard > Authentication > Users > Invite user**.
2. Run this quick SQL snippet in the SQL Editor to grant them admin rights:
   ```sql
   INSERT INTO public.admin_profiles (id, full_name, email, role)
   SELECT id, 'Partner Name', email, 'partner'
   FROM auth.users
   WHERE email = 'partner-email@gmail.com';
   ```
