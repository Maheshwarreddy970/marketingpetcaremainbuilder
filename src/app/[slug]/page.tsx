import { notFound } from "next/navigation";
import Script from "next/script";
import { getWebsiteData } from "@/lib/get-website";
import WebsiteOne from "@/components/templates/WebsiteOne";
import TrackClientView from "@/components/TrackClientView";

export const revalidate = false; // Cached until revalidatePath is called on save
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

const TEMPLATES: Record<string, React.FC<any>> = {
  websiteOne: WebsiteOne,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getWebsiteData(slug);
  if (!data) return {};

  const settings = data.settings || {};
  const templateId = data.template || "websiteOne";
  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;

  const logo = templateData?.navbar?.logo?.src || "";
  const icon = settings.faviconLight || settings.favicon || logo;
  const siteTitle = settings.seoTitle || settings.businessName || data.clientName || slug;
  const siteDescription = settings.seoDescription || "Expert local pet care and grooming services.";
  const businessName = settings.businessName || data.clientName || slug;
  const ogImage = settings.ogImage || logo;

  return {
    title: siteTitle,
    description: siteDescription,
    keywords: settings.keywords || "",
    icons: icon
      ? { icon, shortcut: icon, apple: settings.appleTouchIcon || icon }
      : undefined,
    robots: { index: true, follow: true },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      siteName: businessName,
      images: ogImage ? [{ url: ogImage, alt: businessName }] : [],
      locale: settings.language?.replace("-", "_") || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function LiveWebsitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await getWebsiteData(slug);
  if (!data || !data.isDeployed) notFound();

  const templateId = data.template || "websiteOne";
  const TemplateComponent = TEMPLATES[templateId];
  if (!TemplateComponent) return <div>Template not found.</div>;

  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;
  const settings = data.settings || {};
  const businessName = settings.businessName || data.clientName || slug;

  const socials = templateData?.footer?.socials || {};
  const sameAs = Object.values(socials).filter((url: any) => url && url !== "/" && url !== "#");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    image: settings.ogImage || templateData?.navbar?.logo?.src || "",
    telephone: settings.businessPhone || "",
    email: settings.businessEmail || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.businessAddress || "",
    },
    openingHours: settings.businessHours || "",
    priceRange: "$$",
    sameAs,
  };

  const htmlClasses: string[] = [];
  if (settings.accessibilityReducedMotion) htmlClasses.push("motion-reduce");

  return (
    <div
      id="tenant-wrapper"
      lang={settings.language || "en"}
      dir={settings.rtlLayout ? "rtl" : "ltr"}
      className={htmlClasses.join(" ")}
    >
      <main className="w-full min-h-screen relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Silent view tracker (runs client-side after 3s, keeps CDN cache intact) */}
        <TrackClientView slug={slug} />

        <TemplateComponent data={templateData} slug={slug} />

        {/* 15-Second Dashboard Popup (Pure CSS, caches cleanly) */}
        <a
          href={`https://nexpetcare.com/dashboard/${slug}`}
          className="dashboard-popup fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999] bg-white border border-gray-200 px-2 py-2 pr-5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-gray-50 hover:border-[#2462EA]/40 transition-colors opacity-0 pointer-events-none group"
        >
          <div className="w-10 h-10 bg-[#2462EA]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img
              src="/logosvg.svg"
              alt="NexPet Care"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
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

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes dashboardPopIn {
                0% { opacity: 0; transform: translateY(20px) scale(0.9); pointer-events: none; }
                75% { opacity: 1; transform: translateY(0) scale(1.04); pointer-events: auto; }
                100% { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
              }
              @keyframes dashboardPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15); }
                50% { transform: scale(1.03); box-shadow: 0 12px 28px -5px rgba(36, 98, 234, 0.35); }
              }
              .dashboard-popup {
                animation:
                  dashboardPopIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 15s forwards,
                  dashboardPulse 3.5s ease-in-out 15.6s infinite;
              }
            `,
          }}
        />

        {settings.googleAnalyticsId && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
            strategy="lazyOnload"
          />
        )}
        {settings.googleReviewsId && (
          <>
            <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
            <div className={`elfsight-app-${settings.googleReviewsId}`} />
          </>
        )}
      </main>
    </div>
  );
}