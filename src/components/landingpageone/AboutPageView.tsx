import React from "react";
import { CheckCircle2 } from "lucide-react";
import SmartHeading from "@/components/ui/SmartHeading";
import CTASection from "@/components/landingpageone/CTASection";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import { optimizeCloudinaryImage } from "@/lib/optimize-image";

interface AboutPageViewProps {
  data: any;
  settings?: any;
}

export default function AboutPageView({ data, settings = {} }: AboutPageViewProps) {
  if (!data) return null;

  const businessName = settings.businessName || "our salon";
  const aboutPage = data.aboutPage || {};
  const fallbackAbout = data.about || {};

  // Colors (overrideable per tenant in JSON, defaults to warm Petocare palette)
  const pageBg = aboutPage.styling?.bg || "#FBF3EE";
  const statsBg = aboutPage.styling?.statsBg || "#FEFAF7";
  const cardBg = aboutPage.styling?.cardBg || "#FBF5F0";
  const cardBorder = aboutPage.styling?.cardBorder || "#EFE6DF";
  const headingColor = aboutPage.styling?.headingColor || "#1F0F08";
  const textColor = aboutPage.styling?.textColor || "#525252";
  const accentColor = aboutPage.styling?.accentColor || "var(--primary)";

  // 1. Hero Data
  const heroHeading = aboutPage.hero?.heading || `We are ${businessName}`;
  const heroSubtitle =
    aboutPage.hero?.subtitle ||
    fallbackAbout.description?.text ||
    fallbackAbout.description ||
    "Assuring pet parents complete peace of mind with a trusted, gentle, results-driven grooming experience.";
  const heroImage =
    aboutPage.hero?.image?.src ||
    data.hero?.image?.src ||
    fallbackAbout.image?.src ||
    fallbackAbout.image ||
    "";
  const heroImageAlt = aboutPage.hero?.image?.alt || `${businessName} grooming salon`;

  // 2. Intro Story Data
  const introHeading =
    aboutPage.intro?.heading || "We treat every pet like our own beloved baby";
  const introParagraphs: string[] =
    aboutPage.intro?.paragraphs?.length > 0
      ? aboutPage.intro.paragraphs
      : [
          `Every pet that walks through our doors carries the love of a family behind them. At ${businessName}, we honor that trust — treating every animal with the same tenderness, patience, and devotion we give our own companions.`,
          `Leaving your pet with someone new is never easy. Our experienced team and calm, low-stress environment ensure your pet's safety and your complete peace of mind.`,
        ];
  const highlights: string[] =
    aboutPage.intro?.highlights?.length > 0
      ? aboutPage.intro.highlights
      : fallbackAbout.features?.map((f: any) => (typeof f === "string" ? f : f.text || f.label)).filter(Boolean) || [
          "Experienced & safety-focused groomers",
          "1,000+ happy pets pampered",
          "Trusted by local pet parents",
        ];

  // 3. Stats ("Built on results") Data
  const statsHeading = aboutPage.statsSection?.heading || "Built on results";
  const statsSubtitle =
    aboutPage.statsSection?.subtitle ||
    "Numbers clearly show how our team is dedicated to giving pets the best care every day.";
  const statsImage =
    aboutPage.statsSection?.image?.src ||
    fallbackAbout.image?.src ||
    fallbackAbout.image ||
    data.gallery?.items?.[0]?.after ||
    "";
  const statsImageAlt = aboutPage.statsSection?.image?.alt || `Happy pet at ${businessName}`;
  const stats: { value: string; label: string }[] =
    aboutPage.statsSection?.items?.length > 0
      ? aboutPage.statsSection.items
      : [
          { value: "1,000+", label: "Happy pets served" },
          { value: "4.98/5", label: "Average client rating" },
          { value: "10+", label: "Years of experience" },
        ];

  // 4. Mission & Vision Data
  const valuesHeading = aboutPage.values?.heading || "What we stand for";
  const valuesSubtitle =
    aboutPage.values?.subtitle ||
    `${businessName} exists for one reason — to make the lives of pets and their owners genuinely better.`;
  const valuesItems: { title: string; description: string }[] =
    aboutPage.values?.items?.length > 0
      ? aboutPage.values.items
      : [
          {
            title: "Our mission",
            description:
              "Provide loving, low-stress care that improves pet comfort and health, treating every animal like our own.",
          },
          {
            title: "Our vision",
            description:
              "To be the go-to pet care place in town where owners can relax completely and trust us every visit.",
          },
        ];
  const valuesImage =
    aboutPage.values?.image?.src ||
    data.founder?.image?.src ||
    data.process?.steps?.[0]?.image ||
    fallbackAbout.image?.src ||
    "";
  const valuesImageAlt = aboutPage.values?.image?.alt || `Grooming care at ${businessName}`;

  const showCta = aboutPage.showCta !== false && Boolean(data.ctaSection);

  return (
    <div
      className={cn("overflow-hidden", aboutPage.styling?.className)}
      style={{ backgroundColor: pageBg, color: headingColor }}
    >
      {/* 1. HERO (No opacity-0 Reveal so LCP paints instantly) */}
      <section className="mx-auto max-w-6xl px-6 pt-20 md:pt-24 pb-16">
        <div className="mx-auto w-full  text-center">
          <SmartHeading
            as="h1"
            text={heroHeading}
            className="text-5xl sm:text-6xl font-semibold tracking-tight md:text-7xl leading-[1.08]"
            style={{ color: headingColor }}
          />
          <p
            className="mt-6  mx-auto text-lg leading-relaxed"
            style={{ color: textColor }}
          >
            {heroSubtitle}
          </p>
        </div>

        {heroImage && (
          <div className="group relative mt-12 md:mt-16 h-[340px] sm:h-[460px] md:h-[560px] w-full overflow-hidden rounded-3xl shadow-sm bg-black/5">
            <img
              src={optimizeCloudinaryImage(heroImage, 1400)}
              alt={heroImageAlt}
              fetchPriority="high"
              decoding="sync"
              width={1400}
              height={780}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
          </div>
        )}
      </section>

      {/* 2. INTRO STORY */}
      <section className="mx-auto grid max-w-6xl gap-10 md:gap-12 px-6 py-20 md:py-24 md:grid-cols-2">
        <Reveal>
          <SmartHeading
            as="h2"
            text={introHeading}
            className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
            style={{ color: headingColor }}
          />
        </Reveal>

        <Reveal delay={120} className="space-y-6 text-base leading-relaxed">
          {introParagraphs.map((paragraph, idx) => (
            <p key={idx} style={{ color: textColor }}>
              {paragraph}
            </p>
          ))}

          {highlights.length > 0 && (
            <ul className="space-y-3 pt-4">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className="group flex items-center gap-3"
                  style={{ color: headingColor }}
                >
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-125"
                    style={{ color: accentColor }}
                    aria-hidden="true"
                  />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </section>

      {/* 3. STATS ("Built on results") */}
      <section className="py-20 md:py-24" style={{ backgroundColor: statsBg }}>
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <SmartHeading
              as="h2"
              text={statsHeading}
              className="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl"
              style={{ color: headingColor }}
            />
            <p
              className="mx-auto mt-4 max-w-sm text-base leading-relaxed"
              style={{ color: textColor }}
            >
              {statsSubtitle}
            </p>
          </Reveal>

          <div className="mt-14 md:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statsImage && (
              <Reveal className="group relative h-64 overflow-hidden rounded-2xl lg:h-auto lg:min-h-64 bg-black/5">
                <img
                  src={optimizeCloudinaryImage(statsImage, 600)}
                  alt={statsImageAlt}
                  loading="lazy"
                  width={600}
                  height={600}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Reveal>
            )}

            {stats.map((stat, i) => (
              <Reveal key={stat.label + i} delay={120 + i * 100}>
                <div
                  className="group flex min-h-64 cursor-default flex-col justify-between rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: cardBorder,
                  }}
                >
                  <span
                    className="font-mono text-4xl sm:text-5xl tracking-wider font-medium"
                    style={{ color: headingColor }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: headingColor }}
                  >
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION ("What we stand for") */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 lg:gap-16 px-6 py-20 md:py-24 lg:grid-cols-2">
        <Reveal>
          <div>
            <SmartHeading
              as="h2"
              text={valuesHeading}
              className="text-3xl sm:text-4xl font-semibold tracking-tight md:text-5xl"
              style={{ color: headingColor }}
            />
            <p
              className="mt-6 max-w-md text-lg leading-relaxed"
              style={{ color: textColor }}
            >
              {valuesSubtitle}
            </p>

            <div className="mt-12 md:mt-16 space-y-10">
              {valuesItems.map((item, idx) => (
                <Reveal key={item.title + idx} delay={120 + idx * 100}>
                  <div
                    className="border-l-2 pl-4 transition-all duration-300"
                    style={{ borderColor: accentColor }}
                  >
                    <h3
                      className="text-xl font-medium"
                      style={{ color: headingColor }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-3 max-w-sm leading-relaxed"
                      style={{ color: textColor }}
                    >
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {valuesImage && (
          <Reveal delay={150}>
            <div className="group relative h-[420px] sm:h-[540px] lg:h-[640px] w-full overflow-hidden rounded-3xl shadow-sm bg-black/5">
              <img
                src={optimizeCloudinaryImage(valuesImage, 900)}
                alt={valuesImageAlt}
                loading="lazy"
                width={900}
                height={1080}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        )}
      </section>

      {/* 5. OPTIONAL CTA BANNER (Reuses existing builder CTA section) */}
      {showCta && <CTASection data={data.ctaSection} />}
    </div>
  );
}