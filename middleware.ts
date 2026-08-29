import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middlewareClient";
import { isAllowedEmail } from "@/lib/allowedEmails";

const PUBLIC_PATHS = ["/login", "/auth/callback", "/not-allowed"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const { supabase, response } = createMiddlewareClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // لا يوجد مستخدم مسجّل دخول → رجّعه لصفحة الدخول
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // مستخدم مسجّل دخول لكن بريده غير مسموح به → امنعه فورًا
  if (!isAllowedEmail(user.email)) {
    await supabase.auth.signOut();
    const notAllowedUrl = new URL("/not-allowed", request.url);
    return NextResponse.redirect(notAllowedUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
