import React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/landingpageone/Navbar";
import Footer from "@/components/landingpageone/footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-main",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-accent",
});

interface TenantShellProps {
  data: any;
  settings?: any;
  children: React.ReactNode;
  isSubPage?: boolean;
  includeScripts?: boolean;
}

export default function TenantShell({
  data,
  settings = {},
  children,
  isSubPage = false,
  includeScripts = true,
}: TenantShellProps) {
  if (!data) return null;

  const primaryColor = data?.theme?.primaryColor || "#a35c38";

  const defaultPawSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <defs><filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.15"/></filter></defs>
      <g fill="${primaryColor}" filter="url(#softShadow)">
        <circle cx="12" cy="18" r="4.5"/><circle cx="20" cy="11" r="5"/><circle cx="28" cy="11" r="5"/><circle cx="36" cy="18" r="4.5"/>
        <path d="M24 21c-6.5 0-11.5 4.5-11.5 11 0 4.5 4.5 8 11.5 8s11.5-3.5 11.5-8c0-6.5-5-11-11.5-11z"/>
      </g>
    </svg>
  `);

  const hoverPawSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <defs><filter id="hoverShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/></filter></defs>
      <g fill="${primaryColor}" filter="url(#hoverShadow)">
        <circle cx="11" cy="17" r="5"/><circle cx="19" cy="10" r="5.5"/><circle cx="29" cy="10" r="5.5"/><circle cx="37" cy="17" r="5"/>
        <path d="M24 20c-7.2 0-12.5 5-12.5 12 0 5 5 8.5 12.5 8.5s12.5-3.5 12.5-8.5c0-7-5.2-12-12.5-12z"/>
      </g>
    </svg>
  `);

  const htmlClasses = settings.accessibilityReducedMotion ? "motion-reduce" : "";

  return (
    <div
      id="tenant-wrapper"
      lang={settings.language || "en"}
      dir={settings.rtlLayout ? "rtl" : "ltr"}
      className={htmlClasses}
    >
      <div
        id="live-preview-box"
        className={`relative w-full min-h-screen bg-white text-gray-900 ${inter.variable} ${playfair.variable}`}
        style={
          {
            fontFamily: "var(--font-main)",
            "--primary": primaryColor,
          } as React.CSSProperties
        }
      >
        <style>{`
          html { scroll-behavior: smooth; }
          em, i { font-family: var(--font-accent), serif !important; font-style: italic; font-weight: 500; }
          body, input, textarea, select { cursor: url("data:image/svg+xml;utf8,${defaultPawSvg}") 24 12, auto !important; }
          a, button, [role='button'], input[type='submit'], input[type='button'], summary { cursor: url("data:image/svg+xml;utf8,${hoverPawSvg}") 24 12, pointer !important; transition: all 0.25s ease-in-out; }
        `}</style>

        {data.navbar && <Navbar data={data.navbar} />}

        <main className={isSubPage ? "w-full min-h-screen pt-24 md:pt-28" : "w-full min-h-screen"}>
          {children}
        </main>

        {data.footer && <Footer data={data.footer} />}

        {includeScripts && settings.googleAnalyticsId && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
            strategy="lazyOnload"
          />
        )}
        {includeScripts && settings.googleReviewsId && (
          <>
            <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
            <div className={`elfsight-app-${settings.googleReviewsId}`} />
          </>
        )}
      </div>
    </div>
  );
}