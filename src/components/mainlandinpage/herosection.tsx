import AntiMetalButton from './mainbutton'
import { HERO_CONTENT } from './data'

/*
  Font link (add once in index.html or your root layout):
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&display=swap" rel="stylesheet" />
*/
const FONT = "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"

export default function Herosection() {
  const { comparison } = HERO_CONTENT

  return (
    <section
      style={{ fontFamily: FONT }}
      className="mt-5 rounded-[35px] border border-[#DCE3EA] bg-white px-6 py-16 text-[#0B2545] md:px-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-end gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <h1 className="text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] md:text-7xl">
            {HERO_CONTENT.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-[#5C6B7A] md:text-xl">
            {HERO_CONTENT.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AntiMetalButton />
            <a
              href={HERO_CONTENT.secondaryCta.href}
              className="text-base font-semibold underline decoration-[#0B2545]/25 underline-offset-4 transition-colors hover:decoration-[#0B2545] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B2545]"
            >
              {HERO_CONTENT.secondaryCta.label}
            </a>
          </div>
        </div>

        <figure
          aria-label={comparison.ariaLabel}
          className="rounded-2xl border border-[#DCE3EA] bg-[#F4F6F8] p-6 md:p-8"
        >
          <dl>
            {comparison.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-6 border-b border-[#DCE3EA] py-5 first:pt-0 last:border-b-0 last:pb-0"
              >
                <dt
                  className={`flex items-center gap-3 text-sm md:text-base ${
                    row.highlight ? 'font-semibold text-[#0B2545]' : 'text-[#5C6B7A]'
                  }`}
                >
                  {row.highlight && (
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[#D8EA3F]" />
                  )}
                  {row.label}
                </dt>
                <dd
                  className={`font-bold tabular-nums tracking-tight ${
                    row.highlight ? 'text-4xl text-[#0B2545]' : 'text-3xl text-[#5C6B7A]'
                  }`}
                >
                  {row.amount}
                </dd>
              </div>
            ))}
          </dl>

          <figcaption className="mt-6 text-xs leading-relaxed text-[#5C6B7A]">
            {comparison.note}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}