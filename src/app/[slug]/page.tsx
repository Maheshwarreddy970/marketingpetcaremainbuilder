import { notFound, redirect } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";
import WebsiteOne from "@/components/templates/WebsiteOne";

const TEMPLATES: Record<string, React.FC<any>> = {
  websiteOne: WebsiteOne,
};

// 🔥 OPTIMIZATION: Cache the page indefinitely on Vercel's global CDN.
// Revalidation will be handled on-demand by `revalidatePath` inside `saveWebsiteSettingsAction`.
export const revalidate = false; // Note: You can use false or leave this out to rely on on-demand revalidation. Next.js 14+ uses false to mean "do not revalidate on a timer".

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getWebsiteData(slug);
  if (!data) return {};

  const settings = data.settings || {};
  const templateId = data.template || "websiteOne";
  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;

  // Domain & URL Resolution
  const domain = data.customDomain ? `https://${data.customDomain}` : `https://${slug}.nexpetcare.com`;

  // Visual Assets
  const defaultLogo = templateData?.navbar?.logo?.src || "";
  const faviconUrl = settings.faviconLight || settings.favicon || defaultLogo;
  const cacheBusterUrl = faviconUrl ? `${faviconUrl}?v=${new Date().getTime()}` : "/favicon.ico";
  const ogImage = settings.ogImage || defaultLogo;

  // Core Metadata Strings
  const siteTitle = settings.seoTitle || settings.businessName || data.clientName || slug;
  const siteDescription = settings.seoDescription || "Expert local pet care and grooming services.";
  const businessName = settings.businessName || data.clientName || slug;

  return {
    title: siteTitle,
    description: siteDescription,
    keywords: settings.keywords || "",
    metadataBase: new URL(domain),
    alternates: { canonical: '/' },
    
    // Favicons & Apple Touch Icons
    icons: {
      icon: cacheBusterUrl,
      shortcut: cacheBusterUrl,
      apple: settings.appleTouchIcon || cacheBusterUrl,
    },
    
    // Search Engine Crawling Rules
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Rich OpenGraph (Facebook, LinkedIn, iMessage)
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: domain,
      siteName: businessName,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: businessName }] : [],
      locale: settings.language?.replace("-", "_") || "en_US",
      type: "website",
      emails: settings.businessEmail ? [settings.businessEmail] : [],
      phoneNumbers: settings.businessPhone ? [settings.businessPhone] : [],
    },

    // Rich Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: ogImage ? [ogImage] : [],
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

  if (!TemplateComponent) return <div>Template not found.</div>;

  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;
  const settings = data.settings || {};

  // ==========================================
  // 🔥 Redirects check logic (without headers()!)
  // ==========================================
  if (settings.redirects && settings.redirects.length > 0) {
      const match = settings.redirects.find((r: any) => r.oldPath === '/');
      if (match) redirect(match.newPath); 
  }

  // ==========================================
  // 🔥 ADVANCED LOCAL BUSINESS SCHEMA (JSON-LD)
  // ==========================================
  const domain = data.customDomain ? `https://${data.customDomain}` : `https://${slug}.nexpetcare.online`;
  
  // Extract social links from the footer to add to Google's Knowledge Graph
  const socialsObj = templateData?.footer?.socials || {};
  const sameAsLinks = Object.values(socialsObj).filter((url: any) => url && url !== "#");

  // The missing part was here!
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": settings.businessName || data.clientName || slug,
    "image": settings.ogImage || templateData?.navbar?.logo?.src || "",
    "@id": domain,
    "url": domain,
    "telephone": settings.businessPhone || "",
    "email": settings.businessEmail || "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.businessAddress || "",
    },
    // Dynamically uses your format: "Mo-Su 09:00-17:00"
    "openingHours": settings.businessHours || "",
    "priceRange": "$$",
    "sameAs": sameAsLinks
  };

  const htmlClasses = [];
  if (settings.accessibilityReducedMotion) htmlClasses.push("motion-reduce");

  return (
    <div id="tenant-wrapper" lang={settings.language || "en"} dir={settings.rtlLayout ? "rtl" : "ltr"} className={htmlClasses.join(" ")}>
      <main className="w-full min-h-screen relative">
        
        {/* 🔥 Invisible SEO Injection */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />

        <TemplateComponent data={templateData} slug={slug} />
        
        {/* 🔥 15-Second Eye-Catching Dashboard Popup (Pure CSS, caches perfectly) */}
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
            /* 15 second delay, infinite heartbeat pulse after it pops in */
            animation: popInAndPulse 4s cubic-bezier(0.16, 1, 0.3, 1) 15s infinite forwards;
          }
        `}} />

        {/* Third Party Integrations */}
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
