/**
 * Top banner shown on every private design preview.
 * Server component (no JS needed). Sticky, so it stays visible while scrolling.
 *
 * The <style> block shifts the template's own fixed/sticky top navbar down by
 * the banner height, so the banner never covers the navbar and the template's
 * design is left untouched.
 */
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
        className="sticky top-0 z-[10000] w-full bg-white border-b border-[#2462EA]/25 shadow-sm flex items-center justify-center gap-2.5 px-3"
      >
        <img
          src="/mainlogo.png"
          alt="NexPet Care"
          className="h-3.5 md:h-4 w-auto shrink-0"
        />
        <span className="hidden sm:inline-block shrink-0 rounded bg-[#2462EA] px-2 py-0.5 text-[11px] font-semibold text-white">
          Preview only
        </span>
        <p className="text-[11px] md:text-[13px] leading-[14px] md:leading-snug font-medium text-[#0A1F4D] text-left md:text-center">
          Private Design Preview created by NexPet Care — not a live website
          (booking buttons are demo placeholders).
        </p>
      </div>
    </>
  );
}