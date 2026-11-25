import { notFound } from "next/navigation";
import Script from "next/script";
import { getWebsiteData } from "@/lib/get-website";
import WebsiteOne from "@/components/templates/WebsiteOne";
import TrackClientView from "@/components/TrackClientView";
import PreviewBanner from "@/components/PreviewBanner";
import PreviewDashboardBadge from "@/components/PreviewDashboardBadge";

export const revalidate = false; // Cached until revalidatePath is called on save
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

const TEMPLATES: Record<string, React.FC<any>> = {
  websiteOne: WebsiteOne,
};

// A site is treated as a private preview unless it is explicitly marked live.
// Set `isPreview: false` on the website data when a client goes live and both
// the banner and the dashboard panel disappear.
const isPreviewSite = (data: any) => data?.isPreview !== false;

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
    // Private previews should never show up in Google
    robots: isPreviewSite(data)
      ? { index: false, follow: false }
      : { index: true, follow: true },
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
  const isPreview = isPreviewSite(data);

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
      {/* Trust banner: first thing a business owner sees */}
      {isPreview && <PreviewBanner />}

      <main className="w-full min-h-screen relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Silent view tracker (runs client-side after 3s, keeps CDN cache intact) */}
        <TrackClientView slug={slug} />

        <TemplateComponent data={templateData} slug={slug} />

        {/* Preview-only dashboard panel (replaces the old round "Site Admin" badge) */}
        {isPreview && <PreviewDashboardBadge slug={slug} />}

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