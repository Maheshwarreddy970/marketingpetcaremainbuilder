import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  // Matches all routes except api, _next, static files, and files with extensions
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  let hostname = req.headers.get("X-Subdomain-Host") || req.headers.get("host") || "";
  hostname = hostname.replace("www.", ""); 

  const mainDomains = ["localhost:3000", "nexpetcare.online"];

  // 2. SUBDOMAIN ROUTING (e.g., m.nexpetcare.online)
  if (hostname.endsWith(".nexpetcare.online") && !mainDomains.includes(hostname)) {
    const subdomain = hostname.replace(".nexpetcare.online", "");
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  // 3. CUSTOM DOMAIN ROUTING (e.g., nexpetcare.store)
  if (!mainDomains.includes(hostname)) {
    // ❌ OLD: return NextResponse.rewrite(new URL(`/live/domain/${hostname}${url.pathname}`, req.url));
    // ✅ NEW: Rewrite directly to the /[slug] route, passing the domain name as the slug
    return NextResponse.rewrite(new URL(`/${hostname}${url.pathname}`, req.url));
  }

  // 4. MAIN DOMAIN FALLBACK
  return NextResponse.next();
}