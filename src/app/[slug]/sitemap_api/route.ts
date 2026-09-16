import { NextResponse } from 'next/server';
import { getWebsiteData } from "@/lib/get-website";

// 🔥 This guarantees Next.js generates this on-the-fly and never fails during build
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fetch data to see if custom domain exists
  const data = await getWebsiteData(slug);
  
  if (!data) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const domain = data.customDomain 
    ? `https://${data.customDomain}` 
    : `https://${slug}.nexpetcare.online`;

  // Generate the raw XML string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}</loc>
    <lastmod>${data.lastUpdated ? new Date(data.lastUpdated).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  // Return the response as an XML file
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    }
  });
}