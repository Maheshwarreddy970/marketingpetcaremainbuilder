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

  // Add all 21 of your domains here
  const mainDomains = [
    "localhost:3000",
    "nexpetcare.com", "nexpetcare.store", "nexpetcareweb.store", "nexpetdigital.store", "nexpetstudio.store", "trynexpet.store",
    "nexpetcare.org", "nexpetcareweb.net", "nexpetdigital.org", "nexpetstudio.org", "trynexpet.org",
    "nexpetcare.site", "nexpetcareweb.com", "nexpetdigital.com", "nexpetstudio.com", "trynexpet.com",
    "nexpetcare.info", "nexpetcareweb.info", "nexpetdigital.info", "nexpetstudio.info", "trynexpet.info"
  ];
  
  const isVercel = hostname.endsWith(".vercel.app");

  // 1. LOCALHOST SUBDOMAIN ROUTING
  if (hostname.includes(".localhost:3000") || hostname.includes(".localhost")) {
    const subdomain = hostname.split(".")[0];
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  // 2. PRODUCTION SUBDOMAIN ROUTING (Universal for all 21 domains)
  // Check if the incoming hostname ends with ANY of your main domains
  const matchedMainDomain = mainDomains.find(domain => hostname.endsWith(`.${domain}`));

  if (matchedMainDomain && !mainDomains.includes(hostname)) {
    // Extract the subdomain dynamically based on which main domain was matched
    const subdomain = hostname.replace(`.${matchedMainDomain}`, "");
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }

  // 3. CUSTOM DOMAIN ROUTING (For your clients' own external domains)
  if (!mainDomains.includes(hostname) && !isVercel) {
    return NextResponse.rewrite(new URL(`/${hostname}${url.pathname}`, req.url));
  }

  // 4. MAIN DOMAIN FALLBACK
  return NextResponse.next();
}