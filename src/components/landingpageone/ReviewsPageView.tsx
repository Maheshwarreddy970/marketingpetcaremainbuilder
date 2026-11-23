import React from "react";
import SmartHeading from "@/components/ui/SmartHeading";
import ReviewsSection from "@/components/landingpageone/ReviewsSection";
import CTASection from "@/components/landingpageone/CTASection";

export default function ReviewsPageView({
  data,
  settings = {},
}: {
  data: any;
  settings?: any;
}) {
  const page = data?.reviewsPage || {};
  const businessName =
    settings?.businessName ||
    data?.navbar?.logo?.alt?.replace(/\s*Logo$/i, "") ||
    "Our Salon";

  const bgHeader = page?.colors?.bg || "#FBF3EE";
  const textColor = page?.colors?.text || "#1F0F08";

  const heroHeading = page?.hero?.heading || "Client <i>Reviews</i>";
  const heroDescription =
    page?.hero?.description ||
    `See what local pet parents have to say about their experience with ${businessName}.`;

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

      {data?.reviews && (
        <div className={page?.showHeader === false ? "pt-28 md:pt-32" : ""}>
          <ReviewsSection data={data.reviews} />
        </div>
      )}

      {data?.ctaSection && <CTASection data={data.ctaSection} />}
    </div>
  );
}