import { notFound, permanentRedirect } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";
import WebsiteOne from "@/components/templates/WebsiteOne";
import Script from 'next/script';

// =======================================================================
// 🔥 EXTREME CACHING: Caches About/Services/Contact for 1 year instantly
// =======================================================================
export const revalidate = 31536000; 
export const dynamicParams = true;  

// Defines the explicit pages allowed in our SaaS
const VALID_PAGES = ["about", "services", "contact"] as const;
type ValidPage = typeof VALID_PAGES[number];

const TEMPLATES: Record<string, React.FC<any>> = {
  websiteOne: WebsiteOne,
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, catchAll: string[] }> }) {
  const { slug, catchAll } = await params;
  
  // If not a valid page, don't waste DB reads generating metadata
  if (catchAll.length > 1 || !VALID_PAGES.includes(catchAll[0] as ValidPage)) return {};

  const data = await getWebsiteData(slug);
  if (!data) return {};

  const settings = data.settings || {};
  const siteTitle = settings.seoTitle || settings.businessName || data.clientName || slug;
  
  // Capitalize page name for the SEO tab (e.g. "About | Pet Town Grooming")
  const pageTitle = catchAll[0].charAt(0).toUpperCase() + catchAll[0].slice(1);

  // Core Metadata Strings
  const domain = data.customDomain ? `https://${data.customDomain}` : `https://${slug}.nexpetcare.online`;
  const templateId = data.template || "websiteOne";
  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;
  const defaultLogo = templateData?.navbar?.logo?.src || "";
  const faviconUrl = settings.faviconLight || settings.favicon || defaultLogo;
  const cacheBusterUrl = faviconUrl ? `${faviconUrl}?v=${new Date().getTime()}` : "/favicon.ico";

  return {
    title: `${pageTitle} | ${siteTitle}`,
    description: settings.seoDescription || "Expert local pet care and grooming services.",
    metadataBase: new URL(domain),
    alternates: { canonical: `/${catchAll[0]}` },
    icons: {
      icon: cacheBusterUrl,
      shortcut: cacheBusterUrl,
      apple: settings.appleTouchIcon || cacheBusterUrl,
    }
  };
}

export default async function CatchAllRoutes({ params }: { params: Promise<{ slug: string, catchAll: string[] }> }) {
  const { slug, catchAll } = await params;

  // 🔥 THE SHOPIFY 301 TRAP
  // If a bot tries to visit /products/123 or /cart, we bounce them to home
  if (catchAll.length > 1 || !VALID_PAGES.includes(catchAll[0] as ValidPage)) {
    permanentRedirect("/");
  }

  // At this point, we know the path is safely "about", "services", or "contact"
  const pageName = catchAll[0] as ValidPage;

  const data = await getWebsiteData(slug);
  if (!data || !data.isDeployed) return notFound();

  // Route to the correct template
  const templateId = data.template || "websiteOne";
  const TemplateComponent = TEMPLATES[templateId];

  if (!TemplateComponent) return <div>Template not found.</div>;

  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;
  const settings = data.settings || {};

  // ==========================================
  // 🔥 301 REDIRECTS FOR SUBPAGES
  // ==========================================
  const currentPath = `/${pageName}`;

  if (settings.redirects && settings.redirects.length > 0) {
    const match = settings.redirects.find((r: any) => r.oldPath === currentPath);
    if (match) permanentRedirect(match.newPath);
  }

  const htmlClasses = [];
  if (settings.accessibilityReducedMotion) htmlClasses.push("motion-reduce");

  return (
    <div id="tenant-wrapper" lang={settings.language || "en"} dir={settings.rtlLayout ? "rtl" : "ltr"} className={htmlClasses.join(" ")}>
      <main className="w-full min-h-screen">
        
        {/* 🔥 Passes the exact sub-page to the template */}
        <TemplateComponent data={templateData} slug={slug} pageRoute={pageName} />

        {/* Third Party Integrations */}
        {settings.googleAnalyticsId && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
            strategy="worker" 
          />
        )}

        {settings.googleReviewsId && (
          <Script
            src="https://apps.elfsight.com/p/platform.js"
            strategy="lazyOnload" 
          />
        )}
        {settings.googleReviewsId && (
          <div className={`elfsight-app-${settings.googleReviewsId}`}></div>
        )}

      </main>
    </div>
  );
}