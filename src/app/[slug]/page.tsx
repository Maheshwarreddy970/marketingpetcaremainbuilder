import { notFound, redirect } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";
import { headers } from "next/headers";

// Import all templates
import WebsiteOne from "@/components/templates/WebsiteOne";

const TEMPLATES: Record<string, React.FC<any>> = {
  websiteOne: WebsiteOne,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getWebsiteData(slug);
  const settings = data?.settings || {};

  // Build canonical URL for SEO
  const domain = data?.customDomain ? `https://${data.customDomain}` : `https://${slug}.nexpetcare.com`;

  return {
    title: settings.seoTitle || `${slug} | NexPet Care`,
    description: settings.seoDescription || "Expert pet care and grooming services.",
    keywords: settings.keywords || "pet care, grooming, local business",
    metadataBase: new URL(domain),
    alternates: {
      canonical: '/',
    },
    icons: {
      icon: [
        { url: settings.faviconLight || "/favicon.ico", media: "(prefers-color-scheme: light)" },
        { url: settings.faviconDark || settings.faviconLight || "/favicon.ico", media: "(prefers-color-scheme: dark)" },
      ],
      apple: [
        { url: settings.appleTouchIcon || settings.faviconLight || "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: settings.seoTitle || `${slug} | NexPet Care`,
      description: settings.seoDescription || "Expert pet care and grooming services.",
      url: domain,
      siteName: data?.clientName || slug,
      images: [
        {
          url: settings.ogImage || settings.faviconLight || "https://nexpetcare.com/default-og.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: settings.language || "en_US",
      type: "website",
    },
  };
}

export default async function LiveTenantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();

  const data = await getWebsiteData(slug);
  if (!data || !data.isDeployed) return notFound();

  const templateId = data.template || "websiteOne";
  const TemplateComponent = TEMPLATES[templateId];

  if (!TemplateComponent) {
    return <div>Template not found.</div>;
  }

  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;
  const settings = data.settings || {};

  // ==========================================
  // 🔥 301 REDIRECTS (Wix / WordPress mapping)
  // ==========================================
  const headersList = await headers();
  const currentPath = headersList.get('x-invoke-path') || '/';

  if (settings.redirects && settings.redirects.length > 0) {
    const match = settings.redirects.find((r: any) => r.oldPath === currentPath);
    if (match) {
      redirect(match.newPath); // Fires a 301 Permanent Redirect instantly
    }
  }

  // ==========================================
  // 🔥 BUILD LOCAL BUSINESS SCHEMA (JSON-LD)
  // ==========================================
  const info = templateData?.footer?.info || {};
  const domain = data.customDomain ? `https://${data.customDomain}` : `https://${slug}.nexpetcare.com`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.clientName || slug,
    "image": settings.ogImage || templateData?.navbar?.logo?.src,
    "@id": domain,
    "url": domain,
    "telephone": info.phone?.label || "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": info.address || "",
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  // Check for Reduced Motion Preference
  const htmlClasses = [];
  if (settings.accessibilityReducedMotion) htmlClasses.push("motion-reduce");

  return (
    <div id="tenant-wrapper" lang={settings.language || "en"} dir={settings.rtlLayout ? "rtl" : "ltr"} className={htmlClasses.join(" ")}>
      <main className="w-full min-h-screen relative">

        {/* Inject JSON-LD into the head invisibly */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <TemplateComponent data={templateData} slug={slug} />

        {/* 🔥 10-Second Eye-Catching Dashboard Popup */}
        <a
          href={`http://nexpetcare.com/dashboard/${slug}`}
          className="dashboard-popup fixed bottom-6 right-6 z-[9999] bg-white border border-gray-200 px-2 py-2 pr-5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-gray-50 hover:border-[#2462EA]/40 transition-all opacity-0 pointer-events-none group"
        >
          <div className="w-10 h-10 bg-[#2462EA]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <img src="/logosvg.svg" alt="NexPet Care" className="w-5 h-5 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#2462EA] uppercase tracking-wider font-extrabold leading-tight">
              Site Admin
            </span>
            <span className="text-sm font-bold text-gray-900 leading-tight">
              Open Dashboard &rarr;
            </span>
          </div>
        </a>

        {/* CSS Keyframes for the Entrance + Heartbeat Pulse */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes popInAndPulse {
            0% { opacity: 0; transform: translateY(20px) scale(0.9); pointer-events: none; }
            10% { opacity: 1; transform: translateY(0) scale(1.05); pointer-events: auto; }
            12% { transform: scale(1); opacity: 1; pointer-events: auto; }
            
            /* Heartbeat loop starts here */
            50% { transform: scale(1.02); opacity: 1; pointer-events: auto; box-shadow: 0 10px 25px -5px rgba(36, 98, 234, 0.3); }
            100% { transform: scale(1); opacity: 1; pointer-events: auto; }
          }
          .dashboard-popup {
            /* 10 second delay, infinite heartbeat pulse after it pops in */
            animation: popInAndPulse 4s cubic-bezier(0.16, 1, 0.3, 1) 10s infinite forwards;
          }
        `}} />

        {settings.googleAnalyticsId && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}></script>
        )}

        {settings.googleReviewsId && (
          <script src="https://apps.elfsight.com/p/platform.js" defer></script>
        )}
        {settings.googleReviewsId && (
          <div className={`elfsight-app-${settings.googleReviewsId}`}></div>
        )}
      </main>
    </div>
  );
}