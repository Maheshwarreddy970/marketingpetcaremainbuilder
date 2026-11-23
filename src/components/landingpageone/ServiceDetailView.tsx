import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ChevronRight, Phone } from "lucide-react";
import SmartHeading from "@/components/ui/SmartHeading";
import CTASection from "@/components/landingpageone/CTASection";
import { optimizeCloudinaryImage } from "@/lib/optimize-image";
import Reveal from "./Reveal";

interface PricingTier {
  size: string;
  weight?: string;
  duration?: string;
  price: string;
  note?: string;
}

export default function ServiceDetailView({
  data,
  settings = {},
  service,
  otherServices = [],
}: {
  data: any;
  settings?: any;
  service: any;
  otherServices: any[];
}) {
  if (!service) return null;

  const page = data?.serviceDetailPage || {};
  const primaryColor = data?.theme?.primaryColor || "#a35c38";
  const bgHeader = page?.colors?.bg || "#FBF3EE";
  const cardBg = page?.colors?.cardBg || "#FEFAF7";
  const borderColor = page?.colors?.border || "#EFE6DF";
  const textColor = page?.colors?.text || "#1F0F08";

  const title = service.title || service.name || "Grooming Service";
  const subheading =
    service.subheading ||
    service.subtitle ||
    service.shortDescription ||
    service.description ||
    "";
  const longDescription = service.longDescription || service.description || "";
  const startingPrice = service.price || "";
  const duration = service.duration || "";
  const imageSrc =
    service.image?.src ||
    (typeof service.image === "string" ? service.image : "") ||
    data?.about?.image?.src ||
    data?.hero?.image?.src ||
    "";

  const bookingHref =
    service.cta?.href ||
    service.href ||
    data?.services?.cta?.href ||
    data?.navbar?.cta?.href ||
    "/contact";
  const bookingLabel = service.cta?.label || "Book This Service";

  const includedItems: string[] = Array.isArray(service.included)
    ? service.included
    : Array.isArray(service.features)
      ? service.features
      : [];

  const pricingTiers: PricingTier[] = Array.isArray(service.pricingTable)
    ? service.pricingTable
    : Array.isArray(service.sizePricing)
      ? service.sizePricing
      : [];

  const phone = settings?.businessPhone || data?.footer?.info?.phone?.label || "";
  const phoneHref = data?.footer?.info?.phone?.href || (phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "");

  return (
    <div className="overflow-hidden bg-white" style={{ color: textColor }}>
      {/* 1. HERO HEADER (Instant LCP) */}
      <section
        className="w-full pt-32 md:pt-36 pb-12 md:pb-16 border-b"
        style={{ backgroundColor: bgHeader, borderColor }}
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-neutral-600">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="font-medium text-neutral-900">{title}</span>
          </nav>

          <SmartHeading
            as="h1"
            text={title}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08]"
            style={{ color: textColor }}
          />

          {subheading && (
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              {subheading}
            </p>
          )}
        </div>
      </section>

      {/* 2. MAIN SPLIT: LEFT SUMMARY BOX + RIGHT DETAILS & SIZE PRICING */}
      <section className="mx-auto max-w-6xl px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT BOX (Sticky Summary Card) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              className="overflow-hidden rounded-3xl border shadow-sm"
              style={{ backgroundColor: cardBg, borderColor }}
            >
              {imageSrc && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                  <img
                    src={optimizeCloudinaryImage(imageSrc, 800)}
                    alt={title}
                    fetchPriority="high"
                    decoding="sync"
                    width={800}
                    height={600}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 md:p-8 flex flex-col gap-5">
                <div className="flex items-baseline justify-between gap-4 border-b pb-5" style={{ borderColor }}>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                      Starting Price
                    </p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight" style={{ color: textColor }}>
                      {startingPrice || "Contact for quote"}
                    </p>
                  </div>

                  {duration && (
                    <div className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white" style={{ borderColor }}>
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{duration}</span>
                    </div>
                  )}
                </div>

                {service.quickNotes && Array.isArray(service.quickNotes) && service.quickNotes.length > 0 && (
                  <ul className="space-y-2.5 text-sm text-neutral-700">
                    {service.quickNotes.map((note: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: primaryColor }}
                          aria-hidden="true"
                        />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <a
                  href={bookingHref}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 px-6 font-semibold text-base transition-all duration-300 hover:opacity-90 shadow-sm"
                  style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                >
                  <span>{bookingLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                {phone && (
                  <a
                    href={phoneHref}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border py-3 px-4 text-sm font-medium text-neutral-800 hover:bg-black/5 transition-colors"
                    style={{ borderColor }}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Questions? Call {phone}</span>
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: DETAILS, INCLUDED CHECKLIST, SIZE-BASED PRICING */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4" style={{ color: textColor }}>
                About this service
              </h2>
              <p className="text-base md:text-[17px] leading-relaxed text-neutral-700 whitespace-pre-line">
                {longDescription}
              </p>
            </div>

            {/* What's Included */}
            {includedItems.length > 0 && (
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5" style={{ color: textColor }}>
                  What&rsquo;s included
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {includedItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border p-4 bg-white"
                      style={{ borderColor }}
                    >
                      <CheckCircle2
                        className="h-5 w-5 mt-0.5 shrink-0"
                        style={{ color: primaryColor }}
                        aria-hidden="true"
                      />
                      <span className="text-sm md:text-base font-medium text-neutral-800">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Size-Based Pricing Table */}
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: textColor }}>
                    Pricing by pet size
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    {service.pricingNote ||
                      "Final pricing may vary slightly based on coat condition, matting, and breed."}
                  </p>
                </div>
              </div>

              {pricingTiers.length > 0 ? (
                <div className="overflow-x-auto rounded-2xl border" style={{ borderColor }}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr style={{ backgroundColor: bgHeader }}>
                        <th scope="col" className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-neutral-700">
                          Pet Size
                        </th>
                        <th scope="col" className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-neutral-700">
                          Weight / Breed Guide
                        </th>
                        {pricingTiers.some((t) => t.duration) && (
                          <th scope="col" className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-neutral-700">
                            Est. Time
                          </th>
                        )}
                        <th scope="col" className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wider text-neutral-700 text-right">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor }}>
                      {pricingTiers.map((tier, idx) => (
                        <tr key={idx} className="hover:bg-black/[0.02] transition-colors">
                          <td className="py-4 px-5 font-semibold text-sm md:text-base text-neutral-900">
                            {tier.size}
                            {tier.note && (
                              <span className="block text-xs font-normal text-neutral-500 mt-0.5">
                                {tier.note}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-5 text-sm text-neutral-700">
                            {tier.weight || "—"}
                          </td>
                          {pricingTiers.some((t) => t.duration) && (
                            <td className="py-4 px-5 text-sm text-neutral-700">
                              {tier.duration || "—"}
                            </td>
                          )}
                          <td className="py-4 px-5 font-semibold text-base text-right whitespace-nowrap text-neutral-900">
                            {tier.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div
                  className="rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ backgroundColor: cardBg, borderColor }}
                >
                  <div>
                    <p className="font-semibold text-base text-neutral-900">{title}</p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      Standard rate — tailored to your pet&rsquo;s coat and size.
                    </p>
                  </div>
                  <span className="text-2xl font-semibold whitespace-nowrap" style={{ color: textColor }}>
                    {startingPrice || "Custom Quote"}
                  </span>
                </div>
              )}
            </Reveal>

            {/* Optional Add-ons */}
            {Array.isArray(service.addOns) && service.addOns.length > 0 && (
              <Reveal>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-4" style={{ color: textColor }}>
                  Popular add-ons
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.addOns.map((addon: { name: string; price: string }, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border px-4 py-3"
                      style={{ borderColor }}
                    >
                      <span className="text-sm font-medium text-neutral-800">{addon.name}</span>
                      <span className="text-sm font-semibold text-neutral-900">{addon.price}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 3. OTHER SERVICES (Excludes the currently active service) */}
      {otherServices.length > 0 && (
        <section className="py-16 md:py-20 border-t" style={{ backgroundColor: cardBg, borderColor }}>
          <div className="mx-auto max-w-6xl px-6 md:px-12">
            <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: textColor }}>
                  Explore other services
                </h2>
                <p className="mt-2 text-base text-neutral-600">
                  Compare our other grooming packages and pricing options.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:opacity-75 transition-opacity"
              >
                <span>View all services</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.map((item, idx) => (
                <Reveal key={item._slug || idx} delay={idx * 80}>
                  <Link
                    href={`/services/${item._slug}`}
                    className="group flex flex-col justify-between h-full rounded-3xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{ borderColor }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-xl font-semibold leading-snug text-neutral-900">
                          {item.title || item.name}
                        </h3>
                        {item.price && (
                          <span
                            className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                            style={{ backgroundColor: bgHeader, color: textColor }}
                          >
                            {item.price}
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-600 line-clamp-3">
                        {item.subheading || item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm font-semibold text-neutral-900" style={{ borderColor }}>
                      <span>View details &amp; pricing</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: primaryColor }}
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. FINAL CTA */}
      {data?.ctaSection && <CTASection data={data.ctaSection} />}
    </div>
  );
}