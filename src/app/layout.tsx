import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://nexpetcare.com";
const SITE_NAME = "NexPetCare";

// TODO: put a real square logo (min 112x112px, PNG/SVG/WebP) in /public and update this path.
const LOGO_URL = `${SITE_URL}/logo.png`;

// TODO: add each profile URL here as soon as you create it (LinkedIn, YouTube, Instagram, Facebook, Trustpilot/Clutch).
const SAME_AS: string[] = [
  "https://www.youtube.com/@Nexpetcare",
  // "https://www.linkedin.com/company/nexpetcare", // company page, not a personal /in/ profile
  // "https://www.instagram.com/nexpetcare",
  // "https://www.facebook.com/nexpetcare",
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "NexPet Care | Custom Websites for Pet Groomers";
const DESCRIPTION =
  "NexPet Care builds custom, mobile-first websites for pet groomers, daycares, and pet care businesses. $799 one-time fee, $0 monthly hosting, and it plugs into your existing booking software.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  // NOTE: do not set `alternates.canonical` here. A canonical in the root layout
  // is inherited by every child page and would point them all at the homepage.
  // Set it per page instead (see app/page.tsx example).
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ["NexPetCare", "Nex Pet Care", "NextPetCare"],
  url: SITE_URL,
  logo: LOGO_URL,
  description: DESCRIPTION,
  slogan: "Pay once. Own your website.",
  areaServed: ["US", "CA"],
  knowsAbout: [
    "Pet grooming website design",
    "Dog daycare websites",
    "Local SEO for pet businesses",
  ],
  ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: ["NexPetCare", "Nex Pet Care"],
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// Escape "<" so the JSON can never break out of the <script> tag.
const jsonLd = JSON.stringify([organizationSchema, websiteSchema]).replace(
  /</g,
  "\\u003c",
);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {children}
      </body>
    </html>
  );
}