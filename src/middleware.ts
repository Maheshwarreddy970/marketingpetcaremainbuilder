import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  let hostname = req.headers.get("X-Subdomain-Host") || req.headers.get("host") || "";
  hostname = hostname.replace("www.", "");

  const mainDomains = ["localhost:3000", "nexpetcare.com"];
  const isVercel = hostname.endsWith(".vercel.app");

  // 🔥 FIX 1: LOCALHOST SUBDOMAIN ROUTING (Fixes the Invalid URL Error!)
  if (hostname.includes(".localhost:3000") || hostname.includes(".localhost")) {
    const subdomain = hostname.split(".")[0];
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  // 2. PRODUCTION SUBDOMAIN ROUTING
  if (hostname.endsWith(".nexpetcare.com") && !mainDomains.includes(hostname)) {
    const subdomain = hostname.replace(".nexpetcare.com", "");
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  // 3. CUSTOM DOMAIN ROUTING
  if (!mainDomains.includes(hostname) && !isVercel) {
    return NextResponse.rewrite(new URL(`/${hostname}${url.pathname}`, req.url));
  }

  // 4. MAIN DOMAIN FALLBACK
  return NextResponse.next();
}