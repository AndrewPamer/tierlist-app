import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const { supabase, result } = await updateSession(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const notProtected =
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup";

    if (user) {
      if (notProtected) {
        return NextResponse.rewrite(new URL("/home", request.url));
      }
    } else {
      if (!notProtected) {
        return NextResponse.rewrite(new URL("/", request.url));
      }
    }

    return result;
  } catch (error) {
    console.error("middleware error: ", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
