import { NextResponse } from "next/server";
import { getWebsiteData } from "@/lib/get-website";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getWebsiteData(slug);

  if (!data) return new NextResponse("Not Found", { status: 404 });

  const loc = `${new URL(request.url).origin}/${slug}`;
  const lastmod = data.lastUpdated
    ? new Date(data.lastUpdated).toISOString()
    : new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}