import React from "react";
import SmartHeading from "@/components/ui/SmartHeading";
import CTASection from "@/components/landingpageone/CTASection";

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

function getDefaultPrivacySections(info: {
  businessName: string;
  domain: string;
  email: string;
  phone: string;
  address: string;
}): LegalSection[] {
  return [
    {
      heading: "1. Information We Collect",
      paragraphs: [
        `When you visit ${info.domain}, book an appointment, or submit our contact form, ${info.businessName} may collect basic personal information including your name, email address, phone number, and details about your pet (such as breed, age, coat condition, and care preferences).`,
        "We may also collect non-personal technical data such as browser type, device information, and general usage analytics to keep our website fast and reliable.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      paragraphs: [
        "We use the information you provide strictly to respond to enquiries, schedule and manage pet care appointments, send appointment reminders or pick-up notifications, and provide safe, personalised care for your pet.",
        `${info.businessName} does not sell, rent, or trade your personal information to third parties.`,
      ],
    },
    {
      heading: "3. Third-Party Services & Bookings",
      paragraphs: [
        "Certain features on our site—such as online booking portals, embedded maps, analytics, or customer review widgets—are powered by trusted third-party providers. Any information submitted directly through a third-party booking platform is governed by that provider's privacy policy.",
      ],
    },
    {
      heading: "4. Cookies & Analytics",
      paragraphs: [
        "Our website may use essential cookies and privacy-conscious analytics tools to understand site traffic and improve user experience. You can disable cookies in your browser settings at any time without affecting your ability to view our services.",
      ],
    },
    {
      heading: "5. Data Security & Retention",
      paragraphs: [
        "We take reasonable administrative and technical steps to protect your contact details and pet care notes from unauthorised access or disclosure. We retain client records only as long as needed to deliver ongoing services or meet legal obligations.",
      ],
    },
    {
      heading: "6. Your Choices & Contact Us",
      paragraphs: [
        `You may request access to, correction of, or deletion of your personal information at any time by contacting ${info.businessName}${info.email ? ` at ${info.email}` : ""}${info.phone ? ` or by calling ${info.phone}` : ""}${info.address ? `. Our location: ${info.address}.` : "."}`,
      ],
    },
  ];
}

function getDefaultTermsSections(info: {
  businessName: string;
  domain: string;
  email: string;
  phone: string;
}): LegalSection[] {
  return [
    {
      heading: "1. Acceptance of Terms",
      paragraphs: [
        `By accessing ${info.domain} or booking services with ${info.businessName}, you agree to be bound by these Terms and Conditions and all applicable salon policies.`,
      ],
    },
    {
      heading: "2. Appointments, Cancellations & Pick-Up",
      paragraphs: [
        "All appointments are scheduled on a one-on-one or reserved time basis. We kindly ask for at least 24 hours' notice for any cancellations or rescheduling requests; late cancellations or no-shows may be subject to a fee.",
        "Please drop off and pick up your pet promptly at the agreed time so we can maintain a calm, low-stress schedule for every animal in our care.",
      ],
    },
    {
      heading: "3. Pet Health, Vaccinations & Safety",
      paragraphs: [
        "Pet parents confirm that their pet is up to date on required vaccinations (including rabies) and is free from contagious conditions. Please inform us in advance of any allergies, medical conditions, skin sensitivities, or behavioural concerns.",
        `Safety always comes first. ${info.businessName} reserves the right to pause or decline a service at any stage if a pet becomes overly stressed or unsafe to handle.`,
      ],
    },
    {
      heading: "4. Coat Condition & Pricing Estimates",
      paragraphs: [
        "Displayed prices are starting estimates based on typical breed size and coat condition. Final pricing may vary depending on coat density, matting, behavioural handling time, or requested add-on treatments.",
      ],
    },
    {
      heading: "5. Photography & Social Media",
      paragraphs: [
        "We love celebrating freshly groomed pets. Unless you let us know otherwise at drop-off, you grant permission for before-and-after photos of your pet to be shared on our website or social media pages.",
      ],
    },
    {
      heading: "6. Website Content & Limitation of Liability",
      paragraphs: [
        `All text, branding, and imagery on ${info.domain} belong to ${info.businessName} and may not be reproduced without permission. While we take every precaution during care, ${info.businessName} is not liable for pre-existing medical conditions revealed during routine grooming.`,
        `Questions regarding these terms can be directed to ${info.businessName}${info.email ? ` at ${info.email}` : ""}${info.phone ? ` or ${info.phone}` : ""}.`,
      ],
    },
  ];
}

export default function LegalPageView({
  type,
  data,
  settings = {},
  domain = "",
}: {
  type: "privacy" | "terms";
  data: any;
  settings?: any;
  domain?: string;
}) {
  const customBlock =
    type === "privacy" ? data?.privacyPolicy || {} : data?.termsAndConditions || {};

  const businessName =
    settings?.businessName ||
    data?.navbar?.logo?.alt?.replace(/\s*Logo$/i, "") ||
    "Our Salon";
  const email = settings?.businessEmail || data?.footer?.info?.email?.label || "";
  const phone = settings?.businessPhone || data?.footer?.info?.phone?.label || "";
  const address =
    settings?.businessAddress || data?.footer?.info?.address?.replace(/`/g, "") || "";
  const cleanDomain = domain.replace(/^https?:\/\//, "") || "our website";

  const bgHeader = customBlock?.colors?.bg || "#FBF3EE";
  const borderColor = customBlock?.colors?.border || "#EFE6DF";
  const textColor = customBlock?.colors?.text || "#1F0F08";

  const heading =
    customBlock?.heading ||
    (type === "privacy" ? "Privacy <i>Policy</i>" : "Terms &amp; <i>Conditions</i>");

  const updatedLabel =
    customBlock?.lastUpdated ||
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const sections: LegalSection[] =
    Array.isArray(customBlock?.sections) && customBlock.sections.length > 0
      ? customBlock.sections
      : type === "privacy"
        ? getDefaultPrivacySections({
            businessName,
            domain: cleanDomain,
            email,
            phone,
            address,
          })
        : getDefaultTermsSections({
            businessName,
            domain: cleanDomain,
            email,
            phone,
          });

  return (
    <div className="overflow-hidden bg-white" style={{ color: textColor }}>
      {/* HEADER */}
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

      {/* BODY */}
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

      {/* FINAL CTA */}
      {customBlock?.showCta !== false && data?.ctaSection && (
        <CTASection data={data.ctaSection} />
      )}
    </div>
  );
}