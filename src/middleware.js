import { updateSession } from "@/utils/supabase/middleware";
export async function middleware(request) {
  const { result } = updateSession(request);
  return result;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
