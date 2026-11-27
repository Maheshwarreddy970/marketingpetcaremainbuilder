import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | NexPet Care",
    description:
        "Terms of Service for NexPet Care's $799 one-time custom website build, $0/month static hosting, and private editing dashboard.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white text-neutral-900">
            <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
                <p className="text-sm font-medium text-neutral-500">
                    Last updated: November 27, 2026
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Terms of Service
                </h1>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                    These Terms of Service govern your use of{" "}
                    <strong className="font-semibold text-neutral-900">nexpetcare.com</strong>{" "}
                    and any website design, development, hosting, or dashboard services
                    provided by{" "}
                    <strong className="font-semibold text-neutral-900">NexPet Care</strong>{" "}
                    (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By
                    commissioning a website build or using our services, you agree to
                    these terms.
                </p>

                <div className="mt-12 space-y-10 text-base leading-relaxed text-neutral-700">
                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            1. Service Scope (One-Time Website Build)
                        </h2>
                        <p className="mt-3">
                            NexPet Care provides a one-time, done-for-you custom website build
                            for pet care businesses (including pet groomers, boarding
                            facilities, daycares, walkers, trainers, and pet clinics). Unless
                            otherwise agreed in writing, a standard build includes:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                            <li>
                                Custom design and build of up to four (4) core pages (typically
                                Home, About, Services, and Contact) tailored to your branding,
                                copy, and photos.
                            </li>
                            <li>
                                Mobile-responsive optimization and on-page local SEO setup.
                            </li>
                            <li>
                                Connection to your existing third-party online booking page or
                                embed widget (such as Square, MoeGo, Vagaro, DaySmart, Gingr, or
                                Groomer.io).
                            </li>
                            <li>
                                Connection to your existing custom domain name (DNS setup
                                guidance or hands-on configuration).
                            </li>
                            <li>
                                Access to a private click-and-type editing dashboard for
                                updating text, prices, hours, FAQs, service order, and photos.
                            </li>
                            <li>
                                Thirty (30) days of post-launch hands-on support for minor tweaks
                                and adjustments.
                            </li>
                        </ul>
                        <p className="mt-3">
                            Standard turnaround is 5 to 7 business days after we receive your
                            project details, photos, service list, and booking link.
                        </p>
                    </section>

                  <section>
            <h2 className="text-xl font-semibold text-neutral-900">
              2. Pricing, $0 Upfront &amp; No Recurring Subscriptions
            </h2>
            <p className="mt-3">
              The standard fee for a Complete Website Build is a{" "}
              <strong className="font-semibold text-neutral-900">
                flat one-time payment of $799 USD
              </strong>
              . NexPet Care does not charge recurring monthly or annual hosting
              or software subscriptions for your website.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-neutral-900">
                  $0 Upfront — Pay Only Upon Approval:
                </strong>{" "}
                You pay $0 upfront to get started. We build and customize your
                full four-page staging preview and let you test your private
                editing dashboard first. You only pay the $799 one-time fee via
                Stripe (credit or debit card) once you have reviewed the
                finished build and given written approval to launch. We connect
                your live domain and publish your site as soon as payment
                clears.
              </li>
              <li>
                <strong className="font-semibold text-neutral-900">
                  Domain Renewals:
                </strong>{" "}
                You remain responsible for your own annual domain name
                registration and renewal fees paid directly to your registrar
                (e.g., GoDaddy, Namecheap, Cloudflare).
              </li>
              <li>
                <strong className="font-semibold text-neutral-900">
                  Optional Future Add-Ons:
                </strong>{" "}
                Because the platform is not a drag-and-drop page builder, adding
                brand-new pages, custom structural sections, or full redesigns
                after launch is optional and quoted separately as a one-time fee
                only if you request it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900">
              3. Revisions, Cancellation &amp; Refund Policy
            </h2>
            <p className="mt-3">
              During the staging phase, we work with you through reasonable
              revisions until your pages, photos, pricing, and booking links
              look right on both mobile and desktop.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-neutral-900">
                  Walk Away Free Before Approval:
                </strong>{" "}
                Because you pay $0 upfront, you may cancel or decline to move
                forward at any point during the preview and staging review with
                zero fee and zero obligation. If you choose not to proceed, we
                simply delete the unlisted staging draft.
              </li>
              <li>
                <strong className="font-semibold text-neutral-900">
                  Final Payment Upon Launch Approval:
                </strong>{" "}
                Payment is only collected after you have inspected your finished
                staging site, tested the editing dashboard, and approved launch.
                Once payment is completed and your website is connected to your
                live domain (or your site files are exported), all payments are
                final.
              </li>
              <li>
                <strong className="font-semibold text-neutral-900">
                  Launch Guarantee:
                </strong>{" "}
                If we are unable to launch your approved site on your domain due
                to a technical issue on our end, you will receive a 100% refund.
              </li>
            </ul>
          </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            3. Revisions, Cancellation &amp; Refund Policy
                        </h2>
                        <p className="mt-3">
                            You pay $0 upfront. Before you spend a dollar, we build and
                            customize your full staging preview and work with you through
                            reasonable revisions until your pages, photos, pricing, and
                            booking links are ready for launch.
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    No Deposit &amp; Free Cancellation Before Launch:
                                </strong>{" "}
                                Because there is no upfront deposit, you can walk away at any
                                point during the preview and revision stage with zero fee and
                                zero obligation. If you decide not to move forward, we simply
                                delete the unlisted staging draft.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Payment Upon Approval:
                                </strong>{" "}
                                You only pay the $799 one-time fee via Stripe after you have
                                reviewed the finished staging site, tested your editing
                                dashboard, and approved launch. Once payment is completed and
                                your site is connected to your live domain (or your site files
                                are exported), all payments are final.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Launch Guarantee:
                                </strong>{" "}
                                If we are unable to launch your approved site on your domain due
                                to a technical issue on our end, you will receive a 100% refund.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            4. $0/Month Hosting &amp; Fair-Use Policy
                        </h2>
                        <p className="mt-3">
                            We include $0/month hosting for your launched website on our
                            cached static cloud infrastructure, subject to normal fair-use
                            traffic typical of a local pet care business (up to 50,000 monthly
                            page views and standard image storage).
                        </p>
                        <p className="mt-3">
                            We aim to keep included hosting active indefinitely. In the
                            unlikely event that third-party infrastructure terms change or we
                            ever discontinue included hosting, we will give you at least sixty
                            (60) days&apos; advance written notice and provide a complete
                            export of your frontend website files and assets at no cost so you
                            can host the site on your own provider (such as Cloudflare Pages,
                            Vercel, or Netlify).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            5. Website Ownership, Code Export &amp; Editing Dashboard
                        </h2>
                        <p className="mt-3">
                            Upon full payment of the $799 build fee:
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-6">
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    What You Own:
                                </strong>{" "}
                                You retain 100% ownership of your domain name, business name,
                                logos, uploaded photography, custom copy, and the finished
                                frontend code generated for your website. You may request a full
                                export of your frontend site files at any time with zero
                                lock-in.
                            </li>
                            <li>
                                <strong className="font-semibold text-neutral-900">
                                    Editing Dashboard:
                                </strong>{" "}
                                The private click-and-type editing dashboard and underlying
                                multi-tenant CMS backend remain the intellectual property of
                                NexPet Care and are licensed to you at no monthly cost while
                                your site is hosted with us. If you choose to export and
                                self-host your site independently, future updates to the
                                exported site are made directly in code rather than through the
                                NexPet Care dashboard.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            6. Third-Party Booking Tools
                        </h2>
                        <p className="mt-3">
                            &ldquo;Booking software connection&rdquo; means linking your
                            website buttons or embedding widgets provided by your third-party
                            booking software (such as Square, MoeGo, Vagaro, DaySmart, or
                            Gingr). NexPet Care does not operate those platforms, does not
                            sync two-way client databases, and is not responsible for
                            downtime, pricing, or policy changes made by your booking
                            provider.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            7. Post-Launch Support &amp; Maintenance
                        </h2>
                        <p className="mt-3">
                            Your build includes 30 days of post-launch hands-on support for
                            content tweaks, photo updates, and dashboard assistance. After 30
                            days, your website remains online at $0/month, your dashboard
                            remains accessible, and any bugs caused by our hosting or
                            dashboard infrastructure are fixed free of charge.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            8. Client Content &amp; Responsibilities
                        </h2>
                        <p className="mt-3">
                            You confirm that you own or have permission to use all logos,
                            photos, trademarks, and business text you supply or publish
                            through your dashboard. You are responsible for keeping your
                            dashboard login secure and ensuring your published business
                            information, pricing, and local compliance disclosures are
                            accurate.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            9. Private Preview Mockups
                        </h2>
                        <p className="mt-3">
                            Any complimentary preview mockup created prior to purchase is an
                            unlisted, non-indexed demonstration draft with placeholder buttons
                            and does not collect customer data. Preview mockups are deleted
                            automatically if you choose not to proceed, or immediately upon
                            request.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-neutral-900">
                            10. Limitation of Liability
                        </h2>
                        <p className="mt-3">
                            Services are provided on an &ldquo;as-is&rdquo; and
                            &ldquo;as-available&rdquo; basis. To the maximum extent permitted
                            by law, NexPet Care is not liable for indirect, incidental, or
                            consequential damages (such as lost profits or third-party
                            service outages). Our total aggregate liability for any claim
                            arising out of these terms or our services is limited to the total
                            amount you actually paid to NexPet Care.
                        </p>
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