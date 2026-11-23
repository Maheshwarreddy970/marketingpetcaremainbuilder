import React from "react";
import SmartHeading from "@/components/ui/SmartHeading";
import ServicesSection from "@/components/landingpageone/ServicesSection";
import GallerySection from "@/components/landingpageone/GallerySection";
import CTASection from "@/components/landingpageone/CTASection";

export default function ServicesPageView({
  data,
  settings = {},
}: {
  data: any;
  settings?: any;
}) {
  const page = data?.servicesPage || {};
  const businessName =
    settings?.businessName ||
    data?.navbar?.logo?.alt?.replace(/\s*Logo$/i, "") ||
    "Our Salon";

  const bgHeader = page?.colors?.bg || "#FBF3EE";
  const textColor = page?.colors?.text || "#1F0F08";

  const heroHeading = page?.hero?.heading || "Our <i>Services</i>";
  const heroDescription =
    page?.hero?.description ||
    data?.services?.description?.text ||
    data?.services?.description ||
    `Thoughtful, coat-specific grooming and care tailored to your pet's comfort at ${businessName}.`;

  return (
    <div className="overflow-hidden bg-white" style={{ color: textColor }}>
      {/* 1. PAGE HEADER (Provides the required <h1> for SEO & Accessibility) */}
      {page?.showHeader !== false && (
        <section
          className="w-full pt-32 md:pt-36 pb-14 md:pb-16"
          style={{ backgroundColor: bgHeader }}
        >
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <SmartHeading
              as="h1"
              text={heroHeading}
              className="text-5xl font-semibold tracking-tight md:text-7xl leading-[1.08]"
              style={{ color: textColor }}
            />
            <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-neutral-700">
              {heroDescription}
            </p>
          </div>
        </section>
      )}

      {/* 2. SERVICES GRID */}
      {data?.services && (
        <div className={page?.showHeader === false ? "pt-28 md:pt-32" : ""}>
          <ServicesSection data={data.services} />
        </div>
      )}

      {/* 3. BEFORE & AFTER GALLERY */}
      {data?.gallery && <GallerySection data={data.gallery} />}

      {/* 4. FINAL CTA */}
      {data?.ctaSection && <CTASection data={data.ctaSection} />}
    </div>
  );
}