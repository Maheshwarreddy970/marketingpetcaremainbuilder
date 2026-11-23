import { getWebsiteData } from "@/lib/get-website";

export async function getTenantPageContext(slug: string) {
  const data = await getWebsiteData(slug);
  if (!data || !data.isDeployed) return null;

  const templateId = data.template || "websiteOne";
  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;
  const settings = data.settings || {};
  const domain = data.customDomain
    ? `https://${data.customDomain}`
    : `https://${slug}.nexpetcare.online`;

  return { data, templateId, templateData, settings, domain };
}

export async function buildTenantMetadata(
  slug: string,
  options: {
    pageTitle?: string;
    pageDescription?: string;
    canonicalPath: string;
  }
) {
  const data = await getWebsiteData(slug);
  if (!data) return {};

  const settings = data.settings || {};
  const templateId = data.template || "websiteOne";
  const templateData = templateId === "websiteOne" ? data.websiteOneData : data.websiteTwoData;
  const domain = data.customDomain
    ? `https://${data.customDomain}`
    : `https://${slug}.nexpetcare.online`;

  const businessName = settings.businessName || data.clientName || slug;
  const baseTitle = settings.seoTitle || businessName;
  const title = options.pageTitle ? `${options.pageTitle} | ${businessName}` : baseTitle;
  const description =
    options.pageDescription ||
    settings.seoDescription ||
    "Expert local pet care and grooming services.";

  const defaultLogo = templateData?.navbar?.logo?.src || "";
  const faviconUrl = settings.faviconLight || settings.favicon || defaultLogo;
  const version = data.lastUpdated ? new Date(data.lastUpdated).getTime() : "1";
  const cacheBusterUrl = faviconUrl ? `${faviconUrl}?v=${version}` : "/favicon.ico";
  const ogImage = settings.ogImage || defaultLogo;

  return {
    title,
    description,
    keywords: settings.keywords || "",
    metadataBase: new URL(domain),
    alternates: { canonical: options.canonicalPath },
    icons: {
      icon: cacheBusterUrl,
      shortcut: cacheBusterUrl,
      apple: settings.appleTouchIcon || cacheBusterUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `${domain}${options.canonicalPath === "/" ? "" : options.canonicalPath}`,
      siteName: businessName,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: businessName }] : [],
      locale: settings.language?.replace("-", "_") || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}