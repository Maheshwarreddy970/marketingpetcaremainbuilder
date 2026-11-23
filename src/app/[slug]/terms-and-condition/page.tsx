import React from "react";
import { notFound } from "next/navigation";
import TenantShell from "@/components/templates/TenantShell";
import SmartHeading from "@/components/ui/SmartHeading";
import CTASection from "@/components/landingpageone/CTASection";
import { buildTenantMetadata, getTenantPageContext } from "@/lib/tenant-metadata";

export const revalidate = 31536000;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return buildTenantMetadata(slug, {
    pageTitle: "Terms & Conditions",
    canonicalPath: "/terms-and-condition",
  });
}

interface TermsSection {
  heading: string;
  paragraphs: string[];
}

function getDefaultTerms(info: {
  businessName: string;
  domain: string;
  email: string;
  phone: string;
}): TermsSection[] {
  return [
    {
      heading: "1. Acceptance of Terms",
      paragraphs: [
        `By accessing ${info.domain} or booking pet care and grooming services with ${info.businessName}, you agree to be bound by these Terms and Conditions and all posted salon policies.`,
      ],
    },
    {
      heading: "2. Appointments, Cancellations & Pick-Up",
      paragraphs: [
        "All appointments are scheduled on a reserved time basis so each pet receives calm, attentive care. Please provide at least 24 hours' notice for any cancellations or rescheduling; late cancellations or no-shows may incur a fee.",
        "Kindly drop off and pick up your pet on time. Extended stays past pick-up notification may be subject to a late pick-up charge.",
      ],
    },
    {
      heading: "3. Pet Health, Vaccinations & Safety",
      paragraphs: [
        "You confirm that your pet is up to date on all required vaccinations (including rabies) and is free from contagious illnesses or parasites. Please notify us prior to your appointment of any medical conditions, allergies, skin sensitivities, or behavioural concerns.",
        `Your pet's safety always comes first. ${info.businessName} reserves the right to pause or refuse service at any stage if a pet becomes overly stressed or unsafe to handle.`,
      ],
    },
    {
      heading: "4. Coat Condition, Matting & Pricing",
      paragraphs: [
        "All listed prices are starting estimates based on typical breed size and coat condition. Final pricing may vary depending on coat density, matting, extra handling time, or requested add-on treatments.",
        "De-matting can be uncomfortable for pets; in cases of severe matting, a comfort shave-down may be recommended for your pet's wellbeing.",
      ],
    },
    {
      heading: "5. Photography & Social Media",
      paragraphs: [
        `Unless you let us know otherwise at drop-off, you grant ${info.businessName} permission to capture and share before-and-after photos of your pet on our website or social media channels.`,
      ],
    },
    {
      heading: "6. Website Content & Limitation of Liability",
      paragraphs: [
        `All text, branding, and imagery on ${info.domain} belong to ${info.businessName} and may not be copied or reused without written permission. While every precaution is taken during grooming, ${info.businessName} is not responsible for pre-existing medical conditions revealed during routine care.`,
        `For questions about these terms, please contact ${info.businessName}${info.email ? ` at ${info.email}` : ""}${info.phone ? ` or call ${info.phone}` : ""}.`,
      ],
    },
  ];
}

export default async function TermsAndConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return notFound();

  const data = ctx.templateData;
  const settings = ctx.settings || {};
  const customBlock = data?.termsAndCondition || data?.termsAndConditions || {};

  const businessName =
    settings?.businessName ||
    data?.navbar?.logo?.alt?.replace(/\s*Logo$/i, "") ||
    ctx.data?.clientName ||
    slug;

  const email = settings?.businessEmail || data?.footer?.info?.email?.label || "";
  const phone = settings?.businessPhone || data?.footer?.info?.phone?.label || "";
  const cleanDomain = ctx.domain.replace(/^https?:\/\//, "") || "our website";

  const bgHeader = customBlock?.colors?.bg || "#FBF3EE";
  const borderColor = customBlock?.colors?.border || "#EFE6DF";
  const textColor = customBlock?.colors?.text || "#1F0F08";

  const heading = customBlock?.heading || "Terms & <i>Conditions</i>";
  const updatedLabel =
    customBlock?.lastUpdated ||
    (ctx.data?.lastUpdated
      ? new Date(ctx.data.lastUpdated).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }));

  const sections: TermsSection[] =
    Array.isArray(customBlock?.sections) && customBlock.sections.length > 0
      ? customBlock.sections
      : getDefaultTerms({
          businessName,
          domain: cleanDomain,
          email,
          phone,
        });

  return (
    <TenantShell data={data} settings={settings} isSubPage={false}>
      <div className="overflow-hidden bg-white" style={{ color: textColor }}>
        {/* Page Header (Instant LCP, proper h1) */}
        <section
          className="w-full pt-32 md:pt-36 pb-12 md:pb-16 border-b"
          style={{ backgroundColor: bgHeader, borderColor }}
        >
          <div className="mx-auto max-w-4xl px-6 md:px-12">
            <SmartHeading
              as="h1"
              text={heading}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08]"
              style={{ color: textColor }}
            />
            <p className="mt-4 text-sm font-medium text-neutral-600">
              Last updated: {updatedLabel} &middot; {businessName}
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <article className="mx-auto max-w-4xl px-6 md:px-12 py-16 md:py-20 space-y-10">
          {sections.map((section, idx) => (
            <section
              key={idx}
              className="pb-8 border-b last:border-b-0"
              style={{ borderColor }}
            >
              <h2
                className="text-xl md:text-2xl font-semibold tracking-tight mb-4"
                style={{ color: textColor }}
              >
                {section.heading}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-neutral-700">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </section>
          ))}
        </article>

        {/* CTA (Footer is automatically rendered by TenantShell) */}
        {customBlock?.showCta !== false && data?.ctaSection && (
          <CTASection data={data.ctaSection} />
        )}
      </div>
    </TenantShell>
  );
}