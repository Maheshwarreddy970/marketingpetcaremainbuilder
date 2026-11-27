import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | NexPet Care",
    description:
        "How NexPet Care collects, uses, and protects your business and contact information.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white text-neutral-900">
            <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
                <p className="text-sm font-medium text-neutral-500">
                    Last updated: November 27, 2026
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Privacy Policy
                </h1>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
          NexPet Care (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
          respects your privacy. This policy explains what information we
          collect on{" "}
          <strong className="font-semibold text-neutral-900">nexpetcare.com</strong>{" "}
          and our client staging and editing dashboard platform{" "}
          <strong className="font-semibold text-neutral-900">nexpetcare.online</strong>,{" "}
          how we use it, and your choices.
        </p>

                <div className="mt-12 space-y-10 text-base leading-relaxed text-neutral-700">
                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            1. Information We Collect
                        </h2>
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Contact &amp; Inquiry Details:
                                </strong>{" "}
                                Your name, business name, email address, phone number, website
                                URL, and messages you send via email, our contact form, or when
                                booking a demo call.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Website Build &amp; Dashboard Content:
                                </strong>{" "}
                                Business copy, service pricing, logos, photos, and booking links
                                that you provide for your website or save inside your private
                                editing dashboard.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Payment Information:
                                </strong>{" "}
                                Payments are processed securely by Stripe. We receive payment
                                confirmations and billing receipts, but we never see or store
                                your full credit or debit card number.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Basic Technical Logs:
                                </strong>{" "}
                                Standard security and performance logs (such as IP address,
                                browser type, and request timestamps) handled by our hosting and
                                CDN providers to prevent spam and abuse.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            2. How We Use Your Information
                        </h2>
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                            <li>
                                To respond to inquiries, schedule walkthrough calls, and build
                                your custom website.
                            </li>
                            <li>
                                To host your website, authenticate your private editing
                                dashboard, and publish your updates.
                            </li>
                            <li>
                                To send project updates, invoices, receipts, and support
                                replies.
                            </li>
                            <li>
                                To protect our infrastructure from automated bots, spam, and
                                security threats.
                            </li>
                        </ul>
                        <p className="mt-3 font-medium text-neutral-900">
                            We never sell, rent, or trade your personal or business contact
                            information to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            3. Trusted Third-Party Infrastructure
                        </h2>
                        <p className="mt-3">
                            We rely on reputable infrastructure providers to deliver our
                            service securely:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Vercel &amp; Cloudflare:
                                </strong>{" "}
                                Website hosting, DNS routing, global caching, and DDoS/bot
                                protection.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Google Firebase (Firestore):
                                </strong>{" "}
                                Secure storage of client website text/settings used by the
                                private editing dashboard.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Cloudinary:
                                </strong>{" "}
                                Image optimization and fast media delivery.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Stripe:
                                </strong>{" "}
                                Encrypted payment processing and invoicing.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Cal.com:
                                </strong>{" "}
                                Demo and strategy call scheduling.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            4. Preview Mockups for Prospective Clients
                        </h2>
                        <p className="mt-3">
                            When we create an unlisted preview concept for a pet care
                            business, we use only publicly available business details (such as
                            business name, public address, and public brand colors/logo).
                            Preview pages are set to{" "}
                            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">
                                noindex
                            </code>{" "}
                            so they do not appear on Google, contain non-functional demo
                            buttons, and are removed upon request or after the preview window
                            expires.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            5. Data Retention &amp; Your Rights
                        </h2>
                        <p className="mt-3">
                            We retain client website data for as long as your site is hosted
                            with NexPet Care, and billing records as required for tax and
                            accounting purposes. You may contact us at any time to request:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                            <li>Access to or a copy of the personal data we hold about you.</li>
                            <li>Correction of inaccurate details.</li>
                            <li>
                                Deletion of your contact inquiry, preview mockup, or dashboard
                                account data.
                            </li>
                        </ul>
                    </section>
<section>
            <h2 className="text-xl font-semibold text-neutral-900">
              11. Operator &amp; Contact
            </h2>
            <p className="mt-3">
              NexPet Care is independently operated by Maheshwar Reddy, serving
              pet care businesses across the United States and Canada. Questions
              about these Terms? Email{" "}
              <a
                href="mailto:maheshwar@nexpetcare.com"
                className="font-medium text-neutral-900 underline underline-offset-4"
              >
                maheshwar@nexpetcare.com
              </a>{" "}
              or visit our{" "}
              <Link
                href="/contact"
                className="font-medium text-neutral-900 underline underline-offset-4"
              >
                Contact page
              </Link>
              .
            </p>
          </section>
                </div>
            </div>
        </main>
    );
}