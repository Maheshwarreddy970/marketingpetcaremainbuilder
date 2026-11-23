import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SmartHeading from "@/components/ui/SmartHeading";
import ContactSection from "@/components/landingpageone/ContactSection";
import CTASection from "@/components/landingpageone/CTASection";
import Reveal from "./Reveal";

export default function ContactPageView({
  data,
  settings = {},
  slug,
}: {
  data: any;
  settings?: any;
  slug: string;
}) {
  const page = data?.contactPage || {};
  const contactFooterInfo = data?.footer?.info || {};
  const primaryColor = data?.theme?.primaryColor || "#a35c38";

  const bgHeader = page?.colors?.bg || "#FBF3EE";
  const borderColor = page?.colors?.border || "#EFE6DF";
  const textColor = page?.colors?.text || "#1F0F08";

  const heroHeading = page?.hero?.heading || "Contact <i>Us</i>";
  const heroDescription =
    page?.hero?.description ||
    "Have a question about grooming, availability, or your pet's special needs? Reach out anytime.";

  const mapEmbedUrl = page?.mapEmbedUrl || contactFooterInfo?.mapEmbedUrl || "";
  const address = settings?.businessAddress || contactFooterInfo?.address?.replace(/`/g, "") || "";
  const phone = settings?.businessPhone || contactFooterInfo?.phone?.label || "";
  const phoneHref =
    contactFooterInfo?.phone?.href ||
    (phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "");
  const email = settings?.businessEmail || contactFooterInfo?.email?.label || "";
  const emailHref = contactFooterInfo?.email?.href || (email ? `mailto:${email}` : "");
  const hours = settings?.businessHours || page?.hours || "";

  return (
    <div className="overflow-hidden bg-white" style={{ color: textColor }}>
      {/* 1. PAGE HEADER */}
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

      {/* 2. EXISTING CONTACT FORM */}
      {data?.contactSection && (
        <div className={page?.showHeader === false ? "pt-28 md:pt-32" : ""}>
          <ContactSection data={data.contactSection} slug={slug} />
        </div>
      )}

      {/* 3. LARGE GOOGLE MAP + QUICK INFO STRIP */}
      {mapEmbedUrl && (
        <section className="w-full pb-20 md:pb-24 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal>
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2
                    className="text-3xl md:text-4xl font-semibold tracking-tight"
                    style={{ color: textColor }}
                  >
                    {page?.mapHeading || "Visit Our Salon"}
                  </h2>
                  {address && (
                    <p className="mt-2 text-base text-neutral-600">{address}</p>
                  )}
                </div>

                {(phone || email || hours) && (
                  <div className="flex flex-wrap gap-3 text-sm">
                    {phone && (
                      <a
                        href={phoneHref}
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-neutral-800 hover:bg-black/5 transition-colors"
                        style={{ borderColor }}
                      >
                        <Phone className="h-4 w-4 shrink-0" style={{ color: primaryColor }} aria-hidden="true" />
                        <span>{phone}</span>
                      </a>
                    )}
                    {email && (
                      <a
                        href={emailHref}
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-neutral-800 hover:bg-black/5 transition-colors"
                        style={{ borderColor }}
                      >
                        <Mail className="h-4 w-4 shrink-0" style={{ color: primaryColor }} aria-hidden="true" />
                        <span>{email}</span>
                      </a>
                    )}
                    {hours && (
                      <div
                        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium text-neutral-700"
                        style={{ borderColor }}
                      >
                        <Clock className="h-4 w-4 shrink-0" style={{ color: primaryColor }} aria-hidden="true" />
                        <span>{hours}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div
                className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] rounded-3xl overflow-hidden border shadow-sm bg-slate-100"
                style={{ borderColor }}
              >
                <div className="absolute inset-0 flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>Loading map...</span>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title="Salon Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full z-10"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 4. FINAL CTA */}
      {data?.ctaSection && <CTASection data={data.ctaSection} />}
    </div>
  );
}