-- ==============================================================================
-- AXY TECHNOLOGIES — SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================
-- Migration: 001_initial_schema_and_rls.sql
-- Description: Creates enquiries, admin_profiles, enquiry_activity tables,
--              triggers, indexes, helper functions, and strict security policies.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. HELPER FUNCTIONS
-- Automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Check if current authenticated user is an authorized admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    -- 1. Initial owner email check directly from authenticated JWT
    IF LOWER(COALESCE(auth.jwt() ->> 'email', '')) = 'axy.techh@gmail.com' THEN
        RETURN TRUE;
    END IF;

    -- 2. Check if user is registered in admin_profiles with active role
    IF EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid() AND role IN ('admin', 'owner', 'partner')
    ) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country_code TEXT DEFAULT '+91',
    services TEXT[] NOT NULL DEFAULT '{}',
    requirements TEXT,
    project_message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'follow_up', 'converted', 'closed')),
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for enquiries updated_at
DROP TRIGGER IF EXISTS set_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER set_enquiries_updated_at
BEFORE UPDATE ON public.enquiries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- 4. ADMIN PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin', 'partner')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 5. ENQUIRY ACTIVITY LOG TABLE
CREATE TABLE IF NOT EXISTS public.enquiry_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    previous_value TEXT,
    new_value TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 6. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON public.enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_reference ON public.enquiries(reference);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiry_activity_enquiry_id ON public.enquiry_activity(enquiry_id);
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON public.admin_profiles(email);


-- 7. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_activity ENABLE ROW LEVEL SECURITY;

-- ENQUIRIES POLICIES
-- A. Allow public submission (INSERT only)
--    Enables public website visitors to submit project enquiries.
CREATE POLICY "Public visitors can insert enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 0 AND
    email IS NOT NULL AND email LIKE '%@%' AND
    project_message IS NOT NULL AND length(trim(project_message)) > 0
);

-- B. Only authorized administrators can view enquiries
CREATE POLICY "Authorized admins can view enquiries"
ON public.enquiries
FOR SELECT
TO authenticated
USING (is_admin());

-- C. Only authorized administrators can update enquiries
CREATE POLICY "Authorized admins can update enquiries"
ON public.enquiries
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- D. Only authorized administrators can delete enquiries
CREATE POLICY "Authorized admins can delete enquiries"
ON public.enquiries
FOR DELETE
TO authenticated
USING (is_admin());


-- ADMIN PROFILES POLICIES
-- A. Only authorized administrators can view profiles
CREATE POLICY "Admins can view admin profiles"
ON public.admin_profiles
FOR SELECT
TO authenticated
USING (is_admin() OR auth.uid() = id);

-- B. Admins can update their own profile or owner can manage
CREATE POLICY "Admins can update their own profile"
ON public.admin_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id OR is_admin())
WITH CHECK (auth.uid() = id OR is_admin());

-- C. Only owners/admins can insert new profiles (e.g. for inviting partner)
CREATE POLICY "Admins can insert admin profiles"
ON public.admin_profiles
FOR INSERT
TO authenticated
WITH CHECK (is_admin());


-- ENQUIRY ACTIVITY POLICIES
-- A. Authorized admins can view activity history
CREATE POLICY "Admins can view enquiry activity"
ON public.enquiry_activity
FOR SELECT
TO authenticated
USING (is_admin());

-- B. Authorized admins can record activity
CREATE POLICY "Admins can insert enquiry activity"
ON public.enquiry_activity
FOR INSERT
TO authenticated
WITH CHECK (is_admin());


-- 8. INITIAL ADMIN BOOTSTRAP TRIGGER
-- Automatically creates an admin_profile entry when the initial admin signs up / confirms
CREATE OR REPLACE FUNCTION handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
    IF LOWER(NEW.email) = 'axy.techh@gmail.com' THEN
        INSERT INTO public.admin_profiles (id, full_name, email, role)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'AXY Administrator'),
            NEW.email,
            'owner'
        )
        ON CONFLICT (id) DO UPDATE
        SET role = 'owner', full_name = EXCLUDED.full_name;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_admin_user();
