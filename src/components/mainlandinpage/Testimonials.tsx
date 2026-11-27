import type { ReactNode } from 'react'
import { TESTIMONIALS_CONTENT } from './data'

// Same font + focus ring as the hero, so both sections read as one system.
// (The Bricolage Grotesque <link> is already added once for the hero.)
const FONT = "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B2545]'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
      <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
    </svg>
  )
}

function IconLink({
  href,
  icon,
  label,
  hint,
}: {
  href: string
  icon: ReactNode
  label: string
  hint: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-fit items-center gap-2.5 rounded-full border border-[#DCE3EA] bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors hover:border-[#0B2545] hover:bg-[#F4F6F8] ${focusRing}`}
    >
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-full bg-[#0B2545] text-white"
      >
        {icon}
      </span>
      {label}
      <span className="sr-only">{hint}</span>
    </a>
  )
}

export default function Testimonials() {
  const { id, title, intro, items } = TESTIMONIALS_CONTENT
  const headingId = `${id}-heading`

  return (
    <section
    id="testimonials"
      aria-labelledby={headingId}
      style={{ fontFamily: FONT }}
      className="mt-5 rounded-[35px] border border-[#DCE3EA] bg-white px-6 py-16 text-[#0B2545] md:px-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <h2
            id={headingId}
            className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] md:text-6xl"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-[#5C6B7A] md:text-xl">
            {intro}
          </p>
        </header>

        <ul className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-2">
          {items.map((item) => (
            <li key={item.business} className="flex">
              <figure className="flex w-full flex-col gap-4 rounded-3xl border border-[#DCE3EA] bg-[#F4F6F8] p-4 md:p-5">
                {/* Review */}
                <div className="flex flex-1 flex-col gap-6 p-2 md:p-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE3EA] bg-white px-3.5 py-1.5 text-sm font-semibold">
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full bg-[#D8EA3F] ring-1 ring-[#0B2545]/15"
                      />
                      Live since {item.liveSince}
                    </p>
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0B2545] text-[#D8EA3F]"
                    >
                      <QuoteIcon className="size-5" />
                    </span>
                  </div>

                  <blockquote>
                    <p className="text-lg leading-relaxed md:text-xl md:leading-9">
                      {item.quote}
                    </p>
                  </blockquote>

                  {item.highlight && (
                    <p className="mt-auto inline-flex w-fit flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-[#D8EA3F] px-4 py-2.5">
                      <span className="text-3xl font-bold tabular-nums tracking-tight">
                        {item.highlight.value}
                      </span>
                      <span className="text-sm font-semibold">{item.highlight.label}</span>
                    </p>
                  )}
                </div>

                {/* Attribution plate */}
                <figcaption className="flex flex-col gap-5 rounded-2xl border border-[#DCE3EA] bg-white p-4 md:p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.logo}
                      alt={`${item.business} logo`}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="size-12 shrink-0 rounded-xl border border-[#DCE3EA] bg-white object-contain p-1"
                    />
                    <div className="min-w-0">
                      <p className="text-base font-bold md:text-lg">{item.reviewer}</p>
                      <p className="text-sm text-[#5C6B7A]">{item.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <IconLink
                      href={item.website.href}
                      icon={<GlobeIcon className="size-4" />}
                      label={item.website.label}
                      hint=" website (opens in a new tab)"
                    />
                    <IconLink
                      href={item.instagram.href}
                      icon={<InstagramIcon className="size-4" />}
                      label="Instagram"
                      hint={` ${item.instagram.label} (opens in a new tab)`}
                    />
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}