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
  
  // ✅ ADDED: Detect if the host is a Vercel deployment domain
  const isVercel = hostname.endsWith(".vercel.app");

  // 2. SUBDOMAIN ROUTING (e.g., m.nexpetcare.com)
  if (hostname.endsWith(".nexpetcare.com") && !mainDomains.includes(hostname)) {
    const subdomain = hostname.replace(".nexpetcare.com", "");
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  // 3. CUSTOM DOMAIN ROUTING (e.g., nexpetcare.store)
  // ✅ UPDATED: Skip custom domain rewrite if it's a main domain OR a Vercel domain
  if (!mainDomains.includes(hostname) && !isVercel) {
    return NextResponse.rewrite(new URL(`/${hostname}${url.pathname}`, req.url));
  }

  // 4. MAIN DOMAIN FALLBACK
  return NextResponse.next();
}