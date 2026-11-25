"use client";

import { useEffect, useId, useRef, useState } from "react";

type LaunchedSite = { name: string; tagline?: string; domain: string };

// Edit these freely: they only appear inside the preview panel.
const LAUNCHED_SITES: LaunchedSite[] = [
  {
    name: "Doggie Teeth Cleaning",
    tagline: "The Dog & Cat Teeth Cleaning Boutique",
    domain: "doggieteethcleaning.ca",
  },
  {
    name: "Pet Town Grooming",
    domain: "pettowngrooming.com",
  },
];

// NOTE: the original review text was cut off after "...best interest in mind".
// Paste the full review here and confirm who it should be credited to.
const TESTIMONIAL = {
  quote:
    "Maheshwar and his team at NexPet Care were wonderful. Not only did they accommodate my requests, they even gave me various demo websites, adjusting to our business needs and completely understanding us. One can tell they had our best interest in mind.",
  author: "Pet Town Grooming",
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 12l5-5 5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PreviewDashboardBadge({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-[9999] w-[min(calc(100vw-2rem),22rem)]"
    >
      {open && (
        <section
          id={panelId}
          aria-label="Recently launched on NexPet Care"
          className="mb-2 max-h-[70vh] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <img src="/mainlogo.png" alt="NexPet Care" className="h-4 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close panel"
              className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2462EA]"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="px-4 pt-4">
            <h2 className="text-base font-bold leading-tight text-[#0A1F4D]">
              Recently launched on NexPet Care
            </h2>
            <p className="mt-1 text-xs text-gray-600">
              Real businesses that now run on websites we built.
            </p>
          </div>

          {/* Launched sites */}
          <ul className="mt-3 divide-y divide-gray-100 border-y border-gray-100">
            {LAUNCHED_SITES.map((site) => (
              <li key={site.domain}>
                <a
                  href={`https://${site.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#2462EA]/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2462EA]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-900">{site.name}</span>
                    {site.tagline && (
                      <span className="block truncate text-xs text-gray-600">{site.tagline}</span>
                    )}
                    <span className="block text-xs font-medium text-[#2462EA]">{site.domain}</span>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 text-gray-400">
                    <path d="M7 4h9v9M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* Testimonial */}
          <figure className="px-4 py-4">
            <blockquote className="border-l-2 border-[#2462EA] pl-3 text-xs leading-relaxed text-gray-700">
              “{TESTIMONIAL.quote}”
            </blockquote>
            <figcaption className="mt-2 pl-3 text-xs font-semibold text-[#0A1F4D]">
              {TESTIMONIAL.author}
            </figcaption>
          </figure>

          {/* CTA + disclosure */}
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
            <a
              href={`https://nexpetcare.com/dashboard/${slug}`}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#0A1F4D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12307a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2462EA]"
            >
              See what’s inside your dashboard
              <span aria-hidden="true">&rarr;</span>
            </a>
            <p className="mt-2 text-[11px] leading-snug text-gray-500">
              This panel is part of your private preview only. It won’t appear on your website and doesn’t change your design.
            </p>
          </div>
        </section>
      )}

      {/* Collapsed bar (straight, rectangular) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 rounded-lg border border-[#0A1F4D] bg-[#0A1F4D] px-4 py-3 text-left text-white shadow-2xl hover:bg-[#12307a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2462EA]"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold leading-tight">Recently launched on NexPet Care</span>
          <span className="block text-xs leading-tight text-blue-200">See the sites we built and your dashboard</span>
        </span>
        <Chevron open={open} />
      </button>
    </div>
  );
}