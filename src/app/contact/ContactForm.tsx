"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        businessName: "",
        websiteOrSocial: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If you add a Resend API route at /api/contact later, replace the mailto block below with fetch("/api/contact", ...)
        const subject = encodeURIComponent(
            `NexPet Care Inquiry — ${form.businessName || form.name}`
        );
        const body = encodeURIComponent(
            [
                `Name: ${form.name}`,
                `Email: ${form.email}`,
                `Business Name: ${form.businessName || "Not provided"}`,
                `Website / Social: ${form.websiteOrSocial || "None yet"}`,
                "",
                "Message:",
                form.message,
            ].join("\n")
        );

        window.location.href = `mailto:maheshwar@nexpetcare.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle2 className="mx-auto text-green-600" size={32} />
                <h3 className="mt-3 text-base font-semibold text-neutral-900">
                    Your email draft is ready!
                </h3>
                <p className="mt-1 text-sm text-neutral-600">
                    If your email app didn&apos;t open automatically, you can send your
                    message directly to{" "}
                    <a
                        href="mailto:maheshwar@nexpetcare.com"
                        className="font-medium text-neutral-900 underline"
                    >
                        maheshwar@nexpetcare.com
                    </a>
                    .
                </p>
                <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-600"
                    >
                        Your Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-600"
                    >
                        Email Address *
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="sarah@happypaws.com"
                        className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="businessName"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-600"
                    >
                        Pet Business Name *
                    </label>
                    <input
                        id="businessName"
                        type="text"
                        required
                        value={form.businessName}
                        onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                        placeholder="e.g. Happy Paws Grooming"
                        className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900"
                    />
                </div>

                <div>
                    <label
                        htmlFor="websiteOrSocial"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-600"
                    >
                        Current Website or Instagram
                    </label>
                    <input
                        id="websiteOrSocial"
                        type="text"
                        value={form.websiteOrSocial}
                        onChange={(e) =>
                            setForm({ ...form, websiteOrSocial: e.target.value })
                        }
                        placeholder="Optional — URL or @handle"
                        className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-600"
                >
                    How can we help? *
                </label>
                <textarea
                    id="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us if you'd like a free preview, which booking tool you use (Square, MoeGo, Vagaro, etc.), or any questions you have."
                    className="mt-1.5 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900"
                />
            </div>

            <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
            >
                <Send size={15} />
                Send Message
            </button>
        </form>
    );
}