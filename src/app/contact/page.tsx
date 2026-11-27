import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Calendar, Clock, ExternalLink } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
    title: "Contact Us | NexPet Care",
    description:
        "Get in touch with Maheshwar at NexPet Care to request a free website preview, ask a question, or book a quick walkthrough call.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white text-neutral-900">
            <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                <div className="max-w-2xl">
                    <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                        Contact NexPet Care
                    </span>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                        Let&apos;s talk about your pet business website.
                    </h1>
                    <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
                        Whether you want a free private mockup of your salon, have questions
                        about how $0/month hosting works, or need help connecting your
                        booking software, you&apos;ll hear directly from me—no sales reps or
                        support tickets.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* Left Column: Direct Founder Contact & Booking */}
                    <div className="space-y-6 lg:col-span-5">
                        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                            <h2 className="text-lg font-semibold text-neutral-900">
                                Book a 15-Minute Demo Call
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                                See a live client website, test-drive the editing dashboard, and
                                ask any questions before you spend a dollar.
                            </p>
                            <a
                                href="https://cal.com/maheshwar-reddy-20/nexpetcare-demo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                            >
                                <Calendar size={16} />
                                Book a Free Walkthrough
                            </a>
                        </div>

                        <div className="space-y-4 rounded-2xl border border-neutral-200 p-6">
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 shrink-0 text-neutral-700" size={18} />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                        Direct Email
                                    </p>
                                    <a
                                        href="mailto:maheshwar@nexpetcare.com"
                                        className="mt-0.5 block text-sm font-medium text-neutral-900 underline underline-offset-4"
                                    >
                                        maheshwar@nexpetcare.com
                                    </a>
                                </div>
                            </div>
<div className="border-t border-neutral-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Official Domains
                </p>
                <ul className="mt-1.5 space-y-1 text-sm text-neutral-700">
                  <li>
                    <strong className="font-medium text-neutral-900">nexpetcare.com</strong> — Main website &amp; initial previews
                  </li>
                  <li>
                    <strong className="font-medium text-neutral-900">nexpetcare.online</strong> — Full staging previews &amp; client editing dashboards
                  </li>
                </ul>
              </div>
                            <div className="flex items-start gap-3">
                                <Clock className="mt-0.5 shrink-0 text-neutral-700" size={18} />
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                        Response Time
                                    </p>
                                    <p className="mt-0.5 text-sm text-neutral-700">
                                        Usually within a few hours (Monday–Saturday, North American
                                        business hours).
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-neutral-200 pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                    Founder
                                </p>
                                <p className="mt-1 text-sm font-medium text-neutral-900">
                                    Maheshwar Reddy — Founder, NexPet Care
                                </p>
                                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                                    <a
                                        href="https://www.linkedin.com/in/maheshwarr-reddy-713927258/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
                                    >
                                        LinkedIn <ExternalLink size={13} />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@Nexpetcare"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
                                    >
                                        YouTube Demos <ExternalLink size={13} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-neutral-200 p-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                                Verify Live Client Sites
                            </p>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>
                                    <a
                                        href="https://doggieteethcleaning.ca/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 font-medium text-neutral-900 underline underline-offset-4"
                                    >
                                        doggieteethcleaning.ca <ExternalLink size={13} />
                                    </a>
                                    <span className="text-neutral-500"> — Burlington, ON</span>
                                </li>
                                <li>
                                    <a
                                        href="https://pettowngrooming.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 font-medium text-neutral-900 underline underline-offset-4"
                                    >
                                        pettowngrooming.com <ExternalLink size={13} />
                                    </a>
                                    <span className="text-neutral-500"> — Elora, ON</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                            <h2 className="text-xl font-semibold text-neutral-900">
                                Send a Message or Request a Free Preview
                            </h2>
                            <p className="mt-1.5 text-sm text-neutral-600">
                                Share your salon name and current website (or Instagram link),
                                and I&apos;ll get back to you personally.
                            </p>
                            <ContactForm />
                            <p className="mt-4 text-xs text-neutral-500">
                                By submitting, you agree to our{" "}
                                <Link href="/privacy" className="underline underline-offset-2">
                                    Privacy Policy
                                </Link>
                                . No spam, no mailing lists.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}