/**
 * Top banner shown on every private design preview.
 * Server component (no JS needed). Sticky, so it stays visible while scrolling.
 *
 * The <style> block shifts the template's own fixed/sticky top navbar down by
 * the banner height, so the banner never covers the navbar and the template's
 * design is left untouched.
 */

const WEBSITE_URL = "https://nexpetcare.com";
// Point this to your "How it works" / "What's the catch?" / Pricing section ID on nexpetcare.com
const LEARN_MORE_URL = "https://nexpetcare.com/#pricing";

export default function PreviewBanner() {
  return (
    <>
      <style>{`
        #tenant-wrapper { --pv-banner-h: 56px; }
        @media (min-width: 768px) { #tenant-wrapper { --pv-banner-h: 40px; } }
        #tenant-wrapper .fixed.top-0:not([data-preview-banner]),
        #tenant-wrapper .sticky.top-0:not([data-preview-banner]) {
          top: var(--pv-banner-h) !important;
        }
      `}</style>

      <div
        data-preview-banner
        role="note"
        aria-label="Private design preview notice"
        style={{ height: "var(--pv-banner-h)" }}
        className="sticky top-0 z-[10000] w-full bg-white border-b border-[#2462EA]/25 shadow-sm flex flex-col md:flex-row items-center justify-center md:justify-between gap-1 md:gap-4 px-3 md:px-5"
      >
        {/* Left: Logo + Preview disclaimer */}
        <div className="flex items-center justify-center gap-2 min-w-0">
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NexPet Care home"
            className="shrink-0"
          >
            <img
              src="/mainlogo.png"
              alt="NexPet Care"
              className="h-3.5 md:h-4 w-auto"
            />
          </a>

          <span className="hidden lg:inline-block shrink-0 rounded bg-[#2462EA] px-2 py-0.5 text-[11px] font-semibold text-white">
            Preview only
          </span>

          <p className="text-[11px] md:text-[12.5px] leading-tight font-medium text-[#0A1F4D] truncate">
            <span className="md:hidden">
              Private preview by NexPet Care — not live (demo buttons)
            </span>
            <span className="hidden md:inline">
              Private Design Preview by NexPet Care — not a live website
              (booking buttons are demo placeholders).
            </span>
          </p>
        </div>

        {/* Right: Minimalistic links */}
        <div className="flex items-center gap-3 shrink-0 text-[11px] md:text-[12px] font-semibold leading-none">
          <a
            href={LEARN_MORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A1F4D]/80 hover:text-[#2462EA] underline underline-offset-2 decoration-[#0A1F4D]/30 hover:decoration-[#2462EA] transition-colors"
          >
            Learn more
          </a>

          <span aria-hidden="true" className="text-[#0A1F4D]/25">
            |
          </span>

          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2462EA] hover:text-[#1748B8] inline-flex items-center gap-0.5 transition-colors"
          >
            <span>Visit website</span>
            <span aria-hidden="true" className="text-[10px]">
              ↗
            </span>
          </a>
        </div>
      </div>
    </>
  );
}