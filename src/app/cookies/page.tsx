import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | NexPet Care",
  description:
    "How NexPet Care uses essential and functional cookies on nexpetcare.com and the client editing dashboard.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="text-sm font-medium text-neutral-500">
          Last updated: November 27, 2026
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-600">
          This Cookie Policy explains how NexPet Care uses cookies and similar
          browser storage technologies when you visit{" "}
          <strong className="font-semibold text-neutral-900">nexpetcare.com</strong>{" "}
          or log in to your client editing dashboard.
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-neutral-700">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900">
              1. What Are Cookies?
            </h2>
            <p className="mt-3">
              Cookies are small text files placed on your device by your web
              browser. They help websites stay secure, remember your login
              session, and load reliably.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900">
              2. Types of Cookies We Use
            </h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Required?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      Essential &amp; Security
                    </td>
                    <td className="px-4 py-3">
                      Used by Cloudflare and Vercel to protect the site from
                      automated bots, DDoS attacks, and spam.
                    </td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      Dashboard Authentication
                    </td>
                    <td className="px-4 py-3">
                      Keeps paying clients signed in securely while editing text,
                      prices, and photos in their private dashboard.
                    </td>
                    <td className="px-4 py-3">Yes (Clients only)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-neutral-900">
                      Third-Party Embeds
                    </td>
                    <td className="px-4 py-3">
                      If you book a demo via Cal.com or play an embedded YouTube
                      walkthrough video, those providers may set their own
                      functional cookies.
                    </td>
                    <td className="px-4 py-3">Only when used</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We do not run third-party display ad networks or sell cookie data
              to ad brokers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900">
              3. Managing Cookies
            </h2>
            <p className="mt-3">
              You can clear or block cookies at any time through your browser
              settings (Chrome, Safari, Firefox, or Edge). Please note that
              disabling essential cookies may prevent the client editing
              dashboard from staying logged in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900">
              4. Questions
            </h2>
            <p className="mt-3">
              See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-neutral-900 underline underline-offset-4"
              >
                Privacy Policy
              </Link>{" "}
              for full details, or email{" "}
              <a
                href="mailto:nexpetcare@gmail.com"
                className="font-medium text-neutral-900 underline underline-offset-4"
              >
                nexpetcare@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}