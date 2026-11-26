import type { MetadataRoute } from "next";

const SITE_URL = "https://nexpetcare.com";

// Public marketing pages ONLY. Edit this list to match your real routes.
// Never add prospect demo routes (/sniff-smile, /short-n, ...) here.
const PUBLIC_ROUTES = ["/", "/pricing", "/portfolio", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}