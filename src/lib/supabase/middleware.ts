import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Admin route protection logic
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const isRootAdmin = pathname === "/admin";

    // 1. Not logged in
    if (!user) {
      if (!isLoginPage) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
      }
      return response;
    }

    // 2. Logged in user verification
    // Initial authorized admin is axy.techh@gmail.com or users with admin role in admin_profiles
    const userEmail = (user.email || "").toLowerCase();
    const isOwner = userEmail === "axy.techh@gmail.com";

    // If on /admin/login and already authenticated as owner
    if (isLoginPage) {
      if (isOwner) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      // If logged in as someone else, let page or dashboard verify
    }

    // If on /admin (index), redirect to dashboard
    if (isRootAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return response;
}
