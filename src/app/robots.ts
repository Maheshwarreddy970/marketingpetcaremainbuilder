import type { MetadataRoute } from "next";

// Keep crawling open. Demo pages are hidden with a `noindex` meta tag instead of
// a Disallow rule, because Google can only see "noindex" if it is allowed to crawl the page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nexpetcare.com/sitemap.xml",
  };
}
