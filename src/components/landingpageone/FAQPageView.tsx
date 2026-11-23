import React from "react";
import SmartHeading from "@/components/ui/SmartHeading";
import FAQSection from "@/components/landingpageone/FAQSection";
import CTASection from "@/components/landingpageone/CTASection";

export default function FAQPageView({
  data,
  settings = {},
}: {
  data: any;
  settings?: any;
}) {
  const page = data?.faqPage || {};
  const businessName =
    settings?.businessName ||
    data?.navbar?.logo?.alt?.replace(/\s*Logo$/i, "") ||
    "Our Salon";

  const bgHeader = page?.colors?.bg || "#FBF3EE";
  const textColor = page?.colors?.text || "#1F0F08";

  const heroHeading = page?.hero?.heading || "Frequently Asked <i>Questions</i>";
  const heroDescription =
    page?.hero?.description ||
    `Helpful answers about appointments, coat care, and salon policies at ${businessName}.`;

  return (
    <div className="overflow-hidden bg-white" style={{ color: textColor }}>
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

      {data?.faq && (
        <div className={page?.showHeader === false ? "pt-28 md:pt-32" : ""}>
          <FAQSection data={data.faq} />
        </div>
      )}

      {data?.ctaSection && <CTASection data={data.ctaSection} />}
    </div>
  );
}